import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ClipboardCheck,
  Ruler,
  DoorOpen,
  FileText,
  Users,
  BookOpen,
  Activity,
  Handshake,
  CircleUserRound,
  Check,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/arc/arc-learning.jpg";
import expectImg from "@/assets/arc/arc-team.jpg";

const pathway = [
  { step: "01", icon: TrendingUp, title: "Explore", body: "Understand the pathway, eligibility expectations, and fit." },
  { step: "02", icon: ClipboardCheck, title: "Enroll", body: "Connect with ACES PDSI and begin the formal program steps." },
  { step: "03", icon: Ruler, title: "Prepare", body: "Build readiness through learning, mentorship, and practice." },
  { step: "04", icon: DoorOpen, title: "Enter the Classroom", body: "Move forward with confidence, support, and clear next steps." },
];

const readiness = [
  { icon: FileText, title: "Certification pathway", body: "Clear milestones help candidates see where they are and what comes next." },
  { icon: Users, title: "Mentorship support", body: "Practical guidance from people who know schools, classrooms, and candidates." },
  { icon: BookOpen, title: "Classroom preparation", body: "Learning pages connect directly to the realities of teaching practice." },
  { icon: Activity, title: "Flexible guidance", body: "Support for mixed candidate paths while keeping expectations clear." },
  { icon: Handshake, title: "District partnership", body: "Schools and leaders gain a clearer way to support candidate readiness." },
  { icon: CircleUserRound, title: "Candidate confidence", body: "The home page works as a landing point, and focuses on next steps." },
];

const expectations = [
  { title: "Clear next steps", body: "Plain-language milestones and a visible pathway." },
  { title: "Practical preparation", body: "Coursework and support connected to real classrooms." },
  { title: "Mentorship and feedback", body: "Honest guidance through hard days and growth moments." },
  { title: "Readiness focus", body: "Confidence, expectations, and support moving together." },
];

const audiences = [
  { title: "Aspiring educators", body: "A welcoming entry point for people ready to move toward a new step." },
  { title: "Career changers", body: "A structured way to connect prior experience to a future in the classroom." },
  { title: "District leaders", body: "A clear staffing view of how ACES can support educator pathways." },
];

export default function ARC() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Alternate Routes to Certification (ARC) | ACES PDSI"
        description="A structured path for aspiring educators who are ready to prepare, practice, and enter the classroom with confidence."
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-12 text-primary-foreground flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-5">
                Alternate Routes to Certification (ARC)
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/85 mb-8 max-w-lg leading-relaxed">
                A structured path for aspiring educators who are ready to prepare, practice, and enter the classroom with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7">
                  <Link to="/contact">Explore ARC Pathway</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/contact">Contact PDSI</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-card rounded-3xl shadow-xl border border-border p-4 flex flex-col"
            >
              <img src={heroImg} alt="Educators collaborating in a school library" className="w-full flex-1 object-cover rounded-2xl aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Pathway</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
              A clear path into the classroom
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A simple visual progression gives candidates and district partners a shared understanding of the journey from early interest to classroom readiness.
            </p>
          </div>
          <div className="bg-card rounded-3xl border border-border shadow-md p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pathway.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-border relative"
                >
                  <div className="inline-flex items-center justify-center text-xs font-bold tracking-wider text-accent bg-accent/10 rounded-full px-3 py-1 mb-4">
                    {p.step}
                  </div>
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

      {/* Readiness */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Readiness</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
              Built for aspiring educators
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Supports that make the certification pathway feel structured, practical, and human.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {readiness.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.body}</p>
                <Link to="/contact" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What candidates can expect */}
      <section className="py-16 md:py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-3xl overflow-hidden shadow-xl bg-card p-3">
                <img src={expectImg} alt="ACES educators and partners" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-tight">
                What candidates can expect
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The ARC page should feel like a steady guide. It answers the quiet questions a candidate may bring before they apply: what comes first, who helps, what the work looks like, and how the classroom becomes possible.
              </p>
              <ul className="space-y-5">
                {expectations.map((e) => (
                  <li key={e.title} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-foreground mb-1">{e.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support / audiences */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Support</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
              Made for candidates and district partners
            </h2>
              <p className="text-muted-foreground leading-relaxed">
                ARC is a practical, guided option for candidates, career changers, and district partners.
              </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {audiences.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-accent/10 rounded-2xl p-6 border border-accent/20"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{a.body}</p>
                <span className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-accent bg-accent/15 rounded-full px-3 py-1.5">
                  ARC support
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-12 text-primary-foreground flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-3 leading-tight">
                Ready to begin the ARC pathway?
              </h2>
              <p className="text-primary-foreground/80">
                Take the next step toward the classroom with a calm, supportive experience.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7 flex-shrink-0">
              <Link to="/contact">Contact ACES PDSI</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}