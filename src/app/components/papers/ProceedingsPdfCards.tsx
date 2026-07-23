"use client";

import {
  FileText,
  BookOpen,
  ExternalLink,
  Download,
  CheckCircle2,
} from "lucide-react";

interface VolumeInfo {
  id: 1 | 2;
  title: string;
  subtitle: string;
  pdfPath: string;
  description: string;
  icon: typeof FileText;
}

const VOLUMES: VolumeInfo[] = [
  {
    id: 1,
    title: "Volume 1 — Full Research Papers",
    subtitle: "PCSC 2026 Proceedings",
    pdfPath: "/Proceedings Volume 1 - Full paper.pdf",
    description:
      "Complete collection of accepted full research papers presenting novel methodologies, empirical evaluations, and algorithmic advancements in computer science.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Volume 2 — Short Research Papers",
    subtitle: "PCSC 2026 Proceedings",
    pdfPath: "/Proceedings Volume 2 - Short Paper.pdf",
    description:
      "Comprehensive volume of accepted short research papers covering emerging studies, system prototypes, application papers, and work-in-progress findings.",
    icon: BookOpen,
  },
];

export default function ProceedingsPdfCards() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-brick-red-900/90 via-brick-red-800/80 to-brick-red-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold uppercase tracking-wider">
            <span>Official Conference Publication</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PCSC 2026 Digital Proceedings
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Select a volume below to view the complete PDF proceedings directly
            inside your browser's native reader or download a copy for offline
            access.
          </p>
        </div>
      </div>

      {/* Volume Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {VOLUMES.map((vol) => {
          const Icon = vol.icon;
          return (
            <div
              key={vol.id}
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-brick-red-800/60 p-6 sm:p-8 ring-1 ring-inset ring-white/5 transition-all duration-300 hover:border-rose-500/40 hover:bg-brick-red-800/80 hover:shadow-2xl hover:shadow-rose-950/50"
            >
              {/* Top Details */}
              <div className="space-y-6">
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brick-red-700/80 border border-white/10 text-white shadow-inner group-hover:scale-105 transition-transform">
                      <Icon
                        className="h-6 w-6 text-rose-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-medium text-rose-300/80 uppercase tracking-widest">
                        {vol.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {vol.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/75 leading-relaxed">
                  {vol.description}
                </p>  
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={vol.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 hover:shadow-rose-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-brick-red-950 active:scale-[0.98]"
                  aria-label={`View ${vol.title} in browser`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>View Proceedings</span>
                </a>

                <a
                  href={vol.pdfPath}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brick-red-700/80 hover:bg-brick-red-700 text-white/90 hover:text-white border border-white/10 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-brick-red-950 active:scale-[0.98]"
                  aria-label={`Download ${vol.title}`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
