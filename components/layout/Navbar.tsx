'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/?category=All' },
    { name: 'New Arrivals', href: '/?sort=newest' },
    { name: 'Collections', href: '/collections' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 h-[4.5rem] md:h-[5rem] py-4 md:py-5 border-b transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-md border-border/50 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container-width flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-1 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-50 group">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary group-hover:opacity-80 transition-opacity">
              Splend<span className="text-accent">Shop</span>.
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover-lift inline-block"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 hover:bg-black/5 rounded-full text-foreground/80 hover:text-primary transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href={user ? "/profile" : "/signup"}
              className="p-2 hover:bg-black/5 rounded-full text-foreground/80 hover:text-primary transition-colors inline-flex items-center justify-center"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/checkout"
              className="relative group p-2 hover:bg-black/5 rounded-full text-foreground/80 hover:text-primary transition-colors inline-flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="accent"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-background border-r border-border shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block text-lg font-medium text-foreground py-2 border-b border-border/50 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col space-y-4">
                  {user ? (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-sm">My Account</span>
                    </div>
                  ) : (
                    <Link
                      href="/signup"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium text-center block"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
