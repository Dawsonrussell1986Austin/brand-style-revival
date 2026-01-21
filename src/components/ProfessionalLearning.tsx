import { motion } from "framer-motion";
import { Calendar, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import teacherImage from "@/assets/teacher-classroom.jpg";

export function ProfessionalLearning() {
  return (
    <section className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        {/* Two Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-feature rounded-3xl p-8 md:p-10 group"
          >
            <div className="w-14 h-14 rounded-2xl gradient-aces flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Professional Learning Opportunities
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We offer workshops, courses, and certification programs that help educators 
              acquire new skills. From instructional practices to technology integration, 
              our sessions transform teaching.
            </p>
            <ul className="space-y-2 mb-8">
              {["Hands-on Workshops", "Certification Programs", "Technology Integration"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="gradient-aces text-white rounded-full btn-glow group/btn">
              View Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card-feature rounded-3xl p-8 md:p-10 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              In-District & Program Support
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our education specialists partner directly with schools and districts to design 
              supports tailored to your unique goals. Every service is customized for maximum impact.
            </p>
            <ul className="space-y-2 mb-8">
              {["Curriculum Development", "Data Analysis", "Leadership Coaching"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="rounded-full border-border hover:border-primary/50 group/btn">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <img
            src={teacherImage}
            alt="Teacher engaging students"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-2xl">
              <blockquote className="text-xl md:text-2xl font-heading text-white italic mb-4">
                "You won't just get support. You'll get a partner who shows up, listens, and helps you lead."
              </blockquote>
              <p className="text-white/80">— The ACES PDSI Team</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
