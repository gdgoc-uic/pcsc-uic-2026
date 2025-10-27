"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/campus/1.jpeg",
    title: "Sto. Niño Building",
    description: "Grade School Department",
  },
  {
    src: "/images/campus/2.jpeg",
    title: "Immaculate Heart Building",
    description: "Junior High School Department",
  },
  {
    src: "/images/campus/3.jpeg",
    title: "Our Lady of Peace Building",
    description: "Senior High School Department",
  },
];

export default function HeroCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Optimized image transition animation
  const animateImageTransition = useCallback((newIndex: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (index === newIndex) {
        tl.to(ref, { opacity: 1, duration: 0.6 }, 0);
      } else {
        tl.to(ref, { opacity: 0, duration: 0.6 }, 0);
      }
    });

    timelineRef.current = tl;
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    },
    [handleNext, handlePrev],
  );

  // Initial GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Carousel initial setup
      if (carouselRef.current) {
        // Set all images to absolute positioning with proper stacking
        imageRefs.current.forEach((ref, index) => {
          if (ref) {
            gsap.set(ref, {
              opacity: index === 0 ? 1 : 0,
              willChange: "opacity",
            });
          }
        });

        // Animate carousel entrance
        gsap.fromTo(
          carouselRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  // Handle image transition when index changes
  useEffect(() => {
    animateImageTransition(currentIndex);
  }, [currentIndex, animateImageTransition]);

  // Keyboard navigation listener
  useEffect(() => {
    if (!carouselRef.current) return;

    const carouselElement = carouselRef.current;
    carouselElement.addEventListener("keydown", handleKeyDown);

    return () => {
      carouselElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  return (
    <section
      ref={carouselRef}
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-brick-red-700 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Hero images carousel"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
    >
      {/* Images */}
      <div className="relative w-full h-full bg-brick-red-900">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 drop-shadow-lg">
                {image.title}
              </h2>
              <p className="text-white/95 text-lg sm:text-xl md:text-2xl drop-shadow-md max-w-2xl">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center p-4 z-20">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center p-4 z-20">
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            ref={(el) => {
              indicatorRefs.current[index] = el;
            }}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex
                ? "bg-white/90"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
