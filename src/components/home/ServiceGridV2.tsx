import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Users, BookOpen, GraduationCap, Award, Users2 } from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Workshops & Events",
    description: "Engaging, practical professional learning opportunities for educators and leaders.",
    href: "/workshops-events",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "PDSI Services",
    description: "Customized coaching and consulting to support teaching, learning, and leadership.",
    href: "/pdsi-services",
    iconColor: "text-accent",
  },
  {
    icon: GraduationCap,
    title: "Center for AI Services",
    description: "Empowering educators to use AI ethically, effectively, and confidently.",
    href: "/center-for-ai-services",
    iconColor: "text-[hsl(184_63%_39%)]",
  },
  {
    icon: Award,
    title: "Alternate Routes to Certification (ARC)",
    description: "Support and guidance for aspiring educators on their certification paths.",
    href: "/arc",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description: "Curated tools and resources to enhance instruction and support student success.",
    href: "/resources",
    iconColor: "text-accent",
  },
  {
    icon: Users2,
    title: "Regional Forums",
    description: "Collaborative spaces for educators and leaders to connect, learn, and lead.",
    href: "/pdsi-services/regional-forums",
    iconColor: "text-accent",
  },
];

export function ServiceGridV2() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to={service.href}
                className="group block card-elevated rounded-2xl p-7 h-full transition-all"
              >
                <div className="mb-5">
                  <service.icon className={`w-10 h-10 ${service.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-accent font-semibold text-lg group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}