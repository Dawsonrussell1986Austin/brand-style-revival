import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ACES provides relevant, practical learning that our teachers can use immediately. The support, resources, and personalized strategies—student centered.",
    author: "Sarah M.",
    role: "District Leader",
  },
  {
    quote: "The AI training was a game changer. It helped me open up to use these tools more confidently and help my students do the same.",
    author: "Michael T.",
    role: "Instructional Coach",
  },
  {
    quote: "ACES workshops create a space where educators feel valued, challenged, and inspired to grow.",
    author: "Jennifer L.",
    role: "Elementary Teacher",
  },
];

export function TestimonialsV2() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12"
        >
          What Educators Are Saying
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-background rounded-2xl p-7 shadow-sm border border-border"
            >
              <Quote className="w-8 h-8 text-primary mb-4" strokeWidth={2.5} />
              <p className="text-foreground/80 text-base leading-relaxed mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-bold text-primary">— {t.author}</p>
                <p className="text-sm font-medium text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}