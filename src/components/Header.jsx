import { Search, User, ShoppingBag, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container">
        {/* Main Header Row */}
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
          <div className="flex-1 max-w-2xl hidden md:block">
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
            <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
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

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for Products..."
              className="w-full h-11 pl-4 pr-12 rounded-lg border-2 border-border"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
