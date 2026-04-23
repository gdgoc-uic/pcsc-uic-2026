"use client";

import { Download, PartyPopper } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";

type CertificateData = {
  certificateUrl?: string;
  message?: string;
};

function CertificatePreviewContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId") ?? "";
  const email = searchParams.get("email") ?? "";
  const preloadedUrl = searchParams.get("certificateUrl") ?? "";
  const stakeholderName = searchParams.get("name") ?? "Certificate";
  const isNewSubmission = searchParams.get("new") === "true";

  const [certificateData, setCertificateData] = useState<CertificateData>({});
  const [isLoading, setIsLoading] = useState(!preloadedUrl);
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (preloadedUrl) {
        setCertificateData({ certificateUrl: preloadedUrl });
        return;
      }

      if (!submissionId || !email) {
        setCertificateData({ message: "Missing required parameters." });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          submissionId,
          email,
        });

        const response = await fetch(`/api/certificate?${params.toString()}`);
        const data = (await response.json()) as CertificateData;

        if (!response.ok || !data.certificateUrl) {
          setCertificateData({
            message: data.message ?? "Unable to load certificate.",
          });
          return;
        }

        setCertificateData({
          certificateUrl: data.certificateUrl,
        });
      } catch {
        setCertificateData({
          message: "Unable to fetch certificate right now.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      void fetchCertificate();
    }
  }, [isMounted, preloadedUrl, submissionId, email]);

  const handleDownload = async () => {
    if (!certificateData.certificateUrl || isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(certificateData.certificateUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const fileName = stakeholderName.trim()
        ? `PCSC 2026 - ${stakeholderName.trim()}.png`
        : "PCSC 2026 - Certificate.png";
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab if fetch fails
      window.open(certificateData.certificateUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isMounted || isLoading) {
    return (
      <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
        <PageHero
          title="Your Certificate"
          description="Loading your certificate..."
        />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Your Certificate"
        description="Thank you for your evaluation submission!"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-600/20 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <PartyPopper className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-emerald-100">
              {isNewSubmission
                ? "Evaluation Submitted Successfully!"
                : "Your Certificate of Participation"}
            </h2>
          </div>
          <p className="text-sm text-emerald-100/90">
            {isNewSubmission
              ? `Congratulations${stakeholderName.trim() ? `, ${stakeholderName.trim()}` : ""}! Thank you for taking the time to share your feedback. Your certificate of participation is ready below.`
              : `Welcome back${stakeholderName.trim() ? `, ${stakeholderName.trim()}` : ""}! Your certificate of participation is available below for download.`}
          </p>
        </div>

        {certificateData.message && !certificateData.certificateUrl ? (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-600/20 p-5 sm:p-6">
            <p className="text-sm text-red-200">{certificateData.message}</p>
          </div>
        ) : certificateData.certificateUrl ? (
          <>
            <div className="mt-8 rounded-lg border border-brick-red-600/60 bg-brick-red-900/50 p-4">
              <img
                src={certificateData.certificateUrl}
                alt="Your Certificate of Attendance"
                className="mx-auto max-h-[60vh] w-auto rounded shadow-lg"
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Downloading..." : "Download Certificate (PNG)"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default function CertificatePreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
          <PageHero
            title="Your Certificate"
            description="Loading..."
          />
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          </div>
        </main>
      }
    >
      <CertificatePreviewContent />
    </Suspense>
  );
}