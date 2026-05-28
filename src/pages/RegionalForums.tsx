import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, BookOpen, TrendingUp, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import heroForum from "@/assets/home/featured-rigor.jpg";
import ballroom from "@/assets/home/partner-ballroom.jpg";
import groupPhoto from "@/assets/home/events-hero.jpg";
import classroom from "@/assets/home/hero-classroom.jpg";

const pillars = [
  {
    icon: Users,
    title: "Shared problems of practice",
    body: "Frame regional challenges in plain language and bring practical options back to district teams.",
  },
  {
    icon: BookOpen,
    title: "Protocols that travel",
    body: "Use facilitator structures, reflection tools, and planning routines that leaders can reuse.",
  },
  {
    icon: TrendingUp,
    title: "Leader-to-leader network",
    body: "Build relationships across districts so learning continues beyond a single session.",
  },
];

const flow = [
  {
    step: 1,
    title: "Convene",
    body: "Gather leaders around a timely regional question, with ACES PDSI guiding the learning frame.",
  },
  {
    step: 2,
    title: "Share",
    body: "Compare district context, current practice, bright spots, and sticking points in a protected space.",
  },
  {
    step: 3,
    title: "Design",
    body: "Use protocols, data, and planning tools to shape a practical next step for local teams.",
  },
  {
    step: 4,
    title: "Follow through",
    body: "Return with evidence, questions, and adjustments that keep improvement moving.",
  },
];

const focusAreas = [
  { tag: "INSTRUCTION", title: "Instructional coherence", body: "Strengthen shared expectations across classrooms, programs, and leadership teams." },
  { tag: "LEADERSHIP", title: "School improvement planning", body: "Translate priorities into visible routines, evidence cycles, and clearer implementation moves." },
  { tag: "CULTURE", title: "Relationships and climate", body: "Support learning environments where educators and students feel known, challenged, and respected." },
  { tag: "AI READINESS", title: "Responsible AI implementation", body: "Discuss policy, instructional use, staff readiness, and practical guardrails for district teams." },
  { tag: "EQUITY", title: "Multilingual learner support", body: "Share promising practice across aligned resources for multilingual learners and their educators." },
  { tag: "GROWTH", title: "Coaching and educator growth", body: "Build stronger adult learning systems through coaching, reflection, and collaborative practice." },
];

const networkPoints = [
  "Safe for broad regional storytelling across Connecticut districts.",
  "Clear enough for page graphics, event cards, and reusable icons.",
  "Aligned with the calm, card-based system used across the site.",
];

