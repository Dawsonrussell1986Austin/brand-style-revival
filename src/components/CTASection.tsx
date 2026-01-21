import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-aces-animated opacity-20" />
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Floating Orbs */}
      <div className="orb orb-green w-[500px] h-[500px] top-0 left-1/4 opacity-40" />
      <div className="orb orb-blue w-[400px] h-[400px] bottom-0 right-1/4 opacity-30" style={{ animationDelay: "-7s" }} />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              Ready to Transform Your District?
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-8 leading-tight">
            Let's Build{" "}
            <span className="text-gradient-glow">What's Next</span>
            <br />
            in Education
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Partner with our team of education specialists to create lasting 
            change in your schools and district.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-10 py-8 text-lg rounded-full btn-glow group hover:-translate-y-1 transition-all duration-300"
            >
              Talk With Our Team
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 text-foreground bg-transparent px-10 py-8 text-lg rounded-full hover:bg-secondary/50 transition-all duration-300"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <a
              href="mailto:info@acespdsi.org"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span>info@acespdsi.org</span>
            </a>
            <a
              href="tel:+12034074400"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span>(203) 407-4400</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
