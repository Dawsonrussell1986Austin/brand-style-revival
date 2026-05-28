import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Compass,
  ClipboardCheck,
  LifeBuoy,
  GraduationCap,
  CalendarClock,
  Users,
  Check,
  Info,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/arc/arc-learning.jpg";
import expectImg from "@/assets/arc/arc-team.jpg";

const overview = [
  { icon: Compass, title: "Program overview", body: "A structured route to Connecticut educator certification for candidates ready to bring prior experience into the classroom." },
  { icon: GraduationCap, title: "Designed for candidates", body: "Practical preparation, mentorship, and coursework grounded in the real work of teaching." },
  { icon: Users, title: "Built with district partners", body: "Aligned with district staffing needs so candidates can step into roles with support." },
];

const eligibility = [
  "Bachelor's degree from a regionally accredited institution.",
  "Subject-area background aligned to the certification endorsement sought.",
  "Commitment to complete required coursework and practicum hours.",
  "Interest in teaching in a Connecticut public school setting.",
];

const support = [
  { icon: LifeBuoy, title: "Mentorship", body: "One-on-one guidance from experienced educators throughout the pathway." },
  { icon: ClipboardCheck, title: "Coursework support", body: "Facilitator-led learning connected to classroom realities." },
  { icon: Users, title: "Cohort community", body: "Peers walking the same path, sharing problems of practice and wins." },
];

const timeline = [
  { step: "01", title: "Explore", body: "Review the pathway, eligibility, and fit. Talk with ACES PDSI." },
  { step: "02", title: "Enroll", body: "Complete application steps and begin formal program onboarding." },
  { step: "03", title: "Prepare", body: "Coursework, mentorship, test preparation, and practicum experience." },
  { step: "04", title: "Certify", body: "Meet requirements, sit for required assessments, and earn certification." },
  { step: "05", title: "Enter the Classroom", body: "Move into a teaching role with continued support from ACES PDSI." },
];

const faqs = [
  { q: "Who is ARC for?", a: "Aspiring educators, career changers, and district candidates seeking an alternate route to Connecticut certification." },
  { q: "How long does the program take?", a: "Timing varies by endorsement area and candidate pace. ACES PDSI will share a detailed timeline during enrollment." },
  { q: "Is test preparation included?", a: "Yes. Candidates receive guidance and resources to prepare for the assessments required for their certification area." },
  { q: "Can districts partner with ACES on ARC?", a: "Yes. ACES PDSI works with district leaders to support staffing pipelines and candidate readiness." },
];

export default function ARC() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Alternate Routes to Certification (ARC) | ACES PDSI"
        description="A structured path for aspiring educators who are ready to prepare, practice, and earn Connecticut certification with mentorship from ACES PDSI."
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
              <Badge className="self-start mb-5 bg-accent/30 text-primary-foreground border border-primary-foreground/20 hover:bg-accent/30">
                ARC · Alternate Routes to Certification
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-5">
                A guided path into the Connecticut classroom
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/85 mb-8 max-w-lg leading-relaxed">
                ARC supports aspiring educators and career changers with coursework, mentorship, and test preparation needed to earn certification and step into the classroom with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7">
                  <Link to="/contact">Talk With Our Team</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/contact">Request Program Info</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-card rounded-3xl shadow-xl border border-border p-4 flex flex-col"
            >
              <img src={heroImg} alt="Educator candidate reviewing materials with a mentor" className="w-full flex-1 object-cover rounded-2xl aspect-[4/3]" />
            </motion.div>
          </div>

          {/* Draft / pending content notice */}
          <div className="mt-8 max-w-4xl mx-auto bg-secondary border border-border rounded-2xl p-4 md:p-5 flex gap-3 items-start">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Placeholder content — pending approval.</span> Final ARC program details are being confirmed. Contact ACES PDSI for the most current information.
            </p>
          </div>
        </div>
      </section>

      {/* Program overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Program Overview</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
              What ARC offers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A practical, supported route to certification — designed with candidates and district partners in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {overview.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <o.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{o.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Eligibility</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
                Who can apply
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Final eligibility requirements are confirmed with ACES PDSI during enrollment. The list reflects common expectations for ARC candidates.
              </p>
            </div>
            <ul className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              {eligibility.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Support resources */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-10">
            <div>
              <div className="rounded-3xl overflow-hidden shadow-xl bg-card p-3">
                <img src={expectImg} alt="ACES educators supporting ARC candidates" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Support Resources</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
                Support every step of the way
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ARC candidates are not on their own. Mentorship, coursework, and a peer cohort make the pathway feel structured, practical, and human.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {support.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test preparation */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">Test Preparation</div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 leading-tight">
                  Get ready for required assessments
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  ARC candidates receive structured guidance and study supports to prepare for the certification assessments required by Connecticut. ACES PDSI helps you understand what's required and how to approach it.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                  <Link to="/contact">Ask About Test Prep</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Timeline</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
              From inquiry to classroom
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A clear progression so candidates and district partners share the same understanding of the journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {timeline.map((t, i) => (
              <motion.div
                key={t.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CalendarClock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold tracking-wider text-accent">{t.step}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">FAQ</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
                Common questions
              </h2>
              <p className="text-muted-foreground">A few quick answers — reach out for anything else.</p>
            </div>
            <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-6 shadow-sm">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className={i === faqs.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-left font-heading font-bold text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
                Connect with ACES PDSI to learn about eligibility, timing, and the support waiting for you.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7 flex-shrink-0">
              <Link to="/contact">Talk With Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}