"use client";
import { 
  Cpu, 
  Database, 
  Shield, 
  Code, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Zap,
  MessageSquare,
  Brain,
  Heart,
  Binary,
  Activity,
  Network,
  Smartphone,
  Wrench,
  Search,
  Sparkles
} from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AreaOfInterestItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const areasOfInterest: AreaOfInterestItem[] = [
  {
    title: "Natural Language Processing",
    description: "Text analysis, language models, machine translation, sentiment analysis, and computational linguistics",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "bg-blue-500/20 border-blue-400/30 text-blue-100",
  },
  {
    title: "Intelligent Systems (AI and Computational Intelligence)",
    description: "AI and computational intelligence, expert systems, knowledge representation, and reasoning",
    icon: <Brain className="h-6 w-6" />,
    color: "bg-green-500/20 border-green-400/30 text-green-100",
  },
  {
    title: "Affective and Empathic Computing",
    description: "Emotion recognition, affective computing, human-computer empathy, and social computing",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-purple-500/20 border-purple-400/30 text-purple-100",
  },
  {
    title: "Computational Theory and Algorithms",
    description: "Algorithm design, complexity analysis, graph theory, optimization, and theoretical computer science",
    icon: <Binary className="h-6 w-6" />,
    color: "bg-yellow-500/20 border-yellow-400/30 text-yellow-100",
  },
  {
    title: "Modeling and Simulation",
    description: "Mathematical modeling, discrete event simulation, agent-based modeling, and computational physics",
    icon: <Activity className="h-6 w-6" />,
    color: "bg-red-500/20 border-red-400/30 text-red-100",
  },
  {
    title: "Computer Networks",
    description: "Network protocols, distributed systems, wireless networks, and network security",
    icon: <Network className="h-6 w-6" />,
    color: "bg-indigo-500/20 border-indigo-400/30 text-indigo-100",
  },
  {
    title: "Ubiquitous and Pervasive Computing",
    description: "Mobile computing, context-aware systems, Internet of Things, and ambient intelligence",
    icon: <Smartphone className="h-6 w-6" />,
    color: "bg-pink-500/20 border-pink-400/30 text-pink-100",
  },
  {
    title: "Software Engineering",
    description: "Software development methodologies, requirements engineering, testing, and maintenance",
    icon: <Wrench className="h-6 w-6" />,
    color: "bg-orange-500/20 border-orange-400/30 text-orange-100",
  },
  {
    title: "Databases and Information",
    description: "Database systems, data management, information retrieval, and knowledge bases",
    icon: <Database className="h-6 w-6" />,
    color: "bg-teal-500/20 border-teal-400/30 text-teal-100",
  },
  {
    title: "Databases and Information Retrieval Systems",
    description: "Search engines, recommender systems, content-based retrieval, and multimedia information retrieval",
    icon: <Search className="h-6 w-6" />,
    color: "bg-cyan-500/20 border-cyan-400/30 text-cyan-100",
  },
  {
    title: "Emerging Areas in Computing",
    description: "Quantum computing, blockchain, edge computing, bioinformatics, and interdisciplinary applications",
    icon: <Sparkles className="h-6 w-6" />,
    color: "bg-emerald-500/20 border-emerald-400/30 text-emerald-100",
  },
];

export const AreaOfInterest = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unified scroll-triggered entrance animation
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Unified hover animations for each card
      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        const icon = card.querySelector('.icon-wrapper');
        
        gsap.set(card, { transformOrigin: "center center" });
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, y: -4, duration: 0.3, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, { scale: 1.08, rotation: 5, duration: 0.3, ease: "power2.out" });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="areas-of-interest" className="bg-brick-red-600 text-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-white text-lg max-w-3xl mx-auto">
            Explore the diverse topics and research areas covered at PCSC 2026
          </p>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-4">
            (But are Not Limited to)
          </p>
        </div>

        {/* Areas Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {areasOfInterest.map((area, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-lg border backdrop-blur-sm transition-all duration-300 ${area.color} hover:bg-opacity-30`}
            >
              {/* Icon */}
              <div className="icon-wrapper mb-4 p-3 rounded-full bg-white/10 w-fit">
                {area.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-white">
                {area.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-current opacity-90">
                {area.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-current group-hover:border-opacity-50 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreaOfInterest;
