"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, Download, ExternalLink, Calendar, Users, Award, Search, Filter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AcceptedPapersPage = () => {
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
      <PageHero title="Accepted Papers" description="List of accepted papers for the conference." />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-rose-50">
          {/* Status Message */}
          <div className="mb-12" data-animate="item">
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-8 ring-1 ring-inset ring-white/5 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="h-8 w-8 text-rose-200" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-rose-50">Accepted Papers</h2>
              </div>
              
              <p className="text-rose-100/90 text-lg mb-6">
                The list of accepted papers for PCSC 2026 will be announced after the review process is completed.
              </p>
              
              <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-sm text-rose-900 rounded-md shadow-sm max-w-2xl mx-auto">
                <p>
                  <strong>Timeline:</strong> Accepted papers will be announced approximately 4-6 weeks after the submission deadline. 
                  Authors will be notified via email once the review process is complete.
                </p>
              </div>
            </div>
          </div>

          {/* Paper Categories */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Paper Categories</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-rose-200" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-rose-50">Full Papers</h3>
                </div>
                <p className="text-rose-100/90 mb-4">
                  Complete research papers presenting original contributions to computing science and related fields.
                </p>
                <div className="text-sm text-rose-200">
                  <strong>Length:</strong> 6-8 pages
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-rose-200" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-rose-50">Short Papers</h3>
                </div>
                <p className="text-rose-100/90 mb-4">
                  Work-in-progress papers and preliminary results that contribute to the field.
                </p>
                <div className="text-sm text-rose-200">
                  <strong>Length:</strong> 4-5 pages
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-rose-200" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-rose-50">Student Papers</h3>
                </div>
                <p className="text-rose-100/90 mb-4">
                  Papers authored primarily by students, showcasing their research contributions.
                </p>
                <div className="text-sm text-rose-200">
                  <strong>Length:</strong> 4-6 pages
                </div>
              </div>
            </div>
          </div>

          {/* Research Areas */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Research Areas</h2>
            
            <div className="rounded-lg border border-white/10 bg-rose-950/40 p-8 ring-1 ring-inset ring-white/5">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-rose-50 mb-4">Core Computing Areas</h3>
                  <ul className="space-y-2 text-rose-100/90">
                    <li>• Algorithms and Data Structures</li>
                    <li>• Artificial Intelligence and Machine Learning</li>
                    <li>• Computer Networks and Security</li>
                    <li>• Database Systems</li>
                    <li>• Human-Computer Interaction</li>
                    <li>• Software Engineering</li>
                    <li>• Computer Graphics and Visualization</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-rose-50 mb-4">Emerging Areas</h3>
                  <ul className="space-y-2 text-rose-100/90">
                    <li>• Cloud Computing and Distributed Systems</li>
                    <li>• Internet of Things (IoT)</li>
                    <li>• Blockchain and Cryptocurrency</li>
                    <li>• Quantum Computing</li>
                    <li>• Bioinformatics and Computational Biology</li>
                    <li>• Educational Technology</li>
                    <li>• Digital Humanities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Review Process */}
          <div className="mb-12" data-animate="item">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Review Process</h2>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Review Criteria</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-rose-200 mb-2">Technical Quality</h4>
                    <ul className="space-y-1 text-rose-100/90 text-sm">
                      <li>• Sound methodology</li>
                      <li>• Appropriate evaluation</li>
                      <li>• Clear presentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rose-200 mb-2">Originality</h4>
                    <ul className="space-y-1 text-rose-100/90 text-sm">
                      <li>• Novel contributions</li>
                      <li>• Significant insights</li>
                      <li>• Clear positioning</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rose-200 mb-2">Relevance</h4>
                    <ul className="space-y-1 text-rose-100/90 text-sm">
                      <li>• Appropriate scope</li>
                      <li>• Practical significance</li>
                      <li>• Community interest</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rose-200 mb-2">Presentation</h4>
                    <ul className="space-y-1 text-rose-100/90 text-sm">
                      <li>• Clear writing</li>
                      <li>• Proper formatting</li>
                      <li>• Good organization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5">
                <h3 className="text-lg font-semibold text-rose-50 mb-4">Review Timeline</h3>
                <div className="space-y-3 text-rose-100/90">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Paper Submission Deadline</span>
                    <span className="font-semibold text-rose-200">To be announced</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Review Assignment</span>
                    <span className="font-semibold text-rose-200">Within 1 week</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Review Period</span>
                    <span className="font-semibold text-rose-200">3-4 weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Notification of Decision</span>
                    <span className="font-semibold text-rose-200">4-6 weeks after deadline</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Camera-Ready Submission</span>
                    <span className="font-semibold text-rose-200">2 weeks after notification</span>
                  </div>
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
              href="/papers/author-guidelines"
              className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View author guidelines"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Author Guidelines
            </Link>
            <Link
              href="/papers/proceedings"
              className="inline-flex items-center gap-2 rounded-md bg-rose-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              aria-label="View proceedings"
            >
              <Award className="h-5 w-5" aria-hidden="true" />
              Proceedings
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AcceptedPapersPage;


