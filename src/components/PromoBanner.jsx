import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import showroomImg from "@/assets/showroom-banner.jpg";

const PromoBanner = () => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden bg-mint h-[200px] md:h-[250px]">
          <img 
            src={showroomImg}
            alt="Visit our showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-mint/90">
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-right">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                SHOWROOM
              </h3>
              <Button 
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
              >
                GET DIRECTION
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
