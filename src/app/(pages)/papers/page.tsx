"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, GraduationCap, ExternalLink, Calendar, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PapersPage = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(sectionRef.current?.querySelectorAll('[data-animate="item"]') || []);
      if (items.length === 0) return;

      // Unified scroll-triggered entrance animation
      gsap.fromTo(items,
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
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20 bg-rose-900">
      <PageHero title="Call for Papers" description="Submit your research and contribute to the computing community." />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-rose-50">
          {/* Header */}
          <div className="mb-10 sm:mb-12" data-animate="item">
            <p className="max-w-4xl text-rose-100/80 text-base sm:text-lg text-center mx-auto">
              The 26th Philippine Computing Science Congress is organized by the Computing Society of the Philippines
              to enable local and neighboring computing educators, researchers, ICT professionals, and students to
              interact and share their work in computing, computer science, computational science, and ICT.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* Submission Portal */}
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5" data-animate="item">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="h-5 w-5 text-rose-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-rose-50">Submission Portal</h3>
              </div>
              <p className="text-rose-100/90">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-200 underline underline-offset-4 hover:text-rose-100 transition-colors"
                  aria-label="Open CMT submission portal in a new tab"
                >
                  To be Announced...
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </p>
            </div>

            {/* Paper Template and Length */}
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5" data-animate="item">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-rose-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-rose-50">Paper Template & Length</h3>
              </div>
              <p className="text-rose-100/90">
                Papers should use the prescribed PCSC 2026 template and have a minimum of 6 pages and maximum of 8 pages,
                including references.
              </p>
            </div>

            {/* Double-Blind Peer Review Guidelines */}
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5" data-animate="item">
              <h3 className="text-lg font-semibold text-rose-50 mb-4">Double-Blind Peer Review Guidelines</h3>
              <ul className="space-y-3 text-rose-100/90">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Name and affiliation of the Authors must be removed from the submitted manuscript.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Remove any citation and references that contain the Authors. Use [Anonymous, 2008] and blind the
                    reference list.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Do not include acknowledgment and funding sources.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    Submitted papers must be original, and not submitted concurrently to a journal or another
                    conference/symposium. Each submitted paper will be peer-reviewed by at least two reviewers and must get
                    an average positive rating for inclusion in the conference program and proceedings.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-sm text-rose-900 mt-6 rounded-md shadow-sm">
                <p>
                  <strong>Note:</strong> The peer-review process for this conference was managed using the 
                  <strong> Microsoft Conference Management Toolkit (CMT)</strong>. 
                  This service was provided free of charge by Microsoft, which covered all related costs, 
                  including Azure cloud services, software development, and technical support.
                </p>
              </div>
            </div>

            {/* Important Dates */}
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5" data-animate="item">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-rose-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-rose-50">Important Dates</h3>
              </div>
              <div className="space-y-3 text-rose-100/90">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span>Paper Submission Deadline</span>
                  <span className="font-semibold text-rose-200">To be announced</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span>Notification of Acceptance</span>
                  <span className="font-semibold text-rose-200">To be announced</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span>Camera-Ready Submission</span>
                  <span className="font-semibold text-rose-200">To be announced</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Conference Dates</span>
                  <span className="font-semibold text-rose-200">April 23-25, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4" data-animate="item">
            <Link
              href="/papers/author-guidelines"
              className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View author guidelines"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Author Guidelines
            </Link>
            <Link
              href="/papers/proceedings"
              className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View proceedings"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              Proceedings
            </Link>
            <Link
              href="/papers/accepted-papers"
              className="inline-flex items-center gap-2 rounded-md bg-rose-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View accepted papers"
            >
              <Award className="h-5 w-5" aria-hidden="true" />
              Accepted Papers
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PapersPage;
