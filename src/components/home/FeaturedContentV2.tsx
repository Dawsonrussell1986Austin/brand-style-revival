import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featuredAi from "@/assets/home/featured-ai.jpg";
import featuredPlay from "@/assets/home/featured-play.jpg";
import featuredRigor from "@/assets/home/featured-rigor.jpg";

const items = [
  {
    image: featuredAi,
    alt: "Educators collaborating in an instructional coaching session",
    title: "Saving Time with AI",
    description: "Practical strategies to streamline your workflow, spark creativity, and make more time for what matters most.",
    href: "/ai-center",
  },
  {
    image: featuredPlay,
    alt: "Teachers exploring play-based learning with magnetic tiles",
    title: "Everyone Loves to Play",
    description: "How play-based learning fuels engagement, creativity, and deeper understanding for all learners.",
    href: "/resources",
  },
  {
    image: featuredRigor,
    alt: "Educators discussing multilingual learners in a school library",
    title: "Rooted in Relationships and Rigor",
    description: "Building strong connections while maintaining high expectations—because both are essential.",
    href: "/services",
  },
];

export function FeaturedContentV2() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12"
        >
          Featured Content
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link to={item.href} className="block">
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-muted">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent font-semibold group-hover:gap-2.5 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}