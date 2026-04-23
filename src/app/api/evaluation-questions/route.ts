import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";

const questionTypeSchema = z.enum([
  "rating",
  "text",
  "textarea",
  "select",
  "multiple",
]);

const ratingMetaSchema = z.object({
  min: z.number().int().min(0).default(1),
  max: z.number().int().min(1).default(5),
  min_label: z.string().default("Poor"),
  max_label: z.string().default("Excellent"),
  show_numbers: z.boolean().default(true),
});

const textMetaSchema = z.object({
  placeholder: z.string().default(""),
  max_length: z.number().int().min(1).max(5000).default(500),
});

const textareaMetaSchema = z.object({
  placeholder: z.string().default(""),
  max_length: z.number().int().min(1).max(5000).default(2000),
  rows: z.number().int().min(1).max(20).default(5),
});

const selectMetaSchema = z.object({
  options: z.array(z.string()).min(1),
  allow_other: z.boolean().default(false),
});

const multipleMetaSchema = z.object({
  options: z.array(z.string()).min(1),
  min_select: z.number().int().min(0).default(0),
  max_select: z.number().int().min(1).default(5),
});

const getMetaSchema = (qt: string) => {
  switch (qt) {
    case "rating":
      return ratingMetaSchema;
    case "text":
      return textMetaSchema;
    case "textarea":
      return textareaMetaSchema;
    case "select":
      return selectMetaSchema;
    case "multiple":
      return multipleMetaSchema;
    default:
      return z.object({});
  }
};

const metaSchema = z.union([
  ratingMetaSchema,
  textMetaSchema,
  textareaMetaSchema,
  selectMetaSchema,
  multipleMetaSchema,
]);

const ratingMetaInput = ratingMetaSchema;
const textMetaInput = textMetaSchema;
const textareaMetaInput = textareaMetaSchema;
const selectMetaInput = selectMetaSchema;
const multipleMetaInput = multipleMetaSchema;

const getMetaInputSchema = (qt: string) => {
  switch (qt) {
    case "rating":
      return ratingMetaInput;
    case "text":
      return textMetaInput;
    case "textarea":
      return textareaMetaInput;
    case "select":
      return selectMetaInput;
    case "multiple":
      return multipleMetaInput;
    default:
      return z.object({});
  }
};

const createQuestionSchema = z.object({
  question_text: z.string().min(1).max(500),
  question_type: questionTypeSchema,
  question_key: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z_][a-z0-9_]*$/, "Must be lowercase alphanumeric with underscores"),
  is_required: z.boolean().default(false),
  display_order: z.number().int().default(0),
  meta: z.any().default({}),
  is_active: z.boolean().default(true),
});

const updateQuestionSchema = z.object({
  id: z.uuid(),
  question_text: z.string().min(1).max(500).optional(),
  question_type: questionTypeSchema.optional(),
  question_key: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z_][a-z0-9_]*$/, "Must be lowercase alphanumeric with underscores")
    .optional(),
  is_required: z.boolean().optional(),
  display_order: z.number().int().optional(),
  meta: z.any().optional(),
  is_active: z.boolean().optional(),
});

const deleteQuestionSchema = z.object({
  id: z.uuid(),
});

const sanitizeFileName = (text: string) =>
  text
    .toLowerCase()
    .replaceAll(/[^a-z0-9_]+/g, "_")
    .replaceAll(/^_+|_+$/g, "")
    .replaceAll(/_+/g, "_");

