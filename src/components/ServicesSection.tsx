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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group card-elevated rounded-2xl p-6 cursor-pointer ${
                service.featured ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                service.featured ? "gradient-aces" : "bg-primary/10"
              }`}>
                <service.icon className={`w-6 h-6 ${service.featured ? "text-white" : "text-primary"}`} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
