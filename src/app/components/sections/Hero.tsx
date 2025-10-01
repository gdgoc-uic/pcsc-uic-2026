"use client";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Clock, Users, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "/images/hero/hero.jpg",
  "/images/hero/hero2.jpg", 
  "/images/hero/hero3.jpg",
  "/images/hero/hero4.jpg",
];


export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const zoomTweenRef = useRef<gsap.core.Tween | null>(null);
  const transitionTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if refs are available before animating
      if (!backgroundRef.current) return;

      // Initial background animation
      gsap.fromTo(backgroundRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );


      // Title animation
      if (titleRef.current?.children) {
        gsap.fromTo(titleRef.current.children,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, delay: 0.8, ease: "power2.out" }
        );
      }

      // Content section animation
      if (contentRef.current?.children) {
        gsap.fromTo(contentRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1.4, ease: "power2.out" }
        );
      }


      // Start continuous zoom effect after initial animations
      const startZoomEffect = () => {
        if (!backgroundRef.current) return;
        
        if (zoomTweenRef.current) zoomTweenRef.current.kill();
        
        zoomTweenRef.current = gsap.to(backgroundRef.current, {
          scale: 1.05,
          duration: 6,
          ease: "power1.inOut",
          onComplete: () => {
            if (!backgroundRef.current) return;
            
            zoomTweenRef.current = gsap.to(backgroundRef.current, {
              scale: 1,
              duration: 6,
              ease: "power1.inOut",
              onComplete: startZoomEffect
            });
          }
        });
      };

      // Start zoom effect after initial load
      const zoomTimeout = setTimeout(startZoomEffect, 3000);

      // Image transition function
      const imageTransition = () => {
        if (!backgroundRef.current) return;
        
        // Kill any existing transitions
        if (transitionTweenRef.current) transitionTweenRef.current.kill();
        if (zoomTweenRef.current) zoomTweenRef.current.kill();

        transitionTweenRef.current = gsap.to(backgroundRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
            
            // Wait for image to load, then fade in
            setTimeout(() => {
              if (!backgroundRef.current) return;
              
              gsap.fromTo(backgroundRef.current, {
                scale: 1.1,
                opacity: 0
              }, {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                  // Restart zoom effect after transition
                  setTimeout(startZoomEffect, 1000);
                }
              });
            }, 100);
          }
        });
      };

      // Set up image rotation every 6 seconds
      const interval = setInterval(imageTransition, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(zoomTimeout);
        if (zoomTweenRef.current) zoomTweenRef.current.kill();
        if (transitionTweenRef.current) transitionTweenRef.current.kill();
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden text-white">
      {/* Background Image Overlay */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-100"
        aria-hidden="true"
      >
        <Image
          src={heroImages[currentImageIndex]}
          alt="Hero background"
          fill
          className="object-cover grayscale"
          priority
          quality={90}
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-rose-900/60"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 min-h-screen flex flex-col justify-center">
        {/* Main Content */}
        <div className="max-w-5xl">
          {/* Main Headline */}
          <div ref={titleRef} className="mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight">
              <span className="block">26TH PHILIPPINE COMPUTING</span>
              <span className="block">SCIENCE CONGRESS</span>
            </h1>
          </div>
          

          {/* Event Details */}
          <div ref={contentRef} className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Calendar className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/80 font-medium">Date</p>
                  <p className="text-lg font-bold text-white">March 15-17, 2026</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/80 font-medium">Location</p>
                  <p className="text-lg font-bold text-white">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details & CTA */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/registration"
                className="group inline-flex items-center justify-center gap-2 bg-white text-rose-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-rose-50 transition-all duration-300 transform hover:scale-105"
              >
                Register Now
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link
                href="/program"
                className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-rose-900 transition-all duration-300"
              >
                View Program
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;


