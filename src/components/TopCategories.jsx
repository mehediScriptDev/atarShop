import CategoryCard from "./CategoryCard";
import attarImg from "@/assets/cat-attar.jpg";
import panjabiImg from "@/assets/cat-panjabi.jpg";
import tshirtImg from "@/assets/cat-tshirt.jpg";
import pantImg from "@/assets/cat-pant.jpg";
import foodsImg from "@/assets/cat-foods.jpg";
import bagImg from "@/assets/cat-bag.jpg";
import jacketImg from "@/assets/cat-jacket.jpg";
import sneakersImg from "@/assets/cat-sneakers.jpg";
import poloImg from "@/assets/cat-polo.jpg";

const categories = [
  { name: "Attar", image: attarImg, label: "ATTAR" },
  { name: "Panjabi", image: panjabiImg, label: "PANJABI" },
  { name: "T-Shirt", image: tshirtImg, label: "T-SHIRT" },
  { name: "Pant & Trouser", image: pantImg, label: "PANT & TROUSER" },
  { name: "Foods", image: foodsImg, label: "FOODS" },
  { name: "Backpack", image: bagImg, label: "BACKPACK" },
  { name: "Jackets", image: jacketImg, label: "JACKETS" },
  { name: "Sneakers", image: sneakersImg, label: "SNEAKERS" },
  { name: "Polo Shirt", image: poloImg, label: "POLO SHIRT" },
];

const TopCategories = () => {
  return (
    <section className="py-10">
      <div className="container">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-border flex-1 max-w-[100px] md:max-w-[200px]" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            TOP CATEGORIES
          </h2>
          <div className="h-px bg-border flex-1 max-w-[100px] md:max-w-[200px]" />
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.image}
              name={category.name}
              label={category.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
