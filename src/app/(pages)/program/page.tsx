"use client";
import PageHero from "../../components/sections/PageHero";
import { MapPin, Star, Users, Coffee, CalendarDays } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EventType = "featured" | "parallel" | "break" | "default";

type SubItem = { label: string; venue?: string };

type TimeSlot = {
  time: string;
  activity: ReactNode;
  venue?: string;
  subItems?: SubItem[];
  eventType?: EventType;
  badge?: string;
};

type DayProgram = {
  day: string;
  dayNumber: string;
  date: string;
  weekday: string;
  schedule: TimeSlot[];
};

const workshops123: SubItem[] = [
  { label: "Workshop 1: Transforming HCI Research in the Philippines Workshop 2026", venue: "OLP Hall" },
  { label: "Workshop 2: Quantum Computing for the Next Generation: Foundations, Myths, and Practical Pathways", venue: "JHS ORZ" },
  { label: "Workshop 3: Workshop on Models, Algorithms, Computability and Discrete Structure (WMACS)", venue: "JHS Comlab 1" },
];

const workshops12345: SubItem[] = [
  ...workshops123,
  { label: "Workshop 4: All-female Programming Competition", venue: "GS Comlab 1" },
  { label: "Workshop 5: Generative AI in Education", venue: "GS Comlab 2" },
];

const sessions1to4: SubItem[] = [
  { label: "Session 1", venue: "Rm. 305 OLP" },
  { label: "Session 2", venue: "Rm. 306 OLP" },
  { label: "Session 3", venue: "Rm. 307 OLP" },
  { label: "Session 4", venue: "Rm. 308 OLP" },
];

const sessions1to6: SubItem[] = [
  ...sessions1to4,
  { label: "Session 5", venue: "Rm. 309 OLP" },
  { label: "Session 6", venue: "Rm. 310 OLP" },
];

