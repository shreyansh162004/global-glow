import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { getCart } from "@/data/cart";
import logo from "@/assets/logo.jpg";

interface NavbarProps {
  onCartOpen: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setCartCount(getCart().reduce((t, i) => t + i.quantity, 0));
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Global Enterprises" className="w-10 h-10 rounded-full object-cover border border-primary/20" />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-heading font-bold text-gradient leading-tight">Global</span>
            <span className="text-[10px] font-body text-muted-foreground tracking-wider uppercase hidden sm:inline">Enterprises</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onCartOpen} className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatedMobileMenu open={mobileOpen} links={links} currentPath={location.pathname} />
    </motion.nav>
  );
};

function AnimatedMobileMenu({ open, links: navLinks, currentPath }: { open: boolean; links: Array<{ to: string; label: string }>; currentPath: string }) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentPath === link.to ? "bg-primary/10 text-primary" : "hover:bg-secondary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default Navbar;
