"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PageHero from "@/app/components/sections/PageHero";

export default function EvaluationCertificatePage() {
  const [email, setEmail] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleLookup = async () => {
    if (!email.trim() || !submissionId.trim()) {
      setMessage("Please provide both email and submission ID.");
      return;
    }

    setIsLoading(true);
    setCertificateUrl("");
    setIsImageLoading(false);
    setMessage("");

    try {
      const search = new URLSearchParams({
        email: email.trim().toLowerCase(),
        submissionId: submissionId.trim(),
      });

      const response = await fetch(`/api/certificate?${search.toString()}`);
      const payload = (await response.json()) as {
        certificateUrl?: string;
        message?: string;
      };

      if (!response.ok || !payload.certificateUrl) {
        setCertificateUrl("");
        setIsImageLoading(false);
        setMessage(payload.message ?? "Certificate was not found.");
        return;
      }

      setIsImageLoading(true);
      setCertificateUrl(payload.certificateUrl);
      setMessage("Certificate download link is ready.");
    } catch {
      setCertificateUrl("");
      setIsImageLoading(false);
      setMessage("Unable to fetch certificate right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Certificate Lookup"
        description="Enter your participant email and submission ID to generate a new certificate download link."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5 sm:p-6 space-y-4">
          <div>
            <label
              htmlFor="certificate-email"
              className="block text-sm text-white/90 mb-1"
            >
              Participant Email
            </label>
            <input
              id="certificate-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="submission-id"
              className="block text-sm text-white/90 mb-1"
            >
              Submission ID
            </label>
            <input
              id="submission-id"
              type="text"
              value={submissionId}
              onChange={(event) => setSubmissionId(event.target.value)}
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="UUID"
            />
          </div>

          <button
            type="button"
            onClick={handleLookup}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Get Download Link
          </button>

          {certificateUrl ? (
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-lg border border-brick-red-500/60 bg-brick-red-900/50 p-2">
                {isImageLoading ? (
                  <div className="absolute inset-2 animate-pulse rounded-md bg-brick-red-700/50" />
                ) : null}

                <Image
                  src={certificateUrl}
                  alt="Certificate preview"
                  width={1920}
                  height={1080}
                  unoptimized
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setIsImageLoading(false);
                    setMessage(
                      "Preview failed to load, but you can still download the certificate.",
                    );
                  }}
                  className={`h-auto w-full rounded-md transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                />
              </div>

              <a
                href={certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100"
              >
                Download Certificate (PNG)
              </a>
            </div>
          ) : null}

          {message ? <p className="text-sm text-white/85">{message}</p> : null}
        </section>
      </div>
    </main>
  );
}
