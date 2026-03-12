"use client";
import PageHero from "@/app/components/sections/PageHero";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  BookOpen,
  ExternalLink,
  Calendar,
  Award,
  Download,
  CheckCircle,
  AlertCircle,
  Search,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Paper = {
  id: number;
  title: string;
  authors: string[];
};

const fullPapers: Paper[] = [
  {
    id: 7,
    title:
      "Machine Learning-Based Regional K-12 Enrollment Forecasting and Volatility Classification for Adaptive Resource Allocation in the Philippines",
    authors: ["Cardaño, Mc Sergel"],
  },
  {
    id: 16,
    title:
      "Accelerating Symptom Detection in Canine Ocular Diseases: A Comparative Analysis and Heterogeneous Ensemble of YOLOv8 and RT-DETR",
    authors: ["Rosillosa, Kristian Angelo Ray", "Manlangit, Venzhower"],
  },
  {
    id: 21,
    title:
      "Defending against Membership Inference Attacks through Contrastive Representation Learning",
    authors: [
      "Agarap, Abien Fred",
      "Aguinaldo, Miguel Anton",
      "Madrigal, Rafael",
      "Benavides, Inigo Miguel",
      "Venturina, Sara Ann",
    ],
  },
  {
    id: 22,
    title:
      "FRIAD-IR: A Framework for Image-Augmented Dynamic Information Retrieval",
    authors: ["Heffron, Joaquin", "Calabia, Bastian Nathaniel"],
  },
  {
    id: 25,
    title: "Parallel Permutation Testing for One-Way ANOVA Using CUDA",
    authors: [
      "Lasala, Kyle Carlo",
      "Manlises, Maria Monica",
      "Go, Daphne Janelyn",
      "Uy, Roger Luis",
    ],
  },
  {
    id: 27,
    title:
      "A Scalable and Computationally Efficient Implementation of a Macroscopic Traffic Model for Urban Networks",
    authors: ["Soriano, Jaymar"],
  },
  {
    id: 28,
    title:
      "Handwritten Gregg Shorthand Brief Forms Recognition Using Convolutional Neural Networks",
    authors: ["Silva, Lysha", "Paglinawan-Muñez, Neila"],
  },
  {
    id: 32,
    title:
      "Integrating Adaptive Mechanisms for Feature Selection with Mayfly Algorithm, Monarch Butterfly Optimization, and Monarch Mayfly Optimization",
    authors: [
      "Antoque, Jane",
      "Paglinawan-Muñez, Neila",
      "Lucero, Samuel",
      "Pillodar, Frence Clifford",
    ],
  },
  {
    id: 33,
    title:
      "Flotector: A Floating Waste Detection System for the Imus River through Participatory Sensing and YOLOv11",
    authors: [
      "Ascaño, Charles Ian",
      "Cayabyab, Giero Smith",
      "Gamilla, Ken Lemer",
    ],
  },
  {
    id: 34,
    title:
      "Uncertainty-Aware Temporal Transformer Modeling with Masked Self-Attention and Missingness Encoding for Early Sepsis Risk Stratification from ICU Time-Series Data",
    authors: [
      "Floreta, Zak",
      "Bitayo, Brix",
      "Binangbang, Derrick",
      "Omictin, Jether",
      "Pardillo, Jun Albert",
    ],
  },
  {
    id: 35,
    title:
      "MAMBO (Multi AI Model Bench Operations): A Framework for Dynamic Model Switching and Benchmarking On-Device AI",
    authors: ["Bernabe, Marveen Antonio"],
  },
  {
    id: 38,
    title:
      "Distributed SNP: A High-Performance Hybrid MPI+CUDA Framework for Spiking Neural P Systems",
    authors: [
      "Lipat, Job",
      "Luzada, Jarred Sueño",
      "Cabarle, Francis George",
      "Martínez-del-Amor, Miguel Ángel",
      "Orellana-Martín, David",
    ],
  },
  {
    id: 40,
    title: "Nonbalanced and Nonhomogenous Spiking Neural dP Systems",
    authors: [
      "Naraval, Victor Dominic",
      "Cabarle, Francis George",
      "Buño, Kelvin",
      "de la Cruz, Ren Tristan",
      "Ko, Daryll Carlsten",
    ],
  },
  {
    id: 45,
    title:
      "Apparent Age Estimation: Challenges and Outcomes - A Comparative Analysis on Apparent Age Estimation Methods and Datasets",
    authors: [
      "Go, Justin Rainier",
      "Marqueses, Lorenz Bernard",
      "Martinez, Mikaella Kaye",
      "Sarmiento, John Kevin Patrick",
      "Agarap, Abien Fred",
    ],
  },
  {
    id: 50,
    title:
      "TUDLO: Parameter-Efficient Fine-Tuning for Tagalog and Cebuano Early-Grade Mathematics Explanation Generation",
    authors: ["Ramos, Trisha Jean"],
  },
  {
    id: 51,
    title: "Gated Learning-Progress Exploration",
    authors: [
      "Tumampos, Mikael Vincent",
      "Guirnela, Ervin Joshua",
      "Peña, Christine",
    ],
  },
  {
    id: 52,
    title:
      "Evaluating Large Language Models in Filipino Underspecified, Multi-Turn Conversations",
    authors: ["Pintor, Renee Rosary", "Wang, Lisa Juress", "Pepito, Glenn"],
  },
  {
    id: 53,
    title: "Mixture of Experts with Soft Nearest Neighbor Loss",
    authors: ["Agarap, Abien Fred"],
  },
  {
    id: 55,
    title:
      "Conversion from Nondeterminism to Determinism at the Rule Level of Spiking Neural P Systems with Structural Plasticity",
    authors: ["Jimenez, Zechariah", "Cabarle, Francis George"],
  },
  {
    id: 57,
    title: "On the Notions of Soundness in Spiking Neural P Systems",
    authors: ["Ramirez, Ronnie II", "Cabarle, Francis George"],
  },
  {
    id: 62,
    title:
      "Galaw at Gunita: Extended Reality Murals for Experiencing Filipino Art",
    authors: [
      "Delos Reyes, Jomar",
      "Dy, Sealtiel",
      "Sales, Rica Mae",
      "Uy, Orrin Landon",
      "Monserrat, Toni-Jan Keith",
      "Fernandez, Ryan Austin",
      "Deja, Jordan Aiko",
    ],
  },
  {
    id: 69,
    title:
      "Predictive Models for Solar Energy Output: Performance Evaluation of K-Means and GMM Clustering with Model Interpretability",
    authors: ["Jakosalem, Carlos Miguel", "Abrenica, Francis Rale"],
  },
  {
    id: 71,
    title:
      "A Hybrid Machine Learning Framework for Predictive Maintenance of Bearings in Philippine Power Plants",
    authors: [
      "Consunji, Beaux Nathania Immanuelle",
      "Zapico, Joshua Paolo",
      "Muli, Lamberlain",
    ],
  },
  {
    id: 72,
    title: "Dynamic Load Balancing and Parallel Non-Maximum Suppression",
    authors: [
      "Lanting, Kurt",
      "Chio, Mikhail Anton",
      "Cabarle, Francis",
      "de la Cruz, Ren Tristan",
      "Buño, Kelvin",
      "Ko, Daryll",
    ],
  },
  {
    id: 75,
    title:
      "An Ensemble Prediction Model Using LightGBM and Bidirectional LSTM for Bitcoin Price Dip Detection",
    authors: ["Barria, Rameses", "Pilapil, Marc Dylan"],
  },
  {
    id: 79,
    title:
      "Adaptive Shot Allocation for Quantum Observable with Statistical Guarantees",
    authors: ["Pontiveros, Marc Jermaine", "Adorna, Henry"],
  },
  {
    id: 81,
    title:
      "Neuro-Symbolic AI and Autoformalization: Restoring Determinism in the Age of Probabilistic Computing",
    authors: ["Isanan, Junel Alje", "Adorna, Henry", "Labao, Alfonso"],
  },
];

