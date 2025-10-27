"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "../../components/sections/PageHero";
import HeroCarousel from "../../components/sections/HeroCarousel";
import {
  ExternalLink,
  MapPin,
  Building,
  ShoppingBag,
  Plane,
  Clock,
  Navigation,
  Coffee,
  Star,
  Car,
  Palmtree,
  Compass,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const hotels = [
  {
    name: "Hop Inn Hotel Davao",
    url: "https://maps.app.goo.gl/2QkAtXrPfGWYGmQc6",
    distance: "4 mins away",
  },
  {
    name: "Red Planet",
    url: "https://maps.app.goo.gl/2s9VE1NNv47BoPddA",
    distance: "3 mins away",
  },
  {
    name: "Orchard Hotel",
    url: "https://maps.app.goo.gl/vgxTEL7nDk5Hz1yc8",
    distance: "3 mins away",
  },
  {
    name: "Microtel by Wyndham Davao",
    url: "https://maps.app.goo.gl/jgoXitnnZzguand27",
    distance: "6 mins away",
  },
  {
    name: "Acacia Hotel Davao",
    url: "https://maps.app.goo.gl/L194WVSsN2cv9tte8",
    distance: "4 mins away",
  },
  {
    name: "Park Inn by Radisson Hotel",
    url: "https://maps.app.goo.gl/B8NbYWE2cgBKcyMk8",
    distance: "7 mins away",
  },
  {
    name: "Sumo Asia Hotels",
    url: "https://maps.app.goo.gl/Z8eHg7yj8pU19Ae49",
    distance: "7 mins away",
  },
  {
    name: "Lanang Suites Davao",
    url: "https://maps.app.goo.gl/NQKS35swnK7uRPw96",
    distance: "5 mins away",
  },
  {
    name: "Go Hotels Lanang - Davao",
    url: "https://maps.app.goo.gl/kNwTzZSWscLzSFF17",
    distance: "8 mins away",
  },
];

const malls = [
  {
    name: "Abreeza Ayala Malls",
    url: "https://maps.app.goo.gl/CLTjbvGgsWxRw8U29",
  },
  {
    name: "SM Lanang Premier",
    url: "https://maps.app.goo.gl/5nLVkyuzKhGVTvcT7",
  },
];

export default function VenuePage() {
  const airportSectionRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const transportRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const startPointRef = useRef<HTMLDivElement>(null);
  const endPointRef = useRef<HTMLDivElement>(null);
  const routeHeaderRef = useRef<HTMLDivElement>(null);
  const transportInfoRef = useRef<HTMLDivElement>(null);

  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const hotelsSectionRef = useRef<HTMLDivElement>(null);
  const amenitiesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - set everything to hidden/starting positions
      gsap.set(routeHeaderRef.current, {
        opacity: 0,
        y: -10,
      });

      gsap.set([timeRef.current, transportRef.current], {
        opacity: 0,
        scale: 0.9,
      });

      gsap.set(startPointRef.current, {
        opacity: 0,
        scale: 0,
      });

      gsap.set(arrowRef.current, {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.set(endPointRef.current, {
        opacity: 0,
        scale: 0,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        x: -10,
      });

      gsap.set(transportInfoRef.current, {
        opacity: 0,
        y: 10,
      });

      // Create main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: airportSectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      });

      // Sequence: Header → Time & Transport → Start Point → Route Line → End Point → Destination Info → Footer
      tl.to(routeHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          timeRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          "-=0.2",
        )
        .to(
          transportRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          startPointRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.1",
        )
        .to(
          arrowRef.current,
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.3",
        )
        .to(
          endPointRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.3",
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          transportInfoRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        );

      // Continuous animations for visual interest
      // Pulse the route line
      gsap.to(arrowRef.current, {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Subtle scale pulse on start point (airport)
      gsap.to(startPointRef.current, {
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });

      // Subtle scale pulse on end point (venue)
      gsap.to(endPointRef.current, {
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.8,
      });

      // Carousel Section Animations
      if (carouselSectionRef.current) {
        gsap.fromTo(
          carouselSectionRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselSectionRef.current,
              start: "top center+=100",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Map Section Animations
      if (mapSectionRef.current) {
        const mapElements =
          mapSectionRef.current.querySelectorAll(".animate-item");
        gsap.fromTo(
          mapElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top center+=150",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Hotels Section Animations
      if (hotelsSectionRef.current) {
        const hotelCards =
          hotelsSectionRef.current.querySelectorAll(".hotel-card");
        gsap.fromTo(
          hotelCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hotelsSectionRef.current,
              start: "top center+=100",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Amenities Section Animations
      if (amenitiesSectionRef.current) {
        const amenityCards =
          amenitiesSectionRef.current.querySelectorAll(".amenity-card");
        gsap.fromTo(
          amenityCards,
          {
            opacity: 0,
            x: -30,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: amenitiesSectionRef.current,
              start: "top center+=100",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, airportSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-brick-red-600 text-white">
      <PageHero title="Venue" />

      {/* Campus Carousel Section */}
      <section ref={carouselSectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8 flex-wrap gap-3 px-4">
            <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight text-center">
              <span className="block sm:inline">
                University of the Immaculate Conception
              </span>
              <span className="block sm:inline sm:ml-1">- Bajada Campus</span>
            </h2>
          </div>
          <HeroCarousel />
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Campus Location
            </h2>
          </div>

          {/* Embedded Map */}
          <div className="bg-brick-red-800 rounded-xl p-4 md:p-6 border border-brick-red-700 shadow-xl animate-item">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.214541205031!2d125.61870867566523!3d7.101115792902217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96c4fc4bfbf1f%3A0x41426f341bce07d5!2sUniversity%20of%20the%20Immaculate%20Conception%20-%20Bajada%20Campus!5e0!3m2!1sen!2sph!4v1761402242791!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-sm">
                <strong>Address:</strong> J.P. Laurel Ave, Bajada, Davao City,
                Philippines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Directions from Airport
            </h2>
          </div>

          <div
            ref={airportSectionRef}
            className="bg-brick-red-800 border border-brick-red-600 rounded-xl overflow-hidden"
          >
            {/* Route Header */}
            <div
              ref={routeHeaderRef}
              className="bg-brick-red-800 border-b border-brick-red-600 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div
                    ref={timeRef}
                    className="bg-brick-red-700 rounded-lg px-3 sm:px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        12 min
                      </span>
                    </div>
                  </div>
                  <div
                    ref={transportRef}
                    className="text-white text-xs sm:text-sm"
                  >
                    via Taxi or GrabCar
                  </div>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="p-4 sm:p-6">
              {/* Starting Point */}
              <div className="flex items-start gap-3 sm:gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div
                    ref={startPointRef}
                    className="w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-400/30 flex-shrink-0"
                  ></div>
                  <div
                    ref={arrowRef}
                    className="w-0.5 h-16 bg-brick-red-400 my-1"
                  ></div>
                </div>
                <div className="flex-1 pt-0 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Plane className="h-4 w-4 text-white flex-shrink-0" />
                    <span className="text-xs text-white uppercase tracking-wide font-medium">
                      Starting point
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Francis Bangoy International Airport
                  </h3>
                  <p className="text-sm text-white mt-1">Davao City</p>
                </div>
              </div>

              {/* Destination Point */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div
                    ref={endPointRef}
                    className="w-3 h-3 rounded-full bg-brick-red-400 ring-4 ring-brick-red-400/30 flex-shrink-0"
                  ></div>
                </div>
                <div ref={descriptionRef} className="flex-1 pt-0 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                    <span className="text-xs text-white uppercase tracking-wide font-medium">
                      Destination
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                    <span className="block sm:inline">
                      University of the Immaculate Conception
                    </span>
                    <span className="block sm:inline sm:ml-1">
                      - Bajada Campus
                    </span>
                  </h3>
                  <p className="text-sm text-white mt-1">
                    J.P. Laurel Ave, Bajada, Davao City
                  </p>
                </div>
              </div>
            </div>

            {/* Transportation Info */}
            <div
              ref={transportInfoRef}
              className="bg-brick-red-800 border-t border-brick-red-600 p-4"
            >
              <div className="flex items-center gap-3 text-sm text-white mb-3">
                <Car className="h-4 w-4 text-white" />
                <span>
                  Taxi and ride-sharing services available at airport terminal
                </span>
              </div>
              <div className="pt-3 border-t border-brick-red-600">
                <p className="text-xs text-white">
                  <strong>Note:</strong> Travel time is approximate and may vary
                  depending on traffic conditions, time of day, and route taken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Hotels Section */}
      <section ref={hotelsSectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Accommodation
            </h2>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              Recommended hotels near the conference venue
            </p>
            <div className="mt-6 inline-block bg-brick-red-800 border border-brick-red-600 px-5 py-3 rounded-lg">
              <p className="text-white text-sm">
                <strong>Note:</strong> Travel times are approximate and may vary
                based on traffic conditions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.map((hotel, index) => (
              <a
                key={index}
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-card group bg-brick-red-800 hover:bg-brick-red-700 border border-brick-red-600 hover:border-brick-red-500 rounded-lg p-5 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-white text-sm mb-1">{hotel.distance}</p>
                    <div className="flex items-center gap-1.5 text-white text-xs group-hover:text-white transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View on map</span>
                    </div>
                  </div>
                  <Building className="h-5 w-5 text-white flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* Nearby Malls Section */}
      </section>

      <section ref={amenitiesSectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Nearby Amenities
            </h2>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              Shopping centers and dining options near the venue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {malls.map((mall, index) => (
              <a
                key={index}
                href={mall.url}
                target="_blank"
                rel="noopener noreferrer"
                className="amenity-card group bg-brick-red-800 hover:bg-brick-red-700 border border-brick-red-600 hover:border-brick-red-500 rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors mb-3">
                      {mall.name}
                    </h3>
                    <ul className="space-y-2 text-white text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>Dining and restaurants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>Retail and convenience stores</span>
                      </li>
                    </ul>
                    <div className="flex items-center gap-1.5 text-white text-xs group-hover:text-white transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View on map</span>
                    </div>
                  </div>
                  <ShoppingBag className="h-5 w-5 text-rose-300 flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
