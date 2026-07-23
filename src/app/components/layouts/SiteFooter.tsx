import Link from "next/link";

const links = [
  { href: "/program", label: "Program" },
  { href: "/papers", label: "Proceedings & Papers" },
  { href: "/venue", label: "Venue" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

export const SiteFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-brick-red-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm">
          © 2026 · Computing Society of the Philippines
        </p>
        <nav className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-brick-red-300 underline-offset-4 hover:underline whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
