import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const navItems = [
  { name: "Attar", category: "Attar" },
  { name: "Panjabi", category: "Panjabi" },
  { name: "T-shirt", category: "T-Shirt" },
  { name: "Pant & Trouser", category: "Pant & Trouser" },
  { name: "Winter", category: "Winter" },
  { name: "Sneakers", category: "Sneakers" },
  { name: "Polo Shirt", category: "Polo Shirt" },
  { name: "All Products", category: "" },
];

const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (category) {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <nav className="hidden lg:block bg-background border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item.category)}
                className="text-[#212121] hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary" />
          <div className="text-sm">
            <p className="text-gray-500 text-[10px] sm:text-xs">Hotline:</p>
            <p className="font-bold text-[#212121]">09638090000</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
