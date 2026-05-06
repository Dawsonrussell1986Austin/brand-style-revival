import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import acesLogoFallback from "@/assets/aces-logo.webp";
import { useImage } from "@/hooks/useSiteContent";
import { usePublishedPages } from "@/hooks/usePages";

const baseNavItems = [
  { label: "AI Center", href: "/ai-center", highlight: true },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { imageUrl: acesLogo, altText: logoAlt } = useImage("home", "header", "logo", acesLogoFallback);
  const { data: cmsPages } = usePublishedPages();
  const navItems = [
    ...baseNavItems,
    ...((cmsPages || [])
      .filter((p) => p.show_in_header)
      .map((p) => ({ label: p.nav_label || p.title, href: `/${p.slug}`, highlight: false }))),
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="group flex items-center">
            <img 
              src={acesLogo} 
              alt={logoAlt || "ACES Professional Development & School Improvement"} 
              className="h-12 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  item.highlight
                    ? "text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.highlight && <Sparkles className="inline w-3.5 h-3.5 mr-1.5" />}
                {item.label}
              </a>
            ))}
            <a href="/contact">
              <Button className="ml-4 gradient-aces text-white font-semibold px-6 rounded-full btn-glow">
                Contact
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg ${
                      item.highlight
                        ? "text-accent bg-accent/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.highlight && <Sparkles className="inline w-3.5 h-3.5 mr-2" />}
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 px-4">
                  <a href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gradient-aces text-white font-semibold rounded-full">
                      Contact
                    </Button>
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
