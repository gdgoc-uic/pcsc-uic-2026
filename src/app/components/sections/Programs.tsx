import Link from "next/link";
import {
  Calendar,
  Mic2,
  FlaskConical,
  BookOpen,
  Users,
  GraduationCap,
  Image as ImageIcon,
  PartyPopper,
  Clock,
} from "lucide-react";

type ProgramItem = {
  title: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const programItems: ProgramItem[] = [
  {
    title: "Keynotes",
    description: "Talks from invited leaders across computing disciplines.",
    href: "/program#keynotes",
    Icon: Mic2,
  },
  {
    title: "Paper Sessions",
    description: "Oral presentations of peer-reviewed research papers.",
    href: "/program#papers",
    Icon: BookOpen,
  },
  {
    title: "Workshops",
    description: "Hands-on, topic-focused sessions led by experts.",
    href: "/program#workshops",
    Icon: FlaskConical,
  },
  {
    title: "Tutorials",
    description: "In-depth learning on emerging tools and methods.",
    href: "/program#tutorials",
    Icon: GraduationCap,
  },
  {
    title: "Panels",
    description: "Moderated discussions on trends and grand challenges.",
    href: "/program#panels",
    Icon: Users,
  },
  {
    title: "Student Research Workshop",
    description: "Mentored presentations and feedback for student work.",
    href: "/student-research-workshop",
    Icon: GraduationCap,
  },
  {
    title: "Posters",
    description: "Interactive poster sessions showcasing ongoing research.",
    href: "/program#posters",
    Icon: ImageIcon,
  },
  {
    title: "Social Events",
    description: "Connect with peers through mixers and networking breaks.",
    href: "/program#social",
    Icon: PartyPopper,
  },
];

export const Programs = () => {
  return (
    <section id="programs" className="bg-rose-900 text-rose-50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-10 sm:mb-12 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-rose-200" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Programs</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {programItems.map(({ title, description, href, Icon }) => (
            <Link
              key={title}
              href={href}
              aria-label={`View details for ${title}`}
              className="group rounded-lg border border-white/10 bg-rose-950/40 p-6 ring-1 ring-inset ring-white/5 transition shadow-sm hover:shadow-md hover:bg-rose-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rose-800/60 text-rose-50 ring-1 ring-white/10">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-rose-100/80">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-rose-200 group-hover:text-white">
                    Learn more
                    <span className="ml-2 inline-block translate-x-0 -translate-y-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 text-sm text-rose-100/80">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-rose-950/40 px-3 py-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>Full schedule available on the Program page</span>
          </div>
          <Link
            href="/program"
            aria-label="View the full program schedule"
            className="font-semibold text-rose-200 underline-offset-4 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 rounded"
          >
            View full program →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;


