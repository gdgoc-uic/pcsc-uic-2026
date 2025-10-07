"use client";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ImportantDate = {
  title: string;
  date: string;
  description: string;
  category: "deadline" | "conference" | "registration";
  isUrgent?: boolean;
};

const importantDates: ImportantDate[] = [
  {
    title: "Paper Submission for Main Conference Deadline",
    date: "December 20, 2025",
    description: "December 20, 2025",
    category: "deadline",
  },
  {
    title: "Author Notification for Main Conference",
    date: "January 20, 2026",
    description: "January 20, 2026",
    category: "deadline",
  },
  {
    title: "Camera-ready deadline",
    date: "March 10, 2026",
    description: "March 10, 2026",
    category: "deadline",
  },
  {
    title: "Announcement of Accepted Workshops",
    date: "December 20, 2025",
    description: "December 20, 2025",
    category: "deadline",
  },
  {
    title: "Call for Workshop Submission Deadline",
    date: "November 20, 2025",
    description: "November 20, 2025",
    category: "deadline",
  },
  {
    title: "Early Bird Registration Deadline",
    date: "February 28, 2026",
    description: "February 28, 2026",
    category: "registration",
  },
  {
    title: "Regular Registration",
    date: "March 14, 2026",
    description: "March 14, 2026",
    category: "registration",
  },
  {
    title: "Conference Date",
    date: "April 23, 2026",
    description: "April 23-25, 2026",
    category: "conference",
  },
];

// Group dates by month for calendar display
const groupDatesByMonth = () => {
  const groups: { [key: string]: ImportantDate[] } = {};

  importantDates.forEach(date => {
    const monthKey = new Date(date.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    });

    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(date);
  });

  return Object.entries(groups).sort(([a], [b]) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
};

export const ImportantDates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const monthlyGroups = groupDatesByMonth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unified scroll-triggered entrance animation for calendar months
      if (calendarRef.current?.children) {
        gsap.fromTo(
          Array.from(calendarRef.current.children),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: calendarRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Unified hover animations for calendar cards
      const calendarCards = Array.from(calendarRef.current?.querySelectorAll(".calendar-card") || []);
      calendarCards.forEach((card: Element) => {
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "deadline":
        return <AlertCircle className="h-5 w-5" />;
      case "conference":
        return <Calendar className="h-5 w-5" />;
      case "registration":
        return <Clock className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "deadline":
        return "bg-red-500/20 border-red-400/30 text-red-100";
      case "conference":
        return "bg-blue-500/20 border-blue-400/30 text-blue-100";
      case "registration":
        return "bg-green-500/20 border-green-400/30 text-green-100";
      default:
        return "bg-rose-500/20 border-rose-400/30 text-rose-100";
    }
  };

  return (
    <section ref={sectionRef} id="important-dates" className="bg-rose-900 text-rose-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-rose-100/80 text-lg max-w-3xl mx-auto">
            Mark your calendar for these key deadlines and events for PCSC-UIC 2026
          </p>
        </div>

        {/* Calendar Grid - Months in rows */}
        <div ref={calendarRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {monthlyGroups.map(([monthYear, dates]) => (
            <div key={monthYear} className="calendar-month">
              {/* Month Header */}
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-rose-50 mb-2">
                  {monthYear}
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
              </div>

              {/* Month Dates - Stack vertically within each month column */}
              <div className="space-y-4">
                {dates.map((date, index) => (
                  <div
                    key={`${monthYear}-${index}`}
                    className="calendar-card"
                  >
                    <div className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${getCategoryColor(date.category)}`}>
                      {/* Date Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          date.isUrgent
                            ? "bg-red-500/30 text-red-200"
                            : date.category === "conference"
                              ? "bg-blue-500/30 text-blue-200"
                              : date.category === "registration"
                                ? "bg-green-500/30 text-green-200"
                                : "bg-rose-500/30 text-rose-200"
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {new Date(date.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                          })}
                        </div>
                        <div className={`p-1 rounded-full ${
                          date.isUrgent
                            ? "bg-red-500/30 text-red-300"
                            : date.category === "conference"
                              ? "bg-blue-500/30 text-blue-300"
                              : date.category === "registration"
                                ? "bg-green-500/30 text-green-300"
                                : "bg-rose-500/30 text-rose-300"
                        }`}>
                          {getCategoryIcon(date.category)}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${
                          date.isUrgent
                            ? "text-red-300"
                            : date.category === "conference"
                              ? "text-blue-300"
                              : date.category === "registration"
                                ? "text-green-300"
                                : "text-rose-300"
                        }`}>
                          {date.category}
                          {date.isUrgent && " (Urgent)"}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-semibold mb-2 text-white leading-tight">
                        {date.title}
                      </h4>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed ${
                        date.isUrgent
                          ? "text-red-100"
                          : date.category === "conference"
                            ? "text-blue-100"
                            : date.category === "registration"
                              ? "text-green-100"
                              : "text-rose-100"
                      }`}>
                        {date.description}
                      </p>

                      {/* Full Date (for screen readers) */}
                      <div className="sr-only">
                        {date.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
