"use client";

import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, ArrowDown, ArrowUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";
import type { QuestionType } from "@/types/evaluation";

type QuestionMeta =
  | { min: number; max: number; min_label: string; max_label: string; show_numbers: boolean }
  | { placeholder: string; max_length: number }
  | { placeholder: string; max_length: number; rows: number }
  | { options: string[]; allow_other: boolean }
  | { options: string[]; min_select: number; max_select: number };

type Question = {
  id: string;
  question_text: string;
  question_type: QuestionType;
  question_key: string;
  is_required: boolean;
  display_order: number;
  meta: QuestionMeta;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type QuestionFormData = {
  question_text: string;
  question_type: QuestionType;
  question_key: string;
  is_required: boolean;
  display_order: number;
  meta: QuestionMeta;
  is_active: boolean;
};

const defaultMetaByType: Record<QuestionType, QuestionMeta> = {
  rating: { min: 1, max: 5, min_label: "Poor", max_label: "Excellent", show_numbers: true },
  text: { placeholder: "", max_length: 500 },
  textarea: { placeholder: "", max_length: 2000, rows: 5 },
  select: { options: ["Option 1", "Option 2", "Option 3"], allow_other: false },
  multiple: { options: ["Option 1", "Option 2", "Option 3"], min_select: 0, max_select: 3 },
};

const questionTypeLabels: Record<QuestionType, string> = {
  rating: "Rating (1-5)",
  text: "Text Input",
  textarea: "Text Area",
  select: "Dropdown",
  multiple: "Multiple Choice",
};

function generateKey(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s]+/g, "")
    .replaceAll(/\s+/g, "_")
    .replaceAll(/^_+|_+$/g, "");
}

