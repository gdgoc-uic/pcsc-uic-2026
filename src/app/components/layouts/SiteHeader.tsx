"use client";
import Link from "next/link";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/pages", label: "PAGES" },
  { href: "/blog", label: "BLOG" },
  { href: "/events", label: "EVENTS" },
  { href: "/shop", label: "SHOP" },
  { href: "/contact", label: "CONTACTS" },
];

export const SiteHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white font-bold text-xl" 
          aria-label="ITconf Home"
        >
          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span>ITconf</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:text-rose-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
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
