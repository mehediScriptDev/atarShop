import { Link } from "react-router-dom";

const CategoryCard = ({ image, name }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(name)}`}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white shadow-sm border border-border group-hover:border-primary transition-colors">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span className="font-medium text-foreground text-[10px] sm:text-xs md:text-sm text-center line-clamp-2 max-w-[80px] sm:max-w-[100px]">
        {name}
      </span>
    </Link>
  );
};

export default CategoryCard;
