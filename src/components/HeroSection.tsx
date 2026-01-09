import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-winter.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-6">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]">
            <img 
              src={heroImage}
              alt="Winter Collection"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30">
              {/* Left Content */}
              <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  WARMTH WITHOUT
                </h2>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  THE WEIGHT
                </h2>
                <p className="text-sm md:text-base mt-2 opacity-90">
                  YOUR EVERYDAY WINTER JACKET
                </p>
                <Button 
                  className="mt-6 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary px-6"
                >
                  SHOP NOW
                </Button>
              </div>

              {/* Right Content */}
              <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-right text-white hidden sm:block">
                <p className="text-4xl md:text-6xl lg:text-7xl font-light italic tracking-wide">
                  Winter
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-widest mt-2">
                  → ESSENTIALS
                </p>
                <p className="text-xs md:text-sm mt-4 max-w-xs ml-auto opacity-80">
                  The Winter Edit: modern fit, breathable warmth, and versatile style. Layer up. Go anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
