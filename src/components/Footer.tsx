import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Youtube, ArrowUpRight, MapPin, Clock, Phone, Mail } from "lucide-react";

const footerLinks = {
  services: [
    { label: "AI Integration", href: "#" },
    { label: "Instructional Coaching", href: "#" },
    { label: "Curriculum Development", href: "#" },
    { label: "School Improvement", href: "#" },
    { label: "Leadership Development", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Research", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-heading font-bold text-primary-foreground">A</span>
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-foreground">ACES</span>
                <p className="text-xs text-muted-foreground">Professional Development & School Improvement</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Transforming education through innovation, collaboration, and excellence. 
              Your trusted partner in building what's next.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">205 Skiff St, Hamden, CT 06517</span>
                </a>
              </li>
              <li>
                <a href="tel:+12034074400" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">(203) 407-4400</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@acespdsi.org" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">info@acespdsi.org</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Mon–Fri: 8:00 AM – 4:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ACES Professional Development & School Improvement. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Advocacy • Commitment • Excellence • Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
