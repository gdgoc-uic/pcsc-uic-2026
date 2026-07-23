import "server-only";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const TEMPLATE_BUCKET = "certificate-templates";
const GENERATED_BUCKET = "generated-certificates";

const ARIAL_FONT_PATH = path.join(process.cwd(), "public/font/Arial.ttf");
const TMP_ARIAL_FONT_PATH = "/tmp/pcsc-uic-2026-arial.ttf";

let resolvedArialFontPath: string | null = null;
let resolvingArialFontPromise: Promise<string | null> | null = null;

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

const toOrigin = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;

const getFontOriginCandidates = () => {
  const rawCandidates = [
    "https://pcsc2026.uic.edu.ph",
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
  ].filter((value): value is string => Boolean(value));

  return [...new Set(rawCandidates.map(toOrigin))];
};

const canReadFile = async (filePath: string) => {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

const downloadArialFontToTmp = async () => {
  if (await canReadFile(TMP_ARIAL_FONT_PATH)) {
    return TMP_ARIAL_FONT_PATH;
  }

  const origins = getFontOriginCandidates();

  for (const origin of origins) {
    try {
      const response = await fetch(`${origin}/font/Arial.ttf`, {
        cache: "no-store",
      });

      if (!response.ok) {
        continue;
      }

      const fontArrayBuffer = await response.arrayBuffer();
      await fs.promises.writeFile(
        TMP_ARIAL_FONT_PATH,
        Buffer.from(fontArrayBuffer),
      );

      return TMP_ARIAL_FONT_PATH;
    } catch {
      continue;
    }
  }

  return null;
};

const resolveArialFontPath = async () => {
  if (resolvedArialFontPath) {
    return resolvedArialFontPath;
  }

  if (resolvingArialFontPromise) {
    return resolvingArialFontPromise;
  }

  resolvingArialFontPromise = (async () => {
    if (await canReadFile(ARIAL_FONT_PATH)) {
      resolvedArialFontPath = ARIAL_FONT_PATH;
      return resolvedArialFontPath;
    }

    const downloadedPath = await downloadArialFontToTmp();

    if (downloadedPath) {
      resolvedArialFontPath = downloadedPath;
      return resolvedArialFontPath;
    }

    return null;
  })();

  try {
    return await resolvingArialFontPromise;
  } finally {
    resolvingArialFontPromise = null;
  }
};

const getTextAnchorOffsetX = (
  width: number,
  textAlign: ActiveTemplate["text_align"],
) => {
  if (textAlign === "center") {
    return width / 2;
  }

  if (textAlign === "right") {
    return width;
  }

  return 0;
};

const cropOverlayToBounds = async (params: {
  input: Buffer;
  inputWidth: number;
  inputHeight: number;
  left: number;
  top: number;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  const clampedLeft = Math.max(0, params.left);
  const clampedTop = Math.max(0, params.top);

  const extractLeft = Math.max(0, -params.left);
  const extractTop = Math.max(0, -params.top);

  const remainingWidth = params.inputWidth - extractLeft;
  const remainingHeight = params.inputHeight - extractTop;

  const maxVisibleWidth = params.canvasWidth - clampedLeft;
  const maxVisibleHeight = params.canvasHeight - clampedTop;

  const extractWidth = Math.min(remainingWidth, maxVisibleWidth);
  const extractHeight = Math.min(remainingHeight, maxVisibleHeight);

  if (extractWidth <= 0 || extractHeight <= 0) {
    return null;
  }

  if (
    extractLeft === 0 &&
    extractTop === 0 &&
    extractWidth === params.inputWidth &&
    extractHeight === params.inputHeight
  ) {
    return {
      input: params.input,
      left: clampedLeft,
      top: clampedTop,
    };
  }

  const croppedOverlay = await sharp(params.input)
    .extract({
      left: extractLeft,
      top: extractTop,
      width: extractWidth,
      height: extractHeight,
    })
    .png()
    .toBuffer();

  return {
    input: croppedOverlay,
    left: clampedLeft,
    top: clampedTop,
  };
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

const createOverlay = async (params: {
  width: number;
  height: number;
  name: string;
  template: ActiveTemplate;
  arialFontPath: string | null;
}) => {
  const x = params.template.text_position_x ?? params.template.text_x;
  const y = params.template.text_position_y ?? params.template.text_y;
  const rotation = -(params.template.rotation ?? 0);
  const fontSize = Math.max(8, Math.round(params.template.font_size ?? 48));
  const escapedName = escapeXml(params.name);
  const fontColor = params.template.font_color?.trim() || "#000000";

  const fontFamily = params.arialFontPath ? "Arial" : "sans";

  const textOptions: sharp.CreateText = {
    text: `<span foreground="${escapeXml(fontColor)}">${escapedName}</span>`,
    rgba: true,
    align: "left",
    font: `${fontFamily} ${fontSize}`,
    dpi: 72,
  };

  if (params.arialFontPath) {
    textOptions.fontfile = params.arialFontPath;
  }

  const { data: textBuffer, info: textInfo } = await sharp({
    text: textOptions,
  })
    .png()
    .toBuffer({ resolveWithObject: true });

  const textWidth = textInfo.width;
  const textHeight = textInfo.height;

  if (!textWidth || !textHeight) {
    throw new Error("Unable to render certificate text overlay.");
  }

  const diagonal = Math.ceil(Math.hypot(textWidth, textHeight));
  const overlaySize = Math.max(diagonal + 48, 64);

  const anchorX = getTextAnchorOffsetX(textWidth, params.template.text_align);
  const anchorY = textHeight / 2;
  const centerX = overlaySize / 2;
  const centerY = overlaySize / 2;

  const baseOverlay = sharp({
    create: {
      width: overlaySize,
      height: overlaySize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([
    {
      input: textBuffer,
      left: Math.round(centerX - anchorX),
      top: Math.round(centerY - anchorY),
    },
  ]);

  const rotatedOverlay =
    rotation !== 0
      ? baseOverlay.rotate(rotation, {
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
      : baseOverlay;

  const { data: overlayBuffer, info: overlayInfo } = await rotatedOverlay
    .png()
    .toBuffer({ resolveWithObject: true });

  const overlayLeft = Math.round(x - overlayInfo.width / 2);
  const overlayTop = Math.round(y - overlayInfo.height / 2);

  const croppedOverlay = await cropOverlayToBounds({
    input: overlayBuffer,
    inputWidth: overlayInfo.width,
    inputHeight: overlayInfo.height,
    left: overlayLeft,
    top: overlayTop,
    canvasWidth: params.width,
    canvasHeight: params.height,
  });

  if (!croppedOverlay) {
    throw new Error("Rendered certificate text is outside template bounds.");
  }

  return croppedOverlay;
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
  const arialFontPath = await resolveArialFontPath();

  if (!arialFontPath) {
    console.warn(
      "Arial font file could not be resolved. Falling back to runtime available sans-serif font.",
    );
  }

  const overlay = await createOverlay({
    width,
    height,
    name: params.fullName,
    template,
    arialFontPath,
  });

  const outputBuffer = await image
    .composite([
      {
        input: overlay.input,
        top: overlay.top,
        left: overlay.left,
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
