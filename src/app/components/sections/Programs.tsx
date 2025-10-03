"use client";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimeSlot = {
  time: string;
  activity: ReactNode;
};

type DayProgram = {
  day: string;
  date: string;
  schedule: TimeSlot[];
};

const programSchedule: DayProgram[] = [
  {
    day: "April 23 - Thursday | Day 1",
    date: "",
    schedule: [
      { time: "8:30 AM - 10:30 AM", activity: "Registration" },
      { time: "10:30 AM - 12:00 NN", activity: "Parallel Workshops" },
      { time: "12:00 NN - 1:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM - 4:30 PM", activity: "Parallel Workshops" },
      { time: "4:30 PM - 6:00 PM", activity: "Business Meeting" },
    ],
  },
  {
    day: "April 24 - Friday | Day 2",
    date: "",
    schedule: [
      { time: "8:00 AM - 9:00 AM", activity: "Registration" },
      { time: "9:00 AM - 9:15 AM", activity: "Opening Remarks / Recapitulation" },
      { time: "9:15 AM - 10:00 AM", activity: "Plenary Talk 1" },
      { time: "10:00 AM – 10:15 AM", activity: "Morning Break" },
      { time: "10:15 AM - 11:00 AM", activity: "Plenary Talk 2" },
      { time: "11:00 AM - 12:30 AM", activity: "Parallel Sessions" },
      { time: "12:30 PM  - 1:30PM", activity: "Lunch Break" },
      { time: "1:30 PM - 4:00 PM", activity: "Parallel Sessions" },
      { time: "4:00 PM - 5:30 PM", activity: "Oldies but Goldies" },
      { time: "5:30 PM – 6:00 PM", activity: "Board Meeting and President's Report" },
      { time: "6:30 PM - 8:00 PM", activity: "Conference Dinner" },
    ],
  },
  {
    day: "April 25 - Saturday | Day 3",
    date: "",
    schedule: [
      { time: "8:00 AM - 9:00 AM", activity: "Registration" },
      { time: "9:00 AM - 9:15 AM", activity: "Opening Remarks / Recapitulation" },
      { time: "9:15 AM - 10:45 AM", activity: "Short Paper Presentations" },
      { time: "10:45 AM – 11:00 AM", activity: "Morning Break" },
      { 
        time: "11:00 AM - 12:30 AM", 
        activity: (
          <>
            Results of Election of New Board Members<br />
            Announcement of Special Awards<br />
            Closing Remarks
          </>
        ) 
      },
      { time: "12:30 PM  - 1:30PM", activity: "Lunch Break" },
    ],
  },
];

export const Programs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unified scroll-triggered entrance animation
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

      // Unified hover animations for each card
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
    <section ref={sectionRef} id="programs" className="bg-rose-900 text-rose-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-rose-100/80 text-base sm:text-lg max-w-3xl text-center mx-auto">
          The 26th Philippine Computing Science Congress is organized by the <a href="https://csp.org.ph/" target="_blank" rel="noopener noreferrer" className="text-rose-200 underline">Computing Society of the Philippines</a> to enable local 
          and neighboring computing educators, researchers, information and communications technology (ICT) professionals, 
          and students to interact and share their work in computing, computer science, computational science, and ICT. 
          The conference features special lectures by prominent researchers and educators and contributed papers in ICT, computing, 
          computer science, computational science, and related disciplines.
          </p>
        </div>

        {/* 3-Day Program Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {programSchedule.map((dayProgram) => (
            <div
              key={dayProgram.day}
              className="group relative overflow-hidden bg-rose-500/20 rounded-lg cursor-pointer"
            >
              <div className="relative p-6">
                {/* Day Header */}
                <div className="mb-6 border-b border-white/20 pb-4">
                  <h3 className="text-2xl font-bold text-rose-50">{dayProgram.day}</h3>
                  {dayProgram.date && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-rose-200">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{dayProgram.date}</span>
                    </div>
                  )}
                </div>

                {/* Schedule */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-rose-800 scrollbar-track-rose-950/20">
                  {dayProgram.schedule.map((slot, index) => (
                    <div
                      key={`${dayProgram.day}-${index}`}
                      className="rounded-lg border border-white/10 bg-rose-900/30 p-3 transition-colors hover:bg-rose-900/50"
                    >
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-200" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-rose-200">{slot.time}</div>
                          <div className="text-sm font-medium mt-1 leading-snug text-rose-100">
                            {slot.activity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Venue Info & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-white/10 bg-rose-500/20 p-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-rose-200 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-semibold text-rose-50">Conference Venue</h4>
              <p className="text-sm text-rose-100/80 mt-1">
                University of the Immaculate Conception (Bajada Campus), Davao City
              </p>
            </div>
          </div>
          <Link
            href="/program"
            aria-label="View the detailed program schedule"
            className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
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


