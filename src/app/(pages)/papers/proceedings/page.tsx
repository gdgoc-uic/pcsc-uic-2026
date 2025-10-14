"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, Download, ExternalLink, Calendar, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProceedingsPage = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(sectionRef.current?.querySelectorAll('[data-animate="item"]') || []);
      if (items.length === 0) return;

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
    <div className="bg-rose-900">
      <PageHero title="Proceedings" description="Access conference proceedings and archives." />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-rose-50">
          {/* Current Proceedings */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">PCSC 2026 Proceedings</h2>
            
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-8 ring-1 ring-inset ring-white/5">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-rose-200" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-rose-50">Conference Proceedings</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-rose-100/90">
                  The proceedings for PCSC 2026 will be published and made available after the conference. 
                  All accepted papers will be included in the official conference proceedings.
                </p>
                
                <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-sm text-rose-900 rounded-md shadow-sm">
                  <p>
                    <strong>Note:</strong> Proceedings will be available for download after the conference concludes. 
                    Registered participants will receive access to the digital proceedings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Proceedings */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Previous Proceedings</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-rose-200" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-rose-50">PCSC 2025</h3>
                </div>
                <p className="text-rose-100/90 mb-4">
                  Proceedings from the 25th Philippine Computing Science Congress.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors underline underline-offset-4"
                >
                  View Proceedings
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-rose-200" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-rose-50">PCSC 2024</h3>
                </div>
                <p className="text-rose-100/90 mb-4">
                  Proceedings from the 24th Philippine Computing Science Congress.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors underline underline-offset-4"
                >
                  View Proceedings
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Publication Information */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Publication Information</h2>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Publication Details</h3>
                <ul className="space-y-3 text-rose-100/90">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>All accepted papers will be published in the conference proceedings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Proceedings will be available in digital format for registered participants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Selected papers may be invited for publication in special issues of journals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Authors retain copyright of their work while granting conference publication rights</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Access Information</h3>
                <div className="space-y-3 text-rose-100/90">
                  <p>
                    <strong>Digital Access:</strong> Proceedings will be available for download through the conference platform.
                  </p>
                  <p>
                    <strong>Physical Copies:</strong> Limited physical copies may be available for purchase at the conference venue.
                  </p>
                  <p>
                    <strong>Archive:</strong> All proceedings will be archived and accessible through the CSP website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4" data-animate="item">
            <Link
              href="/papers"
              className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="Back to call for papers"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              Call for Papers
            </Link>
            <Link
              href="/papers/accepted-papers"
              className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
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

export default ProceedingsPage;


