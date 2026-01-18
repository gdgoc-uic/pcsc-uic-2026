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
  { href: "/workshop", label: "WORKSHOP" },
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
  const mobileMenuBtnRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      if (pathname !== "/") {
        // Ensure header is visible and no animation runs on non-home routes
        gsap.set(headerRef.current, {
          opacity: 1,
          y: 0,
          clearProps: "transform,willChange",
        });
        gsap.set([logoRef.current, ctaRef.current, mobileMenuBtnRef.current], {
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
      gsap.set([logoRef.current, ctaRef.current, mobileMenuBtnRef.current], {
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
          .to([ctaRef.current, mobileMenuBtnRef.current], { y: 0, opacity: 1 }, "-=0.3");
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

  // Handle click outside to close mobile menu and body scroll lock
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
      // Prevent body scroll when menu is open - comprehensive approach for all browsers
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      // Restore body scroll when menu is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const isHomePage = pathname === "/";

  return (
    <header
      ref={headerRef}
      className={`${isMobileMenuOpen ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 border-b border-white transition-all duration-500 ease-out ${
        isHomePage ? "bg-transparent" : "bg-brick-red-800"
      } ${isMobileMenuOpen ? 'bg-brick-red-800' : ''}`}
    >
      <div className="mx-auto w-full px-6 h-20 flex items-center justify-between">
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center gap-2 text-white font-bold text-base sm:text-lg md:text-xl"
          aria-label="PCSC 2026 Home"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
            <img
              src="/icon.png"
              alt="PCSC 2026 Logo"
              width={64}
              height={64}
              className="block w-full h-full object-contain"
              aria-label="PCSC 2026 Logo"
              tabIndex={-1}
              draggable={false}
            />
          </div>
          <span className="whitespace-nowrap">PCSC 2026</span>
        </Link>

        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-12 text-lg font-semibold text-white"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-1 hover:text-brick-red-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link ref={ctaRef}
            href="/registration"
            className="hidden sm:inline-flex items-center px-4 md:px-5 py-2 text-sm md:text-base text-white rounded bg-brick-red-600 font-semibold hover:bg-brick-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brick-red-300 focus:ring-offset-2 whitespace-nowrap"
            aria-label="Register Now"
            tabIndex={0}
          >
            REGISTER NOW
          </Link>
          <button 
            ref={mobileMenuBtnRef}
            className={`lg:hidden text-white hover:text-white transition-colors duration-200 p-2 bg-brick-red-600 rounded focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 ${
              isMobileMenuOpen 
                ? 'bg-brick-red-600' 
                : 'bg-brick-red-600'
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
        className={`lg:hidden fixed top-20 left-0 right-0 bg-brick-red-600 border-b border-white shadow-lg transition-all duration-300 ease-out transform max-h-[calc(100vh-5rem)] overflow-y-auto ${
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
              className={`block px-3 py-3 text-lg font-semibold text-white hover:text-white hover:bg-brick-red-800 rounded transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transform ${
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
