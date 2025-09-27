import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                OODD
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Custom T-shirt printing with premium quality and fast delivery. 
              Express your style with our unique designs and personalization options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/shop" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shop
              </Link>
              <Link to="/customize" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Customize
              </Link>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Size Guide
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shipping Info
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Return Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@oodd.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Design Street, Creative City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 OODD. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};