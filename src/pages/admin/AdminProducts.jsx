import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  category: "",
  originalPrice: "",
  salePrice: "",
  discount: "",
  stock: "",
  description: "",
  rating: "4.5",
  reviews: "0",
  sizes: "",
  colors: "",
};

const AdminProducts = () => {
  const { adminProducts, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = adminProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      originalPrice: String(product.originalPrice),
      salePrice: String(product.salePrice),
      discount: String(product.discount),
      stock: String(product.stock),
      description: product.description,
      rating: String(product.rating),
      reviews: String(product.reviews),
      sizes: product.sizes.join(", "),
      colors: product.colors.map((c) => c.name).join(", "),
    });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.salePrice) {
      toast.error("Please fill in the required fields");
      return;
    }

    const productData = {
      name: form.name,
      category: form.category,
      originalPrice: Number(form.originalPrice) || 0,
      salePrice: Number(form.salePrice) || 0,
      discount: Number(form.discount) || 0,
      stock: Number(form.stock) || 0,
      description: form.description,
      rating: Number(form.rating) || 4.5,
      reviews: Number(form.reviews) || 0,
      sizes: form.sizes
        ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      colors: form.colors
        ? form.colors.split(",").map((c) => ({
            name: c.trim(),
            hex: "#808080",
          })).filter((c) => c.name)
        : [],
      images: editingProduct?.images || [],
      featured: editingProduct?.featured || false,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success("Product updated successfully!");
    } else {
      addProduct(productData);
      toast.success("Product added successfully!");
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      toast.success("Product deleted successfully!");
      setDeleteTarget(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">{adminProducts.length} total products</p>
        </div>
        <Button onClick={openAddForm} className="gap-2 h-11">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-right py-3.5 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3.5 px-4 font-medium text-muted-foreground hidden sm:table-cell">Stock</th>
                <th className="text-center py-3.5 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{product.category}</td>
                  <td className="py-3 px-4 text-right">
                    <div>
                      <p className="font-semibold text-foreground">৳{product.salePrice}</p>
                      {product.originalPrice !== product.salePrice && (
                        <p className="text-xs text-muted-foreground line-through">৳{product.originalPrice}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">
                    <span className={`font-medium ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => openEditForm(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteTarget(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No products found
          </div>
        )}
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Product Name *</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Original Price</Label>
                <Input
                  name="originalPrice"
                  type="number"
                  value={form.originalPrice}
                  onChange={handleChange}
                  placeholder="৳0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Sale Price *</Label>
                <Input
                  name="salePrice"
                  type="number"
                  value={form.salePrice}
                  onChange={handleChange}
                  placeholder="৳0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Discount %</Label>
                <Input
                  name="discount"
                  type="number"
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Stock</Label>
                <Input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input
                  name="rating"
                  type="number"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label>Sizes (comma-separated)</Label>
              <Input
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Colors (comma-separated)</Label>
              <Input
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="Black, White, Red"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Product description..."
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
