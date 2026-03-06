import { Link, useSearchParams } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-0000";

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 shadow-sm bg-background">
        <TopBar />
        <Header />
        <Navigation />
      </div>

      <main>
        <div className="container py-12 md:py-20">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Animation */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20" />
              <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for your order. We'll send you a confirmation via SMS/email shortly.
            </p>

            {/* Order Details Card */}
            <div className="bg-card rounded-xl border border-border p-6 text-left space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-lg font-bold text-foreground">{orderId}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-foreground font-medium">Order is being processed</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 ml-5">
                  You will receive updates about your order status via SMS.
                </p>
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="text-foreground font-medium">2-5 business days</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="text-foreground font-medium">Cash on Delivery</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop">
                <Button className="w-full sm:w-auto gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
