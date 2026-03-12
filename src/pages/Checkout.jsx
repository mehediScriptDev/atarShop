import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, Lock, CreditCard, Banknote, Smartphone } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartOriginalTotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = cartTotal >= 2000 ? 0 : 60;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
    area: "",
    note: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^01[3-9]\d{8}$/.test(form.phone.trim()))
      errs.phone = "Enter valid BD phone number";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = addOrder({
        customer: form.name,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.area ? form.area + ", " : ""}${form.city}`,
        items: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.salePrice,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        total: cartTotal + shipping,
        paymentMethod:
          form.paymentMethod === "cod"
            ? "Cash on Delivery"
            : form.paymentMethod === "bkash"
            ? "bKash"
            : "Nagad",
      });
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation?orderId=${orderId}`);
      setIsSubmitting(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 shadow-sm bg-background">
          <Header />
          <Navigation />
        </div>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products before proceeding to checkout.
          </p>
          <Link to="/shop">
            <Button>Shop Now</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Checkout</span>
          </nav>
        </div>

        <div className="container pb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form */}
              <div className="flex-1 space-y-8">
                {/* Contact */}
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-foreground text-lg">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`mt-1.5 h-11 ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className={`mt-1.5 h-11 ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`mt-1.5 h-11 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-foreground text-lg">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House no, Road, Area"
                        className={`mt-1.5 h-11 ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <Label htmlFor="area">Area / Thana</Label>
                      <Input
                        id="area"
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        placeholder="e.g. Dhanmondi"
                        className="mt-1.5 h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={`mt-1.5 h-11 ${errors.city ? "border-red-500" : ""}`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="note">Order Note (Optional)</Label>
                      <textarea
                        id="note"
                        name="note"
                        rows={3}
                        value={form.note}
                        onChange={handleChange}
                        placeholder="Any special instructions..."
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-foreground text-lg">Payment Method</h2>
                  <RadioGroup
                    value={form.paymentMethod}
                    onValueChange={(val) => setForm((prev) => ({ ...prev, paymentMethod: val }))}
                    className="space-y-3"
                  >
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Banknote className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.paymentMethod === "bkash" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Smartphone className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="font-medium text-foreground text-sm">bKash</p>
                        <p className="text-xs text-muted-foreground">Mobile banking payment</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.paymentMethod === "nagad" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                      <RadioGroupItem value="nagad" id="nagad" />
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Nagad</p>
                        <p className="text-xs text-muted-foreground">Digital financial service</p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-96">
                <div className="sticky top-[200px] bg-card rounded-xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-lg text-foreground">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedColor && ` | ${item.selectedColor}`}
                            {` × ${item.quantity}`}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                          ৳{item.salePrice * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">৳{cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                        {shipping === 0 ? "Free" : `৳${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-bold text-foreground text-base">Total</span>
                      <span className="font-bold text-foreground text-xl">৳{cartTotal + shipping}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Place Order — ৳{cartTotal + shipping}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
