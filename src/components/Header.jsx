import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  return (
    <header className="bg-background border-b border-border">
      <div className="container">
        {/* Mobile Header - visible on screens smaller than md
            Order: menu, search(icon only), logo, cart */}
        <div className="relative flex lg:hidden items-center justify-between py-2 gap-2">
          {/* Left: Menu + search icon (icon-only) */}
          <div className="flex items-center gap-2">
            <button aria-label="Menu" className="p-2 -ml-2 hover:bg-accent/10 rounded-lg transition-colors">
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

          {/* Center: Logo (absolute centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base">B</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">believers</span>
          </div>

          {/* Right: cart */}
          <div className="flex items-center gap-2">
            <div className="relative p-2 -mr-2 hover:bg-accent/10 rounded-lg transition-colors cursor-pointer">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              <span className="absolute top-0 right-0 bg-[#fd4b6b] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">0</span>
            </div>
          </div>
        </div>

        {/* Mobile Search Panel (slide-down) - appears when left search icon toggled */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for Products..."
                className="w-full h-11 pl-4 pr-12 rounded-lg border-2 border-border"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setMobileSearchOpen(false);
                }}
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md"
                onClick={() => setMobileSearchOpen(false)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Desktop/Tablet Header - visible on md and larger */}
        <div className="hidden lg:block py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  B
                </span>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                believers
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for Products..."
                  className="w-full h-12 pl-4 pr-14 rounded-lg outline-none bg-background"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Account */}
              <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                <User className="h-6 w-6 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Sign In</p>
                  <p className="font-medium text-foreground">Your Account</p>
                </div>
              </div>

              {/* Cart */}
              <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
                <ShoppingBag className="h-7 w-7 text-foreground" />
                <span className="absolute -top-2 -right-2 bg-[#fd4b6b] border-2 border-white text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
