import "server-only";
import sharp from "sharp";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const TEMPLATE_BUCKET = "certificate-templates";
const GENERATED_BUCKET = "generated-certificates";

type ActiveTemplate = {
  id: string;
  file_path: string;
  template_width: number;
  template_height: number;
  text_x: number;
  text_y: number;
  text_position_x: number;
  text_position_y: number;
  font_size: number;
  font_family: string;
  font_color: string;
  text_align: "left" | "center" | "right";
  rotation: number;
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const buildTextAnchor = (textAlign: ActiveTemplate["text_align"]) => {
  if (textAlign === "center") {
    return "middle";
  }

  if (textAlign === "right") {
    return "end";
  }

  return "start";
};

const getActiveTemplate = async () => {
  const adminClient = createAdminSupabaseClient();

  const { data, error } = await adminClient
    .from("certificate_templates")
    .select(
      "id, file_path, template_width, template_height, text_x, text_y, text_position_x, text_position_y, font_size, font_family, font_color, text_align, rotation",
    )
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load active certificate template: ${error.message}`,
    );
  }

  if (!data) {
    throw new Error("No active certificate template configured.");
  }

  return data as ActiveTemplate;
};

const createOverlay = (params: {
  width: number;
  height: number;
  name: string;
  template: ActiveTemplate;
}) => {
  const safeName = escapeXml(params.name);
  const x = params.template.text_position_x ?? params.template.text_x;
  const y = params.template.text_position_y ?? params.template.text_y;
  const rotation = params.template.rotation ?? 0;
  const rotationAttr = rotation !== 0 
    ? `\n        transform="rotate(${-rotation} ${x} ${y})"`
    : "";

  return Buffer.from(
    `<svg width="${params.width}" height="${params.height}" xmlns="http://www.w3.org/2000/svg">\n      <text\n        x="${x}"\n        y="${y}"\n        fill="${params.template.font_color}"\n        font-size="${params.template.font_size}"\n        font-family="${escapeXml(params.template.font_family)}"\n        text-anchor="${buildTextAnchor(params.template.text_align)}"\n        dominant-baseline="middle"${rotationAttr}\n      >${safeName}</text>\n    </svg>`,
  );
};

export const generateCertificateForSubmission = async (params: {
  submissionId: string;
  stakeholderId: string;
  fullName: string;
}) => {
  const adminClient = createAdminSupabaseClient();
  const template = await getActiveTemplate();

  const { data: templateObject, error: templateError } =
    await adminClient.storage
      .from(TEMPLATE_BUCKET)
      .download(template.file_path);

  if (templateError || !templateObject) {
    throw new Error("Unable to download the active certificate template.");
  }

  const templateArrayBuffer = await templateObject.arrayBuffer();
  const templateBuffer = Buffer.from(templateArrayBuffer);
  const image = sharp(templateBuffer);
  const metadata = await image.metadata();

  const width = metadata.width ?? 1920;
  const height = metadata.height ?? 1080;

  const outputBuffer = await image
    .composite([
      {
        input: createOverlay({
          width,
          height,
          name: params.fullName,
          template,
        }),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  const outputPath = `${params.stakeholderId}/${params.submissionId}.png`;

  const { error: uploadError } = await adminClient.storage
    .from(GENERATED_BUCKET)
    .upload(outputPath, outputBuffer, {
      cacheControl: "3600",
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    throw new Error("Unable to upload generated certificate image.");
  }

  const expiresIn = 60 * 60 * 24 * 30;
  const { data: signedUrlData, error: signedUrlError } =
    await adminClient.storage
      .from(GENERATED_BUCKET)
      .createSignedUrl(outputPath, expiresIn);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    throw new Error("Unable to create certificate download URL.");
  }

  const { error: insertError } = await adminClient
    .from("generated_certificates")
    .upsert(
      {
        submission_id: params.submissionId,
        stakeholder_id: params.stakeholderId,
        template_id: template.id,
        file_path: outputPath,
        signed_download_url: signedUrlData.signedUrl,
      },
      { onConflict: "submission_id" },
    );

  if (insertError) {
    throw new Error("Unable to save generated certificate metadata.");
  }

  return {
    certificatePath: outputPath,
    certificateUrl: signedUrlData.signedUrl,
    templateId: template.id,
  };
};
