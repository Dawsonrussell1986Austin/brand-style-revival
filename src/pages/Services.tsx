import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/teacher-classroom.jpg";

const services = [
  {
    icon: Users,
    title: "Customized Professional Learning",
    description: "We design and deliver professional learning tailored to your district's goals, culture, and educator needs. Whether focused on instructional strategies, leadership development, or systemic change, ACES creates engaging, job-embedded learning experiences that make an immediate and lasting impact. Our specialists use research-based designs that empower educators to apply new strategies in the classroom and sustain improvement over time."
  },
  {
    icon: Brain,
    title: "Center for Artificial Intelligence",
    description: "The ACES Center for Artificial Intelligence positions educators and leaders at the forefront of AI-driven innovation. Through professional learning, research partnerships, and product development, we help schools navigate the opportunities and challenges of AI responsibly and ethically. Our programs build AI fluency for teachers, leaders, students, and families, ensuring that every learner is prepared to thrive in an AI-driven world."
  },
  {
    icon: Layers,
    title: "Curriculum Writing Facilitation & Implementation Support",
    description: "ACES partners with districts to lead and support curriculum writing teams, guiding educators through a clear, standards-aligned process that results in high-quality curriculum tailored to student needs. Our facilitators use backward design principles to build authentic performance tasks, deepen teacher understanding of standards, and strengthen instructional practice. Beyond writing, we provide ongoing professional learning and coaching to ensure successful implementation and continuous improvement of curriculum."
  },
  {
    icon: Headphones,
    title: "Train-the-Trainer for Leaders & Teachers",
    description: "We help districts build internal capacity with our Train-the-Trainer model. ACES equips district and teacher leaders with the tools, strategies, and resources they need to deliver effective professional learning to peers. This model promotes sustainability, ensuring professional learning continues to impact classrooms long after the initial training."
  },
  {
    icon: Target,
    title: "Instructional Coaching",
    description: "Our instructional coaching services support a culture of continuous growth by providing educators with just-in-time feedback, collaborative reflection, and guided practice. Skilled in multiple coaching models, ACES coaches foster cognitive shifts through planning, modeling, and reflective dialogue. By strengthening teachers' instructional decision-making and problem-solving, coaching leads to improved classroom practice and stronger student outcomes."
  },
  {
    icon: ClipboardCheck,
    title: "Curriculum Audits & Management Plans",
    description: "ACES conducts comprehensive curriculum audits that examine standards alignment, rigor, equity, and accessibility across your curriculum. We provide clear, actionable recommendations to strengthen coherence and impact. To support long-term improvement, we also help districts design curriculum management plans that establish structures, timelines, and accountability measures for ongoing curriculum development and review."
  },
  {
    icon: Baby,
    title: "Early Childhood Services",
    description: "Our early childhood services are grounded in child development and play-based learning. ACES supports early educators and leaders with coaching, curriculum support, and classroom environment design aligned with the CT ELDS, CT DOTS, and the Pyramid Model. We also provide family engagement strategies and School Readiness program support, ensuring birth-to-grade-3 learners experience developmentally appropriate, high-quality education."
  },
  {
    icon: UserCheck,
    title: "Professional Support for Paraeducators",
    description: "ACES provides paraeducators with the knowledge and skills needed to effectively support classroom instruction. Our programs include ParaPro test preparation, skill-building workshops, and customized training aligned to district needs. These services equip paraeducators to confidently support student learning and contribute to a strong instructional team."
  },
  {
    icon: GraduationCap,
    title: "Alternate Routes to Certification",
    description: "To help address educator shortages, ACES offers State Board–approved Alternative Route to Certification (ARC) programs in high-need areas such as Library Media and Teaching English Learners. These programs combine coursework, field experience, and mentoring, enabling participants to earn certification while continuing to work in schools. Our ARC pathways prepare professionals to transition into teaching with the skills, knowledge, and support needed for success."
  },
  {
    icon: Building,
    title: "Product Development",
    description: "In partnership with educators and innovators, ACES designs practical tools and resources to meet the evolving needs of schools. From classroom workbooks to AI-powered platforms, our products are built by educators, for educators. We collaborate with districts to co-create solutions that are both research-based and grounded in real-world classroom practice."
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Educators collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-sm font-semibold text-aces-blue mb-3">Our Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-aces-navy mb-6 uppercase tracking-tight">
              Building Capacity,<br />Driving Impact
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Innovating today, transforming tomorrow.
            </p>
            <Button size="lg" className="bg-aces-blue hover:bg-aces-blue/90 text-white">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-aces-blue/30 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-aces-blue" />
                </div>
                <h3 className="text-lg font-bold font-heading text-aces-navy mb-4 uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Field Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-heading text-aces-navy mb-6 uppercase">
                From the Field
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Reflections from the field, where practice meets innovation. PDSI's professional 
                learning specialists share strategies, success stories, and emerging trends to 
                help educators lead with impact.
              </p>
              <Button className="bg-aces-blue hover:bg-aces-blue/90 text-white">
                Our Blog
              </Button>
            </motion.div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative">
                  <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 shadow-sm">
                    <p className="text-aces-blue font-bold text-lg">20</p>
                    <p className="text-xs text-muted-foreground">Nov</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold font-heading text-aces-navy group-hover:text-aces-blue transition-colors">
                    Coaching Saved the Classroom: How One District Improved Teacher Retention in Year 1
                  </h3>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-background rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-blue-100 relative">
                  <div className="absolute top-4 left-4 bg-aces-blue rounded-lg px-3 py-1 shadow-sm">
                    <p className="text-white font-bold text-lg">19</p>
                    <p className="text-xs text-white/80">Nov</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold font-heading text-aces-navy group-hover:text-aces-blue transition-colors">
                    The Hidden Line Item: 3 Legislative Changes That Could Shrink or Stretch Your PD Budget
                  </h3>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-aces-blue to-aces-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Let's work together to build capacity and drive lasting impact in your district.
            </p>
            <Button size="lg" className="bg-white text-aces-blue hover:bg-white/90">
              Contact Us Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
