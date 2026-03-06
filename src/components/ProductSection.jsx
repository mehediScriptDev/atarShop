import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import sneakersBannerImg from "@/assets/sneakers-banner.jpg";

const sneakers = products.filter((p) => p.category === "Sneakers");

const ProductSection = () => {
  return (
    <section className="py-8">
      <div className="container">
        {/* Sneakers Banner */}
        <Link to="/shop?category=Sneakers" className="block">
          <div className="relative rounded-2xl overflow-hidden mb-8 h-[180px] md:h-[250px] group">
            <img
              src={sneakersBannerImg}
              alt="Sneakers Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        </Link>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sneakers.map((product) => (
            <ProductCard key={product.id} {...product} image={product.images[0]} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
