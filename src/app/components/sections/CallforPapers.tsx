"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FileText,
  Award,
  ArrowRight,
  Download,
  BookOpen,
} from "lucide-react";
import ProceedingsPdfCards from "@/app/components/papers/ProceedingsPdfCards";

gsap.registerPlugin(ScrollTrigger);

export const CallforPapers = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(
        sectionRef.current?.querySelectorAll('[data-animate="item"]') || [],
      );
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="call-for-papers"
      className="bg-brick-red-950 text-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        {/* Intro Header */}
        <div
          className="text-center max-w-3xl mx-auto space-y-3"
          data-animate="item"
        >
          <p className="text-white/85 text-base sm:text-lg leading-relaxed">
            The 26th Philippine Computing Science Congress presents its official
            digital proceedings. Explore accepted full and short research papers
            contributed by computing educators, researchers, and ICT professionals.
          </p>
        </div>

        {/* Digital Proceedings PDF Cards (Volume 1 & Volume 2) */}
        <div data-animate="item">
          <ProceedingsPdfCards />
        </div>

        {/* Accepted Papers Directory CTA */}
        <div
          className="group relative rounded-xl border border-white/10 bg-brick-red-800/60 p-6 sm:p-8 ring-1 ring-inset ring-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-rose-500/40 hover:bg-brick-red-800/80 hover:shadow-2xl hover:shadow-rose-950/50"
          data-animate="item"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-400/30 text-rose-300 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Award className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-rose-300/80 uppercase tracking-widest">
                Searchable Directory
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                Accepted Papers Index
              </h3>
              <p className="text-sm text-white/75 leading-relaxed max-w-2xl">
                Browse the complete directory of accepted full and short research papers presented at PCSC 2026, searchable by title, author, or paper ID.
              </p>
            </div>
          </div>

          <Link
            href="/papers"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 hover:shadow-rose-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-brick-red-950 active:scale-[0.98] shrink-0"
            aria-label="View accepted papers directory"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>Browse Directory</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Paper Templates & Resources */}
        <div
          className="rounded-xl border border-white/10 bg-brick-red-900/40 p-6 sm:p-8 backdrop-blur-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          data-animate="item"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-rose-300" aria-hidden="true" />
              <h4 className="text-base font-semibold text-white">
                Paper Templates & Formatting Resources
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              Download the official PCSC 2026 camera-ready templates for publication reference.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/PCSC2026%20Paper%20Template.docx"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-brick-red-800/80 hover:bg-brick-red-700 text-white border border-white/10 px-4 py-2.5 text-xs font-semibold transition-all hover:border-white/20"
              aria-label="Download Word template"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>MS Word Template</span>
            </a>
            <a
              href="/PCSC2026%20LaTeX%20Template.zip"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-brick-red-800/80 hover:bg-brick-red-700 text-white border border-white/10 px-4 py-2.5 text-xs font-semibold transition-all hover:border-white/20"
              aria-label="Download LaTeX template"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>LaTeX Template</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallforPapers;
