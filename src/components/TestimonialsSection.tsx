import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    image: testimonial1,
    quote: "ACES helped us turn our PD from passive to powerful. The transformation was remarkable.",
    author: "Dr. Sarah Mitchell",
    role: "School Principal",
    location: "Hartford, CT",
  },
  {
    image: testimonial2,
    quote: "They get it. Their coaching is tailored, practical, and worth every penny. A game-changer.",
    author: "Marcus Thompson",
    role: "District Superintendent",
    location: "New Haven, CT",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="accent-line w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            What Educators Say
          </h2>
          <p className="text-lg font-medium text-muted-foreground">
            Hear from the leaders and teachers who partner with us
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative card-feature rounded-3xl p-8"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl font-heading text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-base font-medium text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
