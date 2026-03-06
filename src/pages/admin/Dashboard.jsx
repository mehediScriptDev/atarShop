import { useAdmin } from "@/context/AdminContext";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Sat", revenue: 4200 },
  { name: "Sun", revenue: 5800 },
  { name: "Mon", revenue: 3100 },
  { name: "Tue", revenue: 6400 },
  { name: "Wed", revenue: 4800 },
  { name: "Thu", revenue: 7200 },
  { name: "Fri", revenue: 5500 },
];

const Dashboard = () => {
  const { stats, orders, adminProducts } = useAdmin();

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      change: "+8.2%",
      icon: ShoppingCart,
      color: "bg-green-500",
      bgLight: "bg-green-50",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      change: "+3",
      icon: Package,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      change: "Needs attention",
      icon: Clock,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      isWarning: true,
    },
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.bgLight} flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color.replace("bg-", "text-")}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {!card.isWarning && <ArrowUpRight className="h-3 w-3 text-green-500" />}
              <span className={`text-xs font-medium ${card.isWarning ? "text-orange-500" : "text-green-500"}`}>
                {card.change}
              </span>
              {!card.isWarning && (
                <span className="text-xs text-muted-foreground">vs last week</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-foreground">Revenue Overview</h2>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              +18.2%
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220, 20%, 12%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(220, 20%, 12%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `৳${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`৳${value.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(220, 13%, 90%)",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(220, 20%, 12%)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h2 className="font-bold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">৳{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-bold text-foreground mb-4">Top Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Stock</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rating</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts
                .sort((a, b) => b.reviews - a.reviews)
                .slice(0, 5)
                .map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-foreground line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{product.category}</td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">৳{product.salePrice}</td>
                    <td className="py-3 px-4 text-right hidden md:table-cell">
                      <span className={`${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-foreground">⭐ {product.rating}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
