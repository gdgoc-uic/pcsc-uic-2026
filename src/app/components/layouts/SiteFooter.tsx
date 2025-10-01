import Link from "next/link";

const links = [
  { href: "/program", label: "Program" },
  { href: "/registration", label: "Register" },
  { href: "/accepted-papers", label: "Accepted Papers" },
  { href: "/student-research-workshop", label: "SRW" },
  { href: "/author-guidelines", label: "Author Guidelines" },
  { href: "/proceedings", label: "Proceedings" },
  { href: "/contact", label: "Contact" },
];

export const SiteFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-rose-950 text-rose-200">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">© 2023 · Computing Society of the Philippines</p>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-rose-100 underline-offset-4 hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;


