import { MapPin, Settings, ChevronDown } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar text-topbar-foreground py-1.5 text-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity animate animate-pulse">
          <MapPin className="h-4 w-4" />
          <span className="font-semibold">STORE LOCATIONS</span>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <span>Settings</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
