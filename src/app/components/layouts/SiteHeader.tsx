"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { href: "/program", label: "PROGRAM" },
  { href: "/papers", label: "PAPERS" },
  //{ href: "/srw", label: "SRW" },
  { href: "/venue", label: "VENUE" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT US" },
];

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (pathname !== "/") {
        // Ensure header is visible and no animation runs on non-home routes
        gsap.set(headerRef.current, {
          opacity: 1,
          y: 0,
          clearProps: "transform,willChange",
        });
        gsap.set([logoRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          clearProps: "transform,willChange",
        });
        const anchors = navRef.current
          ? Array.from(navRef.current.querySelectorAll("a"))
          : [];
        if (anchors.length) {
          gsap.set(anchors, {
            opacity: 1,
            y: 0,
            clearProps: "transform,willChange",
          });
        }
        return;
      }

      // set initial state for smoother animation
      gsap.set(headerRef.current, {
        y: -16,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set([logoRef.current, ctaRef.current], {
        opacity: 0,
        y: 8,
        willChange: "transform, opacity",
      });
      const anchorsInit = navRef.current
        ? Array.from(navRef.current.querySelectorAll("a"))
        : [];
      if (anchorsInit.length)
        gsap.set(anchorsInit, {
          opacity: 0,
          y: 8,
          willChange: "transform, opacity",
        });

      const play = () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.5 },
        });

        const navAnchors = navRef.current
          ? Array.from(navRef.current.querySelectorAll("a"))
          : [];

        timeline
          .to(headerRef.current, { y: 0, opacity: 1, duration: 0.45 })
          .to(logoRef.current, { y: 0, opacity: 1 }, "-=0.3")
          .to(navAnchors, { y: 0, opacity: 1, stagger: 0.05 }, "-=0.25")
          .to(ctaRef.current, { y: 0, opacity: 1 }, "-=0.3");
      };

      const onHeadlineDone = () => play();
      window.addEventListener("heroHeadlineDone", onHeadlineDone, {
        once: true,
      });
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
    { dependencies: [pathname], scope: headerRef },
  );

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label*="menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle escape key to close mobile menu
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const isHomePage = pathname === "/";

  return (
    <header
      ref={headerRef}
      className={`absolute top-0 left-0 right-0 z-50 border-b border-white transition-all duration-500 ease-out ${
        isHomePage ? "bg-transparent" : "bg-rose-950"
      }`}
    >
      <div className="mx-auto w-full px-6 h-20 flex items-center justify-between">
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center gap-2 text-white font-bold text-xl"
          aria-label="PCSC 2026 Home"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src="/icon.png"
              alt="PCSC 2026 Logo"
              width={64}
              height={64}
              className="block"
              aria-label="PCSC 2026 Logo"
              tabIndex={-1}
              draggable={false}
            />
          </div>
          <span>PCSC 2026</span>
        </Link>

        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-12 text-lg font-semibold text-white"
        >
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
          <Link ref={ctaRef}
            href="/registration"
            className="inline-flex items-center px-5 py-2 text-white rounded bg-rose-400 font-semibold hover:bg-rose-300 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
            aria-label="Register Now"
            tabIndex={0}
          >
            REGISTER NOW
          </Link>
          <button 
            className={`lg:hidden text-white hover:text-rose-300 transition-colors duration-200 p-2 bg-rose-600 rounded focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 ${
              isMobileMenuOpen 
                ? 'bg-rose-500' 
                : 'bg-rose-600'
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={handleMobileMenuToggle}
            tabIndex={0}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu 
                className={`absolute w-5 h-5 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen 
                    ? 'opacity-0 rotate-45 scale-75' 
                    : 'opacity-100 rotate-0 scale-100'
                }`} 
              />
              <X 
                className={`absolute w-5 h-5 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-45 scale-75'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden absolute top-full left-0 right-0 bg-rose-950 border-b border-white shadow-lg transition-all duration-300 ease-out transform ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-2 invisible'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link, index) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`block px-3 py-3 text-lg font-semibold text-white hover:text-rose-300 hover:bg-rose-800 rounded transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transform ${
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-2 opacity-0'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms'
              }}
              onClick={handleMobileMenuClose}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
