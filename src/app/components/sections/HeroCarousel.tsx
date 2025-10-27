"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/campus/1.jpeg",
    title: "Main Campus Building",
    description: "The iconic main building of UIC Bajada Campus"
  },
  {
    src: "/images/campus/2.jpeg", 
    title: "Campus Grounds",
    description: "Beautiful landscaped grounds and walkways"
  },
  {
    src: "/images/campus/3.jpeg",
    title: "Modern Facilities", 
    description: "State-of-the-art facilities and infrastructure"
  }
];

export default function HeroCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(imageRefs.current, {
        opacity: 0,
        scale: 1.1,
        x: 0,
        y: 0,
      });

      // Set first image as active
      if (imageRefs.current[0]) {
        gsap.set(imageRefs.current[0], { opacity: 1, scale: 1 });
      }

    }, carouselRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate current image
      imageRefs.current.forEach((ref, index) => {
        if (ref) {
          if (index === currentIndex) {
            gsap.to(ref, {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            });
          } else {
            gsap.to(ref, {
              opacity: 0,
              scale: 1.1,
              duration: 0.8,
              ease: "power2.inOut"
            });
          }
        }
      });

      // Animate indicators
      indicatorRefs.current.forEach((ref, index) => {
        if (ref) {
          if (index === currentIndex) {
            gsap.to(ref, {
              scale: 1.2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              duration: 0.3,
              ease: "power2.out"
            });
          } else {
            gsap.to(ref, {
              scale: 1,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

    }, carouselRef);

    return () => ctx.revert();
  }, [currentIndex]);

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
    >
      {/* Images */}
      <div className="relative w-full h-full bg-brick-red-900">
        {images.map((image, index) => (
          <div 
            key={index} 
            ref={(el) => { imageRefs.current[index] = el; }}
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
          </div>
        ))}
      </div>


      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center p-4">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center p-4">
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>


      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            ref={(el) => { indicatorRefs.current[index] = el; }}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex 
                ? 'bg-white/90' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}