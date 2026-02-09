import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImageFallback from "@/assets/hero-educators.jpg";
import { useContent, useImage } from "@/hooks/useSiteContent";

export function Hero() {
  const { content: badge } = useContent("home", "hero", "badge", "Empowering Educators Since 1992");
  const { content: headingLine1 } = useContent("home", "hero", "heading_line1", "Grounded in Pedagogy");
  const { content: headingLine2 } = useContent("home", "hero", "heading_line2", "Growing in Innovation");
  const { content: subtitle } = useContent("home", "hero", "subtitle", "Partner with ACES to transform your educational ecosystem through cutting-edge professional development, AI integration, and evidence-based strategies.");
  const { content: statYears } = useContent("home", "hero", "stat_years", "30+");
  const { content: statDistricts } = useContent("home", "hero", "stat_districts", "500+");
  const { content: statEducators } = useContent("home", "hero", "stat_educators", "10K+");
  const { content: satisfactionRate } = useContent("home", "hero", "satisfaction_rate", "98%");
  const { imageUrl: heroImage, altText: heroAlt } = useImage("home", "hero", "hero_image", heroImageFallback);
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 md:pt-36">
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
                {badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6"
            >
              {headingLine1.split(' ').slice(0, -1).join(' ')}{" "}
              <span className="text-gradient-aces">{headingLine1.split(' ').pop()}</span>
              <br />
              {headingLine2.split(' ').slice(0, -1).join(' ')}{" "}
              <span className="text-gradient-aces">{headingLine2.split(' ').pop()}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-medium text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="gradient-aces text-white font-semibold px-8 py-6 text-base rounded-full btn-glow group"
              >
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 px-8 py-6 text-base rounded-full group"
              >
                <Link to="/resources">
                  <BookOpen className="mr-2 w-4 h-4" />
                  View Resources
                </Link>
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
                { value: statYears, label: "Years" },
                { value: statDistricts, label: "Districts" },
                { value: statEducators, label: "Educators" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
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
                alt={heroAlt || "Educators collaborating in modern classroom"}
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
                  <span className="text-white text-xl font-bold">{satisfactionRate}</span>
                </div>
                <div>
                  <div className="font-bold text-foreground">Satisfaction Rate</div>
                  <div className="text-base font-medium text-muted-foreground">From our partners</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
