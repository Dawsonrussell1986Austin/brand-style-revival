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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-aces-navy rounded-2xl p-8 md:p-12 lg:p-14 overflow-hidden flex flex-col justify-center min-h-[420px]"
            >
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-aces-blue/20 rounded-full blur-3xl" />
              <div className="absolute top-6 right-6 w-40 h-40 border border-white/10 rounded-full" />
              <div className="relative">
                <span className="text-xs md:text-sm font-bold text-white/70 tracking-[0.2em] uppercase mb-5 block">
                  PDSI Services
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-5">
                  Customized support for the work schools are doing now.
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                  ACES PDSI partners with educators and leaders to design practical
                  professional learning, technical assistance, and implementation
                  support tied to local goals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-aces-green hover:bg-aces-green/90 text-white rounded-full px-7">
                    <Link to="/contact">Plan With Us</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-white/40 bg-white text-aces-navy hover:bg-white/90 hover:text-aces-navy">
                    <a href="#pathway">View Pathway</a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/40 rounded-2xl p-4 md:p-6 flex items-center justify-center min-h-[420px]"
            >
              <img
                src={aiHero}
                alt="Educators collaborating in a library"
                className="w-full h-full max-h-[520px] object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro: Support that fits your school context */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-4">
                Support that fits your school context
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                PDSI services can be shaped around district goals, classroom practice,
                data-informed planning, leadership needs, and the professional learning
                conditions educators need to thrive.
              </p>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">
                Built around local goals
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Start with the problem of practice, then design learning that makes the
                next right step clear.
              </p>
              <Network className="w-8 h-8 text-aces-secondary-blue" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Service Pathway */}
      <section id="pathway" className="py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-aces-navy mb-3">
              A service pathway from idea to implementation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A simple pattern keeps the work grounded: understand the context, design
              for real conditions, support implementation, study evidence, and refine.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-center">
              <div className="rounded-xl overflow-hidden h-48 lg:h-56">
                <img src={partnerBallroom} alt="District planning session" className="w-full h-full object-cover" />
              </div>
              <ol className="relative grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { n: "01", title: "Listen", body: "Clarify needs, assets, constraints, and district context." },
                  { n: "02", title: "Design", body: "Shape a practical learning plan and support model." },
                  { n: "03", title: "Implement", body: "Coach, facilitate, model, and help teams apply ideas." },
                  { n: "04", title: "Measure", body: "Look at evidence of practice, progress, and impact." },
                  { n: "05", title: "Refine", body: "Adjust the plan and build the next round of support." },
                ].map((step, i) => (
                  <li key={step.n} className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-3 ${
                      i === 0 ? "bg-aces-green text-white" : "bg-white border-2 border-aces-secondary-blue/50 text-aces-secondary-blue"
                    }`}>
                      {step.n}
                    </div>
                    <h3 className="font-heading font-bold text-aces-navy text-base mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 bg-aces-green/10 border border-aces-green/20 rounded-xl px-5 py-3 text-center">
              <p className="text-sm font-semibold text-aces-navy">
                This pathway can support one consultation, a focused coaching cycle, or a longer district partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas — 6 cards */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-aces-navy mb-3">
              Service areas
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Each card represents a core area of partnership. Every engagement can lead
              to a deeper page section or a direct conversation with our team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: Users, title: "Instructional Coaching", desc: "Observation, planning, feedback cycles, and practical classroom support." },
              { icon: BookOpen, title: "Curriculum & Instruction", desc: "Support for curriculum planning, assessment alignment, and instructional strategy." },
              { icon: BarChart3, title: "Data-Informed Planning", desc: "Help teams use evidence to make decisions without losing sight of people." },
              { icon: LifeBuoy, title: "Leadership Support", desc: "Facilitation, planning routines, and learning structures for school leaders." },
              { icon: Wrench, title: "Technical Assistance", desc: "Responsive support for teams building systems, routines, and shared tools." },
              { icon: Laptop, title: "Technology Integration", desc: "Thoughtful use of digital tools, AI, and workflows that support educator expertise." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all"
              >
                <s.icon className="w-9 h-9 text-aces-green mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-aces-navy text-lg mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="w-10 h-0.5 bg-aces-green rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional learning at every phase — 3 photo cards */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-aces-navy mb-3">
              Professional learning at every phase
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              ACES PDSI supports planning, coaching, implementation, and continuous
              improvement across a full year or a focused cycle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              { n: "1", img: featuredRigor, title: "Needs & goals", body: "Clarify priorities, audience, schedule, and the outcomes that matter most." },
              { n: "2", img: partnerBallroom, title: "Design & facilitation", body: "Build sessions that connect research, practice, reflection, and team planning." },
              { n: "3", img: heroClassroom, title: "Implementation support", body: "Create coaching routines, artifacts, and follow-up structures that last." },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="rounded-xl overflow-hidden h-40 mb-5">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-full bg-aces-green/15 text-aces-green flex items-center justify-center text-sm font-bold">
                      {c.n}
                    </span>
                    <h3 className="font-heading font-bold text-aces-navy text-lg">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.body}</p>
                  <div className="w-10 h-0.5 bg-aces-green rounded-full" />
                </div>
              </motion.div>
            ))}
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
              <img src={aboutTeam} alt="ACES PDSI team" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy mb-3 leading-tight">
                Ready to design a customized support plan?
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-2xl">
                Use this as the bridge from service exploration to a simple inquiry.
                Connect with our team to scope a workshop, a coaching cycle, or a
                longer-term district partnership.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-aces-green hover:bg-aces-green/90 text-white rounded-full px-7">
                  <Link to="/contact">Contact PDSI</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-aces-navy text-aces-navy hover:bg-aces-navy hover:text-white">
                  <Link to="/contact">Ask a Question</Link>
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