export async function GET() {
  try {
    const adminCheck = await requireAdmin();

    if (!adminCheck.ok) {
      return NextResponse.json(
        { message: adminCheck.message },
        { status: adminCheck.status },
      );
    }

    const adminClient = createAdminSupabaseClient() as any;
    const { data, error } = await adminClient
      .from("evaluation_questions")
      .select(
        "id, question_text, question_type, question_key, is_required, display_order, meta, is_active, created_at, updated_at",
      )
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json(
        { message: "Unable to load evaluation questions." },
        { status: 500 },
      );
    }

    return NextResponse.json({ questions: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected evaluation questions API failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const body = await request.json();
    const payload = createQuestionSchema.parse(body);
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("evaluation_questions")
      .select("id")
      .eq("question_key", payload.question_key)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { message: "Unable to check question key uniqueness." },
        { status: 500 },
      );
    }

    if (existing) {
      return NextResponse.json(
        { message: "A question with this key already exists." },
        { status: 409 },
      );
    }

    const { data: inserted, error: insertError } = await adminClient
      .from("evaluation_questions")
      .insert({
        question_text: payload.question_text,
        question_type: payload.question_type,
        question_key: payload.question_key,
        is_required: payload.is_required,
        display_order: payload.display_order,
        meta: payload.meta as Json,
        is_active: payload.is_active,
        created_by: adminCheck.session.userId,
      })
      .select(
        "id, question_text, question_type, question_key, is_required, display_order, meta, is_active, created_at, updated_at",
      )
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { message: "Unable to create evaluation question." },
        { status: 500 },
      );
    }

    return NextResponse.json({ question: inserted }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected evaluation question creation failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const body = await request.json();
    const payload = updateQuestionSchema.parse(body);
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("evaluation_questions")
      .select("id, question_key")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Question not found." },
        { status: 404 },
      );
    }

    if (payload.question_key && payload.question_key !== existing.question_key) {
      const { data: conflict, error: conflictError } = await adminClient
        .from("evaluation_questions")
        .select("id")
        .eq("question_key", payload.question_key)
        .neq("id", payload.id)
        .maybeSingle();

      if (conflictError) {
        return NextResponse.json(
          { message: "Unable to verify question key uniqueness." },
          { status: 500 },
        );
      }

      if (conflict) {
        return NextResponse.json(
          { message: "A question with this key already exists." },
          { status: 409 },
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (payload.question_text !== undefined) {
      updateData.question_text = payload.question_text;
    }
    if (payload.question_type !== undefined) {
      updateData.question_type = payload.question_type;
    }
    if (payload.question_key !== undefined) {
      updateData.question_key = payload.question_key;
    }
    if (payload.is_required !== undefined) {
      updateData.is_required = payload.is_required;
    }
    if (payload.display_order !== undefined) {
      updateData.display_order = payload.display_order;
    }
    if (payload.meta !== undefined) {
      updateData.meta = payload.meta as Json;
    }
    if (payload.is_active !== undefined) {
      updateData.is_active = payload.is_active;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update." },
        { status: 400 },
      );
    }

    const { data: updated, error: updateError } = await adminClient
      .from("evaluation_questions")
      .update(updateData)
      .eq("id", payload.id)
      .select(
        "id, question_text, question_type, question_key, is_required, display_order, meta, is_active, created_at, updated_at",
      )
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { message: "Unable to update evaluation question." },
        { status: 500 },
      );
    }

    return NextResponse.json({ question: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected evaluation question update failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Question ID is required." },
        { status: 400 },
      );
    }

    const payload = deleteQuestionSchema.parse({ id });
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("evaluation_questions")
      .select("id, question_key")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Question not found." },
        { status: 404 },
      );
    }

    const { data: submissions, error: submissionsError } = await adminClient
      .from("evaluation_submissions")
      .select("id")
      .limit(1)
      .maybe();

    if (!submissionsError && submissions && submissions.length > 0) {
      const { error: deactivateError } = await adminClient
        .from("evaluation_questions")
        .update({ is_active: false })
        .eq("id", payload.id);

      if (deactivateError) {
        return NextResponse.json(
          { message: "Unable to deactivate question (has submissions)." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message: "Question has existing submissions. Deactivated instead of deleted.",
      });
    }

    const { error: deleteError } = await adminClient
      .from("evaluation_questions")
      .delete()
      .eq("id", payload.id);

    if (deleteError) {
      return NextResponse.json(
        { message: "Unable to delete evaluation question." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected evaluation question deletion failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}