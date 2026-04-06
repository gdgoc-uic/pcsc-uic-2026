"use client";
import Link from "next/link";
import { MapPin, Star, Users, Coffee, CalendarDays } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EventType = "featured" | "parallel" | "break" | "default";

type TimeSlot = {
  time: string;
  activity: string;
  badge?: string;
  speakerName?: string;
  eventType?: EventType;
};

type DayProgram = {
  dayNumber: string;
  date: string;
  weekday: string;
  schedule: TimeSlot[];
  totalEvents: number;
};

const eventTypeIcon: Record<EventType, ReactNode> = {
  featured: <Star className="h-3 w-3" />,
  parallel: <Users className="h-3 w-3" />,
  break: <Coffee className="h-3 w-3" />,
  default: <CalendarDays className="h-3 w-3" />,
};

const eventTypeBadgeClass: Record<EventType, string> = {
  featured: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
  parallel: "bg-sky-400/20 text-sky-300 border border-sky-400/30",
  break: "bg-white/10 text-white/50 border border-white/10",
  default: "bg-white/10 text-white/60 border border-white/10",
};

const eventTypeCardClass: Record<EventType, string> = {
  featured: "border-l-2 border-l-amber-400 bg-brick-red-800/80 border border-white/10",
  parallel: "border-l-2 border-l-sky-400 bg-brick-red-800/60 border border-white/10",
  break: "bg-transparent border border-dashed border-white/15",
  default: "bg-brick-red-800/60 border border-white/10",
};

const programSchedule: DayProgram[] = [
  {
    dayNumber: "Day 1",
    date: "April 23",
    weekday: "Thursday",
    totalEvents: 8,
    schedule: [
      { time: "8:00AM onwards", activity: "Registration", eventType: "default" },
      {
        time: "8:00AM – 12:00NN",
        activity: "Parallel Workshops",
        badge: "Workshop",
        eventType: "parallel",
        speakerName: "HCI Research · Quantum Computing · WMACS",
      },
      {
        time: "1:00PM – 5:00PM",
        activity: "Parallel Workshops (cont.)",
        badge: "Workshop",
        eventType: "parallel",
        speakerName: "+ All-female Programming · Generative AI in Education",
      },
    ],
  },
  {
    dayNumber: "Day 2",
    date: "April 24",
    weekday: "Friday",
    totalEvents: 11,
    schedule: [
      {
        time: "9:00AM – 9:15AM",
        activity: "Opening Ceremonies",
        badge: "Opening",
        eventType: "featured",
      },
      {
        time: "9:15AM – 10:00AM",
        activity: "\"Quality Education in Resource-challenged Schools with the help of Technology\"",
        badge: "Plenary Talk 1",
        eventType: "featured",
        speakerName: "Prof. Raymund Sison",
      },
      {
        time: "10:15AM – 11:00AM",
        activity: "\"Computer Vision Applications Across Disciplines\"",
        badge: "Plenary Talk 2",
        eventType: "featured",
        speakerName: "Dr. John Jethro Virtusio",
      },
      {
        time: "1:30PM – 2:15PM",
        activity: "\"Embodied AI for All: Bringing Intelligence to the Physical Edge\"",
        badge: "Plenary Talk 3",
        eventType: "featured",
        speakerName: "Dr. Vladimir Mariano",
      },
      {
        time: "4:00PM – 5:30PM",
        activity: "Oldies but Goldies — \"Advances and Challenges in Computing Research in the Age of AI\"",
        badge: "Fireside Chat",
        eventType: "featured",
      },
      {
        time: "6:00PM – 8:00PM",
        activity: "Conference Dinner",
        eventType: "default",
      },
    ],
  },
  {
    dayNumber: "Day 3",
    date: "April 25",
    weekday: "Saturday",
    totalEvents: 6,
    schedule: [
      {
        time: "9:15AM – 10:45AM",
        activity: "Short Paper Presentations",
        badge: "Session",
        eventType: "parallel",
        speakerName: "Sessions 1–6 across rooms",
      },
      {
        time: "11:00AM – 12:30PM",
        activity: "Closing Ceremonies",
        badge: "Closing",
        eventType: "featured",
        speakerName: "Election Results · Special Awards",
      },
      {
        time: "12:30PM – 1:30PM",
        activity: "Lunch Break",
        eventType: "break",
      },
    ],
  },
];

export const Programs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, y: -4, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="bg-brick-red-950 text-rose-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-white text-base sm:text-lg max-w-3xl text-center mx-auto">
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
        </div>

        {/* 3-Day Program Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {programSchedule.map((dayProgram) => {
            const hiddenCount = dayProgram.totalEvents - dayProgram.schedule.length;

            return (
              <div
                key={dayProgram.dayNumber}
                className="group relative overflow-hidden bg-brick-red-800 rounded-xl cursor-pointer"
              >
                <div className="relative p-6 flex flex-col h-full">
                  {/* Day Header */}
                  <div className="mb-5 flex items-center gap-3 border-b border-white/15 pb-4">
                    <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-brick-red-700 border border-white/20">
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none">
                        {dayProgram.weekday.slice(0, 3)}
                      </span>
                      <span className="text-2xl font-black text-white leading-none">
                        {dayProgram.date.split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-brick-red-300">
                        {dayProgram.dayNumber}
                      </span>
                      <p className="text-base font-semibold text-white leading-tight">
                        {dayProgram.weekday}, {dayProgram.date}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Teaser */}
                  <div className="space-y-2 flex-1">
                    {dayProgram.schedule.map((slot) => {
                      const type = slot.eventType ?? "default";
                      const isBreak = type === "break";
                      const slotKey = `${dayProgram.dayNumber}-${slot.time}`;

                      if (isBreak)
                        return (
                          <div
                            key={slotKey}
                            className="rounded-lg px-3 py-2 flex items-center gap-2 bg-transparent border border-dashed border-white/15"
                          >
                            <Coffee className="h-3 w-3 shrink-0 text-white/30" />
                            <span className="text-sm text-white/40">{slot.activity}</span>
                          </div>
                        );

                      return (
                        <div
                          key={slotKey}
                          className={`rounded-lg px-3 py-2.5 ${eventTypeCardClass[type]}`}
                        >
                          {slot.badge && (
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${eventTypeBadgeClass[type]}`}
                            >
                              {eventTypeIcon[type]}
                              {slot.badge}
                            </span>
                          )}
                          <p className="text-xs font-mono text-white/40 leading-none mb-1">{slot.time}</p>
                          <p className="text-sm font-medium text-white leading-snug">{slot.activity}</p>
                          {slot.speakerName && (
                            <p className="mt-1 text-xs text-white/50 italic leading-snug">{slot.speakerName}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hidden count */}
                  {hiddenCount > 0 && (
                    <p className="mt-3 text-sm text-white/30 text-center">
                      +{hiddenCount} more event{hiddenCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Venue Info & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-white/10 bg-brick-red-800 p-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-white mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-semibold text-white">Conference Venue</h4>
              <p className="text-sm text-white mt-1">
                University of the Immaculate Conception (Bajada Campus), Davao City
              </p>
            </div>
          </div>
          <Link
            href="/program"
            aria-label="View the detailed program schedule"
            className="inline-flex items-center gap-2 rounded-md bg-brick-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brick-red-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-red-200"
          >
            View Full Program
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
