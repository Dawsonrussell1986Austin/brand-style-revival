import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/home/hero-classroom.jpg";

export function HeroV2() {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="ACES educators collaborating in a professional learning session"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Grounding in Pedagogy.
            <br />
            Growing in Innovation.
          </h1>
          <p className="text-lg md:text-xl font-medium text-primary-foreground/90 leading-relaxed mb-8 max-w-xl">
            ACES PDSI partners with educators and school leaders to strengthen teaching,
            support meaningful learning, and help schools grow with clarity, care, and
            practical innovation.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base transition-all shadow-lg hover:shadow-xl"
          >
            About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}