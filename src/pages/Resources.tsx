import { motion } from "framer-motion";
import { BookOpen, Download, FileText, ArrowRight, Sparkles, CheckCircle2, Library, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Workbook {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string;
  description: string;
  status: "available" | "coming-soon";
  color: string;
}

interface FreeResource {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const workbooks: Workbook[] = [
  {
    id: "k5",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "K–5 Classrooms",
    description: "This workbook equips K–5 educators with ready-to-use games, strategies, and activities that build executive functioning skills while fostering connection and belonging through restorative practices.",
    status: "coming-soon",
    color: "from-amber-400 via-orange-300 to-rose-300",
  },
  {
    id: "68",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "6–8 Classrooms",
    description: "This workbook equips 6-8 educators with ready-to-use games, strategies, and activities that build executive functioning skills while fostering connection and belonging through restorative practices.",
    status: "coming-soon",
    color: "from-teal-400 via-cyan-300 to-blue-300",
  },
  {
    id: "912",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "9–12 Classrooms",
    description: "High school educators will find a collection of ready-to-implement strategies, activities, and discussion protocols in this practical workbook designed to strengthen students' executive functioning skills.",
    status: "coming-soon",
    color: "from-violet-400 via-purple-300 to-fuchsia-300",
  },
];

const freeResources: FreeResource[] = [
  {
    id: "climate",
    title: "ACES School Climate Improvement Plan Template",
    description: "A comprehensive template providing schools with a structured framework to develop, implement, and monitor their School Climate Improvement Plan in alignment with Connecticut legislation and school climate standards.",
    icon: "climate",
  },
  {
    id: "btc",
    title: "Building Thinking Classrooms: Look Fors Template",
    description: "This practical tool supports educators and leaders in implementing Peter Liljedahl's Building Thinking Classrooms framework with clear 'look-fors' and observable teacher and student behaviors.",
    icon: "thinking",
  },
  {
    id: "k2-exec",
    title: "K-2 Executive Functioning Station Activities",
    description: "Engaging, play-based activities designed to help young learners strengthen key executive functioning skills, including impulse control, working memory, cognitive flexibility, and self-regulation.",
    icon: "activities",
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 section-brand" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-aces-blue/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Library className="w-4 h-4 text-aces-green" />
              <span className="text-sm text-white/90 font-medium">Educator Resources</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              PDSI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aces-green via-white to-aces-secondary-blue">
                Resources
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Insights & actionable items for your everyday success. Practical tools created by educators, for educators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background relative">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-aces-navy">
                  Resources for Leaders & Educators
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                At ACES PDSI, we don't just deliver professional learning — we also create practical, innovative resources that extend that learning into everyday practice. Our resources page offers access to the products we develop in collaboration with educators.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Print-on-demand workbooks",
                  "Free downloadable tools",
                  "Ready-to-use templates",
                  "Research-based materials"
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-aces-green flex-shrink-0" />
                    <span className="text-aces-navy font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Workbooks Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-aces-blue uppercase tracking-wider mb-3">Featured Products</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
              Premium Workbooks & Guides
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              The <em className="text-aces-navy font-medium">Rooted in Relationships</em> workbook series provides teachers with practical strategies and activities that foster students' social-emotional growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workbooks.map((workbook, index) => (
              <motion.div
                key={workbook.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Workbook Cover */}
                <div className={`aspect-[3/4] bg-gradient-to-br ${workbook.color} rounded-2xl mb-6 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-aces-navy" />
                  
                  {/* Decorative circles */}
                  <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                  <div className="absolute bottom-16 left-8 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                  
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-aces-navy mb-2">
                      {workbook.title}
                    </h3>
                    <p className="text-aces-navy/80 text-sm font-medium mb-6 max-w-[200px]">
                      {workbook.subtitle}
                    </p>
                    <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <BookOpen className="h-10 w-10 text-aces-navy" />
                    </div>
                  </div>
                  
                  {/* Grade level badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-aces-navy py-4">
                    <p className="text-white text-sm font-semibold px-4">
                      {workbook.gradeLevel}
                    </p>
                  </div>
                  
                  {/* Coming soon badge */}
                  {workbook.status === "coming-soon" && (
                    <div className="absolute top-4 right-4 bg-white shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-bold text-aces-navy uppercase">Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {workbook.description}
                </p>

                {/* CTA Button */}
                <Button 
                  className={`w-full font-semibold rounded-xl ${
                    workbook.status === "coming-soon" 
                      ? "bg-secondary text-muted-foreground cursor-not-allowed" 
                      : "gradient-aces text-white btn-glow"
                  }`}
                  disabled={workbook.status === "coming-soon"}
                >
                  {workbook.status === "coming-soon" ? "Coming Soon" : "Order Now"}
                  {workbook.status !== "coming-soon" && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-aces-green uppercase tracking-wider mb-3">Free Downloads</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
              Free Tools & Templates
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Developed in partnership with schools and districts, these free tools make it easier to plan, implement, and sustain effective practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {freeResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 border border-border hover:border-aces-green/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-aces-green to-aces-secondary-green flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-heading text-lg font-bold text-aces-navy mb-3 group-hover:text-aces-green transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {resource.description}
                </p>
                
                <Button className="w-full gradient-aces text-white font-semibold rounded-xl btn-glow gap-2">
                  <Download className="h-4 w-4" />
                  Download Free
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-brand relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-aces-blue/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Need a Custom Resource?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              We partner with districts to develop tailored tools, guides, and materials that address your unique needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-aces-navy hover:bg-white/90 shadow-xl px-8">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
