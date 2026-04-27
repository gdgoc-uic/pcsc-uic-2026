"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";
import { TemplateBuilder } from "@/app/components/admin/TemplateBuilder";
import { normalizeHexColor } from "@/lib/utils/color";

type Template = {
  id: string;
  file_path: string;
  preview_url: string | null;
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type TemplateConfigDraft = {
  templateWidth: number;
  templateHeight: number;
  textX: number;
  textY: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  textAlign: "left" | "center" | "right";
  rotation: number;
  previewUrl?: string;
};

export default function AdminCertificatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [drafts, setDrafts] = useState<Record<string, TemplateConfigDraft>>({});
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [uploadConfig, setUploadConfig] = useState<TemplateConfigDraft>({
    templateWidth: 1920,
    templateHeight: 1080,
    textX: 960,
    textY: 540,
    fontSize: 56,
    fontFamily: "Arial",
    fontColor: "#ffffff",
    textAlign: "center",
    rotation: 0,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [updatingTemplateId, setUpdatingTemplateId] = useState<string | null>(
    null,
  );
  const [builderKey, setBuilderKey] = useState(0);

  const hasTemplates = useMemo(() => templates.length > 0, [templates]);

  const handleLoadTemplates = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/certificate?scope=templates");
      const payload = (await response.json()) as {
        templates?: Template[];
        message?: string;
      };

      if (!response.ok) {
        setMessage(payload.message ?? "Unable to load templates.");
        setIsLoading(false);
        return;
      }

      const loadedTemplates = payload.templates ?? [];
      setTemplates(loadedTemplates);

      const nextDrafts: Record<string, TemplateConfigDraft> = {};
      for (const template of loadedTemplates) {
        nextDrafts[template.id] = {
          templateWidth: template.template_width || 1920,
          templateHeight: template.template_height || 1080,
          textX: template.text_position_x || template.text_x,
          textY: template.text_position_y || template.text_y,
          fontSize: template.font_size,
          fontFamily: template.font_family,
          fontColor: normalizeHexColor(template.font_color),
          textAlign: template.text_align,
          rotation: template.rotation || 0,
          previewUrl: template.preview_url || undefined,
        };
      }
      setDrafts(nextDrafts);
    } catch {
      setMessage("Unable to load templates right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void handleLoadTemplates();
  }, [handleLoadTemplates]);

  const handleUploadTemplate = async () => {
    if (!templateFile) {
      setMessage("Please choose a template image file.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("template", templateFile);
      formData.append("textX", String(uploadConfig.textX));
      formData.append("textY", String(uploadConfig.textY));
      formData.append("positionX", String(uploadConfig.textX));
      formData.append("positionY", String(uploadConfig.textY));
      formData.append("fontSize", String(uploadConfig.fontSize));
      formData.append("fontFamily", uploadConfig.fontFamily);
      formData.append("fontColor", uploadConfig.fontColor);
      formData.append("textAlign", uploadConfig.textAlign);
      formData.append("rotation", String(uploadConfig.rotation || 0));

      const response = await fetch("/api/certificate", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        setMessage(payload.message ?? "Template upload failed.");
        return;
      }

      setTemplateFile(null);
      setMessage("Template uploaded successfully.");
      await handleLoadTemplates();
    } catch {
      setMessage("Template upload failed due to network error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetActive = async (templateId: string) => {
    setUpdatingTemplateId(templateId);

    try {
      const response = await fetch("/api/certificate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "setActive",
          templateId,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(payload.message ?? "Unable to set active template.");
        return;
      }

      setMessage("Template activated.");
      await handleLoadTemplates();
    } catch {
      setMessage("Unable to set active template.");
    } finally {
      setUpdatingTemplateId(null);
    }
  };

  const handleUpdateTemplate = async (templateId: string) => {
    const draft = drafts[templateId];

    if (!draft) {
      setMessage("Template draft data is missing.");
      return;
    }

    setUpdatingTemplateId(templateId);

    try {
      const response = await fetch("/api/certificate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateConfig",
          config: {
            templateId,
            textX: Number(draft.textX),
            textY: Number(draft.textY),
            positionX: Number(draft.textX),
            positionY: Number(draft.textY),
            fontSize: Number(draft.fontSize),
            fontFamily: draft.fontFamily,
            fontColor: draft.fontColor,
            textAlign: draft.textAlign,
            rotation: draft.rotation || 0,
          },
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(payload.message ?? "Unable to update template config.");
        return;
      }

      setMessage("Template configuration updated.");
      await handleLoadTemplates();
    } catch {
      setMessage("Unable to update template config.");
    } finally {
      setUpdatingTemplateId(null);
    }
  };

  const updateDraft = (
    templateId: string,
    key: keyof TemplateConfigDraft,
    value: string,
  ) => {
    setDrafts((current) => {
      const currentDraft = current[templateId];
      if (!currentDraft) {
        return current;
      }

      return {
        ...current,
        [templateId]: {
          ...currentDraft,
          [key]:
            key === "textX" || key === "textY" || key === "fontSize"
              ? Number(value)
              : value,
        },
      };
    });
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Certificate Templates"
        description="Upload and configure certificate templates. Name placement uses X/Y coordinates and font settings."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <nav className="flex gap-2 mb-2">
          <a
            href="/admin/certificates"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700"
          >
            Certificates
          </a>
          <a
            href="/admin/questions"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Questions
          </a>
          <a
            href="/admin/stakeholders"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Participants
          </a>
          <a
            href="/admin/results"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Results
          </a>
        </nav>

        <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Upload New Template</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                className="block text-sm text-white/90 mb-1"
                htmlFor="template-file"
              >
                Template Image (PNG/JPG)
              </label>
              <input
                id="template-file"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setTemplateFile(file);
                  if (file) {
                    const objectUrl = URL.createObjectURL(file);
                    setPreviewUrl(objectUrl);
                    const img = new Image();
                    img.onload = () => {
                      setUploadConfig((current) => ({
                        ...current,
                        templateWidth: img.width || 1920,
                        templateHeight: img.height || 1080,
                        textX: Math.round(img.width / 2),
                        textY: Math.round(img.height / 2),
                      }));
                    };
                    img.src = objectUrl;
                  }
                }}
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              />
            </div>
          </div>

          {templateFile && (
            <div className="mt-4">
              <TemplateBuilder
                initialConfig={{ ...uploadConfig, previewUrl }}
                onConfigChange={(config) => setUploadConfig(config)}
                previewSample="Your Name Here"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleUploadTemplate}
            disabled={isUploading || !templateFile}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Upload Template
          </button>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Existing Templates</h2>

          {isLoading ? (
            <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-5 text-white/90">
              Loading templates...
            </div>
          ) : null}

          {!isLoading && !hasTemplates ? (
            <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-5 text-white/90">
              No templates uploaded yet.
            </div>
          ) : null}

          {templates.map((template) => {
            const draft = drafts[template.id];
            if (!draft) {
              return null;
            }

            return (
              <article
                key={template.id}
                className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-white/85 break-all">
                    {template.file_path}
                  </p>
                  <div className="flex gap-2">
                    {template.is_active ? (
                      <span className="rounded-full bg-emerald-600/30 border border-emerald-400/50 px-3 py-1 text-xs font-semibold text-emerald-100">
                        Active
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => handleSetActive(template.id)}
                      disabled={updatingTemplateId === template.id}
                      className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
                    >
                      Set Active
                    </button>
                  </div>
                </div>

                {template.preview_url ? (
                  <img
                    src={template.preview_url}
                    alt="Certificate template preview"
                    className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/40"
                  />
                ) : null}

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor={`template-${template.id}-text-x`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Text X
                    </label>
                    <input
                      id={`template-${template.id}-text-x`}
                      type="number"
                      value={draft.textX}
                      onChange={(event) =>
                        updateDraft(template.id, "textX", event.target.value)
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`template-${template.id}-text-y`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Text Y
                    </label>
                    <input
                      id={`template-${template.id}-text-y`}
                      type="number"
                      value={draft.textY}
                      onChange={(event) =>
                        updateDraft(template.id, "textY", event.target.value)
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`template-${template.id}-font-size`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Font Size
                    </label>
                    <input
                      id={`template-${template.id}-font-size`}
                      type="number"
                      value={draft.fontSize}
                      onChange={(event) =>
                        updateDraft(template.id, "fontSize", event.target.value)
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`template-${template.id}-font-family`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Font Family
                    </label>
                    <input
                      id={`template-${template.id}-font-family`}
                      type="text"
                      value={draft.fontFamily}
                      onChange={(event) =>
                        updateDraft(
                          template.id,
                          "fontFamily",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`template-${template.id}-font-color`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Font Color
                    </label>
                    <input
                      id={`template-${template.id}-font-color`}
                      type="text"
                      value={draft.fontColor}
                      onChange={(event) =>
                        updateDraft(
                          template.id,
                          "fontColor",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`template-${template.id}-text-align`}
                      className="block text-xs text-white/85 mb-1"
                    >
                      Text Align
                    </label>
                    <select
                      id={`template-${template.id}-text-align`}
                      value={draft.textAlign}
                      onChange={(event) =>
                        updateDraft(
                          template.id,
                          "textAlign",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleUpdateTemplate(template.id)}
                  disabled={updatingTemplateId === template.id}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
                >
                  {updatingTemplateId === template.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Save Config
                </button>
              </article>
            );
          })}
        </section>

        {message ? <p className="text-sm text-white/85">{message}</p> : null}
      </div>
    </main>
  );
}
