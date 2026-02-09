import { Instagram, Linkedin, Facebook, MapPin, Clock, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import acesLogoFallback from "@/assets/aces-logo.webp";
import { useImage } from "@/hooks/useSiteContent";

const footerLinks = {
  services: [
    { label: "AI Integration", href: "/ai-center" },
    { label: "Instructional Coaching", href: "/services" },
    { label: "Curriculum Development", href: "/services" },
    { label: "School Improvement", href: "/services" },
    { label: "Leadership Development", href: "/services" },
  ],
  resources: [
    { label: "Resources", href: "/resources" },
    { label: "Events", href: "/events" },
    { label: "AI Center", href: "/ai-center" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/acespdsi", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/aces_center_for_ai/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/aces-center-for-ai/", label: "LinkedIn" },
];

export function Footer() {
  const { imageUrl: acesLogo, altText: logoAlt } = useImage("home", "footer", "logo", acesLogoFallback);
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="mb-5 block">
              <img 
                src={acesLogo} 
                alt={logoAlt || "ACES Professional Development & School Improvement"} 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-6 text-base font-medium leading-relaxed">
              Transforming education through innovation, collaboration, and excellence.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4 text-base">Services</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4 text-base">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4 text-base">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="font-heading font-bold text-foreground mb-4 text-base">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground text-base font-medium">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="https://maps.google.com/?q=205+Skiff+St+Hamden+CT+06517" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  205 Skiff St, Hamden, CT 06517
                </a>
              </li>
              <li className="flex items-center gap-3 text-base font-medium">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href="tel:+12034074400" className="text-muted-foreground hover:text-foreground transition-colors">(203) 407-4400</a>
              </li>
              <li className="flex items-center gap-3 text-base font-medium">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href="mailto:info@acespdsi.org" className="text-muted-foreground hover:text-foreground transition-colors">info@acespdsi.org</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-base font-medium">
                <Clock className="w-4 h-4" />
                Mon–Fri: 8:00 AM – 4:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base font-medium text-muted-foreground">
            © {new Date().getFullYear()} ACES PDSI. All rights reserved.
          </p>
          <p className="text-base font-medium text-muted-foreground italic">
            Advocacy • Commitment • Excellence • Service
          </p>
        </div>
      </div>
    </footer>
  );
}
