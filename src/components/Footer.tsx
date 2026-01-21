import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-aces-navy text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 tracking-wide">
              ABOUT US
            </h3>
            <div className="w-12 h-0.5 bg-aces-secondary-blue mb-6" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              ACES (Professional Development Services International) partners with educators, administrators, and districts to provide customized professional learning, curriculum support, and school improvement services. Our mission is to transform education through innovation, collaboration, and excellence.
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 tracking-wide">
              FOLLOW US
            </h3>
            <div className="w-12 h-0.5 bg-aces-secondary-blue mb-6" />
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Hours & Info */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 tracking-wide">
              HOURS & INFO
            </h3>
            <div className="w-12 h-0.5 bg-aces-secondary-blue mb-6" />
            <div className="text-primary-foreground/80 text-sm space-y-2">
              <p>205 Skiff St</p>
              <p>Hamden, CT 06517</p>
              <p className="mt-4">Monday – Friday: 8:00 AM – 4:30 PM</p>
              <p>Phone: (203) 407-4400</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} ACES Professional Development & School Improvement. All rights reserved.</p>
          <p className="mt-2">Advocacy. Commitment. Excellence. Service.</p>
        </div>
      </div>
    </footer>
  );
}
