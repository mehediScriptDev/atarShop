import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-winter.jpg";
import showroomImage from "@/assets/showroom-banner.jpg";

const slides = [
  {
    image: heroImage,
    tag: "WINTER COLLECTION 2026",
    titleLine1: "WARMTH WITHOUT",
    titleLine2: "THE WEIGHT",
    subtitle: "YOUR EVERYDAY WINTER JACKET",
    description: "Modern fit, breathable warmth, and versatile style. Layer up. Go anywhere.",
    cta: "SHOP WINTER",
    link: "/shop?category=Winter",
    accent: "from-blue-900/70",
  },
  {
    image: showroomImage,
    tag: "NEW ARRIVALS",
    titleLine1: "STEP INTO",
    titleLine2: "YOUR STYLE",
    subtitle: "PREMIUM COLLECTION FOR MEN",
    description: "Curated essentials for the modern man — from casual to traditional.",
    cta: "EXPLORE NOW",
    link: "/shop",
    accent: "from-amber-900/70",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <div className="container py-4 md:py-6">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
          {/* Slide Image */}
          <div className="relative h-[220px] sm:h-[350px] md:h-[400px] lg:h-[550px]">
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt={s.titleLine1}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} via-black/40 to-transparent`} />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-xl px-2 sm:px-0">
                  {/* Tag */}
                  <div
                    className={`inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full mb-3 md:mb-5 transition-all duration-500 ${
                      isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {slide.tag}
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] transition-all duration-500 ${
                      isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    {slide.titleLine1}
                    <br />
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {slide.titleLine2}
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p
                    className={`text-white/80 text-xs sm:text-sm md:text-base mt-2 md:mt-4 font-medium tracking-wider transition-all duration-500 ${
                      isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* Description - hidden on smallest */}
                  <p
                    className={`hidden sm:block text-white/60 text-sm mt-2 max-w-md transition-all duration-500 ${
                      isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={`mt-4 md:mt-8 flex items-center gap-3 transition-all duration-500 ${
                      isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                  >
                    <Link to={slide.link}>
                      <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 h-10 md:h-12 rounded-xl text-sm md:text-base shadow-lg shadow-black/20">
                        {slide.cta}
                      </Button>
                    </Link>
                    <Link to="/shop">
                      <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10 font-medium px-5 md:px-6 h-10 md:h-12 rounded-xl text-sm md:text-base hidden sm:inline-flex">
                        View All →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white/40 transition-all border border-white/20"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white/40 transition-all border border-white/20"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
