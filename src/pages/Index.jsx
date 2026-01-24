import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TopCategories from "@/components/TopCategories";
import PromoBanner from "@/components/PromoBanner";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 shadow-sm bg-background">
        <TopBar />
        <Header />
        <Navigation />
      </div>
      <main>
        <HeroSection />
        <TopCategories />
        {/* <PromoBanner /> */}
        <ProductSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
