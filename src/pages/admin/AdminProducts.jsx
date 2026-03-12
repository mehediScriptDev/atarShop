import { useState, useRef } from "react";
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
import { Search, Plus, Pencil, Trash2, Upload, X, ImagePlus } from "lucide-react";
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
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const filteredProducts = adminProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setImagePreviews([]);
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
    // Show existing product images as previews
    setImagePreviews(product.images || []);
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not a valid image`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`"${file.name}" is too large (max 5MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
      images: imagePreviews,
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
    setForm((prev) => {
      const newForm = { ...prev, [name]: value };
      
      // Auto-calculate discount if originalPrice or salePrice changes
      if (name === "originalPrice" || name === "salePrice") {
        const original = parseFloat(name === "originalPrice" ? value : prev.originalPrice);
        const sale = parseFloat(name === "salePrice" ? value : prev.salePrice);
        
        if (original && sale && original > sale) {
          const discount = Math.round(((original - sale) / original) * 100);
          newForm.discount = String(discount);
        } else if (original && sale && original <= sale) {
          newForm.discount = "0";
        }
      }
      
      return newForm;
    });
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
        <DialogContent className="max-w-lg p-0 overflow-hidden flex flex-col h-[90vh] sm:h-[85vh] sm:rounded-2xl border-none shadow-2xl">
          <DialogHeader className="px-6 py-4 border-b border-border/50 bg-background flex-shrink-0">
            <DialogTitle className="text-xl">{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Product Images</Label>

              {/* Preview Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-2.5">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group border border-border">
                      <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600 scale-75 group-hover:scale-100"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group bg-muted/20"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <ImagePlus className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </button>
              {imagePreviews.length > 0 && (
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary px-1">{imagePreviews.length} image{imagePreviews.length > 1 ? "s" : ""} selected</p>
              )}
            </div>

            <div className="grid gap-5">
              <div className="space-y-2">
                <Label htmlFor="product-name" className="text-sm font-semibold">Product Name *</Label>
                <Input
                  id="product-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="rounded-lg my-0.5">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Original Price</Label>
                  <Input
                    name="originalPrice"
                    type="number"
                    value={form.originalPrice}
                    onChange={handleChange}
                    placeholder="৳0"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Sale Price *</Label>
                  <Input
                    name="salePrice"
                    type="number"
                    value={form.salePrice}
                    onChange={handleChange}
                    placeholder="৳0"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Discount %</Label>
                  <Input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="h-11 rounded-xl bg-muted/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Stock Amount</Label>
                  <Input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Initial Rating</Label>
                  <Input
                    name="rating"
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Available Sizes (comma-separated)</Label>
                <Input
                  name="sizes"
                  value={form.sizes}
                  onChange={handleChange}
                  placeholder="e.g. S, M, L, XL"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Available Colors (comma-separated)</Label>
                <Input
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="e.g. Black, White, Red"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2 pb-2">
                <Label className="text-sm font-semibold">Product Description</Label>
                <textarea
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-border/50 bg-muted/10 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={() => setShowForm(false)}
              className="h-11 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              {editingProduct ? "Update Product" : "Publish Product"}
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
