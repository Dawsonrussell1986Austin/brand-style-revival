import { motion } from "framer-motion";
import { Brain, Users, BookOpen, Target, Lightbulb, GraduationCap, BarChart3, Settings, Heart, Rocket } from "lucide-react";

const services = [
  { icon: Brain, title: "AI Integration", description: "Harness AI to enhance teaching and learning outcomes", gradient: "from-primary to-accent", featured: true },
  { icon: Users, title: "Instructional Coaching", description: "One-on-one support to elevate teaching practices", gradient: "from-accent to-aces-secondary-blue" },
  { icon: BookOpen, title: "Curriculum Development", description: "Design rigorous, standards-aligned curriculum", gradient: "from-aces-secondary-blue to-primary" },
  { icon: Target, title: "School Improvement", description: "Strategic planning for sustainable growth", gradient: "from-primary to-aces-secondary-green" },
  { icon: Lightbulb, title: "Leadership Development", description: "Build capacity at every level of leadership", gradient: "from-aces-secondary-green to-accent" },
  { icon: GraduationCap, title: "New Teacher Support", description: "Mentorship and resources for new educators", gradient: "from-accent to-primary" },
  { icon: BarChart3, title: "Data Analysis", description: "Turn data into actionable insights", gradient: "from-primary to-aces-secondary-blue" },
  { icon: Settings, title: "Technology Integration", description: "Seamlessly blend tech into instruction", gradient: "from-aces-secondary-blue to-aces-secondary-green" },
  { icon: Heart, title: "Early Childhood", description: "Specialized support for our youngest learners", gradient: "from-aces-secondary-green to-primary" },
  { icon: Rocket, title: "Innovation Labs", description: "Pilot cutting-edge educational approaches", gradient: "from-primary to-accent", featured: true },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="orb orb-green w-[400px] h-[400px] top-[20%] -right-[100px] opacity-30" />
      
      <div className="relative container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            <Settings className="w-4 h-4" />
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Our <span className="text-gradient-aces">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group relative glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="relative text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              {service.featured && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}