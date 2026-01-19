'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 border-t border-border/10">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <h3 className="font-serif text-3xl font-bold tracking-tight">
                Splend<span className="text-accent">Shop</span>.
              </h3>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Curating the finest modern essentials for the sophisticated lifestyle. Elevate your everyday with our premium collection.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-white/5 p-2.5 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Collections', 'Sale', 'About Us'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors block py-0.5"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Shipping & Returns', 'Size Guide', 'Contact Us', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors block py-0.5"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Input
                  placeholder="Your email address"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                />
                <Mail className="absolute right-3 top-3 text-white/30 w-4 h-4" />
              </div>
              <Button variant="accent" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>&copy; {currentYear} SplendShop. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
