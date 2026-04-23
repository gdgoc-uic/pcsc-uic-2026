import { NextResponse } from "next/server";
import { z } from "zod";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const TEMPLATE_BUCKET = "certificate-templates";
const GENERATED_BUCKET = "generated-certificates";

const templateConfigSchema = z.object({
  templateId: z.uuid(),
  textX: z.number().int().min(0),
  textY: z.number().int().min(0),
  positionX: z.number().int().min(0),
  positionY: z.number().int().min(0),
  fontSize: z.number().int().min(10).max(400),
  fontFamily: z.string().min(1).max(100),
  fontColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid hex color"),
  textAlign: z.enum(["left", "center", "right"]),
  rotation: z.number().int().min(-180).max(180).default(0),
});

const setActiveSchema = z.object({
  templateId: z.uuid(),
  action: z.literal("setActive"),
});

const updateTemplateSchema = z.object({
  action: z.literal("updateConfig"),
  config: templateConfigSchema,
});

const patchPayloadSchema = z.discriminatedUnion("action", [
  setActiveSchema,
  updateTemplateSchema,
]);

const downloadQuerySchema = z.object({
  submissionId: z.uuid(),
  email: z.email(),
});

const sanitizeFileName = (fileName: string) =>
  fileName
    .toLowerCase()
    .replaceAll(/[^a-z0-9.-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const scope = url.searchParams.get("scope");

    if (scope === "templates") {
      const adminCheck = await requireAdmin();

      if (!adminCheck.ok) {
        return NextResponse.json(
          { message: adminCheck.message },
          { status: adminCheck.status },
        );
      }

      const adminClient = createAdminSupabaseClient() as any;
      const { data, error } = await adminClient
        .from("certificate_templates")
        .select(
          "id, file_path, template_width, template_height, text_x, text_y, text_position_x, text_position_y, font_size, font_family, font_color, text_align, rotation, is_active, created_at, updated_at",
        )
        .order("created_at", { ascending: false });

      if (error) {
        return NextResponse.json(
          { message: "Unable to load certificate templates." },
          { status: 500 },
        );
      }

      const templatesWithPreview = await Promise.all(
        (data ?? []).map(
          async (template: { file_path: string } & Record<string, unknown>) => {
            const { data: signedUrlData } = await adminClient.storage
              .from(TEMPLATE_BUCKET)
              .createSignedUrl(template.file_path, 60 * 60);

            return {
              ...template,
              preview_url: signedUrlData?.signedUrl ?? null,
            };
          },
        ),
      );

      return NextResponse.json({ templates: templatesWithPreview });
    }

    const query = downloadQuerySchema.parse({
      submissionId: url.searchParams.get("submissionId"),
      email: url.searchParams.get("email"),
    });

    const normalizedEmail = query.email.trim().toLowerCase();
    const adminClient = createAdminSupabaseClient() as any;

    const { data: stakeholder, error: stakeholderError } = await adminClient
      .from("stakeholders")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("is_active", true)
      .maybeSingle();

    if (stakeholderError || !stakeholder) {
      return NextResponse.json(
        { message: "Unable to verify stakeholder email." },
        { status: 404 },
      );
    }

    const { data: submission, error: submissionError } = await adminClient
      .from("evaluation_submissions")
      .select("certificate_path")
      .eq("id", query.submissionId)
      .eq("stakeholder_id", stakeholder.id)
      .maybeSingle();

    if (submissionError || !submission?.certificate_path) {
      return NextResponse.json(
        { message: "Certificate is not available for this submission." },
        { status: 404 },
      );
    }

    const expiresIn = 60 * 60 * 24 * 7;
    const { data: signedUrlData, error: signedUrlError } =
      await adminClient.storage
        .from(GENERATED_BUCKET)
        .createSignedUrl(submission.certificate_path, expiresIn);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      return NextResponse.json(
        { message: "Unable to issue certificate download link." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      certificateUrl: signedUrlData.signedUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request query parameters.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected certificate API failure.",
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
    const formData = await request.formData();
    const file = formData.get("template");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "A template image file is required." },
        { status: 400 },
      );
    }

    const textX = Number(formData.get("textX") ?? 960);
    const textY = Number(formData.get("textY") ?? 540);
    const positionX = Number(formData.get("positionX") ?? textX);
    const positionY = Number(formData.get("positionY") ?? textY);
    const fontSize = Number(formData.get("fontSize") ?? 56);
    const fontFamily = String(formData.get("fontFamily") ?? "Arial").trim();
    const fontColor = String(formData.get("fontColor") ?? "#ffffff").trim();
    const textAlignRaw = String(formData.get("textAlign") ?? "center").trim();
    const rotation = Number(formData.get("rotation") ?? 0);

    const fileExt = file.name.includes(".")
      ? file.name.split(".").pop()
      : "png";
    const safeName = sanitizeFileName(file.name.replace(`.${fileExt}`, ""));
    const filePath = `${Date.now()}-${safeName || "template"}.${fileExt}`;

    const adminClient = createAdminSupabaseClient() as any;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    let templateWidth = 1920;
    let templateHeight = 1080;
    try {
      const metadata = await sharp(fileBuffer).metadata();
      templateWidth = metadata.width ?? 1920;
      templateHeight = metadata.height ?? 1080;
    } catch {
      // Use defaults if sharp fails
    }

    const { error: uploadError } = await adminClient.storage
      .from(TEMPLATE_BUCKET)
      .upload(filePath, fileBuffer, {
        contentType: file.type || "image/png",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { message: "Unable to upload certificate template image." },
        { status: 500 },
      );
    }

    const alignValue =
      textAlignRaw === "left" || textAlignRaw === "right"
        ? textAlignRaw
        : "center";

    const { data: insertedTemplate, error: insertError } = await adminClient
      .from("certificate_templates")
      .insert({
        file_path: filePath,
        template_width: templateWidth,
        template_height: templateHeight,
        text_x: Number.isFinite(textX) ? textX : 960,
        text_y: Number.isFinite(textY) ? textY : 540,
        text_position_x: Number.isFinite(positionX) ? positionX : 960,
        text_position_y: Number.isFinite(positionY) ? positionY : 540,
        font_size: Number.isFinite(fontSize) ? fontSize : 56,
        font_family: fontFamily || "Arial",
        font_color: fontColor || "#ffffff",
        text_align: alignValue,
        rotation: Number.isFinite(rotation) ? rotation : 0,
        is_active: false,
        created_by: adminCheck.session.userId,
      })
      .select(
        "id, file_path, template_width, template_height, text_x, text_y, text_position_x, text_position_y, font_size, font_family, font_color, text_align, rotation, is_active, created_at, updated_at",
      )
      .single();

    if (insertError || !insertedTemplate) {
      return NextResponse.json(
        { message: "Unable to save certificate template settings." },
        { status: 500 },
      );
    }

    return NextResponse.json({ template: insertedTemplate }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected certificate template upload failure.",
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
    const payload = patchPayloadSchema.parse(body);
    const adminClient = createAdminSupabaseClient() as any;

    if (payload.action === "setActive") {
      const { error: deactivateError } = await adminClient
        .from("certificate_templates")
        .update({ is_active: false })
        .neq("id", payload.templateId);

      if (deactivateError) {
        return NextResponse.json(
          { message: "Unable to deactivate previous active templates." },
          { status: 500 },
        );
      }

      const { error: activateError } = await adminClient
        .from("certificate_templates")
        .update({ is_active: true })
        .eq("id", payload.templateId);

      if (activateError) {
        return NextResponse.json(
          { message: "Unable to activate selected template." },
          { status: 500 },
        );
      }

      return NextResponse.json({ success: true });
    }

    const { config } = payload;

    const { error: updateError } = await adminClient
      .from("certificate_templates")
      .update({
        text_x: config.textX,
        text_y: config.textY,
        text_position_x: config.positionX ?? config.textX,
        text_position_y: config.positionY ?? config.textY,
        font_size: config.fontSize,
        font_family: config.fontFamily,
        font_color: config.fontColor,
        text_align: config.textAlign,
        rotation: config.rotation ?? 0,
      })
      .eq("id", config.templateId);

    if (updateError) {
      return NextResponse.json(
        { message: "Unable to update template configuration." },
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
        message: "Unexpected certificate template update failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
