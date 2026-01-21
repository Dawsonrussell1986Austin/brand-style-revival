import { motion } from "framer-motion";
import { Check, Lightbulb, Handshake, Target, TrendingUp } from "lucide-react";

const highlights = [
  {
    icon: Lightbulb,
    title: "Expertise across roles and systems",
    description: "from classrooms to district leadership",
  },
  {
    icon: Target,
    title: "Clear strategies for managing change",
    description: "not just ideas, but actionable direction",
  },
  {
    icon: Handshake,
    title: "Collaborative partnerships",
    description: "we work with you, not just for you",
  },
  {
    icon: TrendingUp,
    title: "Proven impact",
    description: "measurable outcomes that matter",
  },
];

export function PartnerSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-8">
              Your partner in{" "}
              <span className="text-gradient-aces">professional learning</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At ACES PDSI, we partner with educators—from paraeducators to superintendents—to 
              turn strategy into action and build what's next in education. We provide cost-effective, 
              customized solution pathways that strengthen systems, solve real challenges, and lead 
              lasting change.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              {["Certified", "Research-Based", "Results-Driven"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground/80"
                >
                  <Check className="w-4 h-4 text-primary" />
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Cards */}
          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      — {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
