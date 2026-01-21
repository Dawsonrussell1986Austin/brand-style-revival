import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import airpodsImage from "@/assets/airpods-giveaway.webp";

export function PromoBanner() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative section-brand rounded-2xl p-6 md:p-8 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 flex items-center justify-center p-2 animate-float">
                <img 
                  src={airpodsImage} 
                  alt="AirPods Pro 3" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Limited Time Giveaway
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white">
                  Win AirPods Pro 3
                </h3>
                <p className="text-white/70 text-sm">With Live Translation by Apple Intelligence</p>
              </div>
            </div>
            
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 rounded-full group"
            >
              Enter Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
