import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import acesLogoFallback from "@/assets/aces-logo.webp";
import { useImage } from "@/hooks/useSiteContent";
import { usePublishedPages } from "@/hooks/usePages";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: NavChild[];
};

const baseNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Workshops & Events", href: "/workshops-events" },
  {
    label: "PDSI Services",
    href: "/pdsi-services",
    children: [
      { label: "Regional Forums", href: "/pdsi-services/regional-forums" },
    ],
  },
  {
    label: "Center for AI Services",
    href: "/center-for-ai-services",
    highlight: true,
    children: [
      { label: "AI-Ready Schools", href: "/center-for-ai-services/ai-ready-schools" },
      { label: "Innovative Tools", href: "/center-for-ai-services/innovative-tools" },
      { label: "Research & Ethics", href: "/center-for-ai-services/research-ethics" },
      { label: "Curriculum Creator", href: "/curriculum-creator" },
    ],
  },
  { label: "ARC", href: "/arc" },
  { label: "Resources", href: "/resources" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { imageUrl: acesLogo, altText: logoAlt } = useImage("home", "header", "logo", acesLogoFallback);
  const { data: cmsPages } = usePublishedPages();
  const { pathname } = useLocation();
  const navItems: NavItem[] = [
    ...baseNavItems,
    ...((cmsPages || [])
      .filter((p) => p.show_in_header)
      .map((p) => ({ label: p.nav_label || p.title, href: `/${p.slug}` as string }))),
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

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
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const linkClass = `px-3 py-2 text-base font-semibold rounded-lg transition-colors inline-flex items-center ${
                isActive(item.href)
                  ? "text-accent font-bold"
                  : item.highlight
                    ? "text-accent font-bold"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary"
              }`;
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.label} className="relative group">
                    <Link to={item.href} className={linkClass}>
                      {item.highlight && <Sparkles className="inline w-4 h-4 mr-1.5" />}
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                    </Link>
                    <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-opacity z-50">
                      <div className="bg-white border border-border rounded-xl shadow-lg py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block px-4 py-2.5 text-base font-medium transition-colors ${
                              isActive(child.href)
                                ? "text-accent font-bold bg-accent/5"
                                : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.label} to={item.href} className={linkClass}>
                  {item.highlight && <Sparkles className="inline w-4 h-4 mr-1.5" />}
                  {item.label}
                </Link>
              );
            })}
            <Link to="/contact">
              <Button className="ml-3 gradient-aces text-white font-bold text-base px-6 py-5 rounded-full btn-glow">
                Talk With Our Team
              </Button>
            </Link>
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
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 text-base font-semibold rounded-lg ${
                        isActive(item.href) || item.highlight
                          ? "text-accent bg-accent/5"
                          : "text-foreground/85 hover:text-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.highlight && <Sparkles className="inline w-4 h-4 mr-2" />}
                      {item.label}
                    </Link>
                    {item.children && item.children.length > 0 && (
                      <div className="ml-4 mt-1 mb-2 border-l border-border pl-3 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block px-3 py-2 text-[15px] font-medium rounded-lg ${
                              isActive(child.href)
                                ? "text-accent font-bold bg-accent/5"
                                : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-2 px-4">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gradient-aces text-white font-bold text-base rounded-full py-5">
                      Talk With Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
