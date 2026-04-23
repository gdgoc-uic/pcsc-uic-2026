"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
};

type ValidationResult = {
  allowed: boolean;
  alreadySubmitted: boolean;
  existingSubmissionId?: string | null;
  existingCertificateUrl?: string | null;
  message?: string;
  stakeholder?: {
    fullName: string;
  };
};

type SubmissionResult = {
  success?: boolean;
  submissionId?: string;
  certificateUrl?: string;
  message?: string;
  detail?: string;
};

type FormAnswers = Record<string, unknown>;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const ratingMeta = (m: QuestionMeta): m is { min: number; max: number; min_label: string; max_label: string; show_numbers: boolean } =>
  "min" in m && "max" in m && !("options" in m);

const textMeta = (m: QuestionMeta): m is { placeholder: string; max_length: number } =>
  "max_length" in m && !("rows" in m);

const textareaMeta = (m: QuestionMeta): m is { placeholder: string; max_length: number; rows: number } =>
  "rows" in m;

const selectMeta = (m: QuestionMeta): m is { options: string[]; allow_other: boolean } =>
  "options" in m && !("min_select" in m);

const multipleMeta = (m: QuestionMeta): m is { options: string[]; min_select: number; max_select: number } =>
  "options" in m && "min_select" in m;

export default function EvaluationPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  const [email, setEmail] = useState("");
  const [stakeholderName, setStakeholderName] = useState("");
  const [answers, setAnswers] = useState<FormAnswers>({});

  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/evaluation?scope=questions");
        const payload = (await response.json()) as { questions?: Question[] };
        if (response.ok && payload.questions) {
          setQuestions(payload.questions);
        }
      } catch {
        setStatusMessage("Unable to load evaluation questions.");
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    void fetchQuestions();
  }, []);

  const canSubmit = useMemo(() => {
    if (!validationResult?.allowed || validationResult.alreadySubmitted) {
      return false;
    }

    for (const question of questions) {
      if (question.is_required) {
        const answer = answers[question.question_key];
        if (answer === undefined || answer === null || answer === "") {
          return false;
        }
        if (Array.isArray(answer) && answer.length === 0) {
          return false;
        }
      }
    }

    return true;
  }, [validationResult, questions, answers]);

  const handleValidateEmail = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      setStatusMessage("Please provide a valid stakeholder email address.");
      return;
    }

    setIsValidating(true);
    setStatusMessage("");
    setSubmissionResult(null);

    try {
      const response = await fetch("/api/evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intent: "validate", email: trimmedEmail }),
      });

      const result = (await response.json()) as ValidationResult;
      setValidationResult(result);

      if (result.allowed && result.stakeholder?.fullName) {
        setStakeholderName(result.stakeholder.fullName);
      }

      if (!result.allowed) {
        setStatusMessage(
          result.message ?? "This email is not in the stakeholder list.",
        );
        return;
      }

      if (result.alreadySubmitted) {
        setStakeholderName(result.stakeholder?.fullName ?? "");
        const params = new URLSearchParams({
          email: trimmedEmail,
          name: result.stakeholder?.fullName ?? "",
        });
        if (result.existingCertificateUrl) {
          params.set("certificateUrl", result.existingCertificateUrl);
        }
        router.push(`/evaluation/certificate-preview?${params.toString()}`);
        return;
      }

      setStatusMessage("Email validated. You may now submit your feedback.");
    } catch {
      setStatusMessage("Unable to validate this email right now.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmitEvaluation = async () => {
    if (!canSubmit) {
      setStatusMessage(
        "Please complete the required fields before submitting.",
      );
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "submit",
          email: email.trim().toLowerCase(),
          fullName: stakeholderName,
          answers,
        }),
      });

      const result = (await response.json()) as SubmissionResult;

      if (!response.ok && response.status !== 202) {
        setStatusMessage(result.message ?? "Unable to submit your evaluation.");
        return;
      }

      setSubmissionResult(result);

      const params = new URLSearchParams({
        submissionId: result.submissionId ?? "",
        email: email.trim().toLowerCase(),
        name: stakeholderName,
        new: "true",
      });
      if (result.certificateUrl) {
        params.set("certificateUrl", result.certificateUrl);
      }
      router.push(`/evaluation/certificate-preview?${params.toString()}`);
    } catch {
      setStatusMessage("Submission failed due to a network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerChange = (questionKey: string, value: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const getAnswerValue = (questionKey: string): unknown => {
    return answers[questionKey];
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Stakeholder Evaluation"
        description="Submit your conference feedback. After successful submission, your certificate will be generated automatically."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">
            Step 1: Validate stakeholder email
          </h2>
          <p className="text-sm text-white/80">
            Only preloaded stakeholder emails are allowed to submit.
          </p>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label
                htmlFor="stakeholder-email"
                className="block text-sm text-white/90 mb-1"
              >
                Stakeholder Email
              </label>
              <input
                id="stakeholder-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="name@example.com"
                aria-label="Stakeholder email"
              />
            </div>
            <button
              type="button"
              onClick={handleValidateEmail}
              disabled={isValidating}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
            >
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Validate
            </button>
          </div>

          
        </section>

        {validationResult?.allowed && !validationResult.alreadySubmitted ? (
          <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-5 sm:p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">
              Step 2: Submit feedback
            </h2>

            

            {isLoadingQuestions ? (
              <div className="py-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-white/60" />
                <p className="text-sm text-white/60">Loading questions...</p>
              </div>
            ) : questions.length === 0 ? (
              <div className="rounded-lg border border-brick-red-600 bg-brick-red-900/40 p-4 text-white/80">
                No evaluation questions configured. Please contact an administrator.
              </div>
            ) : (
              <div className="space-y-5">
                {questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <p className="text-sm text-white">
                      {question.question_text}
                      {question.is_required && (
                        <span className="text-rose-400 ml-1">*</span>
                      )}
                    </p>

                    {question.question_type === "rating" &&
                      ratingMeta(question.meta) && (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {Array.from(
                              {
                                length:
                                  (question.meta as { max: number }).max - (question.meta as { min: number }).min + 1,
                              },
                              (_, i) => i + (question.meta as { min: number }).min,
                            ).map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() =>
                                  handleAnswerChange(question.question_key, n)
                                }
                                className={`h-9 w-9 rounded-md border text-sm font-semibold transition-colors ${
                                  getAnswerValue(question.question_key) === n
                                    ? "border-white bg-white text-brick-red-700"
                                    : "border-brick-red-500 bg-brick-red-800/60 text-white hover:bg-brick-red-700"
                                }`}
                                aria-label={`Rate ${n} for ${question.question_text}`}
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

                    {question.question_type === "text" &&
                      textMeta(question.meta) && (
                        <input
                          type="text"
                          value={
                            getAnswerValue(question.question_key) as string
                          }
                          onChange={(e) =>
                            handleAnswerChange(
                              question.question_key,
                              e.target.value,
                            )
                          }
                          placeholder={
                            (question.meta as { placeholder: string }).placeholder ||
                            "Enter your answer..."
                          }
                          maxLength={(question.meta as { max_length: number }).max_length}
                          className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-white/40"
                        />
                      )}

                    {question.question_type === "textarea" &&
                      textareaMeta(question.meta) && (
                        <textarea
                          value={
                            getAnswerValue(question.question_key) as string
                          }
                          onChange={(e) =>
                            handleAnswerChange(
                              question.question_key,
                              e.target.value,
                            )
                          }
                          placeholder={
                            (question.meta as { placeholder: string }).placeholder ||
                            "Enter your answer..."
                          }
                          maxLength={(question.meta as { max_length: number }).max_length}
                          rows={(question.meta as { rows: number }).rows}
                          className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-white/40"
                        />
                      )}

                    {question.question_type === "select" &&
                      selectMeta(question.meta) && (
                        <select
                          value={
                            getAnswerValue(question.question_key) as string
                          }
                          onChange={(e) =>
                            handleAnswerChange(
                              question.question_key,
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
                        >
                          <option value="">Select an option...</option>
                          {(question.meta as { options: string[] }).options.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                          {(question.meta as { allow_other: boolean }).allow_other && (
                            <option value="__other__">Other</option>
                          )}
                        </select>
                      )}

                    {question.question_type === "multiple" &&
                      multipleMeta(question.meta) && (
                        <div className="space-y-2">
                          {(question.meta as { options: string[] }).options.map((opt: string) => {
                            const current = getAnswerValue(
                              question.question_key,
                            ) as string[];
                            const isChecked =
                              Array.isArray(current) &&
                              current.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 rounded-md border border-brick-red-600 bg-brick-red-800/30 px-3 py-2.5 cursor-pointer hover:bg-brick-red-700/30"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const newValue = Array.isArray(current)
                                      ? [...current]
                                      : [];
                                    if (e.target.checked) {
                                      if (
                                        newValue.length <
                                        (question.meta as { max_select: number }).max_select
                                      ) {
                                        newValue.push(opt);
                                      }
                                    } else {
                                      const idx = newValue.indexOf(opt);
                                      if (idx > -1) {
                                        newValue.splice(idx, 1);
                                      }
                                    }
                                    handleAnswerChange(
                                      question.question_key,
                                      newValue,
                                    );
                                  }}
                                  disabled={
                                    !isChecked &&
                                    (getAnswerValue(question.question_key) as string[])
                                      ?.length >=
                                      (question.meta as { max_select: number }).max_select
                                  }
                                  className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white disabled:opacity-50"
                                />
                                <span className="text-sm text-white">{opt}</span>
                              </label>
                            );
                          })}
                          <p className="text-xs text-white/50">
                            Select 1-{(question.meta as { max_select: number }).max_select} option(s)
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitEvaluation}
              disabled={!canSubmit || isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Submit Evaluation
            </button>
          </section>
        ) : null}

        {submissionResult?.submissionId ? (
          <section className="rounded-xl border border-emerald-500/40 bg-emerald-600/20 p-5 sm:p-6">
            <p className="text-sm text-emerald-100/90">
              Your evaluation has been submitted successfully. Redirecting you to your certificate...
            </p>
          </section>
        ) : null}

        {statusMessage ? (
          <output className="text-sm text-white/85" aria-live="polite">
            {statusMessage}
          </output>
        ) : null}
      </div>
    </main>
  );
}