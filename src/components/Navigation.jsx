import { Link } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";

const navItems = [
  { name: "Attar", path: "/shop?category=Attar" },
  { name: "Shirt", path: "/shop" },
  { name: "Panjabi", path: "/shop?category=Panjabi" },
  { name: "T-shirt", path: "/shop?category=T-Shirt" },
  { name: "Pant & Trouser", path: "/shop?category=Pant+%26+Trouser" },
  { name: "Winter", path: "/shop?category=Winter" },
  { name: "Sneakers", path: "/shop?category=Sneakers" },
  { name: "Polo Shirt", path: "/shop?category=Polo+Shirt" },
  { name: "All Products", path: "/shop" },
];

const Navigation = () => {
  return (
    <nav className="hidden lg:block bg-background border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-1 text-foreground hover:text-accent transition-colors font-medium text-sm"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-accent" />
          <div className="text-sm">
            <p className="text-muted-foreground text-xs">Hotline:</p>
            <p className="font-semibold text-foreground">09638090000</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
