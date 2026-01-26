import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us"
        description="Learn about ACES Professional Development & School Improvement. Supporting educators and districts across Connecticut since 1992 with research-based professional learning."
        url="/about"
        keywords="about ACES PDSI, education history, Connecticut educators, school improvement mission"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-pattern" />
          <div className="absolute top-32 right-[10%] w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                About Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Supporting educators and districts across Connecticut and beyond since 1992.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <div className="space-y-8">
                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <p className="text-foreground leading-relaxed text-lg">
                      The ACES Professional Development & School Improvement (PDSI) supports schools, districts, and educational organizations across the greater New Haven area, South Central Region, and beyond through research-based professional learning, coaching, and school improvement services. Our work includes curriculum and instructional support, leadership development, school climate and restorative practices, play-based and developmentally appropriate learning, and data-informed planning and implementation. PDSI partners closely with educators and leaders to design learning experiences and improvement efforts that are practical, sustainable, and responsive to local needs.
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">The Center for AI</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          As this work expanded, particularly at the intersection of leadership, instructional design, systems improvement, and innovation, it led to the development of the ACES Center for Artificial Intelligence. The Center for AI builds on PDSI's systems-oriented approach by supporting districts in understanding and applying artificial intelligence through leadership readiness, ethical use, instructional design, and organizational decision-making. Services include role-specific professional learning, strategic planning, policy guidance, and support for integrating AI in ways that align with instructional goals and district values.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Collaborative Partnership</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Today, PDSI and the ACES Center for AI work collaboratively and in partnership to support educators, leaders, and districts. Together, we offer integrated services that connect instructional improvement, school climate, data use, and emerging technologies helping organizations move beyond isolated initiatives toward coherent, aligned systems. While rooted in South Central Connecticut, this collaborative work is growing beyond the region and increasingly supporting organizations nationwide.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Our Mission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Grounded in equity and driven by impact, our work helps schools move from planning to practice, supporting educators in creating learning environments where all students can thrive academically, socially, and emotionally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                What Guides Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our core principles shape everything we do.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "Practical & Sustainable",
                  description: "We design learning experiences and improvement efforts that are responsive to local needs and built to last."
                },
                {
                  icon: Users,
                  title: "Partnership-Driven",
                  description: "We work closely with educators and leaders, building collaborative relationships that drive meaningful change."
                },
                {
                  icon: Heart,
                  title: "Equity-Centered",
                  description: "Our work is grounded in equity, ensuring all students can thrive academically, socially, and emotionally."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-xl gradient-aces flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
