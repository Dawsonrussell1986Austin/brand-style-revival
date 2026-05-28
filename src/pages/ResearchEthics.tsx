import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, BookOpen, Microscope, Scale } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/home/hero-classroom.jpg";

const themes = [
  { icon: ShieldCheck, title: "Ethical Use", body: "Frameworks for transparent, equitable, and responsible AI use in schools." },
  { icon: Scale, title: "Privacy & Policy", body: "Practical guidance on data privacy, student safety, and policy alignment." },
  { icon: Microscope, title: "Applied Research", body: "Field-tested practices grounded in what actually helps educators and students." },
  { icon: BookOpen, title: "Shared Learning", body: "Resources, reading, and reflection that keep the conversation moving forward." },
];

export default function ResearchEthics() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Research & Ethics | Center for AI Services | ACES PDSI" description="Frameworks, research, and ethical guidance to help schools use AI responsibly." />
      <Header />

      <section className="relative pt-32 md:pt-36 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Center for AI Services</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-5">Research & Ethics</h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Responsible AI starts with shared values. Explore the frameworks, research, and reflection that guide our work with schools.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gradient-aces text-white rounded-full px-7">
                  <Link to="/workshops-events">Explore Professional Learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-card p-3">
                <img src={heroImg} alt="Educators discussing ethical AI practice" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">Where the Center focuses</h2>
            <p className="text-lg text-muted-foreground">Four areas that shape responsible AI work in real schools.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {themes.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-7 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><t.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 leading-tight">Ground AI in shared values</h2>
            <p className="text-primary-foreground/80">Bring ACES PDSI in to support ethical, research-informed AI work in your school or district.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7">
              <Link to="/workshops-events">Explore Professional Learning</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}