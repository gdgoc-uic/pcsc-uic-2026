"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, GraduationCap, ExternalLink, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const CallforPapers = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(
        sectionRef.current?.querySelectorAll('[data-animate="item"]') || [],
      );
      if (items.length === 0) return;

      // Unified scroll-triggered entrance animation
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-12" data-animate="item">
          <p className="max-w-4xl text-white text-base sm:text-lg text-center mx-auto">
            The 26th Philippine Computing Science Congress is organized by the
            Computing Society of the Philippines to enable local and neighboring
            computing educators, researchers, ICT professionals, and students to
            interact and share their work.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Submission Portal */}
          <div
            className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5"
            data-animate="item"
          >
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="h-5 w-5 text-white" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">
                Submission Portal
              </h3>
            </div>
            <p className="text-white">
              <a
                href="
                https://cmt3.research.microsoft.com/PCSC2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white underline underline-offset-4 hover:text-rose-100 transition-colors"
                aria-label="Open CMT submission portal in a new tab"
              >
                Submit Now
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </p>
          </div>

          {/* Paper Template and Length */}
          <div
            className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5"
            data-animate="item"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">
                Paper Template & Length
              </h3>
            </div>
            <p className="text-white">
              Papers should use the prescribed PCSC 2026 template and have a
              minimum of 6 pages and maximum of 8 pages, including references.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/PCSC2026%20Paper%20Template.docx"
                download
                className="inline-flex items-center gap-2 rounded-md bg-brick-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brick-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                aria-label="Download PCSC 2026 Word template as DOCX"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                MS Word Template
              </a>
              <a
                href="/PCSC2026%20LaTeX%20Template.zip"
                download
                className="inline-flex items-center gap-2 rounded-md bg-brick-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brick-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                aria-label="Download PCSC 2026 LaTeX template as ZIP"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                LaTeX Template (ZIP)
              </a>
              <a
                href="/PCSC2026%20Paper%20Template.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-brick-red-700/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brick-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                aria-label="Open PCSC 2026 template PDF preview in a new tab"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Preview PDF
              </a>
            </div>
          </div>

          {/* Double-Blind Peer Review Guidelines */}
          <div
            className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5"
            data-animate="item"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Double-Blind Peer Review Guidelines
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Name and affiliation of the Authors must be removed from the
                  submitted manuscript.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Remove any citation and references that contain the Authors.
                  Use [Anonymous, 2008] and blind the reference list.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>Do not include acknowledgment and funding sources.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  Submitted papers must be original, and not submitted
                  concurrently to a journal or another conference/symposium.
                  Each submitted paper will be peer-reviewed by at least two
                  reviewers and must get an average positive rating for
                  inclusion in the conference program and proceedings.
                </span>
              </li>
            </ul>

            <div className="bg-brick-red-600 border-l-4 border-brick-red-400 p-4 text-sm text-white mt-6 rounded-md shadow-sm">
              <p>
                The Microsoft CMT service was used for managing the
                peer-reviewing process for this conference. This service was
                provided for free by Microsoft and they bore all expenses,
                including costs for Azure cloud services as well as for software
                development and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallforPapers;
