"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Speaker = {
  name: string;
  title: string;
  image: string;
};

const speakers: Speaker[] = [
  {
    name: "Katey Black",
    title: "CREATIVE DESIGNER",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop",
  },
  {
    name: "Christian Grant",
    title: "DESIGN DIRECTOR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  },
  {
    name: "Michelle Larson",
    title: "SENIOR PRODUCT DESIGNER",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
  },
  {
    name: "Mark Petterson",
    title: "DESIGN GUILD LEAD",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop",
  },
  {
    name: "Marry Conor",
    title: "SENIOR UI/UX DESIGNER",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop",
  },
];

export const SpeakersTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unified scroll-triggered entrance animation
      gsap.fromTo(
        cardsRef.current?.children || [],
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
            toggleActions: "play none none reverse",
          },
        },
      );

      // Unified hover animations for each card
      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        const img = card.querySelector("img");
        const arrow = card.querySelector("svg");

        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power2.out" });
          gsap.to(arrow, { x: 4, y: -4, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="bg-rose-900 text-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {speakers.map((speaker, index) => (
            <Link
              key={index}
              href={`#speaker-${index}`}
              className="group relative overflow-hidden bg-rose-500/20 rounded-lg cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-xs font-semibold text-rose-50 mb-1">
                  {speaker.title}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{speaker.name}</h3>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === 0 ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersTeaser;
