import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

declare global {
  interface Window {
    __adcloudiq__: Array<(() => void) | { track: (config: { advertiserId: string; pixelId: string }) => void }>;
  }
}
import { 
  Users, 
  Brain, 
  Layers, 
  Headphones, 
  Target, 
  ClipboardCheck,
  Baby,
  UserCheck,
  GraduationCap,
  Building,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import heroImage from "@/assets/teacher-classroom.jpg";

const services = [
  {
    icon: Users,
    title: "Customized Professional Learning",
    description: "We design and deliver professional learning tailored to your district's goals, culture, and educator needs. Whether focused on instructional strategies, leadership development, or systemic change, ACES creates engaging, job-embedded learning experiences that make an immediate and lasting impact.",
    color: "from-aces-blue to-aces-secondary-blue"
  },
  {
    icon: Brain,
    title: "Center for Artificial Intelligence",
    description: "The ACES Center for Artificial Intelligence positions educators and leaders at the forefront of AI-driven innovation. Through professional learning, research partnerships, and product development, we help schools navigate the opportunities and challenges of AI responsibly and ethically.",
    color: "from-aces-green to-aces-secondary-green"
  },
  {
    icon: Layers,
    title: "Curriculum Writing & Implementation",
    description: "ACES partners with districts to lead and support curriculum writing teams, guiding educators through a clear, standards-aligned process that results in high-quality curriculum tailored to student needs.",
    color: "from-aces-blue to-aces-navy"
  },
  {
    icon: Headphones,
    title: "Train-the-Trainer Programs",
    description: "We help districts build internal capacity with our Train-the-Trainer model. ACES equips district and teacher leaders with the tools, strategies, and resources they need to deliver effective professional learning to peers.",
    color: "from-aces-secondary-blue to-aces-blue"
  },
  {
    icon: Target,
    title: "Instructional Coaching",
    description: "Our instructional coaching services support a culture of continuous growth by providing educators with just-in-time feedback, collaborative reflection, and guided practice.",
    color: "from-aces-green to-aces-blue"
  },
  {
    icon: ClipboardCheck,
    title: "Curriculum Audits & Management",
    description: "ACES conducts comprehensive curriculum audits that examine standards alignment, rigor, equity, and accessibility across your curriculum with clear, actionable recommendations.",
    color: "from-aces-navy to-aces-blue"
  },
  {
    icon: Baby,
    title: "Early Childhood Services",
    description: "Our early childhood services are grounded in child development and play-based learning. ACES supports early educators and leaders with coaching, curriculum support, and classroom environment design.",
    color: "from-aces-secondary-green to-aces-green"
  },
  {
    icon: UserCheck,
    title: "Paraeducator Support",
    description: "ACES provides paraeducators with the knowledge and skills needed to effectively support classroom instruction, including ParaPro test preparation and customized training.",
    color: "from-aces-blue to-aces-green"
  },
  {
    icon: GraduationCap,
    title: "Alternate Routes to Certification",
    description: "To help address educator shortages, ACES offers State Board–approved Alternative Route to Certification (ARC) programs in high-need areas such as Library Media and Teaching English Learners.",
    color: "from-aces-secondary-blue to-aces-secondary-green"
  },
  {
    icon: Building,
    title: "Product Development",
    description: "In partnership with educators and innovators, ACES designs practical tools and resources to meet the evolving needs of schools. From classroom workbooks to AI-powered platforms.",
    color: "from-aces-navy to-aces-green"
  }
];

const highlights = [
  "Research-Based Approaches",
  "Customized Solutions",
  "Sustainable Impact",
  "Expert Facilitators"
];

export default function Services() {
  // AdCloudIQ tracking pixel
  useEffect(() => {
    // Load the SDK script
    const script = document.createElement("script");
    script.src = "https://p.jmlp.app/sdk.js";
    script.defer = true;
    document.head.appendChild(script);

    // Initialize tracking
    window.__adcloudiq__ = window.__adcloudiq__ || [];
    window.__adcloudiq__.push(function () {
      (window.__adcloudiq__ as any).track({
        advertiserId: "91a68c22-c504-4e16-8588-1f817ed6f937",
        pixelId: "399fa278-4007-416c-9ae5-aa675150b844"
      });
    });

    return () => {
      const existingScript = document.querySelector('script[src="https://p.jmlp.app/sdk.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Services"
        description="Explore ACES PDSI's comprehensive professional development services including AI integration, instructional coaching, curriculum development, and leadership training."
        url="/services"
        keywords="professional development services, instructional coaching, curriculum development, AI integration, leadership development, teacher training"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Educators collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-aces-navy/95 via-aces-navy/80 to-aces-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-aces-navy/60 to-transparent" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-aces-blue/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-aces-green rounded-full animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Professional Development Services</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
              Building Capacity,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aces-green via-white to-aces-secondary-blue">
                Driving Impact
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Innovating today, transforming tomorrow. Partner with ACES for research-based professional learning that makes a lasting difference.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 text-white/90 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-aces-green" />
                  {item}
                </motion.div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-b from-secondary/30 to-background relative">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-aces-blue uppercase tracking-wider mb-3">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive professional development solutions designed to empower educators and transform schools.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl p-8 border border-border hover:border-aces-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold font-heading text-aces-navy mb-3 group-hover:text-aces-blue transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 section-brand">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Districts Served" },
              { value: "10K+", label: "Educators Trained" },
              { value: "25+", label: "Years Experience" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Field Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold text-aces-green uppercase tracking-wider mb-3">Insights</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-6">
                From the Field
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Reflections from the field, where practice meets innovation. PDSI's professional 
                learning specialists share strategies, success stories, and emerging trends to 
                help educators lead with impact.
              </p>
              <Button className="gradient-aces text-white btn-glow">
                Visit Our Blog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 md:gap-6">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiMwOTU3OEIiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                  <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg">
                    <p className="text-aces-blue font-bold text-xl leading-none">20</p>
                    <p className="text-xs text-muted-foreground font-medium">Nov</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold text-aces-green uppercase tracking-wider mb-2">Coaching</span>
                  <h3 className="font-semibold font-heading text-aces-navy group-hover:text-aces-blue transition-colors leading-snug">
                    Coaching Saved the Classroom: How One District Improved Teacher Retention in Year 1
                  </h3>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-200 via-blue-50 to-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiMwOTU3OEIiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                  <div className="absolute top-4 left-4 bg-aces-blue rounded-xl px-4 py-2 shadow-lg">
                    <p className="text-white font-bold text-xl leading-none">19</p>
                    <p className="text-xs text-white/80 font-medium">Nov</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold text-aces-blue uppercase tracking-wider mb-2">Policy</span>
                  <h3 className="font-semibold font-heading text-aces-navy group-hover:text-aces-blue transition-colors leading-snug">
                    The Hidden Line Item: 3 Legislative Changes That Could Shrink or Stretch Your PD Budget
                  </h3>
                </div>
              </motion.article>
            </div>
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Ready to Transform Your District?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Let's work together to build capacity and drive lasting impact. Our team is ready to customize a solution for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-aces-navy hover:bg-white/90 shadow-xl px-8">
                Contact Us Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
