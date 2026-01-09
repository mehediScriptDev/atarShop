import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">believers</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Your trusted destination for quality fashion and lifestyle products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Store Locations</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">T-Shirts</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Panjabi</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sneakers</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Winter Collection</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>09638090000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@believers.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Believers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
