import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 section-brand relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Let's Build What's Next in Education
          </h2>
          <p className="text-xl font-medium text-white/90 mb-10">
            Partner with our team of education specialists to create lasting change.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 rounded-full group"
            >
              <Link to="/contact">
                Talk With Our Team
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="mailto:info@acespdsi.org" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg font-medium">
              <Mail className="w-5 h-5" />
              info@acespdsi.org
            </a>
            <a href="tel:+12034074400" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg font-medium">
              <Phone className="w-5 h-5" />
              (203) 407-4400
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
