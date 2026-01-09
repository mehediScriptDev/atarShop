interface CategoryCardProps {
  image: string;
  name: string;
  label?: string;
}

const CategoryCard = ({ image, name, label }: CategoryCardProps) => {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-md hover-lift">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {label && (
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded">
            {label}
          </div>
        )}
      </div>
      <span className="font-medium text-foreground text-sm md:text-base text-center">
        {name}
      </span>
    </div>
  );
};

export default CategoryCard;
