import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Target,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building2,
  GraduationCap,
  Settings2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/curriculum-hero.jpg";
import dashboardImage from "@/assets/curriculum-dashboard.jpg";
import setupImage from "@/assets/curriculum-setup.jpg";

type LeadFormType = "Get More Information" | "Schedule a Demo" | "Request Info";

const ROLE_OPTIONS = [
  "Teacher",
  "Curriculum Coordinator",
  "Instructional Coach",
  "Principal / Assistant Principal",
  "District Administrator",
  "Superintendent",
  "Other",
];

interface LeadFormState {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
}

const emptyLead: LeadFormState = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  role: "",
};

function LeadForm({
  formType,
  submitLabel,
  compact = false,
}: {
  formType: LeadFormType;
  submitLabel: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const [data, setData] = useState<LeadFormState>(emptyLead);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof LeadFormState, value: string) =>
    setData((p) => ({ ...p, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim()) {
      toast.error("Please complete the required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
      const message = `[${formType}] Submitted from Curriculum Creator landing page.`;

      const { error } = await supabase.from("contact_submissions").insert({
        name: fullName,
        email: data.email.trim(),
        organization: data.organization.trim() || null,
        role: data.role || null,
        message,
        source: `curriculum-creator:${formType}`,
      });
      if (error) throw error;

      // Fire-and-forget email notification
      supabase.functions
        .invoke("notify-curriculum-lead", {
          body: {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            organization: data.organization.trim(),
            role: data.role,
            formType,
          },
        })
        .catch((err) => console.error("notify-curriculum-lead failed:", err));

      navigate("/thank-you");
    } catch (err) {
      console.error("Curriculum Creator form error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-4" : "space-y-5"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${formType}-firstName`}>First Name *</Label>
          <Input
            id={`${formType}-firstName`}
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formType}-lastName`}>Last Name *</Label>
          <Input
            id={`${formType}-lastName`}
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formType}-email`}>Work Email *</Label>
        <Input
          id={`${formType}-email`}
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="name@school.org"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formType}-org`}>District / Organization</Label>
        <Input
          id={`${formType}-org`}
          value={data.organization}
          onChange={(e) => update("organization", e.target.value)}
          placeholder="Your district or organization"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formType}-role`}>Role</Label>
        <Select value={data.role} onValueChange={(v) => update("role", v)}>
          <SelectTrigger id={`${formType}-role`}>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-aces-blue hover:bg-aces-blue/90 text-white font-semibold py-6 rounded-md group"
      >
        {submitting ? "Sending..." : submitLabel}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5" />
        We respect your privacy. Your information is secure.
      </p>
    </form>
  );
}

const benefits = [
  {
    icon: Clock,
    title: "Save planning time",
    body:
      "AI-powered suggestions help you build high-quality curriculum in a fraction of the time.",
  },
  {
    icon: Target,
    title: "Design with coherence",
    body:
      "Built with UDL, UbD, and CSDE principles to ensure alignment across every level.",
  },
  {
    icon: Users,
    title: "Support every learner",
    body:
      "Create inclusive experiences that meet student needs so they can thrive there.",
  },
];

const steps = [
  {
    icon: GraduationCap,
    title: "Set Up",
    body:
      "Share your course—grade, content area, district values, and standards.",
  },
  {
    icon: Target,
    title: "Align",
    body:
      "AI aligns to CSDE, UDL, and UbD frameworks automatically.",
  },
  {
    icon: FileText,
    title: "Design",
    body:
      "Generates units, lessons, and assessments with AI support.",
  },
  {
    icon: Settings2,
    title: "Customize",
    body:
      "Refine, adapt, and finalize curriculum that fits your students and community.",
  },
];

const principles = [
  {
    code: "UDL",
    name: "Universal Design for Learning",
    body:
      "Multiple means of engagement, representation, and action & expression for all learners.",
    icon: Users,
    accent: "text-aces-green",
    bg: "bg-aces-green/10",
  },
  {
    code: "UbD",
    name: "Understanding by Design",
    body:
      "Backward design that starts with meaningful goals and evidence of learning.",
    icon: Target,
    accent: "text-aces-blue",
    bg: "bg-aces-blue/10",
  },
  {
    code: "CSDE",
    name: "Connecticut State Department of Education",
    body:
      "Statewide guidance that connects quality, alignment, and compliance.",
    icon: Building2,
    accent: "text-aces-secondary-blue",
    bg: "bg-aces-secondary-blue/10",
  },
];

export default function CurriculumCreator() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="ACES Curriculum Creator — Build Better Curriculum, Faster"
        description="The ACES Curriculum Creator helps educators design standards-aligned curriculum grounded in UDL, UbD, and CSDE principles—powered by AI."
        url="/curriculum-creator"
        keywords="curriculum creator, AI curriculum, UDL, UbD, CSDE, standards-aligned curriculum, ACES PDSI"
      />
      <Header />

      <main className="flex-1 pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary/40 to-white">
          <div className="absolute top-32 -left-20 w-96 h-96 bg-aces-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-aces-green/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 py-12 md:py-20">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left: heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-aces-green bg-white shadow-md mb-6">
                  <div className="text-center">
                    <div className="font-heading font-bold text-aces-blue text-xl leading-tight">aces</div>
                    <div className="text-[10px] font-semibold text-aces-navy leading-tight">Center for AI</div>
                    <div className="text-[9px] text-aces-green font-bold mt-0.5">PDSI</div>
                  </div>
                </div>

                <p className="text-aces-green font-bold tracking-wider uppercase text-sm mb-3">
                  ACES Center for AI
                </p>
                <h1 className="font-heading font-bold text-aces-navy text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                  Build better curriculum.{" "}
                  <span className="text-aces-green">Faster.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  The ACES Curriculum Creator helps educators design
                  standards-aligned curriculum grounded in UDL, UbD, and CSDE
                  principles.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-aces-blue hover:bg-aces-blue/90 text-white font-semibold rounded-md"
                  >
                    <a href="#get-info">Get More Information</a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-aces-blue text-aces-blue hover:bg-aces-blue/5 font-semibold rounded-md"
                  >
                    <a href="#get-info">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Demo
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Right: hero image + form */}
              <motion.div
                id="get-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-7"
              >
                <div className="relative">
                  <img
                    src={heroImage}
                    alt="Educator using the ACES Curriculum Creator platform"
                    className="w-full h-auto rounded-2xl"
                    loading="eager"
                    width={1280}
                    height={960}
                  />
                  <div className="lg:absolute lg:-bottom-16 lg:right-0 lg:w-[420px] mt-6 lg:mt-0 bg-white rounded-2xl shadow-2xl border border-border p-6 md:p-8">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-aces-navy mb-5">
                      Request More Information
                    </h2>
                    <LeadForm formType="Get More Information" submitLabel="Send Request" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY EDUCATORS USE IT */}
        <section className="py-16 md:py-20 lg:pt-32 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-aces-navy mb-12">
              Why educators use it
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-aces-green/30 flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-aces-green" />
                  </div>
                  <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEE THE PLATFORM */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-aces-navy mb-10">
              See the platform
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div>
                <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-md">
                  <img
                    src={dashboardImage}
                    alt="ACES Curriculum Creator dashboard with course library"
                    className="w-full h-auto"
                    loading="lazy"
                    width={1280}
                    height={960}
                  />
                </div>
                <h3 className="font-heading font-bold text-aces-navy text-xl mt-5 mb-1">
                  Dashboard
                </h3>
                <p className="text-sm text-muted-foreground">
                  Organize courses, track progress, and stay aligned.
                </p>
              </div>

              <div>
                <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-md">
                  <img
                    src={setupImage}
                    alt="ACES Curriculum Creator course setup screen"
                    className="w-full h-auto"
                    loading="lazy"
                    width={1280}
                    height={960}
                  />
                </div>
                <h3 className="font-heading font-bold text-aces-navy text-xl mt-5 mb-1">
                  Course Set Up
                </h3>
                <p className="text-sm text-muted-foreground">
                  Provide context; the AI uses it to build aligned, culturally
                  responsive curriculum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-aces-navy mb-14">
              How it works
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-4">
                    <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-aces-blue text-white text-xs font-bold flex items-center justify-center z-10">
                      {i + 1}
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-aces-green/40 flex items-center justify-center bg-white">
                      <s.icon className="w-7 h-7 text-aces-blue" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-aces-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-2xl md:text-3xl font-bold text-aces-navy mb-12">
              Grounded in trusted curriculum design principles.
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {principles.map((p) => (
                <div
                  key={p.code}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className={`w-14 h-14 rounded-full ${p.bg} flex items-center justify-center mb-4`}>
                    <p.icon className={`w-7 h-7 ${p.accent}`} />
                  </div>
                  <div className={`font-heading font-extrabold text-2xl ${p.accent}`}>
                    {p.code}
                  </div>
                  <div className="font-semibold text-aces-navy text-sm mb-3">
                    {p.name}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA / SECOND FORM */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-aces-green via-aces-blue to-aces-blue px-8 md:px-12 py-8 md:py-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-white/90 shrink-0" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight">
                  Ready to learn more about the ACES Curriculum Creator?
                </h2>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white text-aces-blue hover:bg-white/90 font-semibold rounded-md shrink-0"
              >
                <a href="#get-info">
                  Request Info
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}