"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, Download, ExternalLink, Calendar, Users, Award, CheckCircle, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AuthorGuidelinesPage = () => {
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
      <PageHero title="Author Guidelines" description="Templates, submission rules, and camera-ready instructions." />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-rose-50">
          {/* Paper Template */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Paper Template</h2>
            
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-8 ring-1 ring-inset ring-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-rose-200" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-rose-50">PCSC 2026 Template</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-rose-100/90">
                  All papers must be formatted according to the official PCSC 2026 template. 
                  The template ensures consistency and proper formatting for publication.
                </p>
                
                <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-sm text-rose-900 rounded-md shadow-sm">
                  <p>
                    <strong>Template Download:</strong> The official PCSC 2026 template will be available for download soon. 
                    Please check back for updates.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download Template
                  </a>
                  <a
                    href="https://pcsc.dlsu.edu.ph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Official Guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Paper Formatting Requirements */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Formatting Requirements</h2>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Page Length & Structure</h3>
                <ul className="space-y-3 text-rose-100/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span><strong>Length:</strong> Minimum 6 pages, maximum 8 pages (including references)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span><strong>Format:</strong> Use the official PCSC 2026 template</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span><strong>Language:</strong> English only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span><strong>File Format:</strong> PDF only</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Content Structure</h3>
                <ul className="space-y-3 text-rose-100/90">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span><strong>Abstract:</strong> 150-250 words summarizing the paper</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span><strong>Keywords:</strong> 3-5 relevant keywords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span><strong>Introduction:</strong> Problem statement and motivation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span><strong>Methodology:</strong> Research approach and methods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span><strong>Results:</strong> Findings and analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      6
                    </span>
                    <span><strong>Conclusion:</strong> Summary and future work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                      7
                    </span>
                    <span><strong>References:</strong> Properly formatted citations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Double-Blind Review Guidelines */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Double-Blind Review Guidelines</h2>
            
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-rose-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-rose-50">Important: Double-Blind Review Process</h3>
              </div>
              
              <ul className="space-y-4 text-rose-100/90">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Remove Author Information:</strong> Names, affiliations, and contact information must be completely removed from the manuscript.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Blind References:</strong> Remove any citations to your own work. Use [Anonymous, 2008] format and blind the reference list.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>No Acknowledgments:</strong> Do not include acknowledgment sections or funding sources during the review process.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-800/60 text-rose-200 text-xs font-semibold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    <strong>Original Work:</strong> Papers must be original and not submitted concurrently to other venues.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Submission Process */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Submission Process</h2>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Step-by-Step Submission</h3>
                <ol className="space-y-4 text-rose-100/90">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Download and format your paper using the PCSC 2026 template</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Ensure your paper follows double-blind review guidelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Submit your paper through the CMT submission portal (to be announced)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Wait for notification of acceptance/rejection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span>If accepted, submit camera-ready version with author information</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Review Process</h3>
                <div className="space-y-3 text-rose-100/90">
                  <p>
                    <strong>Peer Review:</strong> Each paper will be reviewed by at least two independent reviewers.
                  </p>
                  <p>
                    <strong>Review Criteria:</strong> Papers are evaluated based on originality, technical quality, relevance, and presentation.
                  </p>
                  <p>
                    <strong>Decision:</strong> Papers must receive an average positive rating for inclusion in the conference program.
                  </p>
                  <p>
                    <strong>Feedback:</strong> Authors will receive detailed feedback from reviewers to improve their work.
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
              href="/papers/proceedings"
              className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View proceedings"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Proceedings
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthorGuidelinesPage;


