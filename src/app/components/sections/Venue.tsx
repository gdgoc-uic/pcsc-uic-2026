"use client";
import { MapPin, Building2, Train, Car, Plane, Globe } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TravelTip = {
  icon: ReactNode;
  title: string;
  details: string;
  tone: "blue" | "green" | "amber" | "rose";
};

const travelTips: TravelTip[] = [
  {
    icon: <Plane className="h-5 w-5" />,
    title: "By Air",
    details: "Fly to Francis Bangoy International Airport (DIA). 12 minutes by taxi or GrabCar to campus.",
    tone: "blue",
  },
  {
    icon: <Car className="h-5 w-5" />,
    title: "By Car/Taxi",
    details: "Search for 'University of the Immaculate Conception – Bajada Campus'. Taxi and ride-sharing services available at airport terminal.",
    tone: "green",
  },
  {
    icon: <Train className="h-5 w-5" />,
    title: "Public Transport",
    details: "Local jeepney and bus routes stop along J.P. Laurel Ave. Short walk to the campus gate.",
    tone: "amber",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Nearby Landmarks",
    details: "Abreeza Ayala Malls and SM Lanang Premier are within 5–10 minutes for dining and shopping.",
    tone: "rose",
  },
];

const toneColors: Record<TravelTip["tone"], string> = {
  blue: "bg-rose-500/20 border-rose-400/30 text-rose-100",
  green: "bg-rose-500/20 border-rose-400/30 text-rose-100",
  amber: "bg-rose-500/20 border-rose-400/30 text-rose-100",
  rose: "bg-rose-500/20 border-rose-400/30 text-rose-100",
};

export const Venue = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const addressCardRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unified scroll-triggered entrance animation for address card
      if (addressCardRef.current) {
        gsap.fromTo(
          addressCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: addressCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Unified scroll-triggered entrance animation for travel tips
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

      // Unified scroll-triggered entrance animation for map card
      if (mapCardRef.current) {
        gsap.fromTo(
          mapCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Unified hover animations for each card
      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        const icon = card.querySelector('.icon-wrapper');
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, y: -4, duration: 0.3, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, { scale: 1.08, rotation: 5, duration: 0.3, ease: "power2.out" });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="venue" className="bg-rose-900 text-rose-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-rose-100/80 text-base sm:text-lg max-w-3xl mx-auto">
            Join us at the University of the Immaculate Conception - Bajada Campus, Davao City
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Address + Travel Tips */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Card */}
            <div
              ref={addressCardRef}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-rose-500/20 p-6"
              role="group"
              tabIndex={0}
              aria-label="Venue address and location details"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-rose-200 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-rose-50 break-words">University of the Immaculate Conception - Bajada Campus</h3>
                  <p className="text-xs sm:text-sm text-rose-100/80 mt-1 break-words">J.P. Laurel Ave, Bajada, Davao City, Philippines</p>
                </div>
                <Building2 className="h-5 w-5 text-rose-200 flex-shrink-0 hidden sm:block" aria-hidden="true" />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-rose-100/90">
                <div className="rounded-md border border-white/10 bg-rose-900/30 p-3">Accessible gates along J.P. Laurel Ave</div>
                <div className="rounded-md border border-white/10 bg-rose-900/30 p-3">Conference halls signposted on-site</div>
              </div>
            </div>

            {/* Travel Tips Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelTips.map((tip, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg border backdrop-blur-sm p-5 transition-all duration-300 ${toneColors[tip.tone]}`}
                  role="group"
                  tabIndex={0}
                  aria-label={`${tip.title}: ${tip.details}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="icon-wrapper p-2 rounded-full bg-white/10" aria-hidden="true">{tip.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white">{tip.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-current opacity-90">{tip.details}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent group-focus:border-current/50"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map/Illustration */}
          <div
            ref={mapCardRef}
            className="relative rounded-lg border border-white/10 bg-rose-500/20 p-5 min-h-72"
            aria-label="Map placeholder to the venue"
          >
            <div className="h-full w-full rounded-md border border-white/10 bg-rose-900/30">
              <div className="relative h-[300px] sm:h-[360px] lg:h-[420px] w-full overflow-hidden rounded-md">
                <iframe
                  title="University of the Immaculate Conception - Bajada Campus map"
                  className="absolute inset-0 h-full w-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.214541205031!2d125.61870867566523!3d7.101115792902217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96c4fc4bfbf1f%3A0x41426f341bce07d5!2sUniversity%20of%20the%20Immaculate%20Conception%20-%20Bajada%20Campus!5e0!3m2!1sen!2sph!4v1761402242791!5m2!1sen!2sph"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;