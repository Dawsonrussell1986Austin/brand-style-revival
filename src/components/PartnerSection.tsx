import { motion } from "framer-motion";
import { Check, Lightbulb, Handshake, Target, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Lightbulb, title: "Expertise across roles", description: "From classrooms to district leadership" },
  { icon: Target, title: "Clear strategies", description: "Actionable direction, not just ideas" },
  { icon: Handshake, title: "True partnerships", description: "We work with you, not just for you" },
  { icon: TrendingUp, title: "Proven impact", description: "Measurable outcomes that matter" },
];

export function PartnerSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="accent-line w-16 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
              Your partner in{" "}
              <span className="text-gradient-aces">professional learning</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At ACES PDSI, we partner with educators—from paraeducators to superintendents—to 
              turn strategy into action and build what's next in education.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {["Certified", "Research-Based", "Results-Driven"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground"
                >
                  <Check className="w-4 h-4 text-accent" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated rounded-2xl p-6 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