const programSchedule: DayProgram[] = [
  {
    day: "April 23, 2026",
    dayNumber: "Day 1",
    date: "April 23",
    weekday: "Thursday",
    schedule: [
      { time: "8:00AM - onwards", activity: "Registration", venue: "OLP Hall", eventType: "default" },
      {
        time: "8:00AM – 10:30AM",
        activity: "Parallel Workshops",
        subItems: workshops123,
        eventType: "parallel",
        badge: "Workshop",
      },
      { time: "10:30AM – 10:45AM", activity: "Morning Snacks", venue: "OLP Hall", eventType: "break" },
      {
        time: "10:45AM – 12:00NN",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops123,
        eventType: "parallel",
        badge: "Workshop",
      },
      { time: "12:00PM – 1:00PM", activity: "Lunch Break", venue: "OLP Hall", eventType: "break" },
      {
        time: "1:00PM – 2:30PM",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops12345,
        eventType: "parallel",
        badge: "Workshop",
      },
      { time: "2:30PM – 2:45PM", activity: "Afternoon Snacks", venue: "OLP Hall", eventType: "break" },
      {
        time: "2:45PM – 5:00PM",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops12345,
        eventType: "parallel",
        badge: "Workshop",
      },
    ],
  },
  {
    day: "April 24, 2026",
    dayNumber: "Day 2",
    date: "April 24",
    weekday: "Friday",
    schedule: [
      { time: "8:00AM – 9:00AM", activity: "Registration", venue: "OLP Hall", eventType: "default" },
      {
        time: "9:00AM – 9:15AM",
        venue: "OLP Hall",
        badge: "Opening",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Opening Ceremonies</strong>
            <div className="mt-2 space-y-2 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-1">Welcome Messages</p>
                <p><em>S. Ma. Marissa R. Viri, RVM</em> — President, University of the Immaculate Conception</p>
                <p><em>Mr. Ceasar Ian P. Benablo, MIT</em> — Dean, CCS, University of the Immaculate Conception</p>
              </div>
              <div>
                <p className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-1">Opening Remarks</p>
                <p><em>Dr. Cherry Lyn Sta. Romana</em> — President, CSP; Dean, CCS, Cebu Institute of Technology University</p>
                <p><em>Dr. Judith J. Azcarraga</em> — Vice President, CSP; PCSC 2026 Conference Chair; Associate Professor, De La Salle University</p>
                <p><em>Assoc Prof. Kristine Mae M. Adlaon</em> — Secretary, CSP; PCSC 2026 Local-Conference Chair; Associate Professor, University of the Immaculate Conception</p>
              </div>
            </div>
          </>
        ),
      },
      {
        time: "9:15AM – 10:00AM",
        venue: "OLP Hall",
        badge: "Plenary Talk 1",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">"Quality Education in Resource-challenged Schools with the help of Technology"</strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Prof. Raymund Sison</em> — University Fellow and Full Professor, College of Computer Studies, De La Salle University
            </p>
          </>
        ),
      },
      { time: "10:00AM – 10:15AM", activity: "Morning Snacks", venue: "OLP Hall", eventType: "break" },
      {
        time: "10:15AM – 11:00AM",
        venue: "OLP Hall",
        badge: "Plenary Talk 2",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">"Computer Vision Applications Across Disciplines"</strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Dr. John Jethro Virtusio</em> — College of Computer Studies, De La Salle University
            </p>
          </>
        ),
      },
      {
        time: "11:00AM – 12:30PM",
        activity: "Parallel Sessions (Paper Presentations)",
        subItems: sessions1to4,
        eventType: "parallel",
        badge: "Session",
      },
      { time: "12:30PM – 1:30PM", activity: "Lunch Break", venue: "OLP Hall", eventType: "break" },
      {
        time: "1:30PM – 2:15PM",
        venue: "OLP Hall",
        badge: "Plenary Talk 3",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">"Embodied AI for All: Bringing Intelligence to the Physical Edge"</strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Dr. Vladimir Mariano</em> — NICER Project, National University
            </p>
          </>
        ),
      },
      { time: "2:15PM – 2:30PM", activity: "Afternoon Snacks", venue: "OLP Hall", eventType: "break" },
      {
        time: "2:30PM – 4:00PM",
        activity: "Parallel Sessions (Paper Presentations)",
        subItems: sessions1to4,
        eventType: "parallel",
        badge: "Session",
      },
      {
        time: "4:00PM – 5:30PM",
        venue: "OLP Hall",
        badge: "Fireside Chat",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Oldies but Goldies</strong>
            <p className="mt-1 text-sm text-white/80 italic">"Advances and Challenges in Computing Research in the Age of AI"</p>
            <p className="mt-1 text-sm text-white/80">Facilitated by: <em>Dr. Henry Adorna</em></p>
          </>
        ),
      },
      { time: "5:30PM – 6:00PM", activity: "Board Meeting and President's Report", venue: "OLP Hall", eventType: "default" },
      { time: "6:00PM – 8:00PM", activity: "Conference Dinner", venue: "OLP Hall", eventType: "default" },
    ],
  },
  {
    day: "April 25, 2026",
    dayNumber: "Day 3",
    date: "April 25",
    weekday: "Saturday",
    schedule: [
      { time: "8:00AM – 9:00AM", activity: "Registration", venue: "OLP Hall", eventType: "default" },
      { time: "9:00AM – 9:15AM", activity: "Opening Remarks / Recapitulation", venue: "OLP Hall", eventType: "default" },
      {
        time: "9:15AM – 10:45AM",
        activity: "Parallel Sessions (Short Paper Presentations)",
        subItems: sessions1to6,
        eventType: "parallel",
        badge: "Session",
      },
      { time: "10:45AM – 11:00AM", activity: "Morning Snacks", venue: "OLP Hall", eventType: "break" },
      {
        time: "11:00AM – 12:30PM",
        venue: "OLP Hall",
        badge: "Closing",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Closing Ceremonies</strong>
            <div className="mt-2 space-y-0.5 text-sm text-white/80">
              <p>Results of Election of New Board Members</p>
              <p>Announcement of Special Awards</p>
            </div>
          </>
        ),
      },
      { time: "12:30PM – 1:30PM", activity: "Lunch Break", venue: "OLP Hall", eventType: "break" },
    ],
  },
];

const eventTypeIcon: Record<EventType, ReactNode> = {
  featured: <Star className="h-3.5 w-3.5" />,
  parallel: <Users className="h-3.5 w-3.5" />,
  break: <Coffee className="h-3.5 w-3.5" />,
  default: <CalendarDays className="h-3.5 w-3.5" />,
};

const eventTypeBadgeClass: Record<EventType, string> = {
  featured: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
  parallel: "bg-sky-400/20 text-sky-300 border border-sky-400/30",
  break: "bg-white/10 text-white/50 border border-white/10",
  default: "bg-white/10 text-white/60 border border-white/10",
};

const eventTypeCardClass: Record<EventType, string> = {
  featured: "border-l-4 border-l-amber-400 bg-brick-red-800/80 border border-white/10",
  parallel: "border-l-4 border-l-sky-400 bg-brick-red-800/60 border border-white/10",
  break: "bg-transparent border border-dashed border-white/15",
  default: "bg-brick-red-800/60 border border-white/10",
};

type TimelineRowProps = {
  slot: TimeSlot;
  isLast: boolean;
};

