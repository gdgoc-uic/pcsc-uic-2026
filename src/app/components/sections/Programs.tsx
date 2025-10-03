"use client";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimeSlot = {
  time: string;
  activity: string;
};

type DayProgram = {
  day: string;
  date: string;
  schedule: TimeSlot[];
};

const programSchedule: DayProgram[] = [
  {
    day: "Day 1",
    date: "Thursday, April 23, 2026",
    schedule: [
      { time: "8:00 AM - 9:00 AM", activity: "Registration & Welcome Coffee" },
      { time: "9:00 AM - 9:30 AM", activity: "Opening Ceremony" },
      { time: "9:30 AM - 10:30 AM", activity: "Keynote 1: The Future of AI in Computing" },
      { time: "10:30 AM - 11:00 AM", activity: "Coffee Break" },
      { time: "11:00 AM - 12:30 PM", activity: "Paper Session 1: Machine Learning & AI" },
      { time: "12:30 PM - 2:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM - 3:30 PM", activity: "Tutorials: Emerging Technologies" },
      { time: "3:30 PM - 4:00 PM", activity: "Afternoon Break" },
      { time: "4:00 PM - 5:30 PM", activity: "Paper Session 2: Software Engineering" },
      { time: "6:00 PM - 8:00 PM", activity: "Welcome Reception & Networking" },
    ],
  },
  {
    day: "Day 2",
    date: "Friday, April 24, 2026",
    schedule: [
      { time: "8:30 AM - 9:00 AM", activity: "Morning Coffee" },
      { time: "9:00 AM - 10:00 AM", activity: "Keynote 2: Data Science & Big Data Analytics" },
      { time: "10:00 AM - 10:30 AM", activity: "Coffee Break" },
      { time: "10:30 AM - 12:00 PM", activity: "Paper Session 3: Networks & Security" },
      { time: "12:00 PM - 1:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM - 3:00 PM", activity: "Workshop: Hands-on Deep Learning" },
      { time: "3:00 PM - 3:30 PM", activity: "Afternoon Break" },
      { time: "3:30 PM - 5:00 PM", activity: "Panel Discussion: Trends in Computing" },
      { time: "5:00 PM - 6:00 PM", activity: "Poster Session & Demo" },
      { time: "7:00 PM - 10:00 PM", activity: "Conference Dinner & Awards" },
    ],
  },
  {
    day: "Day 3",
    date: "Saturday, April 25, 2026",
    schedule: [
      { time: "8:30 AM - 9:00 AM", activity: "Morning Coffee" },
      { time: "9:00 AM - 10:00 AM", activity: "Keynote 3: Computing for Social Good" },
      { time: "10:00 AM - 10:30 AM", activity: "Coffee Break" },
      { time: "10:30 AM - 12:00 PM", activity: "Paper Session 4: Databases & Algorithms" },
      { time: "12:00 PM - 1:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM - 3:00 PM", activity: "Student Research Workshop" },
      { time: "3:00 PM - 3:30 PM", activity: "Afternoon Break" },
      { time: "3:30 PM - 4:30 PM", activity: "Paper Session 5: Emerging Areas" },
      { time: "4:30 PM - 5:00 PM", activity: "Closing Ceremony & Best Paper Awards" },
    ],
  },
];

export const Programs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered entrance animation for cards
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for each card
      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
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
            Join us for three days of cutting-edge research presentations, workshops, and
            networking opportunities at PCSC-UIC 2026.
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
                  <div className="mt-2 flex items-center gap-2 text-sm text-rose-200">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{dayProgram.date}</span>
                  </div>
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


