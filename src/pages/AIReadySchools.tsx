import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, BookOpen, Compass, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/home/ai-hero-classroom.jpg";
import { useContent, useImage } from "@/hooks/useSiteContent";

const PAGE = "ai-ready-schools";

const pillarDefaults = [
  { icon: ShieldCheck, title: "Policy & Guardrails", body: "Clear acceptable-use policies, privacy expectations, and ethical guardrails for educators and students." },
  { icon: Users, title: "Educator Readiness", body: "Shared vocabulary and professional learning so staff feel confident with classroom AI use." },
  { icon: BookOpen, title: "Curriculum Alignment", body: "AI that supports — never replaces — local curriculum, assessment, and instructional goals." },
  { icon: Compass, title: "Leadership Strategy", body: "District planning that ties AI adoption to school improvement priorities." },
];

const readinessDefaults = [
  "Stakeholder alignment across leadership, teachers, and families",
  "Common language for ethical and responsible AI use",
  "Professional learning embedded into the calendar",
  "Review cycles that keep humans at the center",
];

export default function AIReadySchools() {
  const c = (section: string, key: string, fallback: string) =>
    useContent(PAGE, section, key, fallback).content;

  const heroBadge = c("hero", "badge", "Center for AI Services");
  const heroTitle = c("hero", "title", "AI-Ready Schools");
  const heroBody = c("hero", "body", "Help your school or district build the foundation — policies, professional learning, and leadership strategy — to bring AI into practice with care.");
  const heroPrimary = c("hero", "primary_cta", "Professional Learning & Workshops");
  const heroSecondary = c("hero", "secondary_cta", "Request a Consultation");
  const { imageUrl: heroSrc, altText: heroAlt } = useImage(PAGE, "hero", "image", heroImg);

  const pillarsHeading = c("pillars", "heading", "Four pillars of readiness");
  const pillarsSubtitle = c("pillars", "subtitle", "A practical framework for districts beginning — or maturing — AI work.");

  const readinessBadge = c("checklist", "badge", "Readiness checklist");
  const readinessHeading = c("checklist", "heading", "What ready schools have in place");
  const readinessBody = c("checklist", "body", "A few markers we look for when supporting district AI adoption.");

  const ctaHeading = c("cta", "heading", "Build an AI-ready school community");
  const ctaBody = c("cta", "body", "From first conversation to district-wide rollout, ACES PDSI partners with you the whole way.");
  const ctaPrimary = c("cta", "primary_cta", "Professional Learning & Workshops");
  const ctaSecondary = c("cta", "secondary_cta", "Request a Consultation");

  const pillars = pillarDefaults.map((p, i) => ({
    icon: p.icon,
    title: c("pillars", `pillar_${i + 1}_title`, p.title),
    body: c("pillars", `pillar_${i + 1}_body`, p.body),
  }));

  const readiness = readinessDefaults.map((item, i) =>
    c("checklist", `item_${i + 1}`, item)
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO title={c("seo", "title", "AI-Ready Schools | Center for AI Services | ACES PDSI")} description={c("seo", "description", "Build the policy, professional learning, and leadership strategy that prepare schools and districts to use AI responsibly.")} />
      <Header />

      <section className="relative pt-32 md:pt-36 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">{heroBadge}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-5">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">{heroBody}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gradient-aces text-white rounded-full px-7">
                  <Link to="/workshops-events">{heroPrimary}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                  <Link to="/contact">{heroSecondary}</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-card p-3">
                <img src={heroSrc} alt={heroAlt || "School leadership team planning AI adoption"} className="w-full aspect-[4/3] object-cover rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">{pillarsHeading}</h2>
            <p className="text-lg text-muted-foreground">{pillarsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><p.icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-heading font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">{readinessBadge}</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight">{readinessHeading}</h2>
              <p className="text-muted-foreground leading-relaxed">{readinessBody}</p>
            </div>
            <ul className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              {readiness.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5"><Check className="w-3.5 h-3.5 text-accent-foreground" /></div>
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 leading-tight">{ctaHeading}</h2>
            <p className="text-primary-foreground/80">{ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7">
              <Link to="/workshops-events">{ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/contact">{ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}