import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ id, image, images, name, originalPrice, salePrice, discount }) => {
  const { addToCart } = useCart();
  const imgSrc = image || (images && images[0]);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      { id, name, images: [imgSrc], salePrice, originalPrice },
      1,
      "",
      ""
    );
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover-lift border border-border">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-sale-badge text-sale-badge-foreground text-sm font-semibold px-3 py-1.5 rounded">
              {discount}%
            </div>
          )}
          {/* Quick Add */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110"
            title="Quick Add to Cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-1 mb-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-price-original line-through text-sm">
              {originalPrice}৳
            </span>
            <span className="text-price-sale font-bold text-lg">
              {salePrice}৳
            </span>
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
