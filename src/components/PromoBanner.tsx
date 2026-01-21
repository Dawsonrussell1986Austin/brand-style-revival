import { motion } from "framer-motion";
import { Headphones, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function PromoBanner() {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          {/* Background gradient accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
          
          {/* Floating sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 text-primary/30"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4"
              >
                <Sparkles className="w-3 h-3" />
                Limited Time Giveaway
              </motion.div>
              
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Win <span className="text-gradient-aces">AirPods Pro 3</span>
              </h2>
              
              <p className="text-muted-foreground text-lg">
                With Live Translation powered by Apple Intelligence
              </p>
            </div>

            {/* Icon & CTA */}
            <div className="flex items-center gap-8">
              {/* Animated Headphones Icon */}
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:flex w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center glow-green"
              >
                <Headphones className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 py-6 rounded-full group transition-all duration-300"
              >
                Enter Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
