import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import teacherImage from "@/assets/teacher-classroom.jpg";

export function ProfessionalLearning() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            <GraduationCap className="w-4 h-4" />
            Professional Development
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Elevate Your <span className="text-gradient-aces">Practice</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From workshops to certifications, we offer learning experiences designed 
            to meet the needs of today's educators.
          </p>
        </motion.div>

        {/* Two Cards Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1 - Professional Learning */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-10 group hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-7 h-7 text-primary-foreground" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Learning Opportunities
            </h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              We offer workshops, courses, and certification programs that help educators 
              acquire new skills and advance in their profession. From instructional practices 
              to technology integration, our sessions are designed to transform your teaching.
            </p>
            
            <ul className="space-y-3 mb-8">
              {["Hands-on Workshops", "Certification Programs", "Technology Integration"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-6 py-5 rounded-full btn-glow group/btn">
              View Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Card 2 - In-District Support */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-10 group hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-aces-secondary-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-7 h-7 text-accent-foreground" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              In-District Support
            </h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our education specialists partner directly with schools and districts to design 
              supports tailored to your unique goals. Whether focusing on curriculum development 
              or leadership growth, we customize every service for maximum impact.
            </p>
            
            <ul className="space-y-3 mb-8">
              {["Curriculum Development", "Data Analysis", "Leadership Coaching"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            
            <Button variant="outline" className="border-border hover:border-accent/50 text-foreground px-6 py-5 rounded-full hover:bg-secondary/50 group/btn">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Featured Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden group"
        >
          <div className="aspect-[21/9] md:aspect-[3/1]">
            <img
              src={teacherImage}
              alt="Teacher engaging with students in modern classroom"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-xl">
              <blockquote className="text-xl md:text-2xl font-heading font-medium text-foreground italic mb-4">
                "You won't just get support. You'll get a partner who shows up, listens, and helps you lead."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">ACES PDSI Team</p>
                  <p className="text-sm text-muted-foreground">Your Education Partners</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
