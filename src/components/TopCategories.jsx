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
    <section className="py-6 sm:py-8 bg-white mt-4">
      <div className="container">
        <h2 className="text-base md:text-lg font-medium text-[#212121] mb-4">
          Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-4 justify-items-center">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.image}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
