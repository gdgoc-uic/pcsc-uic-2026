"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { href: "/program", label: "PROGRAM" },
  { href: "/papers", label: "PAPERS" },
  { href: "/srw", label: "SRW" },
  { href: "/venue", label: "VENUE" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT US" }
];

export const SiteHeader = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      if (pathname !== "/") {
        // Ensure header is visible and no animation runs on non-home routes
        gsap.set([headerRef.current, logoRef.current, ctaRef.current], { clearProps: "all" });
        const anchors = navRef.current ? Array.from(navRef.current.querySelectorAll("a")) : [];
        if (anchors.length) gsap.set(anchors, { clearProps: "all" });
        return;
      }

      // set initial state for smoother animation
      gsap.set(headerRef.current, { y: -16, opacity: 0, willChange: "transform, opacity" });
      gsap.set([logoRef.current, ctaRef.current], { opacity: 0, y: 8, willChange: "transform, opacity" });
      const anchorsInit = navRef.current ? Array.from(navRef.current.querySelectorAll("a")) : [];
      if (anchorsInit.length) gsap.set(anchorsInit, { opacity: 0, y: 8, willChange: "transform, opacity" });

      const play = () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.5 } });

        const navAnchors = navRef.current ? Array.from(navRef.current.querySelectorAll("a")) : [];

        timeline
          .to(headerRef.current, { y: 0, opacity: 1, duration: 0.45 })
          .to(logoRef.current, { y: 0, opacity: 1 }, "-=0.3")
          .to(navAnchors, { y: 0, opacity: 1, stagger: 0.05 }, "-=0.25")
          .to(ctaRef.current, { y: 0, opacity: 1 }, "-=0.3");
      };

      const onHeadlineDone = () => play();
      window.addEventListener("heroHeadlineDone", onHeadlineDone, { once: true });
      // if hero already finished, play immediately, else shorter fallback
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const alreadyDone = (window as any).__heroHeadlineDone;
      if (alreadyDone) play();
      const fallback = window.setTimeout(() => {
        if (!(window as any).__heroHeadlineDone) play();
      }, 1200);

      return () => {
        window.removeEventListener("heroHeadlineDone", onHeadlineDone);
        window.clearTimeout(fallback);
      };
    },
    { dependencies: [pathname], scope: headerRef }
  );
  return (
    <header ref={headerRef} className="absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-white">
      <div className="mx-auto w-full px-6 h-20 flex items-center justify-between">
        <Link 
          ref={logoRef}
          href="/" 
          className="flex items-center gap-2 text-white font-bold text-xl" 
          aria-label="ITconf Home"
        >
          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span>PCSC 2026</span>
        </Link>
        
        <nav ref={navRef} className="hidden lg:flex items-center gap-12 text-lg font-semibold text-white">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="px-2 py-1 hover:text-rose-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            ref={ctaRef}
            href="/registration"
            className="inline-flex items-center px-5 py-2 text-white rounded bg-rose-400 font-semibold hover:bg-rose-300 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
            aria-label="Register Now"
            tabIndex={0}
          >
            REGISTER NOW
          </Link>
          <button 
            className="lg:hidden text-white hover:text-rose-300 transition-colors p-2 bg-rose-600 rounded"
            aria-label="Menu"
            tabIndex={0}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
