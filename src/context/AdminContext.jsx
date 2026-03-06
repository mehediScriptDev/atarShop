import { createContext, useContext, useState, useCallback } from "react";
import { products as initialProducts } from "@/data/products";

const AdminContext = createContext(null);

const generateDemoOrders = () => [
  {
    id: "ORD-1001",
    customer: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "01712345678",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    items: [
      { name: "Premium China Sneakers-Y26-1004", qty: 1, price: 1800, size: "42", color: "Black" },
      { name: "Graphic Print T-Shirt", qty: 2, price: 890, size: "L", color: "Black" },
    ],
    total: 3580,
    status: "delivered",
    date: "2026-03-05",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-1002",
    customer: "Karim Hossain",
    email: "karim@example.com",
    phone: "01898765432",
    address: "Flat 4B, Green Tower, Uttara, Dhaka",
    items: [
      { name: "Classic White Panjabi", qty: 1, price: 2200, size: "XL", color: "White" },
    ],
    total: 2200,
    status: "shipped",
    date: "2026-03-05",
    paymentMethod: "bKash",
  },
  {
    id: "ORD-1003",
    customer: "Fatima Akhter",
    email: "fatima@example.com",
    phone: "01654321098",
    address: "12/A Agrabad, Chittagong",
    items: [
      { name: "Arabian Oud Attar", qty: 3, price: 850, size: "6ml", color: "" },
      { name: "Musk Al-Tahara Attar", qty: 2, price: 650, size: "3ml", color: "" },
    ],
    total: 3850,
    status: "processing",
    date: "2026-03-06",
    paymentMethod: "Nagad",
  },
  {
    id: "ORD-1004",
    customer: "Sadia Rahman",
    email: "sadia@example.com",
    phone: "01534567890",
    address: "House 7, Sector 3, Mirpur, Dhaka",
    items: [
      { name: "Winter Puffer Jacket", qty: 1, price: 3500, size: "M", color: "Navy" },
      { name: "Slim Fit Chino Pants", qty: 1, price: 1950, size: "30", color: "Khaki" },
    ],
    total: 5450,
    status: "pending",
    date: "2026-03-06",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-1005",
    customer: "Arif Islam",
    email: "arif@example.com",
    phone: "01787654321",
    address: "32 Station Road, Sylhet",
    items: [
      { name: "Premium Leather Backpack", qty: 1, price: 2450, size: "One Size", color: "Brown" },
    ],
    total: 2450,
    status: "pending",
    date: "2026-03-06",
    paymentMethod: "bKash",
  },
  {
    id: "ORD-1006",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01612345678",
    address: "Flat 2A, Rose Garden, Bashundhara, Dhaka",
    items: [
      { name: "Classic Polo Shirt", qty: 3, price: 1250, size: "M", color: "Navy" },
      { name: "Premium China Sneakers-Y26-1033", qty: 1, price: 1800, size: "40", color: "Black" },
    ],
    total: 5550,
    status: "delivered",
    date: "2026-03-04",
    paymentMethod: "Cash on Delivery",
  },
];

export const AdminProvider = ({ children }) => {
  const [adminProducts, setAdminProducts] = useState(
    initialProducts.map((p) => ({ ...p }))
  );
  const [orders, setOrders] = useState(generateDemoOrders());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem("adminLoggedIn") === "true"
  );

  const adminLogin = useCallback((password) => {
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("adminLoggedIn", "true");
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("adminLoggedIn");
  }, []);

  const addProduct = useCallback((product) => {
    const newId = Date.now();
    setAdminProducts((prev) => [...prev, { ...product, id: newId }]);
    return newId;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setAdminProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: `ORD-${1000 + orders.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder.id;
  }, [orders.length]);

  // Stats
  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalProducts: adminProducts.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    deliveredOrders: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <AdminContext.Provider
      value={{
        adminProducts,
        orders,
        isAdminLoggedIn,
        stats,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addOrder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
