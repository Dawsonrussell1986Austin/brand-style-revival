import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Award, Brain } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh noise">
      {/* Animated Orbs */}
      <div className="orb orb-green w-[600px] h-[600px] -top-[200px] -left-[200px]" />
      <div className="orb orb-blue w-[500px] h-[500px] top-[20%] -right-[150px]" style={{ animationDelay: "-5s" }} />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-[10%] left-[20%]" style={{ animationDelay: "-10s" }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-20 h-20 rounded-2xl glass-card flex items-center justify-center"
      >
        <Brain className="w-10 h-10 text-primary" />
      </motion.div>
      
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[15%] w-16 h-16 rounded-xl glass-card flex items-center justify-center"
      >
        <Zap className="w-8 h-8 text-accent" />
      </motion.div>
      
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] right-[10%] w-14 h-14 rounded-lg glass-card flex items-center justify-center"
      >
        <Award className="w-7 h-7 text-aces-secondary-green" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              Empowering Educators Since 1992
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] mb-8"
          >
            <span className="block text-foreground">Grounded in</span>
            <span className="block text-gradient-aces">Pedagogy</span>
            <span className="block text-foreground mt-2">Growing in</span>
            <span className="block text-gradient-glow">Innovation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Partner with ACES to transform your educational ecosystem through 
            cutting-edge professional development, AI integration, and 
            evidence-based strategies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 py-7 text-lg rounded-full btn-glow group hover:-translate-y-1 transition-all duration-300"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 text-foreground bg-transparent px-8 py-7 text-lg rounded-full hover:bg-secondary/50 transition-all duration-300"
            >
              Meet Our Team
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: "30+", label: "Years Experience" },
              { value: "500+", label: "Districts Served" },
              { value: "10K+", label: "Educators Trained" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-colors group"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-gradient-aces mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
