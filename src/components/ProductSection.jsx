import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const ProductSection = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);
  
  // Filter for featured or first N products for "Just For You"
  const allProducts = products; // Using all products for the infinite scroll demo

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < allProducts.length) {
          setVisibleCount((prev) => Math.min(prev + 6, allProducts.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleCount, allProducts.length]);

  const displayedProducts = allProducts.slice(0, visibleCount);

  return (
    <section className="py-6 sm:py-8">
      <div className="container">
        <h2 className="text-base md:text-lg font-medium text-[#212121] mb-4">
          Just For You
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} {...product} image={product.images[0]} />
          ))}
        </div>

        {/* Loader Trigger */}
        <div 
          ref={loaderRef} 
          className="h-20 flex items-center justify-center mt-4"
        >
          {visibleCount < allProducts.length ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">
              You've reached the end of the collection
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
