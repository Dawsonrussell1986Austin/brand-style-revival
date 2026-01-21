import { Instagram, Linkedin, Twitter, Youtube, MapPin, Clock, Phone, Mail } from "lucide-react";

const footerLinks = {
  services: ["AI Integration", "Instructional Coaching", "Curriculum Development", "School Improvement", "Leadership Development"],
  resources: ["Blog", "Case Studies", "Webinars", "Research", "FAQs"],
  company: ["About Us", "Our Team", "Careers", "Contact", "Privacy Policy"],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl gradient-aces flex items-center justify-center">
                <span className="text-lg font-heading font-bold text-white">A</span>
              </div>
              <div>
                <span className="text-lg font-heading font-bold text-foreground">ACES</span>
                <p className="text-xs text-muted-foreground">Professional Development & School Improvement</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Transforming education through innovation, collaboration, and excellence.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5 grid sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Services</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                205 Skiff St, Hamden, CT 06517
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                (203) 407-4400
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                info@acespdsi.org
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                Mon–Fri: 8:00 AM – 4:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ACES PDSI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Advocacy • Commitment • Excellence • Service
          </p>
        </div>
      </div>
    </footer>
  );
}
