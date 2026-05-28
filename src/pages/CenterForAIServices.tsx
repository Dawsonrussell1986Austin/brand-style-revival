import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  LineChart,
  BookOpen,
  Quote,
  ClipboardList,
  Users,
  Check,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/home/ai-hero-classroom.jpg";
import pathwayImg from "@/assets/home/hero-classroom.jpg";

const principles = [
  {
    icon: ShieldCheck,
    title: "Readiness first",
    body: "Set common language, ethics guardrails, and leadership alignment before broad adoption.",
  },
  {
    icon: LineChart,
    title: "Practice together",
    body: "Give educators time to test prompts, review outputs, and make instructional choices.",
  },
  {
    icon: BookOpen,
    title: "Sustain the work",
    body: "Build routines, coaching, and resource time so that use grows across teams.",
  },
];

const services = [
  {
    icon: ShieldCheck,
    title: "AI Literacy",
    body: "Shared vocabulary, ethical use, and practical foundations for educators and leaders.",
  },
  {
    icon: LineChart,
    title: "AI Integration Strategy",
    body: "District planning tied to policy, curriculum, assessment, and professional learning.",
  },
  {
    icon: BookOpen,
    title: "Custom AI Tools",
    body: "Purpose-built tools that support ACES workflows, school teams, and local priorities.",
  },
  {
    icon: Quote,
    title: "Prompt Libraries",
    body: "Reusable prompt sets for planning, communication, reflection, and classroom support.",
  },
  {
    icon: ClipboardList,
    title: "Curriculum Support",
    body: "AI-assisted resources reviewed through educator expertise and instructional goals.",
  },
  {
    icon: Users,
    title: "Implementation Coaching",
    body: "Ongoing support as teams move from first use to confident practice.",
  },
];

const pathway = [
  { step: 1, title: "Listen", body: "Name district needs, current practice, and risk tolerance." },
  { step: 2, title: "Learn", body: "Build shared understanding through workshops and guided exploration." },
  { step: 3, title: "Design", body: "Select tools, prompts, and workflows that match local goals." },
  { step: 4, title: "Apply", body: "Run small planning cycles, then refine with educator feedback." },
  { step: 5, title: "Sustain", body: "Build licenses, guardrails, and coaching routines for long-term use." },
];

const workspaceItems = [
  "Prompt review",
  "Policy alignment",
  "Resource library",
  "Human approval",
];

const toolkitChecks = [
  "Aligned to local goals",
  "Built for review and revision",
  "Clear enough for busy teams",
];

const supportCards = [
  { num: "01", title: "Workshops", body: "Shared learning sessions that build AI literacy and practical confidence." },
  { num: "02", title: "District planning", body: "Facilitated strategy work for policy, adoption, and professional learning." },
  { num: "03", title: "Coaching cycles", body: "Support for educators as they move into planning and reflection." },
  { num: "04", title: "Custom builds", body: "Tailored tools and prompt libraries shaped around local needs." },
];

export default function CenterForAIServices() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Center for AI Services | ACES PDSI"
        description="Responsible AI for real school practice. ACES helps educators and leaders build AI literacy, design workflows, and create tools that keep people, pedagogy, and student growth at the center."
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 md:pt-36 pb-20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-sm font-semibold tracking-widest text-accent mb-4 uppercase">
                Center for AI Services
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
                Responsible AI for real school practice.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                ACES helps educators and school leaders build AI literacy, design practical workflows,
                and create tools that keep people, pedagogy, curriculum, and student growth at the center.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-aces text-white rounded-full px-8">
                  <Link to="/services">Explore Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                  <Link to="/contact">Contact PDSI</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-card p-3">
                <img src={heroImg} alt="Educators working together in a classroom" className="w-full aspect-[4/3] object-cover rounded-2xl" />
                <p className="text-center text-sm font-medium text-muted-foreground mt-3 mb-1">
                  Educator-led AI starts in real learning rooms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educator-led innovation */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-sm font-semibold tracking-widest text-accent mb-4 uppercase">
                Educator-led innovation
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                AI works best when human judgment stays visible.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                The Center for AI Services supports districts with clear guardrails, hands-on learning, and practical
                implementation plans. The work connects policy, pedagogy, curriculum, and daily classroom decisions.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-md border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              Service areas designed for schools and districts.
            </h2>
            <p className="text-lg text-muted-foreground">
              Six practical entry points help teams move from questions and early experiments into clear, responsive classroom and district routines.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.body}</p>
                <Link to="/contact" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation pathway */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src={pathwayImg} alt="Small-group educator planning" className="w-full aspect-[4/3] object-cover" />
              </div>
              <p className="text-center text-sm font-medium text-muted-foreground mt-4">
                Small-group planning gives AI work a human center.
              </p>
            </div>
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border">
              <div className="text-sm font-semibold tracking-widest text-accent mb-4 uppercase">
                Implementation pathway
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
                Move from awareness to useful routines.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The work stays practical: learn together, try in context, review with care, and keep improving with educator feedback.
              </p>
              <ol className="space-y-5">
                {pathway.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {step.step}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-foreground mb-1">{step.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Practical toolkit */}
      <section className="py-20 md:py-28 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold tracking-widest text-accent mb-4 uppercase">
                Practical toolkit
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                A practical toolkit for everyday educator work.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Use lightweight templates, prompt cards, review steps, and resource libraries that make AI easier to use with care.
              </p>
              <ul className="space-y-3">
                {toolkitChecks.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">AI planning workspace</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Review steps, prompt cards, and educator decisions stay visible.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {workspaceItems.map((label) => (
                  <div key={label} className="bg-accent/5 rounded-full px-5 py-3 border border-accent/20 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Shared, reviewed, and ready for teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways the Center can support your team */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              Ways the Center can support your team.
            </h2>
            <p className="text-lg text-muted-foreground">
              Use the page to guide visitors toward the right entry point, from first workshops to sustained district coaching.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {supportCards.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 shadow-md border border-border"
              >
                <div className="text-sm font-bold text-accent mb-3">{card.num}</div>
                <h3 className="font-heading font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 leading-tight">
                Bring responsible AI into educator practice.
              </h2>
              <p className="text-primary-foreground/80">
                Use this page as a hub for AI literacy, integration strategy, custom tools, prompt resources, and implementation coaching.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 flex-shrink-0">
              <Link to="/contact">Talk With Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}