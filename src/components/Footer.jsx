import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#2e2e2e] text-white py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SC</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">SunnahCircle</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the best in fashion and lifestyle. We bring you premium quality products from around the world.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors border border-white/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary w-fit pb-1">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/how-to-buy" className="hover:text-primary transition-colors">How to Buy</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* SunnahCircle */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary w-fit pb-1">SunnahCircle</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Digital Payments</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">SunnahCircle Blog</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary w-fit pb-1">Contact Details</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span>09638090000</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span>support@sunnahcircle.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} SunnahCircle. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
