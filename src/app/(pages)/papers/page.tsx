"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, BookOpen, ExternalLink, Calendar, Users, Award, Download, CheckCircle, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PapersPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState('call-for-papers');

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

  const tabs = [
    { id: 'call-for-papers', label: 'Call for Papers', icon: FileText },
    { id: 'author-guidelines', label: 'Author Guidelines', icon: BookOpen },
    { id: 'proceedings', label: 'Proceedings', icon: FileText },
    { id: 'accepted-papers', label: 'Accepted Papers', icon: Award },
  ];

  const renderCallForPapers = () => (
    <div className="space-y-6">
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
              <span className="font-semibold text-rose-200">December 20, 2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span>Author Notification</span>
              <span className="font-semibold text-rose-200">January 20, 2026</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span>Camera-Ready Submission</span>
              <span className="font-semibold text-rose-200">March 10, 2026</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Conference Dates</span>
              <span className="font-semibold text-rose-200">April 23-25, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuthorGuidelines = () => (
    <div className="space-y-12">
      {/* Paper Template */}
      <div data-animate="item">
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
      <div data-animate="item">
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
      <div data-animate="item">
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
      <div data-animate="item">
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
    </div>
  );

  const renderProceedings = () => (
    <div className="space-y-12">
      {/* Current Proceedings */}
      <div data-animate="item">
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
      <div data-animate="item">
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
      <div data-animate="item">
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
    </div>
  );

  const renderAcceptedPapers = () => (
    <div className="space-y-12">
      {/* Status Message */}
      <div data-animate="item">
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
      <div data-animate="item">
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
      <div data-animate="item">
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
      <div data-animate="item">
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
                <span className="font-semibold text-rose-200">December 20, 2025</span>
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
                <span className="font-semibold text-rose-200">January 20, 2026</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Camera-Ready Submission</span>
                <span className="font-semibold text-rose-200">March 10, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'call-for-papers':
        return renderCallForPapers();
      case 'author-guidelines':
        return renderAuthorGuidelines();
      case 'proceedings':
        return renderProceedings();
      case 'accepted-papers':
        return renderAcceptedPapers();
      default:
        return renderCallForPapers();
    }
  };

  return (
    <div className="pt-20 bg-rose-900">
      <PageHero title="Call for Papers"/>

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-rose-50">
          {/* Tab Navigation */}
          <div className="mb-12" data-animate="item">
            <div className="flex flex-wrap justify-center gap-2 bg-rose-950/40 p-2 rounded-lg border border-white/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-rose-500 text-white shadow-lg'
                        : 'text-rose-200 hover:text-rose-100 hover:bg-rose-800/40'
                    }`}
                    aria-label={`Switch to ${tab.label} tab`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </section>
      </main>
    </div>
  );

};

export default PapersPage;
