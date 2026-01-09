import ProductCard from "./ProductCard";
import sneakersBannerImg from "@/assets/sneakers-banner.jpg";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

const products = [
  {
    image: sneaker1,
    name: "Premium China Sneakers-Y26-1004 [Black]",
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
  },
  {
    image: sneaker2,
    name: "Premium China Sneakers-Y26-1033 [Black]",
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
  },
  {
    image: sneaker3,
    name: "Premium China Sneakers-Y26-1006 [Black]",
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
  },
  {
    image: sneaker4,
    name: "Premium China Sneakers-Y26-1001 [Grey]",
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
  },
];

const ProductSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        {/* Sneakers Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-[180px] md:h-[250px]">
          <img 
            src={sneakersBannerImg}
            alt="Sneakers Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent">
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-right text-white">
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                SNEAKERS
              </h3>
              <p className="text-sm md:text-lg mt-2 opacity-90">
                ✓ ALL-DAY COMFORT SNEAKERS COLLECTION
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
