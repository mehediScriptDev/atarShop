import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const Cart = () => {
  const { cartItems, cartCount, cartTotal, cartOriginalTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const shipping = cartTotal >= 2000 ? 0 : cartTotal > 0 ? 60 : 0;
  const savings = cartOriginalTotal - cartTotal;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 shadow-sm bg-background">
        <TopBar />
        <Header />
        <Navigation />
      </div>

      <main>
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Shopping Cart</span>
          </nav>
        </div>

        <div className="container pb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
          </h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-muted-foreground line-through text-sm">
                          ৳{item.originalPrice}
                        </span>
                        <span className="text-foreground font-bold text-lg">
                          ৳{item.salePrice}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 h-9 flex items-center justify-center font-medium text-sm border-x border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.selectedSize, item.selectedColor)
                          }
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Link to="/shop">
                    <Button variant="outline" className="gap-2">
                      ← Continue Shopping
                    </Button>
                  </Link>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-96">
                <div className="sticky top-[200px] bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-lg text-foreground">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                      <span className="text-foreground font-medium">৳{cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `৳${shipping}`
                        )}
                      </span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span className="font-medium">৳{savings}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-bold text-foreground text-base">Total</span>
                      <span className="font-bold text-foreground text-xl">৳{cartTotal + shipping}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground bg-blue-50 text-blue-700 p-3 rounded-lg">
                      💡 Add ৳{2000 - cartTotal} more for free delivery!
                    </p>
                  )}

                  <Link to="/checkout" className="block">
                    <Button className="w-full h-12 text-base font-semibold gap-2">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products yet.
              </p>
              <Link to="/shop">
                <Button className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
