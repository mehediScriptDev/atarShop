import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
}

const ProductCard = ({ image, name, originalPrice, salePrice, discount }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover-lift border border-border">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-sale-badge text-sale-badge-foreground text-sm font-semibold px-3 py-1.5 rounded">
          {discount} %
        </div>
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
  );
};

export default ProductCard;
