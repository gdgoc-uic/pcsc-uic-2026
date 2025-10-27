"use client";
import {
  MapPin,
  Train,
  Car,
  Plane,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useEffect,
  useRef,
  type ReactNode,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type TravelTip = {
  icon: ReactNode;
  title: string;
  details: string;
};

const campusImages = [
  {
    src: "/images/campus/1.jpeg",
    title: "Sto. Niño Building",
    description: "Grade School Department",
  },
  {
    src: "/images/campus/2.jpeg",
    title: "Immaculate Heart Building",
    description: "Junior High School Department",
  },
  {
    src: "/images/campus/3.jpeg",
    title: "Our Lady of Peace Building",
    description: "Senior High School Department",
  },
];

const travelTips: TravelTip[] = [
  {
    icon: <Plane className="h-5 w-5" />,
    title: "By Air",
    details:
      "Fly to Francis Bangoy International Airport (DIA). 12 minutes by taxi or GrabCar to campus.",
  },
  {
    icon: <Car className="h-5 w-5" />,
    title: "By Taxi / GrabCar",
    details:
      "Search for 'University of the Immaculate Conception – Bajada Campus'. Taxi and ride-sharing services available at airport terminal.",
  },
  {
    icon: <Train className="h-5 w-5" />,
    title: "Public Transport",
    details:
      "Local jeepney and bus routes stop along J.P. Laurel Ave. Short walk to the campus gate.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Nearby Landmarks",
    details:
      "Abreeza Ayala Malls and SM Lanang Premier are within 5–10 minutes for dining and shopping.",
  },
];

export const Venue = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const addressCardRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Optimized image transition animation
  const animateImageTransition = useCallback((newIndex: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (index === newIndex) {
        tl.to(ref, { opacity: 1, duration: 0.6 }, 0);
      } else {
        tl.to(ref, { opacity: 0, duration: 0.6 }, 0);
      }
    });

    timelineRef.current = tl;
  }, []);

  // Carousel handlers
  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % campusImages.length);
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + campusImages.length) % campusImages.length,
    );
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    },
    [handleNextImage, handlePrevImage],
  );

  // Initial GSAP animations setup
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
          },
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
        },
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
          },
        );
      }

      // Unified hover animations for each card
      const cards = Array.from(cardsRef.current?.children || []);
      cards.forEach((card: Element) => {
        const icon = card.querySelector(".icon-wrapper");
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1.08,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });

      // Carousel initial setup
      if (carouselRef.current) {
        // Set all images to absolute positioning with proper stacking
        imageRefs.current.forEach((ref, index) => {
          if (ref) {
            gsap.set(ref, {
              opacity: index === 0 ? 1 : 0,
              willChange: "opacity",
            });
          }
        });

        // Animate carousel entrance
        gsap.fromTo(
          carouselRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle image transition when index changes
  useEffect(() => {
    animateImageTransition(currentImageIndex);
  }, [currentImageIndex, animateImageTransition]);

  // Keyboard navigation listener
  useEffect(() => {
    if (!carouselRef.current) return;

    const carouselElement = carouselRef.current;
    carouselElement.addEventListener("keydown", handleKeyDown);

    return () => {
      carouselElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % campusImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="bg-brick-red-600 text-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-white text-base sm:text-lg max-w-3xl mx-auto">
            Join us at the University of the Immaculate Conception - Bajada
            Campus, Davao City
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Top Row: Carousel and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Campus Carousel */}
            <div
              ref={carouselRef}
              className="relative rounded-xl border border-white/10 bg-rose-800/90 backdrop-blur-sm min-h-[320px] md:min-h-[380px] lg:min-h-[460px] shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              aria-label="Campus images carousel"
              aria-live="polite"
              aria-atomic="true"
              tabIndex={0}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative h-[320px] md:h-[380px] lg:h-[460px] w-full">
                  {/* Images */}
                  {campusImages.map((image, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      className="absolute top-0 left-0 w-full h-full"
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                          {image.title}
                        </h3>
                        <p className="text-white/95 text-sm drop-shadow-md">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Controls */}
                  <div className="absolute inset-y-0 left-0 flex items-center p-2 z-20">
                    <button
                      onClick={handlePrevImage}
                      className="w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center p-2 z-10">
                    <button
                      onClick={handleNextImage}
                      className="w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
            </div>

            {/* Map */}
            <div
              ref={mapCardRef}
              className="relative rounded-xl border border-white/10 bg-rose-800/90 backdrop-blur-sm min-h-[320px] md:min-h-[380px] lg:min-h-[460px] shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-[320px] md:h-[380px] lg:h-[460px] w-full overflow-hidden rounded-xl">
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

          {/* Address Card - Full Width */}
          <div
            ref={addressCardRef}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-rose-800/90 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            role="group"
            tabIndex={0}
            aria-label="Venue address and location details"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-full bg-white/10">
                <MapPin
                  className="h-6 w-6 text-white flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
                  University of the Immaculate Conception - Bajada Campus
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-2 break-words">
                  J.P. Laurel Ave, Bajada, Davao City, Philippines
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
              <div className="rounded-lg border border-white/10 bg-brick-red-700/50 backdrop-blur-sm p-3.5 hover:bg-brick-red-700/70 transition-colors duration-200">
                Accessible gates along J.P. Laurel Ave
              </div>
              <div className="rounded-lg border border-white/10 bg-brick-red-700/50 backdrop-blur-sm p-3.5 hover:bg-brick-red-700/70 transition-colors duration-200">
                Conference halls signposted on-site
              </div>
            </div>
          </div>

          {/* Travel Tips Grid - Full Width */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6"
          >
            {travelTips.map((tip, i) => (
              <div
                key={i}
                className="relative rounded-xl border backdrop-blur-sm p-5 transition-all duration-300 bg-brick-red-800/80 border-white/10 text-white shadow-md hover:shadow-lg"
                role="group"
                tabIndex={0}
                aria-label={`${tip.title}: ${tip.details}`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="icon-wrapper p-2.5 rounded-full bg-white/10"
                    aria-hidden="true"
                  >
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-white mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/90">
                      {tip.details}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent group-focus:border-white/50 transition-colors duration-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
