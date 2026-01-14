import { ChevronDown, Phone } from "lucide-react";

const navItems = [
  { name: "Attar", hasDropdown: true },
  { name: "Shirt", hasDropdown: false },
  { name: "Panjabi", hasDropdown: true },
  { name: "T-shirt", hasDropdown: false },
  { name: "Pant & Trouser", hasDropdown: true },
  { name: "Winter", hasDropdown: true },
  { name: "Sneakers", hasDropdown: false },
  { name: "Polo Shirt", hasDropdown: false },
  { name: "Combo Offers", hasDropdown: true },
];

const Navigation = () => {
  return (
    <nav className="hidden lg:block bg-background border-b border-border py-3">
      <div className="container flex items-center justify-between">
        {/* Nav Items */}
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className="flex items-center gap-1 text-foreground hover:text-accent transition-colors font-medium text-sm"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </a>
            </li>
          ))}
        </ul>

        {/* Hotline */}
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