const shortPapers: Paper[] = [
  {
    id: 5,
    title:
      "Early Dengue Diagnosis using Machine Learning on Structured Clinical and Hematological Data",
    authors: ["Natavio, Rani Jay", "Guanzon, Katelyn Leigh"],
  },
  {
    id: 15,
    title:
      "Queue Management System with Smart Feedback, Sentiment Analysis and Geolocation in Holy Child College of Davao",
    authors: ["Chan, Amy Rosal", "Fabian, Alrheem"],
  },
  {
    id: 17,
    title:
      "Comparative Study of MobileNetV2 and Hybrid MobileNetV2 with SVM Classifier for Efficient Waste Classification in Low-Resource Environments",
    authors: ["Torayno, Earl Jay", "Asaria, J Faye Champ"],
  },
  {
    id: 18,
    title:
      "A Swin-SNN Cross-Modal Attention Framework for Identifying Systemic Lupus Erythematosus from Ocular Fundus Imaging and Transcriptomic Interferon Signatures",
    authors: ["Manulat, Thomas Danjo"],
  },
  {
    id: 19,
    title:
      "Integrating Deep Learning Models to Improve Cheating Detection in UPOU's Specialized Online Assessment Platform",
    authors: ["Tuazon, Joseph"],
  },
  {
    id: 29,
    title:
      "Solving the Senior High School Timetabling Problem using a Multi-Agent Reinforcement Learning Approach",
    authors: [
      "Reyes, Alroy Leon",
      "Cabredo, Rafael",
      "Cuya, Vhonne",
      "Ocampo, Gabriel",
    ],
  },
  {
    id: 30,
    title: "Text Mining Analysis of Review Bombing Incidents in Filipino Films",
    authors: [
      "Gonzales, Joshua Nicolai",
      "Cariaga, Josh Enrico",
      "Alonzo, Ron Fourier",
      "Barcelita, Aaron John",
      "Reyes, Nathaniel Kurt",
      "Gonda, Raphael",
    ],
  },
  {
    id: 36,
    title: "Judo Throw Recognition Using Computer Vision Techniques",
    authors: ["Arenas, Angelo Gabriel", "Madrid, Val Randol", "Araneta, Jesus"],
  },
  {
    id: 37,
    title:
      "FITPOSE: A Computer Vision-Based System for Real-Time Posture Assessment in Home-Based Workout Enhancement",
    authors: ["Abot, Nicolei Faith"],
  },
  {
    id: 39,
    title:
      "GaitAware: A Lightweight Hybrid Gait Analysis System Using BlazePose-BiLSTM and CNN for Identifying Potential Gait Abnormalities",
    authors: [
      "Binanitan, John Rebb",
      "Bautista, Timothy James",
      "Espino, Zalzon III",
    ],
  },
  {
    id: 41,
    title:
      "DermaTector: Increasing Efficiency in Diagnostics of Sun-Induced Skin Diseases Utilizing EfficientNet",
    authors: [
      "Llamera, Josh Mickel",
      "Marticio, Viktor Harold",
      "Paule, Faith Moselle",
    ],
  },
  {
    id: 43,
    title:
      "Augmenting a Force Directed Layout Algorithm in Drawing Adjacent Transposition Graphs",
    authors: ["Antonio, Harold", "Albarracin, Francis", "Ordanel, Ivy"],
  },
  {
    id: 44,
    title:
      "Analysis of Machine Learning Approaches for Real-Time Human Exercise Classification Using Pose Estimation Joint Angles",
    authors: ["Limbo, Moses"],
  },
  {
    id: 47,
    title:
      "ATHENA: An Image Captioning Pipeline for Constrained Underwater Environments",
    authors: ["Roy, Rodrigo Emmanuel", "Chan, Krisha Anne"],
  },
  {
    id: 48,
    title:
      "Towards More Empathic Programming Environments - An Experimental Empathic AI-Enhanced IDE",
    authors: [
      "Go, Justin Rainier",
      "Caliboso, Roemer Gabriel",
      "Andaya, Kurt Christian",
      "Go, Aaron Daniel",
    ],
  },
  {
    id: 49,
    title:
      "Novel CUDA and Segment Tree-Accelerated Simulated Annealing Approaches to the Time-Dependent Knapsack Problem",
    authors: [
      "Chua, Harvey Shawn",
      "Asturiano, Christian Emmanuel",
      "Uy, Nicole Kate",
    ],
  },
  {
    id: 54,
    title:
      "Scrum vs. Extreme Programming (XP) vs Kanban in the Age of AI and DevOps: A Comparative Analysis of Cultural Resilience to Modern Development Challenges",
    authors: ["Bernardez, Fernand", "Torres, Francis Luis"],
  },
  {
    id: 58,
    title:
      "Self-Training an Image Binary Classification Model using a Multi-Agent System",
    authors: [
      "Cambarijan, Angel Sheinen",
      "Repuesto, Charlene",
      "Talip, Deo",
      "Bajo, Jake",
      "Aliac, Chris Jordan",
    ],
  },
  {
    id: 59,
    title:
      "A Controlled Analysis of In-Context Learning in Large Language Models Through Constructed Languages",
    authors: [
      "Cabiltes, Nino Rey",
      "Dael, Andrei Philippe",
      "Kisteria, Alessandra Beatriz",
      "Pardillo, Jun Albert",
      "Repunte, Frenz Nicole",
    ],
  },
  {
    id: 61,
    title:
      "FIRE!: A Fire Simulation Game that Educates Filipinos on Fire Safety",
    authors: [
      "Benito, Matthew Josh Benedict",
      "Gomez, Enrique Jose Stefan",
      "Que, Nate Brevin",
    ],
  },
  {
    id: 65,
    title:
      "Birdview: Human Crowd Density Visualization Tool from Video Feed to Floor Plan using Deep Learning and Homography",
    authors: ["Dela Cruz, Shanmykel Ace", "Regis, Michael Anthony Jay"],
  },
  {
    id: 68,
    title:
      "Neuro-Symbolic Structure-Aware Visual Parsing of Handwritten Boolean Logic using Swin-Transformer and mBART Decoders",
    authors: [
      "Bascug, Felisa Melanie Fay",
      "Gemina, Roddneil",
      "Mendoza, Basil Xavier",
      "Arellano, Catherine",
    ],
  },
  {
    id: 70,
    title:
      "ReHaPT: Integrating Machine Learning and Computer Vision for a Hand Rehabilitation Recognition System",
    authors: [
      "Paguiligan, James Archer",
      "Azcarraga, Judith",
      "Cataluña, Jorice Erika",
      "Seperidad, Abigail",
    ],
  },
  {
    id: 76,
    title: "Sign Lang: Developing a VR Game for FSL Learning",
    authors: ["Chan, Caryl Rae", "Abarico, Michelle Kim Angela", "Vidal, Eric"],
  },
  {
    id: 77,
    title:
      "Technical Validation of an MDP-Based Adaptive Geometry Learning System via Q-Learning and LLM Hints",
    authors: [
      "Abellana, Paul Thomas",
      "Chavez, Francis Benedict",
      "Catubig, Niña Margarette",
      "Sta Romana, Cherry Lyn",
      "Tito, Almara",
    ],
  },
  {
    id: 80,
    title:
      "Evaluation of Target Encoding Methods Across Linear and Tree-Based Models for Cardiovascular Disease Prediction",
    authors: ["Cahilog, Kenneth"],
  },
  {
    id: 84,
    title:
      "AURIS: An LLM-Driven Framework for Structured Mental Health Assessment Using Mixture-of-Experts Architecture",
    authors: ["Tolentino, Tristan James"],
  },
];

