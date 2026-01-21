import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-educators.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern" />
      
      {/* Decorative Shapes */}
      <div className="absolute top-32 right-[10%] w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">
                Empowering Educators Since 1992
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6"
            >
              Grounded in{" "}
              <span className="text-gradient-aces">Pedagogy</span>
              <br />
              Growing in{" "}
              <span className="text-gradient-aces">Innovation</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Partner with ACES to transform your educational ecosystem through 
              cutting-edge professional development, AI integration, and evidence-based strategies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="gradient-aces text-white font-semibold px-8 py-6 text-base rounded-full btn-glow group"
              >
                Explore Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 px-8 py-6 text-base rounded-full group"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Video
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-border"
            >
              {[
                { value: "30+", label: "Years" },
                { value: "500+", label: "Districts" },
                { value: "10K+", label: "Educators" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Educators collaborating in modern classroom"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-5 shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center">
                  <span className="text-white text-xl font-bold">98%</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Satisfaction Rate</div>
                  <div className="text-sm text-muted-foreground">From our partners</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
