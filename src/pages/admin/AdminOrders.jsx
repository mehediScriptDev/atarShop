import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
};

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Order Cards — visible below md */}
      <div className="space-y-3 md:hidden">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-xl border border-border p-4 space-y-3"
          >
            {/* Top row: ID + status */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground text-sm">{order.id}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize border ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>

            {/* Customer info */}
            <div>
              <p className="font-medium text-foreground">{order.customer}</p>
              <p className="text-xs text-muted-foreground">{order.phone}</p>
            </div>

            {/* Bottom row: total + date + actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="font-bold text-foreground text-lg">৳{order.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={order.status}
                  onValueChange={(val) => updateOrderStatus(order.id, val)}
                >
                  <SelectTrigger className="h-8 w-[110px] text-xs font-medium border rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-xl border border-border">
            No orders found matching your criteria
          </div>
        )}
      </div>

      {/* Desktop Orders Table — visible at md and above */}
      <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-right py-3.5 px-4 font-medium text-muted-foreground">Total</th>
                <th className="text-center py-3.5 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3.5 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium text-foreground">{order.id}</td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">{order.date}</td>
                  <td className="py-3.5 px-4 text-right font-semibold text-foreground">
                    ৳{order.total.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Select
                      value={order.status}
                      onValueChange={(val) => updateOrderStatus(order.id, val)}
                    >
                      <SelectTrigger className={`h-8 w-[130px] mx-auto text-xs font-medium border rounded-full ${statusColors[order.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No orders found matching your criteria
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details — {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{selectedOrder.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment</p>
                  <p className="font-medium text-foreground">{selectedOrder.paymentMethod}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{selectedOrder.address}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground mb-2">Items</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` | Color: ${item.color}`}
                        {` × ${item.qty}`}
                      </p>
                    </div>
                    <p className="font-medium text-foreground whitespace-nowrap">৳{item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-foreground text-lg">
                  ৳{selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