type PaperTableProps = {
  papers: Paper[];
  query: string;
};

const AuthorList = ({ authors }: { authors: string[] }) => (
  <div className="flex flex-wrap gap-1">
    {authors.map((author) => (
      <span
        key={author}
        className="inline-block text-xs bg-brick-red-700/50 text-white/80 rounded px-1.5 py-0.5 leading-snug"
      >
        {author}
      </span>
    ))}
  </div>
);

const PaperTable = ({ papers, query }: PaperTableProps) => {
  const filtered = query.trim()
    ? papers.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.authors.some((a) =>
            a.toLowerCase().includes(query.toLowerCase()),
          ) ||
          String(p.id).includes(query.trim()),
      )
    : papers;

  if (filtered.length === 0)
    return (
      <p className="text-white/60 text-sm py-6 text-center">
        No papers match your search.
      </p>
    );

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="bg-brick-red-950/60 text-white/70 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 w-16 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold min-w-[240px]">Authors</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((paper) => (
              <tr
                key={paper.id}
                className="bg-brick-red-800/60 hover:bg-brick-red-700/60 transition-colors"
              >
                <td className="px-4 py-4 text-white/50 font-mono text-xs font-medium align-top">
                  {paper.id}
                </td>
                <td className="px-4 py-4 text-white font-medium align-top leading-snug">
                  {paper.title}
                </td>
                <td className="px-4 py-4 align-top">
                  <AuthorList authors={paper.authors} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <ul className="md:hidden space-y-3">
        {filtered.map((paper) => (
          <li
            key={paper.id}
            className="rounded-lg border border-white/10 bg-brick-red-800/60 p-4 ring-1 ring-inset ring-white/5"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-10 rounded bg-brick-red-600/60 text-white/60 text-xs font-mono font-semibold flex-shrink-0 mt-0.5">
                #{paper.id}
              </span>
              <div className="min-w-0 space-y-2">
                <p className="text-white font-semibold leading-snug text-sm">
                  {paper.title}
                </p>
                <AuthorList authors={paper.authors} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const PapersPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("accepted-papers");
  const [query, setQuery] = useState("");

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

  const tabs = [
    { id: "accepted-papers", label: "Accepted Papers", icon: Award },
    { id: "call-for-papers", label: "Call for Papers", icon: FileText },
    { id: "author-guidelines", label: "Author Guidelines", icon: BookOpen },
    { id: "proceedings", label: "Proceedings", icon: FileText },
  ];

  const heroMeta: Record<string, { title: string; description: string }> = {
    "accepted-papers": {
      title: "Accepted Papers",
      description:
        "Congratulations to all authors whose papers have been accepted for PCSC 2026. Below are the full and short papers selected through our double-blind peer review process.",
    },
    "call-for-papers": {
      title: "Call for Papers",
      description:
        "The 26th Philippine Computing Science Congress invites original research contributions in computing, computer science, computational science, and ICT.",
    },
    "author-guidelines": {
      title: "Author Guidelines",
      description:
        "Everything you need to format, prepare, and submit your paper for PCSC 2026 — templates, formatting requirements, and step-by-step submission instructions.",
    },
    proceedings: {
      title: "Proceedings",
      description:
        "The official conference proceedings for PCSC 2026, including all accepted full and short papers presented at the conference.",
    },
  };

  const renderCallForPapers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-10 sm:mb-12" data-animate="item">
        <p className="max-w-4xl text-white text-base sm:text-lg text-center mx-auto">
          The 26th Philippine Computing Science Congress is organized by the
          Computing Society of the Philippines to enable local and neighboring
          computing educators, researchers, ICT professionals, and students to
          interact and share their work in computing, computer science,
          computational science, and ICT.
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
              className="inline-flex items-center gap-2 text-rose-200 underline underline-offset-4 hover:text-rose-100 transition-colors"
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
                Remove any citation and references that contain the Authors. Use
                [Anonymous, 2008] and blind the reference list.
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
                concurrently to a journal or another conference/symposium. Each
                submitted paper will be peer-reviewed by at least two reviewers
                and must get an average positive rating for inclusion in the
                conference program and proceedings.
              </span>
            </li>
          </ul>

          <div className="bg-brick-red-50 border-l-4 border-brick-red-400 p-4 text-sm text-black mt-6 rounded-md shadow-sm">
            <p>
              The Microsoft CMT service was used for managing the peer-reviewing
              process for this conference. This service was provided for free by
              Microsoft and they bore all expenses, including costs for Azure
              cloud services as well as for software development and support.
            </p>
          </div>
        </div>

        {/* Important Dates */}
        <div
          className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5"
          data-animate="item"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">
              Important Dates
            </h3>
          </div>
          <div className="space-y-3 text-white">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span>Paper Submission Deadline</span>
              <span className="font-semibold text-white">
                January 31, 2026
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span>Author Notification</span>
              <span className="font-semibold text-white">March 9, 2026</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span>Camera-Ready Submission</span>
              <span className="font-semibold text-white">March 23, 2026</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Conference Dates</span>
              <span className="font-semibold text-white">
                April 23-25, 2026
              </span>
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
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          Paper Template
        </h2>

        <div className="rounded-lg border border-white/10 bg-brick-red-800 p-8 ring-1 ring-inset ring-white/5">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-white" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white">
              PCSC 2026 Template
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-white">
              All papers must be formatted according to the official PCSC 2026
              template. The template ensures consistency and proper formatting
              for publication.
            </p>
            <div className="flex flex-wrap gap-3">
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
        </div>
      </div>

      {/* Paper Formatting Requirements */}
      <div data-animate="item">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          Formatting Requirements
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Page Length & Structure
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-brick-red-400 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Length:</strong> Minimum 6 pages, maximum 8 pages
                  (including references)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-brick-red-400 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Format:</strong> Use the official PCSC 2026 template
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-brick-red-400 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Language:</strong> English only
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-brick-red-400 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>File Format:</strong> PDF only
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Content Structure
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Abstract:</strong> 150-250 words summarizing the paper
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Keywords:</strong> 3-5 relevant keywords
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Introduction:</strong> Problem statement and
                  motivation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Methodology:</strong> Research approach and methods
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  5
                </span>
                <span>
                  <strong>Results:</strong> Findings and analysis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  6
                </span>
                <span>
                  <strong>Conclusion:</strong> Summary and future work
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  7
                </span>
                <span>
                  <strong>References:</strong> Properly formatted citations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Double-Blind Review Guidelines */}
      <div data-animate="item">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          Double-Blind Review Guidelines
        </h2>

        <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-white" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">
              Important: Double-Blind Review Process
            </h3>
          </div>

          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong>Remove Author Information:</strong> Names, affiliations,
                and contact information must be completely removed from the
                manuscript.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong>Blind References:</strong> Remove any citations to your
                own work. Use [Anonymous, 2008] format and blind the reference
                list.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong>No Acknowledgments:</strong> Do not include
                acknowledgment sections or funding sources during the review
                process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                4
              </span>
              <span>
                <strong>Original Work:</strong> Papers must be original and not
                submitted concurrently to other venues.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Submission Process */}
      <div data-animate="item">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          Submission Process
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Step-by-Step Submission
            </h3>
            <ol className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Download and format your paper using the PCSC 2026 template
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Ensure your paper follows double-blind review guidelines
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Submit your paper through the CMT submission portal (to be
                  announced)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>Wait for notification of acceptance/rejection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  5
                </span>
                <span>
                  If accepted, submit camera-ready version with author
                  information
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Review Process
            </h3>
            <div className="space-y-3 text-white">
              <p>
                <strong>Peer Review:</strong> Each paper will be reviewed by at
                least two independent reviewers.
              </p>
              <p>
                <strong>Review Criteria:</strong> Papers are evaluated based on
                originality, technical quality, relevance, and presentation.
              </p>
              <p>
                <strong>Decision:</strong> Papers must receive an average
                positive rating for inclusion in the conference program.
              </p>
              <p>
                <strong>Feedback:</strong> Authors will receive detailed
                feedback from reviewers to improve their work.
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
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          PCSC 2026 Proceedings
        </h2>

        <div className="rounded-lg border border-white/10 bg-brick-red-800 p-8 ring-1 ring-inset ring-white/5">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white">
              Conference Proceedings
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-white">
              The proceedings for PCSC 2026 will be published and made available
              after the conference. All accepted papers will be included in the
              official conference proceedings.
            </p>

            <div className="bg-brick-red-100 border-l-4 border-brick-red-400 p-4 text-sm text-black rounded-md shadow-sm">
              <p>
                <strong>Note:</strong> Proceedings will be available for
                download after the conference concludes. Registered participants
                will receive access to the digital proceedings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Proceedings */}
      {/* <div data-animate="item">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Previous Proceedings</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-white" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">PCSC 2025</h3>
            </div>
            <p className="text-white mb-4">
              Proceedings from the 25th Philippine Computing Science Congress.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brick-red-400 hover:text-brick-red-300 transition-colors underline underline-offset-4"
            >
              View Proceedings
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-white" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">PCSC 2024</h3>
            </div>
            <p className="text-white mb-4">
              Proceedings from the 24th Philippine Computing Science Congress.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brick-red-400 hover:text-brick-red-300 transition-colors underline underline-offset-4"
            >
              View Proceedings
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div> */}

      {/* Publication Information */}
      <div data-animate="item">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
          Publication Information
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-brick-red-800 p-6 ring-1 ring-inset ring-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Publication Details
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  All accepted papers will be published in the conference
                  proceedings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Proceedings will be available in digital format for registered
                  participants
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Selected papers may be invited for publication in special
                  issues of journals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brick-red-600 text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  Authors retain copyright of their work while granting
                  conference publication rights
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcceptedPapers = () => (
    <div className="space-y-10">
      {/* Search */}
      <div data-animate="item">
        <div className="relative max-w-xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search by title, author, or paper ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-brick-red-800 pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-rose-300/60 transition"
            aria-label="Search accepted papers"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Full Papers */}
      <div data-animate="item" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-brick-red-800 border border-white/10 flex-shrink-0">
            <FileText className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Full Papers</h2>
            <p className="text-white/50 text-sm">{fullPapers.length} accepted</p>
          </div>
        </div>
        <PaperTable papers={fullPapers} query={query} />
      </div>

      {/* Short Papers */}
      <div data-animate="item" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-brick-red-800 border border-white/10 flex-shrink-0">
            <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Short Papers</h2>
            <p className="text-white/50 text-sm">{shortPapers.length} accepted</p>
          </div>
        </div>
        <PaperTable papers={shortPapers} query={query} />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "accepted-papers":
        return renderAcceptedPapers();
      case "call-for-papers":
        return renderCallForPapers();
      case "author-guidelines":
        return renderAuthorGuidelines();
      case "proceedings":
        return renderProceedings();
      default:
        return renderAcceptedPapers();
    }
  };

  return (
    <div className="pt-[116px] bg-brick-red-600">
      <PageHero
        title={heroMeta[activeTab].title}
        description={heroMeta[activeTab].description}
      />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <section ref={sectionRef} className="text-white">
          {/* Tab Navigation */}
          <div className="mb-12" data-animate="item">
            <div className="flex flex-wrap justify-center gap-2 bg-brick-red-800 p-2 rounded-lg border border-white/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-rose-500 text-white shadow-lg"
                        : "text-white hover:text-white hover:bg-brick-red-700"
                    }`}
                    aria-label={`Switch to ${tab.label} tab`}
                  >
                    <Icon
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">{renderTabContent()}</div>
        </section>
      </main>
    </div>
  );
};

export default PapersPage;
