import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import aboutTeam from "@/assets/home/about-team.png";
import partnerBallroom from "@/assets/home/partner-ballroom.jpg";
import heroClassroom from "@/assets/home/hero-classroom.jpg";
import featuredAi from "@/assets/home/featured-ai.jpg";
import featuredPlay from "@/assets/home/featured-play.jpg";
import featuredRigor from "@/assets/home/featured-rigor.jpg";
import aiHero from "@/assets/home/ai-hero-classroom.jpg";

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
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Compass,
  BookOpen,
  BarChart3,
  LifeBuoy,
  Wrench,
  Laptop,
  Network
} from "lucide-react";
import heroImageFallback from "@/assets/teacher-classroom.jpg";
import { useImage } from "@/hooks/useSiteContent";

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
  const { imageUrl: heroImage } = useImage("services", "hero", "hero_image", heroImageFallback);
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
        jsonLd={{
          "@type": "WebPage",
          "name": "ACES PDSI Services",
          "url": "https://acespdsi.org/services",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "Service", "name": "Instructional Coaching", "provider": { "@type": "Organization", "name": "ACES PDSI" } },
              { "@type": "Service", "name": "AI Integration Training", "provider": { "@type": "Organization", "name": "ACES PDSI" } },
              { "@type": "Service", "name": "Curriculum Development", "provider": { "@type": "Organization", "name": "ACES PDSI" } },
              { "@type": "Service", "name": "Leadership Development", "provider": { "@type": "Organization", "name": "ACES PDSI" } }
            ]
          }
        }}
      />
      <Header />
      
      {/* Split Hero — mockup style */}
      <section className="pt-20 bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Left blue panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-aces-navy rounded-2xl p-8 md:p-12 lg:p-14 overflow-hidden flex flex-col justify-center min-h-[420px]"
            >
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-aces-blue/20 rounded-full blur-3xl" />
              <div className="relative">
                <span className="text-xs md:text-sm font-bold text-white/70 tracking-[0.2em] uppercase mb-5 block">
                  PDSI Services
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-5">
                  Professional learning that meets schools where they are.
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                  ACES PDSI partners with districts to design coaching, curriculum,
                  and leadership support that's grounded in pedagogy and built for
                  the realities of today's classrooms.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-aces-green hover:bg-aces-green/90 text-white rounded-full px-7">
                    <Link to="/contact">Talk With Our Team</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link to="/events">View Events</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right photo card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/40 rounded-2xl p-4 md:p-6 flex items-center justify-center min-h-[420px]"
            >
              <img
                src={aboutTeam}
                alt="ACES PDSI team and educators"
                className="w-full h-full max-h-[520px] object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro + Side card */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-4">
                Find the right partnership for your team
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                Browse our full menu of services — from instructional coaching and
                curriculum design to AI integration and alternate routes to certification.
                Each engagement is customized to your district's goals.
              </p>
              <div className="flex flex-wrap gap-2">
                {["All", "Coaching", "Curriculum", "AI & Innovation", "Leadership", "Certification"].map((tag, i) => (
                  <span
                    key={tag}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                      i === 0
                        ? "bg-aces-green text-white border-aces-green"
                        : "bg-white text-aces-navy border-border"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">
                Custom-built for your district
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Every service can be scoped as a single workshop, a multi-session series,
                or a long-term partnership. Tell us what you need.
              </p>
              <Sparkles className="w-8 h-8 text-aces-secondary-blue" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured services as listing cards */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-3">
              Featured services
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              A clean, scannable view of the partnerships districts ask for most often.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-5">
              {services.slice(0, 5).map((service, idx) => {
                const photos = [featuredAi, featuredPlay, featuredRigor, aboutTeam, partnerBallroom];
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-4 md:gap-5"
                  >
                    {/* icon tile */}
                    <div className="hidden md:flex w-20 h-20 rounded-xl bg-secondary/60 flex-col items-center justify-center shrink-0">
                      <service.icon className="w-7 h-7 text-aces-green" strokeWidth={1.5} />
                    </div>
                    {/* photo */}
                    <div className="w-full md:w-32 h-32 md:h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={photos[idx]} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    {/* content */}
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs font-bold text-aces-green uppercase tracking-wider mb-1">
                        Service
                      </span>
                      <h3 className="font-heading font-bold text-aces-navy text-lg md:text-xl mb-1 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-aces-secondary-blue" />
                          Flexible scheduling
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-aces-secondary-blue" />
                          District-wide
                        </span>
                      </div>
                    </div>
                    {/* CTA */}
                    <div className="flex md:items-center">
                      <Button asChild size="sm" className="bg-aces-green hover:bg-aces-green/90 text-white rounded-full px-5">
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* sidebar: more services + calendar-style */}
            <aside className="bg-white border border-border rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-heading font-bold text-aces-navy text-lg mb-4">
                More services
              </h3>
              <ul className="space-y-3 mb-6">
                {services.slice(5).map((s) => (
                  <li key={s.title} className="flex items-start gap-3">
                    <s.icon className="w-5 h-5 text-aces-green shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-aces-navy leading-snug">{s.title}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-aces-green" strokeWidth={1.5} />
                  <h4 className="font-heading font-bold text-aces-navy">Ready to talk?</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Book a discovery call and we'll tailor a plan for your team.
                </p>
                <Button asChild size="sm" className="w-full bg-aces-navy hover:bg-aces-navy/90 text-white rounded-full">
                  <Link to="/contact">Talk With Our Team</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Ways to partner — 4 icon cards */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-3">
              Ways to partner with ACES PDSI
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Every engagement is shaped around your district's goals — from a single
              workshop to a multi-year partnership.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Calendar, title: "Workshops", desc: "Focused sessions that turn strong ideas into classroom-ready moves." },
              { icon: Clock, title: "Learning Series", desc: "Multi-session structures for deeper practice and implementation." },
              { icon: Users, title: "Coaching Labs", desc: "Guided planning, modeling, reflection, and practical follow-through." },
              { icon: Building, title: "District Support", desc: "Custom professional learning designed around local goals." },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all"
              >
                <c.icon className="w-9 h-9 text-aces-secondary-blue mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
                <div className="w-10 h-0.5 bg-aces-green rounded-full" />
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
                <div className="text-white/90 text-base font-medium">{stat.label}</div>
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

      {/* Bottom CTA — photo card */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-[260px_1fr] gap-0"
          >
            <div className="h-48 md:h-auto">
              <img src={partnerBallroom} alt="ACES PDSI partnership" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-3 leading-tight">
                Need a learning plan for your school or district?
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-2xl">
                ACES PDSI can help teams plan customized professional learning, connect
                event participation to school goals, and build support that lasts.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-aces-green hover:bg-aces-green/90 text-white rounded-full px-7">
                  <Link to="/contact">Talk With Our Team</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-aces-navy text-aces-navy hover:bg-aces-navy hover:text-white">
                  <Link to="/events">View Events</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
