import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/home/hero-classroom.jpg";
import arcImg from "@/assets/teacher-classroom.jpg";

const serif = { fontFamily: "'DM Serif Display', serif" } as const;
const body = { fontFamily: "'Fira Sans', sans-serif" } as const;

export function ModernHero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden pt-20" style={body}>
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="ACES educators collaborating in a professional learning session"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09578B]/95 via-[#09578B]/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl text-white mb-6 leading-[1.05]" style={serif}>
            Grounding in Pedagogy.<br />Growing in Innovation.
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-lg leading-relaxed">
            ACES PDSI partners with educators and school leaders to strengthen
            teaching, support meaningful learning, and help schools grow with
            clarity and care.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/workshops-events"
              className="px-8 py-4 bg-[#007F61] hover:bg-[#006b52] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              View Workshops
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-lg transition-all"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  { value: "15k+", label: "Educators Trained" },
  { value: "120+", label: "School Districts" },
  { value: "98%", label: "Success Rate" },
  { value: "30+", label: "Years Experience" },
];

export function StatsStrip() {
  return (
    <section className="bg-white py-12 border-b border-gray-100" style={body}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-[#09578B] mb-1" style={serif}>
                {s.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BentoPrograms() {
  return (
    <section className="py-24 container mx-auto px-6" style={body}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl text-[#112532] mb-4" style={serif}>
          Our Programs
        </h2>
        <p className="text-gray-500 max-w-xl text-lg">
          Expertise-driven solutions designed to meet the evolving needs of
          Connecticut's educational communities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[240px]">
        {/* Featured: Center for AI Services */}
        <Link
          to="/center-for-ai-services"
          className="md:col-span-8 md:row-span-2 bg-[#09578B] rounded-[2rem] p-10 text-white relative overflow-hidden group transition-transform hover:-translate-y-1"
        >
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="mb-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2399A4] text-[10px] font-bold uppercase tracking-widest rounded-full">
                <Sparkles className="w-3 h-3" />
                Featured Initiative
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl mb-4 max-w-md" style={serif}>
              Center for<br />AI Services
            </h3>
            <p className="text-white/80 max-w-sm mb-8 leading-relaxed">
              Empowering educators with ethical frameworks and practical tools
              to harness artificial intelligence in the classroom.
            </p>
            <div>
              <span className="inline-flex items-center gap-2 bg-white text-[#09578B] px-6 py-3 rounded-lg font-bold text-sm group-hover:gap-3 transition-all shadow-lg">
                Explore AI Hub <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#2399A4]/25 rounded-full blur-3xl" />
        </Link>

        {/* Workshops & Events */}
        <Link
          to="/workshops-events"
          className="md:col-span-4 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="w-12 h-12 bg-[#007F61]/10 rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[#007F61]" />
          </div>
          <div>
            <h3 className="text-2xl mb-1 text-[#112532]" style={serif}>
              Workshops & Events
            </h3>
            <p className="text-gray-500 text-sm">
              Hands-on professional learning for immediate classroom impact.
            </p>
          </div>
        </Link>

        {/* PDSI Services */}
        <Link
          to="/pdsi-services"
          className="md:col-span-4 bg-[#2399A4] rounded-[2rem] p-8 text-white flex flex-col justify-between group hover:-translate-y-0.5 transition-transform"
        >
          <h3 className="text-2xl leading-tight" style={serif}>
            PDSI<br />Services
          </h3>
          <div className="flex justify-between items-end gap-4">
            <p className="text-white/85 text-sm max-w-[160px]">
              Strategic consulting and system-wide improvement.
            </p>
            <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* ARC */}
        <Link
          to="/arc"
          className="md:col-span-6 bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="w-28 h-full min-h-[140px] shrink-0 overflow-hidden rounded-xl">
            <img
              src={arcImg}
              alt="ARC certification candidates"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <h3 className="text-2xl mb-1 text-[#112532]" style={serif}>
              ARC
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              The Alternate Route to Certification for passionate educators
              entering the field.
            </p>
          </div>
        </Link>

        {/* Resources */}
        <Link
          to="/resources"
          className="md:col-span-6 bg-[#007F61] rounded-[2rem] p-8 text-white flex items-center justify-between group overflow-hidden relative hover:-translate-y-0.5 transition-transform"
        >
          <div className="relative z-10">
            <h3 className="text-2xl mb-1" style={serif}>
              Resource Library
            </h3>
            <p className="text-white/85 text-sm">
              Access research, guides, and instructional toolkits.
            </p>
          </div>
          <BookOpen className="w-16 h-16 opacity-40 group-hover:opacity-100 transition-opacity relative z-10" />
        </Link>
      </div>
    </section>
  );
}

export function FeatureTestimonial() {
  return (
    <section className="py-24 bg-white" style={body}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <blockquote
            className="text-2xl md:text-3xl text-center leading-relaxed text-[#112532]"
            style={serif}
          >
            "ACES PDSI has been instrumental in our district's digital transition.
            Their expertise in pedagogy first, technology second ensures our
            teachers feel supported and our students remain the focus."
          </blockquote>
          <div className="mt-8 text-center">
            <div className="font-bold text-[#09578B]">Dr. Elena Rodriguez</div>
            <div className="text-sm text-gray-400">Superintendent of Schools</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24 container mx-auto px-6" style={body}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#112532] rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl mb-6" style={serif}>
            Ready to talk with our team?
          </h2>
          <p className="text-white/70 mb-10 max-w-lg mx-auto text-lg">
            Let's discuss how our professional development services can support
            your school's specific goals.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-[#2399A4] hover:bg-[#1c7e88] text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl"
          >
            Talk With Our Team
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#09578B]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#007F61]/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </motion.div>
    </section>
  );
}