const TimelineRow = ({ slot, isLast }: TimelineRowProps) => {
  const type = slot.eventType ?? "default";
  const isBreak = type === "break";

  return (
    <div className="timeline-row flex gap-0 sm:gap-4 group">
      {/* Left: time + rail */}
      <div className="hidden sm:flex flex-col items-center w-36 shrink-0">
        <span className="text-xs font-mono text-white/50 text-right w-full leading-tight pt-1">{slot.time}</span>
      </div>

      {/* Center: dot + vertical line */}
      <div className="hidden sm:flex flex-col items-center shrink-0 w-6">
        <div
          className={`mt-2 h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-brick-red-950 z-10 ${
            type === "featured"
              ? "bg-amber-400 ring-amber-400/50"
              : type === "parallel"
              ? "bg-sky-400 ring-sky-400/50"
              : type === "break"
              ? "bg-white/20 ring-white/10"
              : "bg-white/40 ring-white/20"
          }`}
        />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-1" />}
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-4 min-w-0">
        {/* Mobile: time badge */}
        <div className="sm:hidden mb-1">
          <span className="text-xs font-mono text-white/50">{slot.time}</span>
        </div>

        {isBreak ? (
          <div className={`rounded-lg px-4 py-2.5 flex items-center gap-3 ${eventTypeCardClass[type]}`}>
            <Coffee className="h-3.5 w-3.5 shrink-0 text-white/40" />
            <span className="text-sm text-white/50">{slot.activity as string}</span>
            {slot.venue && (
              <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
                <MapPin className="h-3 w-3" />
                {slot.venue}
              </span>
            )}
          </div>
        ) : (
          <div className={`rounded-lg p-4 transition-colors hover:brightness-110 ${eventTypeCardClass[type]}`}>
            {/* Badge row */}
            {slot.badge && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${eventTypeBadgeClass[type]}`}
              >
                {eventTypeIcon[type]}
                {slot.badge}
              </span>
            )}

            {/* Activity */}
            <div className="text-white leading-snug">{slot.activity}</div>

            {/* Venue */}
            {slot.venue && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="h-3 w-3 shrink-0" />
                {slot.venue}
              </div>
            )}

            {/* SubItems chip grid */}
            {slot.subItems && slot.subItems.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                {slot.subItems.map((sub) => (
                  <div
                    key={sub.label}
                    className="rounded-md bg-brick-red-950/50 border border-white/10 px-3 py-2"
                  >
                    <p className="text-xs text-white/90 leading-snug">{sub.label}</p>
                    {sub.venue && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
                        <MapPin className="h-2.5 w-2.5 shrink-0" />
                        {sub.venue}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProgramPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = pageRef.current?.querySelectorAll(".timeline-row") ?? [];

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const headers = pageRef.current?.querySelectorAll(".day-header") ?? [];
      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-[116px] bg-brick-red-950">
      <PageHero title="Program" />

      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* Intro */}
        <p className="text-white text-base sm:text-lg max-w-3xl text-center mx-auto mb-16">
          The 26th Philippine Computing Science Congress is organized by the{" "}
          <a
            href="https://csp.org.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brick-red-200 underline underline-offset-2"
          >
            Computing Society of the Philippines
          </a>{" "}
          to enable local and neighboring computing educators, researchers, ICT professionals, and students to interact
          and share their work in computing, computer science, computational science, and ICT.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {(["featured", "parallel", "break", "default"] as EventType[]).map((t) => (
            <span
              key={t}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${eventTypeBadgeClass[t]}`}
            >
              {eventTypeIcon[t]}
              {t === "featured" ? "Plenary / Keynote" : t === "parallel" ? "Parallel Sessions" : t === "break" ? "Break" : "General"}
            </span>
          ))}
        </div>

        {/* Days */}
        <div className="space-y-20">
          {programSchedule.map((dayProgram) => (
            <section key={dayProgram.day} id={dayProgram.dayNumber.toLowerCase().replace(" ", "-")}>
              {/* Day Header */}
              <div className="day-header flex items-center gap-4 mb-8">
                <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-brick-red-700 border border-white/20">
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest leading-none">
                    {dayProgram.weekday.slice(0, 3)}
                  </span>
                  <span className="text-2xl font-black text-white leading-none">
                    {dayProgram.date.split(" ")[1]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brick-red-300">
                      {dayProgram.dayNumber}
                    </span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-xs text-white/50">{dayProgram.weekday}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{dayProgram.day}</h2>
                </div>
                <div className="flex-1 h-px bg-white/10 ml-2 hidden sm:block" />
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {dayProgram.schedule.map((slot, index) => (
                  <TimelineRow
                    key={`${dayProgram.day}-${index}`}
                    slot={slot}
                    isLast={index === dayProgram.schedule.length - 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProgramPage;
