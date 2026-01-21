import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { label: "CENTER FOR A.I.", href: "#ai-center" },
  { label: "SERVICES", href: "#services" },
  { label: "EVENTS", href: "#events" },
  { label: "RESOURCES", href: "#resources" },
  { label: "ABOUT", href: "#about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex flex-col items-center">
            <span className="text-3xl font-heading font-bold tracking-tight text-primary">
              aces
            </span>
            <span className="text-xs text-muted-foreground text-center leading-tight">
              Professional Development<br />& School Improvement
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              CONTACT
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors tracking-wide py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full mt-2">
                CONTACT
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