export default function AdminEvaluationQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<QuestionFormData>({
    question_text: "",
    question_type: "rating",
    question_key: "",
    is_required: false,
    display_order: 0,
    meta: defaultMetaByType.rating,
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const [previewAnswers, setPreviewAnswers] = useState<Record<string, unknown>>({});

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/evaluation-questions");
      const payload = (await response.json()) as { questions?: Question[]; message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Unable to load questions.");
        return;
      }
      setQuestions(payload.questions ?? []);
    } catch {
      setMessage("Unable to load questions right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const maxOrder = useMemo(
    () => questions.reduce((max, q) => Math.max(max, q.display_order), 0),
    [questions],
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      question_text: "",
      question_type: "rating",
      question_key: "",
      is_required: false,
      display_order: maxOrder + 1,
      meta: defaultMetaByType.rating,
      is_active: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setFormData({
      question_text: question.question_text,
      question_type: question.question_type,
      question_key: question.question_key,
      is_required: question.is_required,
      display_order: question.display_order,
      meta: question.meta,
      is_active: question.is_active,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleTypeChange = (type: QuestionType) => {
    setFormData((prev) => ({
      ...prev,
      question_type: type,
      meta: defaultMetaByType[type],
    }));
  };

  const handleTextChange = (key: keyof QuestionFormData, value: string | boolean | number) => {
    if (key === "question_text" && typeof value === "string") {
      const autoKey = generateKey(value);
      if (!formData.question_key || formData.question_key === generateKey(formData.question_text)) {
        setFormData((prev) => ({ ...prev, question_text: value, question_key: autoKey }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleMetaChange = (path: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [path]: value },
    }));
  };

  const handleSave = async () => {
    if (!formData.question_text.trim()) {
      setMessage("Question text is required.");
      return;
    }
    if (!formData.question_key.trim()) {
      setMessage("Question key is required.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      if (editingId) {
        const response = await fetch("/api/evaluation-questions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            question_text: formData.question_text,
            question_type: formData.question_type,
            question_key: formData.question_key,
            is_required: formData.is_required,
            display_order: formData.display_order,
            meta: formData.meta,
            is_active: formData.is_active,
          }),
        });
        const payload = (await response.json()) as { message?: string };
        if (!response.ok) {
          setMessage(payload.message ?? "Failed to update question.");
          setIsSaving(false);
          return;
        }
        setMessage("Question updated.");
      } else {
        const response = await fetch("/api/evaluation-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const payload = (await response.json()) as { message?: string };
        if (!response.ok) {
          setMessage(payload.message ?? "Failed to create question.");
          setIsSaving(false);
          return;
        }
        setMessage("Question created.");
      }

      setIsEditing(false);
      setEditingId(null);
      await loadQuestions();
    } catch {
      setMessage("Failed to save question due to network error.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      const response = await fetch(`/api/evaluation-questions?id=${id}`, { method: "DELETE" });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Failed to delete question.");
        return;
      }
      setMessage(payload.message ?? "Question deleted.");
      await loadQuestions();
    } catch {
      setMessage("Failed to delete question.");
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch("/api/evaluation-questions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentActive }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Failed to toggle question.");
        return;
      }
      await loadQuestions();
    } catch {
      setMessage("Failed to toggle question.");
    }
  };

  const activeQuestions = useMemo(
    () => questions.filter((q) => q.is_active).sort((a, b) => a.display_order - b.display_order),
    [questions],
  );

  const isRatingMeta = (m: QuestionMeta): m is { min: number; max: number; min_label: string; max_label: string; show_numbers: boolean } =>
    "min" in m && "max" in m && !("options" in m);

  const isSelectMeta = (m: QuestionMeta): m is { options: string[]; allow_other: boolean } =>
    "options" in m && !("min_select" in m);

  const isMultipleMeta = (m: QuestionMeta): m is { options: string[]; min_select: number; max_select: number } =>
    "options" in m && "min_select" in m;

  const isTextMeta = (m: QuestionMeta): m is { placeholder: string; max_length: number } =>
    "max_length" in m && !("rows" in m);

  const isTextareaMeta = (m: QuestionMeta): m is { placeholder: string; max_length: number; rows: number } =>
    "rows" in m;

  const getMetaValue = <T,>(m: QuestionMeta, key: string, fallback: T): T => {
    const val = (m as Record<string, unknown>)[key];
    return val !== undefined ? (val as T) : fallback;
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Evaluation Questions"
        description="Manage the feedback form questions. Configure types, required fields, and preview how they appear to stakeholders."
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <nav className="flex gap-2 mb-2">
          <a
            href="/admin/certificates"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Certificates
          </a>
          <a
            href="/admin/questions"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700"
          >
            Questions
          </a>
          <a
            href="/admin/stakeholders"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Stakeholders
          </a>
          <a
            href="/admin/results"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Results
          </a>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">Questions</h2>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100"
          >
            <Plus className="h-4 w-4" /> Add Question
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
            No questions configured yet. Click "Add Question" to create one.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80">All Questions</h3>
              {questions
                .slice()
                .sort((a, b) => a.display_order - b.display_order)
                .map((question) => (
                  <article
                    key={question.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      editingId === question.id
                        ? "border-white bg-brick-red-800/50"
                        : "border-brick-red-600 bg-brick-red-800/30 hover:border-brick-red-500"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white truncate">
                            {question.question_text}
                          </span>
                          <span className="shrink-0 rounded-full bg-brick-red-700/50 border border-brick-red-500/50 px-2 py-0.5 text-xs text-white/80">
                            {questionTypeLabels[question.question_type]}
                          </span>
                          {question.is_required && (
                            <span className="shrink-0 rounded-full bg-rose-600/30 border border-rose-400/50 px-2 py-0.5 text-xs text-rose-100">
                              Required
                            </span>
                          )}
                          {!question.is_active && (
                            <span className="shrink-0 rounded-full bg-white/10 border border-white/30 px-2 py-0.5 text-xs text-white/60">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/50 font-mono">{question.question_key}</p>
                        <p className="text-xs text-white/40 mt-1">Order: {question.display_order}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(question.id, question.is_active)}
                          className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
                          title={question.is_active ? "Deactivate" : "Activate"}
                        >
                          {question.is_active ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(question)}
                          className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(question.id)}
                          className="rounded-md p-1.5 text-rose-400 hover:bg-rose-600/20"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80">Live Preview</h3>
              <div className="rounded-xl border border-brick-red-600 bg-brick-red-900/40 p-5 space-y-5">
                <p className="text-xs text-white/60 italic">
                  This is a preview of how the evaluation form appears to stakeholders.
                </p>

                <div>
                  <p className="text-sm text-white/90 mb-1">Full Name (for certificate)</p>
                  <input
                    type="text"
                    value="Jane Doe"
                    readOnly
                    className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white/90"
                  />
                </div>

                {activeQuestions.length === 0 ? (
                  <p className="text-sm text-white/50">No active questions to display.</p>
                ) : (
                  activeQuestions.map((question) => (
                    <div key={question.id} className="space-y-2">
                      <p className="text-sm text-white">
                        {question.question_text}
                        {question.is_required && <span className="text-rose-400 ml-1">*</span>}
                      </p>

                      {question.question_type === "rating" && isRatingMeta(question.meta) && (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: (question.meta as { max: number }).max - (question.meta as { min: number }).min + 1 }, (_, i) => i + (question.meta as { min: number }).min).map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() =>
                                  setPreviewAnswers((prev) => ({ ...prev, [question.question_key]: n }))
                                }
                                className={`h-10 w-10 rounded-md border text-sm font-semibold transition-colors ${
                                  previewAnswers[question.question_key] === n
                                    ? "border-white bg-white text-brick-red-700"
                                    : "border-brick-red-500 bg-brick-red-800/60 text-white hover:bg-brick-red-700"
                                }`}
                              >
                                {(question.meta as { show_numbers: boolean }).show_numbers ? n : ""}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-white/60">
                            <span>{(question.meta as { min_label: string }).min_label}</span>
                            <span>{(question.meta as { max_label: string }).max_label}</span>
                          </div>
                        </div>
                      )}

                      {question.question_type === "text" && isTextMeta(question.meta) && (
                        <input
                          type="text"
                          placeholder={(question.meta as { placeholder: string }).placeholder || "Enter your answer..."}
                          maxLength={(question.meta as { max_length: number }).max_length}
                          className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white placeholder:text-white/40"
                        />
                      )}

                      {question.question_type === "textarea" && isTextareaMeta(question.meta) && (
                        <textarea
                          placeholder={(question.meta as { placeholder: string }).placeholder || "Enter your answer..."}
                          maxLength={(question.meta as { max_length: number }).max_length}
                          rows={(question.meta as { rows: number }).rows}
                          className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white placeholder:text-white/40"
                        />
                      )}

                      {question.question_type === "select" && isSelectMeta(question.meta) && (
                        <select className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white">
                          <option value="">Select an option...</option>
                          {(question.meta as { options: string[] }).options.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {question.question_type === "multiple" && isMultipleMeta(question.meta) && (
                        <div className="space-y-2">
                          {(question.meta as { options: string[] }).options.map((opt: string) => (
                            <label
                              key={opt}
                              className="flex items-center gap-2 rounded-md border border-brick-red-600 bg-brick-red-800/30 px-3 py-2 cursor-pointer hover:bg-brick-red-700/30"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                              />
                              <span className="text-sm text-white">{opt}</span>
                            </label>
                          ))}
                          <p className="text-xs text-white/50">
                            Select up to {(question.meta as { max_select: number }).max_select} option(s)
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}

                <div>
                  <p className="text-sm text-white/90 mb-1">Additional Feedback</p>
                  <textarea
                    rows={4}
                    placeholder="Share your feedback and recommendations."
                    className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {isEditing && (
          <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5 sm:p-6 space-y-5">
            <h2 className="text-lg font-bold text-white">
              {editingId ? "Edit Question" : "Add New Question"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="q-text"
                  className="block text-sm text-white/90 mb-1"
                >
                  Question Text <span className="text-rose-400">*</span>
                </label>
                <input
                  id="q-text"
                  type="text"
                  value={formData.question_text}
                  onChange={(e) => handleTextChange("question_text", e.target.value)}
                  className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
                  placeholder="e.g., Overall conference experience"
                />
              </div>

              <div>
                <label
                  htmlFor="q-type"
                  className="block text-sm text-white/90 mb-1"
                >
                  Question Type
                </label>
                <select
                  id="q-type"
                  value={formData.question_type}
                  onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
                  className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
                >
                  {(Object.keys(questionTypeLabels) as QuestionType[]).map((type) => (
                    <option key={type} value={type}>
                      {questionTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="q-key"
                  className="block text-sm text-white/90 mb-1"
                >
                  Question Key <span className="text-rose-400">*</span>
                </label>
                <input
                  id="q-key"
                  type="text"
                  value={formData.question_key}
                  onChange={(e) => handleTextChange("question_key", e.target.value)}
                  className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white font-mono text-sm"
                  placeholder="e.g., overall_experience"
                />
              </div>

              <div>
                <label
                  htmlFor="q-order"
                  className="block text-sm text-white/90 mb-1"
                >
                  Display Order
                </label>
                <input
                  id="q-order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleTextChange("display_order", Number(e.target.value))}
                  className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_required}
                    onChange={(e) => handleTextChange("is_required", e.target.checked)}
                    className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                  />
                  <span className="text-sm text-white">Required</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => handleTextChange("is_active", e.target.checked)}
                    className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                  />
                  <span className="text-sm text-white">Active</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-brick-red-600 bg-brick-red-900/50 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-white">Meta Configuration</h3>

              {formData.question_type === "rating" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Min Value</label>
                      <input
                        type="number"
                        value={(formData.meta as { min: number }).min}
                        onChange={(e) => handleMetaChange("min", Number(e.target.value))}
                        className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Max Value</label>
                      <input
                        type="number"
                        value={(formData.meta as { max: number }).max}
                        onChange={(e) => handleMetaChange("max", Number(e.target.value))}
                        className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Min Label</label>
                    <input
                      type="text"
                      value={(formData.meta as { min_label: string }).min_label}
                      onChange={(e) => handleMetaChange("min_label", e.target.value)}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Max Label</label>
                    <input
                      type="text"
                      value={(formData.meta as { max_label: string }).max_label}
                      onChange={(e) => handleMetaChange("max_label", e.target.value)}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.meta as { show_numbers: boolean }).show_numbers}
                        onChange={(e) => handleMetaChange("show_numbers", e.target.checked)}
                        className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                      />
                      <span className="text-sm text-white">Show numbers on buttons</span>
                    </label>
                  </div>
                </div>
              )}

              {(formData.question_type === "text" || formData.question_type === "textarea") && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-white/70 mb-1">Placeholder</label>
                    <input
                      type="text"
                      value={(formData.meta as { placeholder: string }).placeholder}
                      onChange={(e) => handleMetaChange("placeholder", e.target.value)}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                      placeholder="Enter placeholder text..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Max Length</label>
                    <input
                      type="number"
                      value={(formData.meta as { max_length: number }).max_length}
                      onChange={(e) => handleMetaChange("max_length", Number(e.target.value))}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                    />
                  </div>
                  {formData.question_type === "textarea" && (
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Rows</label>
                      <input
                        type="number"
                        value={(formData.meta as { rows: number }).rows}
                        onChange={(e) => handleMetaChange("rows", Number(e.target.value))}
                        className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {(formData.question_type === "select" || formData.question_type === "multiple") && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Options (one per line)</label>
                    <textarea
                      value={(formData.meta as { options: string[] }).options.join("\n")}
                      onChange={(e) =>
                        handleMetaChange(
                          "options",
                          e.target.value.split("\n").filter((line) => line.trim()),
                        )
                      }
                      rows={4}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white font-mono"
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                  {formData.question_type === "select" && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.meta as { allow_other: boolean }).allow_other}
                        onChange={(e) => handleMetaChange("allow_other", e.target.checked)}
                        className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                      />
                      <span className="text-sm text-white">Allow "Other" option</span>
                    </label>
                  )}
                  {formData.question_type === "multiple" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Min Select</label>
                        <input
                          type="number"
                          value={(formData.meta as { min_select: number }).min_select}
                          onChange={(e) => handleMetaChange("min_select", Number(e.target.value))}
                          className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Max Select</label>
                        <input
                          type="number"
                          value={(formData.meta as { max_select: number }).max_select}
                          onChange={(e) => handleMetaChange("max_select", Number(e.target.value))}
                          className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-2.5 py-1.5 text-sm text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {editingId ? "Save Changes" : "Create Question"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="rounded-lg border border-brick-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brick-red-800 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </section>
        )}

        {message ? <p className="text-sm text-white/85">{message}</p> : null}
      </div>
    </main>
  );
}