const RegionalForums = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Regional Forums | ACES PDSI"
        description="Collaborative spaces where district and school leaders come together around shared problems of practice, practical tools, and regional learning that moves back into local classrooms."
      />
      <Header />

      {/* HERO */}
      <section className="bg-secondary/40">
        <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-aces-green mb-5">
                <span className="w-2 h-2 rounded-full bg-aces-green" />
                PDSI SERVICES / REGIONAL FORUMS
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-aces-navy leading-[1.05] mb-6">
                Regional<br />Forums
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Collaborative spaces where district and school leaders come together around shared problems of practice, practical tools, and regional learning that moves back into local classrooms.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/events" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-aces-green hover:bg-aces-green/90 text-white font-semibold transition-all">
                  Explore Forums
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-border hover:border-aces-green text-aces-navy font-semibold transition-all">
                  Contact PDSI
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img src={heroForum} alt="Leaders working together in a regional forum" className="w-full h-[340px] md:h-[420px] object-cover rounded-3xl shadow-lg" />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-lg p-4 max-w-[240px]">
                <p className="text-[11px] font-bold tracking-wider text-aces-green mb-1">REGIONAL LEARNING</p>
                <p className="font-heading font-bold text-aces-navy text-sm leading-snug">Leaders working through real questions together.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MODEL + 3 PILLARS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-bold tracking-wider text-aces-green mb-3">CONNECT. LEARN. LEAD.</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-5 leading-tight">
                A forum model built for practical collaboration.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                ACES PDSI Regional Forums create steady space for leaders to compare approaches, test ideas, and leave with clear next steps. The work is collegial, grounded in evidence, and shaped by the needs districts are actually navigating.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <div key={p.title} className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-aces-blue/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-aces-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-aces-navy mb-2 text-lg leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORUM FLOW */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img src={ballroom} alt="Educators gathered in a regional forum" className="w-full h-[380px] object-cover rounded-3xl shadow-md" />
            <div className="bg-white rounded-3xl border border-border p-8 md:p-10 shadow-sm">
              <p className="text-xs font-bold tracking-wider text-aces-green mb-3">FORUM FLOW</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-3 leading-tight">
                Simple structure. Useful outcomes.
              </h2>
              <p className="text-base text-muted-foreground mb-7 leading-relaxed">
                Each convening keeps the rhythm focused: bring a real issue, learn from peers, test a tool, and plan the next small move.
              </p>
              <ol className="divide-y divide-border">
                {flow.map((f) => (
                  <li key={f.step} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-aces-green/10 text-aces-green font-bold flex items-center justify-center">
                      {f.step}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-aces-navy text-lg mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 mb-10 items-end">
            <div>
              <p className="text-xs font-bold tracking-wider text-aces-green mb-3">FOCUS AREAS</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy leading-tight">
                Forums can flex around the work leaders are carrying.
              </h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Topics shift each season to match what districts are navigating — from instructional coherence to AI readiness to multilingual learner support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area) => (
              <div key={area.title} className="relative bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-aces-green/40 transition-all overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-aces-green/10" />
                <p className="relative text-[11px] font-bold tracking-wider text-aces-green mb-3">{area.tag}</p>
                <h3 className="relative font-heading font-bold text-aces-navy text-lg mb-2 leading-snug">{area.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL CONNECTION */}
      <section className="py-16 md:py-20 bg-[hsl(var(--secondary))]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-3xl p-10 shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 320 220" className="w-full max-w-md">
                <ellipse cx="160" cy="110" rx="150" ry="95" fill="hsl(var(--aces-green) / 0.08)" stroke="hsl(var(--aces-green) / 0.25)" />
                {[
                  { x: 90, y: 70, label: "Learn" },
                  { x: 220, y: 70, label: "Plan" },
                  { x: 60, y: 150, label: "Share" },
                  { x: 160, y: 170, label: "Apply" },
                  { x: 260, y: 130, label: "Lead" },
                  { x: 220, y: 180, label: "Grow" },
                ].map((n, i, arr) => (
                  <g key={n.label}>
                    {arr.slice(i + 1).map((m) => (
                      <line key={`${n.label}-${m.label}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="hsl(var(--aces-blue) / 0.3)" strokeWidth="1" />
                    ))}
                  </g>
                ))}
                {[
                  { x: 90, y: 70, label: "Learn" },
                  { x: 220, y: 70, label: "Plan" },
                  { x: 60, y: 150, label: "Share" },
                  { x: 160, y: 170, label: "Apply" },
                  { x: 260, y: 130, label: "Lead" },
                  { x: 220, y: 180, label: "Grow" },
                ].map((n) => (
                  <g key={`node-${n.label}`}>
                    <circle cx={n.x} cy={n.y} r="22" fill="white" stroke="hsl(var(--aces-blue))" strokeWidth="1.5" />
                    <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-aces-navy" style={{ fontSize: 11, fontWeight: 600 }}>{n.label}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-aces-green mb-3">REGIONAL CONNECTION</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-4 leading-tight">
                An abstract network, not a false map.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                The visual system uses a simple blue-green network motif to suggest regional collaboration without implying specific district boundaries.
              </p>
              <ul className="space-y-3">
                {networkPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-aces-green/15 flex items-center justify-center">
                      <Check className="w-3 h-3 text-aces-green" />
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO MOMENTS */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: groupPhoto, title: "Convened energy, local application.", body: "Keep the page rooted in real gathering spaces and recognizable educator moments." },
              { src: classroom, title: "Small-group work matters.", body: "Use regional forums to turn conversation into tools, routines, and shared next steps." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <img src={p.src} alt={p.title} className="w-full h-[260px] object-cover" />
                <div className="p-5">
                  <h3 className="font-heading font-bold text-aces-navy text-base mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-aces-blue">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[1fr_auto] items-center gap-8">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
                Bring regional learning into district practice.
              </h2>
              <p className="text-white/85 text-base max-w-2xl leading-relaxed">
                Use this page as a hub for upcoming forums, registration links, recap resources, and opportunities for leaders to connect across districts.
              </p>
            </div>
            <Link to="/contact" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-aces-green hover:bg-aces-green/90 text-white font-semibold transition-all whitespace-nowrap">
              Talk With Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegionalForums;