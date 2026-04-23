import { NextResponse } from "next/server";
import { z } from "zod";
import { generateCertificateForSubmission } from "@/lib/certificate/generate";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import type { Json } from "@/lib/supabase/database.types";

const validatePayloadSchema = z.object({
  intent: z.literal("validate"),
  email: z.email(),
});

const submitPayloadSchema = z.object({
  intent: z.literal("submit"),
  email: z.email(),
  fullName: z.string().min(2).max(120),
  answers: z.record(z.string(), z.unknown()),
  comment: z.string().max(5000).optional(),
});

const payloadSchema = z.discriminatedUnion("intent", [
  validatePayloadSchema,
  submitPayloadSchema,
]);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const scope = url.searchParams.get("scope");

    if (scope === "questions") {
      const adminClient = createAdminSupabaseClient() as any;
      const { data, error } = await adminClient
        .from("evaluation_questions")
        .select(
          "id, question_text, question_type, question_key, is_required, display_order, meta, is_active",
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        return NextResponse.json(
          { message: "Unable to load evaluation questions." },
          { status: 500 },
        );
      }

      return NextResponse.json({ questions: data ?? [] });
    }

    if (scope === "submissions") {
      const adminCheck = await requireAdmin();
      if (!adminCheck.ok) {
        return NextResponse.json(
          { message: adminCheck.message },
          { status: adminCheck.status },
        );
      }

      const adminClient = createAdminSupabaseClient() as any;
      const { data, error } = await adminClient
        .from("evaluation_submissions")
        .select(`
          id,
          submitted_name,
          email,
          answers,
          comment,
          certificate_path,
          certificate_download_url,
          created_at,
          stakeholder:stakeholders!inner(id, full_name, email)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        return NextResponse.json(
          { message: "Unable to load evaluation submissions." },
          { status: 500 },
        );
      }

      const submissions = (data ?? []).map((row: any) => ({
        id: row.id,
        submitted_name: row.submitted_name,
        email: row.email,
        answers: row.answers,
        comment: row.comment,
        certificate_path: row.certificate_path,
        certificate_download_url: row.certificate_download_url,
        created_at: row.created_at,
        stakeholder_name: row.stakeholder?.full_name,
      }));

      return NextResponse.json({ submissions });
    }

    if (scope === "stats") {
      const adminCheck = await requireAdmin();
      if (!adminCheck.ok) {
        return NextResponse.json(
          { message: adminCheck.message },
          { status: adminCheck.status },
        );
      }

      const adminClient = createAdminSupabaseClient() as any;

      const [submissionsRes, questionsRes, stakeholdersRes] = await Promise.all([
        adminClient.from("evaluation_submissions").select("id, answers").order("created_at", { ascending: false }),
        adminClient.from("evaluation_questions").select("question_key, question_type, question_text").eq("is_active", true).order("display_order"),
        adminClient.from("stakeholders").select("id, is_active"),
      ]);

      const submissions = submissionsRes.data ?? [];
      const questions = questionsRes.data ?? [];
      const stakeholders = stakeholdersRes.data ?? [];

      const totalStakeholders = stakeholders.length;
      const activeStakeholders = stakeholders.filter((s: any) => s.is_active).length;
      const totalSubmissions = submissions.length;
      const participationRate = totalStakeholders > 0 ? (totalSubmissions / activeStakeholders) * 100 : 0;

      const questionStats: Record<string, { count: number; sum: number; avg: number; min: number; max: number }> = {};

      for (const q of questions) {
        const key = q.question_key;
        let sum = 0;
        let count = 0;
        let min = Infinity;
        let max = -Infinity;

        for (const sub of submissions) {
          const answer = sub.answers?.[key];
          if (typeof answer === "number") {
            sum += answer;
            count++;
            min = Math.min(min, answer);
            max = Math.max(max, answer);
          }
        }

        questionStats[key] = {
          count,
          sum,
          avg: count > 0 ? sum / count : 0,
          min: count > 0 ? min : 0,
          max: count > 0 ? max : 0,
        };
      }

      return NextResponse.json({
        stats: {
          total_stakeholders: totalStakeholders,
          active_stakeholders: activeStakeholders,
          total_submissions: totalSubmissions,
          participation_rate: Math.round(participationRate * 10) / 10,
          question_stats: questionStats,
          questions: questions.map((q: any) => ({
            key: q.question_key,
            type: q.question_type,
            text: q.question_text,
          })),
        },
      });
    }

    return NextResponse.json(
      { message: "Invalid scope parameter." },
      { status: 400 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request query parameters.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected evaluation API failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = payloadSchema.parse(body);
    const adminClient = createAdminSupabaseClient();

    if (payload.intent === "validate") {
      const normalizedEmail = normalizeEmail(payload.email);
      const { data: stakeholder, error: stakeholderError } = await adminClient
        .from("stakeholders")
        .select("id, full_name")
        .eq("email", normalizedEmail)
        .eq("is_active", true)
        .maybeSingle();

      if (stakeholderError) {
        return NextResponse.json(
          { message: "Unable to validate stakeholder email." },
          { status: 500 },
        );
      }

      if (!stakeholder) {
        return NextResponse.json({
          allowed: false,
          alreadySubmitted: false,
          message: "This email is not in the stakeholder list.",
        });
      }

      const { data: existingSubmission, error: submissionError } =
        await adminClient
          .from("evaluation_submissions")
          .select("id, certificate_download_url")
          .eq("stakeholder_id", stakeholder.id)
          .maybeSingle();

      if (submissionError) {
        return NextResponse.json(
          { message: "Unable to check previous submissions." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        allowed: true,
        alreadySubmitted: Boolean(existingSubmission),
        existingSubmissionId: existingSubmission?.id ?? null,
        existingCertificateUrl:
          existingSubmission?.certificate_download_url ?? null,
        stakeholder: {
          fullName: stakeholder.full_name,
        },
      });
    }

    const normalizedEmail = normalizeEmail(payload.email);

    const { data: activeTemplate, error: templateError } = await adminClient
      .from("certificate_templates")
      .select("id")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (templateError) {
      return NextResponse.json(
        { message: "Unable to validate certificate template state." },
        { status: 500 },
      );
    }

    if (!activeTemplate) {
      return NextResponse.json(
        {
          message:
            "No active certificate template is configured. Please contact an administrator.",
        },
        { status: 503 },
      );
    }

    const { data: stakeholder, error: stakeholderError } = await adminClient
      .from("stakeholders")
      .select("id, email")
      .eq("email", normalizedEmail)
      .eq("is_active", true)
      .maybeSingle();

    if (stakeholderError) {
      return NextResponse.json(
        { message: "Unable to load stakeholder record." },
        { status: 500 },
      );
    }

    if (!stakeholder) {
      return NextResponse.json(
        { message: "This email is not allowed to submit an evaluation." },
        { status: 403 },
      );
    }

    const { data: existingSubmission } = await adminClient
      .from("evaluation_submissions")
      .select("id, certificate_download_url")
      .eq("stakeholder_id", stakeholder.id)
      .maybeSingle();

    if (existingSubmission) {
      return NextResponse.json(
        {
          message: "This stakeholder has already submitted an evaluation.",
          existingSubmissionId: existingSubmission.id,
          existingCertificateUrl: existingSubmission.certificate_download_url,
        },
        { status: 409 },
      );
    }

    const { data: createdSubmission, error: createError } = await adminClient
      .from("evaluation_submissions")
      .insert({
        stakeholder_id: stakeholder.id,
        submitted_name: payload.fullName,
        email: stakeholder.email,
        answers: payload.answers as Json,
        comment: payload.comment?.trim() || null,
      })
      .select("id")
      .single();

    if (createError || !createdSubmission) {
      return NextResponse.json(
        { message: "Unable to save evaluation submission." },
        { status: 500 },
      );
    }

    try {
      const certificate = await generateCertificateForSubmission({
        submissionId: createdSubmission.id,
        stakeholderId: stakeholder.id,
        fullName: payload.fullName.trim(),
      });

      const { error: updateError } = await adminClient
        .from("evaluation_submissions")
        .update({
          certificate_path: certificate.certificatePath,
          certificate_download_url: certificate.certificateUrl,
        })
        .eq("id", createdSubmission.id);

      if (updateError) {
        return NextResponse.json(
          {
            message:
              "Evaluation saved, but certificate metadata could not be finalized.",
            submissionId: createdSubmission.id,
            certificateUrl: certificate.certificateUrl,
          },
          { status: 202 },
        );
      }

      return NextResponse.json({
        success: true,
        submissionId: createdSubmission.id,
        certificateUrl: certificate.certificateUrl,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message:
            "Evaluation was saved, but certificate generation failed. Please contact an administrator.",
          submissionId: createdSubmission.id,
          detail: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 202 },
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected evaluation API failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
