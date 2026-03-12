"use client";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const zoomTweenRef = useRef<gsap.core.Tween | null>(null);
  const transitionTweenRef = useRef<gsap.core.Tween | null>(null);
  const registerBtnRef = useRef<HTMLAnchorElement>(null);
  const programBtnRef = useRef<HTMLAnchorElement>(null);
  const registerIconRef = useRef<SVGSVGElement>(null);
  const programIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Reset the global flag when component mounts
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__heroHeadlineDone = false;
    }

    const ctx = gsap.context(() => {
      // Check if refs are available before animating
      if (!backgroundRef.current) return;

      // Initial background animation
      gsap.fromTo(backgroundRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );


      // Headline text animation (per-word professional fade & rise, left-to-right across lines)
      if (titleRef.current) {
        const lineSpans = Array.from(titleRef.current.querySelectorAll("span.block"));
        const createdWords: HTMLElement[] = [];

        const splitTextToWords = (el: HTMLElement) => {
          // First, restore any previously modified text using data attribute
          const originalStored = el.getAttribute("data-original-html");
          if (originalStored) {
            el.innerHTML = originalStored;
          } else {
            // Store the original innerHTML before first modification
            el.setAttribute("data-original-html", el.innerHTML);
          }
          
          // Get all text nodes and inline spans within this block
          const textContent = el.textContent ?? "";
          const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
          
          // Clear the element and rebuild with word spans
          el.textContent = "";
          el.setAttribute("aria-label", textContent.trim());
          
          words.forEach((word) => {
            const wordSpan = document.createElement("span");
            wordSpan.textContent = word;
            wordSpan.setAttribute("aria-hidden", "true");
            wordSpan.style.display = "inline-block";
            wordSpan.style.willChange = "transform, opacity, filter";
            wordSpan.style.marginRight = "0.25em";
            el.appendChild(wordSpan);
            createdWords.push(wordSpan);
          });
        };

        // build words in visual reading order: first line then second line
        lineSpans.forEach((line) => {
          splitTextToWords(line as HTMLElement)
        });

        if (createdWords.length) {
          const wordsTween = gsap.fromTo(createdWords,
            { y: 28, opacity: 0, filter: "blur(4px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out", stagger: { each: 0.08, from: 0 }, delay: 0.55 }
          );
          wordsTween.eventCallback("onComplete", () => {
            if (typeof window !== "undefined") {
              // mark global flag to avoid race conditions with header listener
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).__heroHeadlineDone = true;
              window.dispatchEvent(new Event("heroHeadlineDone"));
            }
          });
        }
      }

      // Content section animation
      if (contentRef.current?.children) {
        gsap.fromTo(contentRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1.4, ease: "power2.out" }
        );
      }

      // CTA buttons entrance animation
      const ctaButtons: HTMLAnchorElement[] = [registerBtnRef.current, programBtnRef.current].filter(Boolean) as HTMLAnchorElement[];
      if (ctaButtons.length) {
        gsap.fromTo(ctaButtons,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 1.6, ease: "power2.out" }
        );
      }

      // CTA hover interactions
      type HoverBinding = {
        btn: HTMLAnchorElement;
        enter: (e: Event) => void;
        leave: (e: Event) => void;
        tl: gsap.core.Timeline;
      };
      const hoverBindings: HoverBinding[] = [];

      const attachHover = (btn: HTMLAnchorElement | null, icon: SVGSVGElement | null) => {
        if (!btn) return;
        const timeline = gsap.timeline({ paused: true });
        timeline.to(btn, { y: -3, scale: 1.04, duration: 0.28, ease: "power3.out", boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }, 0);
        if (icon) {
          timeline.to(icon, { x: 6, y: -6, rotate: 15, duration: 0.28, ease: "power3.out" }, 0);
        }
        const onEnter = () => timeline.play();
        const onLeave = () => timeline.reverse();
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("focus", onEnter);
        btn.addEventListener("blur", onLeave);
        hoverBindings.push({ btn, enter: onEnter, leave: onLeave, tl: timeline });
      };

      attachHover(registerBtnRef.current, registerIconRef.current);
      attachHover(programBtnRef.current, programIconRef.current);


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
      const interval = setInterval(imageTransition, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(zoomTimeout);
        if (zoomTweenRef.current) zoomTweenRef.current.kill();
        if (transitionTweenRef.current) transitionTweenRef.current.kill();
        // cleanup CTA hover listeners and timelines
        hoverBindings.forEach(({ btn, enter, leave, tl }) => {
          btn.removeEventListener("mouseenter", enter);
          btn.removeEventListener("mouseleave", leave);
          btn.removeEventListener("focus", enter);
          btn.removeEventListener("blur", leave);
          tl.kill();
        });
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
      <div className="absolute inset-0 bg-brick-red-600/50"></div>
      
      <div className="relative mx-auto max-w-full px-3 sm:px-6 pt-24 pb-16 sm:pb-32 min-h-screen flex flex-col justify-end">
        {/* Main Content */}
        <div className="w-full max-w-full overflow-hidden">
          {/* Main Headline */}
          <div ref={titleRef} className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.25] sm:leading-[1.1] md:leading-[0.95] tracking-tight">
              <span className="block mb-2 sm:mb-0">
                <span className="inline">26TH PHILIPPINE</span>{' '}
                <span className="inline">COMPUTING</span>
              </span>
              <span className="block">SCIENCE CONGRESS</span>
            </h1>
          </div>
          

          {/* Event Details */}
          <div ref={contentRef} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
              {/* Date */}
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm sm:text-lg font-bold text-white">April 23 - 25</p>
                  <p className="text-xs sm:text-sm text-white/80 font-medium">2026</p>
                </div>
              </div>

              {/* Location */}
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 max-w-full">
                <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                <div className="min-w-0"> 
                  <p className="text-sm sm:text-lg font-bold text-white break-words">University of the Immaculate Conception</p>
                  <p className="text-xs sm:text-sm text-white font-medium">Davao City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details & CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Link
                href="/registration"
                ref={registerBtnRef}
                aria-label="Register for PCSC 2026"
                className="group inline-flex items-center justify-center gap-2 bg-white text-brick-red-600 px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Register Now
                <ArrowUpRight ref={registerIconRef} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
              </Link>
              
              <Link
                href="/program"
                ref={programBtnRef}
                aria-label="View event program"
                className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                View Program
                <ArrowUpRight ref={programIconRef} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;


