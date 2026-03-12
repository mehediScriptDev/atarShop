import { Link, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";

const ProductCard = ({ id, image, images, name, originalPrice, salePrice, discount }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const imgSrc = image || (images && images[0]);

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-primary font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <Link to={`/product/${id}`} className="block group bg-white hover:shadow-md transition-shadow duration-300 rounded-sm overflow-hidden border border-transparent hover:border-gray-200">
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-sm">
              -{discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2 flex flex-col flex-grow">
          <h3 className="text-[#212121] text-xs md:text-sm line-clamp-2 mb-1.5 h-8 md:h-10 leading-tight">
            {highlightText(name, searchQuery)}
          </h3>
          
          <div className="mt-auto">
            <div className="text-primary font-medium text-base md:text-lg leading-none">
              <span className="text-xs mr-0.5">৳</span>{salePrice}
            </div>
            
            {originalPrice > salePrice && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[#9e9e9e] line-through text-[10px] md:text-xs">
                  ৳{originalPrice}
                </span>
                <span className="text-[#212121] text-[10px] md:text-xs">
                  -{discount}%
                </span>
              </div>
            )}
            
            {/* Ratings Placeholder */}
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i <= 4 ? "fill-[#faca51] text-[#faca51]" : "text-[#dadada] fill-[#dadada]"}`} />
                ))}
              </div>
              <span className="text-[#9e9e9e] text-[10px]">(12)</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
