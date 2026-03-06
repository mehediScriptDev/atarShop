import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileSearchOpen(false);
    }
  };

  const mobileNavLinks = [
    { name: "Home", path: "/" },
    { name: "Shop All", path: "/shop" },
    { name: "Attar", path: "/shop?category=Attar" },
    { name: "Panjabi", path: "/shop?category=Panjabi" },
    { name: "T-Shirt", path: "/shop?category=T-Shirt" },
    { name: "Sneakers", path: "/shop?category=Sneakers" },
    { name: "Winter", path: "/shop?category=Winter" },
    { name: "Polo Shirt", path: "/shop?category=Polo+Shirt" },
    { name: "Pant & Trouser", path: "/shop?category=Pant+%26+Trouser" },
  ];

  return (
    <header className="bg-background border-b border-border">
      <div className="container">
        {/* Mobile Header */}
        <div className="relative flex lg:hidden items-center justify-between py-2 gap-2">
          <div className="flex items-center gap-2">
            <button
              aria-label="Menu"
              className="p-2 -ml-2 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <button
              aria-label="Search"
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setMobileSearchOpen((s) => !s)}
            >
              <Search className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base">B</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">believers</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative p-2 -mr-2 hover:bg-accent/10 rounded-lg transition-colors">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              <span className="absolute top-0 right-0 bg-[#fd4b6b] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for Products..."
                className="w-full h-11 pl-4 pr-12 rounded-lg border-2 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setMobileSearchOpen(false);
                }}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-background animate-in slide-in-from-left duration-300 overflow-y-auto">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">B</span>
                  </div>
                  <span className="font-bold text-foreground text-lg">believers</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-muted rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border space-y-1">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:block py-4">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">believers</span>
            </Link>

            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for Products..."
                  className="w-full h-12 pl-4 pr-14 rounded-lg outline-none bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/admin/login"
                className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <User className="h-6 w-6 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Admin</p>
                  <p className="font-medium text-foreground">Dashboard</p>
                </div>
              </Link>

              <Link to="/cart" className="relative cursor-pointer hover:opacity-70 transition-opacity">
                <ShoppingBag className="h-7 w-7 text-foreground" />
                <span className="absolute -top-2 -right-2 bg-[#fd4b6b] border-2 border-white text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
