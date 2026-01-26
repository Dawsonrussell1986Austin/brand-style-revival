import { motion } from "framer-motion";
import { Brain, Users, BookOpen, Target, Lightbulb, GraduationCap, BarChart3, Settings, Heart, Rocket, ArrowRight } from "lucide-react";

const services = [
  { icon: Brain, title: "AI Integration", description: "Harness AI to enhance teaching and learning", featured: true },
  { icon: Users, title: "Instructional Coaching", description: "Personalized support to elevate practice" },
  { icon: BookOpen, title: "Curriculum Development", description: "Standards-aligned, rigorous curriculum" },
  { icon: Target, title: "School Improvement", description: "Strategic planning for growth" },
  { icon: Lightbulb, title: "Leadership Development", description: "Build capacity at every level" },
  { icon: GraduationCap, title: "New Teacher Support", description: "Mentorship for new educators" },
  { icon: BarChart3, title: "Data Analysis", description: "Turn data into insights" },
  { icon: Settings, title: "Tech Integration", description: "Blend tech into instruction" },
  { icon: Heart, title: "Early Childhood", description: "Support for youngest learners" },
  { icon: Rocket, title: "Innovation Labs", description: "Pilot cutting-edge approaches", featured: true },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="accent-line w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to transform education at every level
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group card-elevated rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer ${
                service.featured ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 ${
                service.featured ? "gradient-aces" : "bg-primary/10"
              }`}>
                <service.icon className={`w-5 h-5 md:w-6 md:h-6 ${service.featured ? "text-white" : "text-primary"}`} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed hidden sm:block">
                {service.description}
              </p>
              {service.featured && (
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
