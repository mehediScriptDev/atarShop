import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Store,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/products", label: "Products", icon: Package },
];

const AdminLayout = () => {
  const { adminLogout, stats } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 hover:bg-muted rounded-lg">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-foreground">Admin Panel</span>
        </div>
        <div className="w-9" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border animate-in slide-in-from-left duration-300">
            <SidebarContent
              isActive={isActive}
              handleLogout={handleLogout}
              onClose={() => setSidebarOpen(false)}
              stats={stats}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r border-border bg-background">
          <SidebarContent isActive={isActive} handleLogout={handleLogout} stats={stats} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ isActive, handleLogout, onClose, stats }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="p-6 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">Believers</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-muted rounded-lg">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive(item)
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
          {item.label === "Orders" && stats.pendingOrders > 0 && (
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${isActive(item) ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"}`}>
              {stats.pendingOrders}
            </span>
          )}
        </Link>
      ))}
    </nav>

    {/* Bottom */}
    <div className="p-4 border-t border-border space-y-3">
      <Link
        to="/"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
      >
        <Store className="h-5 w-5" />
        View Store
        <ChevronRight className="h-4 w-4 ml-auto" />
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  </div>
);

export default AdminLayout;
