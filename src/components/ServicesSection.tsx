import {
  MessageSquare,
  Brain,
  Layers,
  Users,
  Target,
  ClipboardList,
  GraduationCap,
  Heart,
  FileCheck,
  Package,
} from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Customized Professional Learning",
    description:
      "Professional learning should fit your goals. We design experiences that target instructional strategies, leadership development, or system-wide change.",
  },
  {
    icon: Brain,
    title: "ACES Center for Artificial Intelligence",
    description:
      "AI is reshaping every corner of education. We help teachers, leaders, paraeducators, and students engage with AI responsibly through training, coaching, and support.",
    featured: true,
  },
  {
    icon: Layers,
    title: "Curriculum Writing Facilitation & Implementation Support",
    description:
      "Curriculum writing teams gain clarity of process and product. A standards-aligned approach guides districts to create high-quality curriculum tailored to their students' needs.",
  },
  {
    icon: Users,
    title: "Train-the-Trainer for Leaders and Teachers",
    description:
      "Capacity grows from within. Our Train-the-Trainer model equips leaders and teacher-leaders with tools, strategies, and resources to deliver professional learning and sustain impact over time.",
  },
  {
    icon: Target,
    title: "Instructional Coaching",
    description:
      "ACES instructional coaching provides personalized, job-embedded support that helps teachers refine their practice, strengthen instructional decision-making, and improve student outcomes.",
  },
  {
    icon: ClipboardList,
    title: "Curriculum Audits and Management Plans",
    description:
      "Strong systems start with a clear picture. We review curriculum for alignment, rigor, equity, and access, then help districts design management plans with timelines, roles, and responsibilities.",
  },
  {
    icon: GraduationCap,
    title: "Early Childhood Services",
    description:
      "Strong foundations start early. We support educators with child development–based learning, coaching, curriculum support, and family engagement strategies.",
    featured: true,
  },
  {
    icon: Heart,
    title: "Professional Support for Paraeducators",
    description:
      "Paraeducators deserve meaningful preparation. Our services build skills through ParaPro test prep, instructional training, and customized support aligned to district needs.",
  },
  {
    icon: FileCheck,
    title: "Alternative Routes to Certification (ARC)",
    description:
      "Teaching should be accessible. In partnership with the CT State Department of Education, our ARC program supports career changers and paraeducators in earning certification.",
  },
  {
    icon: Package,
    title: "Product Development",
    description:
      "Educators deserve resources that evolve with their practice. We design tools and resources that address evolving practices in education, connect frameworks and research.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((service, index) => (
            <div key={index} className="flex gap-4">
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                  service.featured
                    ? "bg-aces-navy text-primary-foreground"
                    : "border-2 border-foreground/20 text-foreground"
                }`}
              >
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
