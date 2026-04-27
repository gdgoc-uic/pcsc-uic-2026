"use client";

import {
  BarChart3,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileSpreadsheet,
  Loader2,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";

type Submission = {
  id: string;
  submitted_name: string;
  email: string;
  answers: Record<string, unknown>;
  comment: string | null;
  certificate_download_url: string | null;
  created_at: string;
  stakeholder_name: string | null;
};

type Question = {
  key: string;
  type: string;
  text: string;
};

type Stats = {
  total_stakeholders: number;
  active_stakeholders: number;
  total_submissions: number;
  participation_rate: number;
  question_stats: Record<
    string,
    { count: number; sum: number; avg: number; min: number; max: number }
  >;
  questions: Question[];
};

export default function AdminResultsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [subsRes, statsRes] = await Promise.all([
        fetch("/api/evaluation?scope=submissions"),
        fetch("/api/evaluation?scope=stats"),
      ]);

      const subsPayload = (await subsRes.json()) as {
        submissions?: Submission[];
      };
      const statsPayload = (await statsRes.json()) as { stats?: Stats };

      if (subsPayload.submissions) {
        setSubmissions(subsPayload.submissions);
      }
      if (statsPayload.stats) {
        setStats(statsPayload.stats);
        setQuestions(statsPayload.stats.questions || []);
      }
    } catch {
      setMessage("Unable to load results.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const getAnswerDisplay = (answer: unknown): string => {
    if (answer === undefined || answer === null || answer === "") {
      return "—";
    }
    if (typeof answer === "number") {
      return String(answer);
    }
    if (Array.isArray(answer)) {
      return answer.join(", ");
    }
    return String(answer);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      ...questions.map((q) => q.text),
      "Comment",
      "Submitted At",
    ];
    const rows = submissions.map((sub) => [
      sub.submitted_name,
      sub.email,
      ...questions.map((q) => getAnswerDisplay(sub.answers[q.key])),
      sub.comment || "",
      sub.created_at,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `evaluation-results-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Evaluation Results"
        description="View submitted evaluations, statistics, and export data."
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
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700"
          >
            Results
          </a>
        </nav>

        {isLoading ? (
          <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading results...
          </div>
        ) : (
          <>
            {stats && (
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5">
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Active Participants</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.active_stakeholders}
                  </p>
                </div>
                <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5">
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    <span className="text-sm">Submissions</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.total_submissions}
                  </p>
                </div>
                <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5">
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Participation Rate</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.participation_rate}%
                  </p>
                </div>
                <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5">
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-sm">Avg. Overall</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.question_stats.overall?.avg
                      ? stats.question_stats.overall.avg.toFixed(1)
                      : "—"}
                  </p>
                </div>
              </section>
            )}

            {stats?.question_stats && questions.length > 0 && (
              <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-5">
                <h2 className="text-lg font-bold text-white mb-4">
                  Rating Averages
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {questions.map((q) => {
                    const qStat = stats.question_stats[q.key];
                    return (
                      <div
                        key={q.key}
                        className="rounded-lg border border-brick-red-600 bg-brick-red-900/40 p-3"
                      >
                        <p className="text-sm text-white/80 mb-1 line-clamp-2">
                          {q.text}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            {qStat?.avg ? qStat.avg.toFixed(1) : "—"}
                          </span>
                          <span className="text-xs text-white/50">
                            ({qStat?.count || 0} responses)
                          </span>
                        </div>
                        {qStat && qStat.count > 0 && (
                          <p className="text-xs text-white/40 mt-1">
                            Range: {qStat.min} – {qStat.max}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-white">Submissions</h2>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={submissions.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>

              {submissions.length === 0 ? (
                <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
                  No submissions yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(expandedId === sub.id ? null : sub.id)
                        }
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-brick-red-700/20"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white truncate">
                            {sub.submitted_name}
                          </p>
                          <p className="text-xs text-white/60 truncate">
                            {sub.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/50 hidden sm:block">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </span>
                          {expandedId === sub.id ? (
                            <ChevronUp className="h-5 w-5 text-white/70" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-white/70" />
                          )}
                        </div>
                      </button>

                      {expandedId === sub.id && (
                        <div className="border-t border-brick-red-600 px-4 py-4 space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs text-white/50">Email</p>
                              <p className="text-sm text-white font-mono">
                                {sub.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50">Submitted</p>
                              <p className="text-sm text-white">
                                {new Date(sub.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-white/50 mb-2">
                              Answers
                            </p>
                            <div className="space-y-2">
                              {questions.map((q) => (
                                <div
                                  key={q.key}
                                  className="flex justify-between gap-4 rounded-md border border-brick-red-600 bg-brick-red-900/40 px-3 py-2"
                                >
                                  <span className="text-sm text-white/80 truncate">
                                    {q.text}
                                  </span>
                                  <span className="text-sm font-medium text-white">
                                    {getAnswerDisplay(sub.answers[q.key])}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {sub.comment && (
                            <div>
                              <p className="text-xs text-white/50 mb-1">
                                Comment
                              </p>
                              <p className="text-sm text-white rounded-md border border-brick-red-600 bg-brick-red-900/40 px-3 py-2">
                                {sub.comment}
                              </p>
                            </div>
                          )}

                          {sub.certificate_download_url && (
                            <a
                              href={sub.certificate_download_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100"
                            >
                              <Download className="h-4 w-4" />
                              Download Certificate
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {message ? <p className="text-sm text-white/85">{message}</p> : null}
      </div>
    </main>
  );
}
