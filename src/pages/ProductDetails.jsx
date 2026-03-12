import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProductsByCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 shadow-sm bg-background">
          <Header />
          <Navigation />
        </div>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i - 0.5 <= rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 shadow-sm bg-background">
        <Header />
        <Navigation />
      </div>

      <main>
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === i
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-foreground">
                  ৳{product.salePrice}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ৳{product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded">
                  Save ৳{product.originalPrice - product.salePrice}
                </span>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Color: <span className="font-normal text-muted-foreground">{selectedColor || "Select"}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name
                            ? "border-primary ring-2 ring-primary/20 scale-110"
                            : "border-border hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Size: <span className="font-normal text-muted-foreground">{selectedSize || "Select"}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-11 px-4 rounded-lg text-sm font-medium border transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-14 h-12 flex items-center justify-center font-semibold text-lg border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="h-12 flex-1 text-base font-semibold gap-2 rounded-lg"
                  disabled={product.sizes.length > 0 && !selectedSize}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {product.sizes.length > 0 && !selectedSize ? "Select a Size" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-lg hidden sm:flex"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-lg hidden sm:flex"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Stock */}
              <div className="text-sm">
                {product.stock > 10 ? (
                  <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
                ) : product.stock > 0 ? (
                  <span className="text-orange-500 font-medium">⚡ Only {product.stock} left in stock</span>
                ) : (
                  <span className="text-red-500 font-medium">✕ Out of Stock</span>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Free Delivery</p>
                    <p className="text-muted-foreground text-xs">Orders over ৳2000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Easy Returns</p>
                    <p className="text-muted-foreground text-xs">7-day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Authentic</p>
                    <p className="text-muted-foreground text-xs">100% genuine product</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex border-b border-border mb-6 gap-0 overflow-x-auto">
              {["description", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "reviews" ? `Reviews (${product.reviews})` : tab}
                </button>
              ))}
            </div>

            <div className="max-w-3xl">
              {activeTab === "description" && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Materials</h4>
                      <p className="text-sm text-muted-foreground">
                        Premium quality materials sourced from trusted suppliers. Built to last with attention to every detail.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Care Instructions</h4>
                      <p className="text-sm text-muted-foreground">
                        Machine washable at 30°C. Do not bleach. Tumble dry low. Iron at medium heat if needed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground">{product.rating}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {renderStars(product.rating)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{product.reviews} reviews</p>
                    </div>
                  </div>
                  {[
                    { name: "Ahmed K.", rating: 5, comment: "Excellent quality! Exactly as described. Very comfortable.", date: "2 days ago" },
                    { name: "Rashed M.", rating: 4, comment: "Good product for the price. Delivery was quick.", date: "1 week ago" },
                    { name: "Sakib H.", rating: 5, comment: "Love it! Will definitely buy again. Highly recommended.", date: "2 weeks ago" },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{review.name[0]}</span>
                          </div>
                          <span className="font-medium text-sm">{review.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">{renderStars(review.rating)}</div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Delivery Information</h4>
                    <ul className="space-y-2">
                      <li>• Inside Dhaka: 1-2 business days (৳60)</li>
                      <li>• Outside Dhaka: 3-5 business days (৳120)</li>
                      <li>• Free delivery on orders over ৳2000</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Return Policy</h4>
                    <ul className="space-y-2">
                      <li>• 7-day easy return policy</li>
                      <li>• Product must be unused and in original packaging</li>
                      <li>• Refund processed within 3-5 business days</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Related Products
                </h2>
                <Link
                  to={`/shop?category=${encodeURIComponent(product.category)}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
