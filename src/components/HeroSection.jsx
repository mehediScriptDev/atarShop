import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-winter.jpg";
import showroomImage from "@/assets/showroom-banner.jpg";

const slides = [
  {
    image: heroImage,
    link: "/shop?category=Winter",
  },
  {
    image: showroomImage,
    link: "/shop",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="bg-background">
      <div className="container py-2 md:py-4">
        <div className="relative aspect-[25/10] md:aspect-[30/10] w-full overflow-hidden rounded-md shadow-sm">
          {slides.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={s.image}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary w-4" : "bg-white/60"
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
