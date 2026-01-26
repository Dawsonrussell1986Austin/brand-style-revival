import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Users, Target, Lightbulb, Heart, Mail, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

// Team members temporarily hidden until headshots with names are ready
const leadershipTeam: TeamMember[] = [];

const specialistsTeam: TeamMember[] = [];

const operationsTeam: TeamMember[] = [];

const TeamCard = ({ member, index, onViewBio }: { member: TeamMember; index: number; onViewBio: (member: TeamMember) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    {/* Photo */}
    <div className="aspect-[4/3] bg-gradient-to-br from-aces-blue/10 via-aces-green/10 to-aces-blue/5 flex items-center justify-center relative overflow-hidden">
      {member.image ? (
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-aces-blue to-aces-green flex items-center justify-center text-white text-3xl font-heading font-bold">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
      )}
      {/* Decorative elements */}
      {!member.image && (
        <>
          <div className="absolute top-4 right-4 w-20 h-20 bg-aces-green/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-aces-blue/10 rounded-full blur-2xl" />
        </>
      )}
    </div>
    
    <div className="p-6">
      <h3 className="text-lg font-heading font-bold text-foreground mb-1 group-hover:text-aces-blue transition-colors">
        {member.name}
      </h3>
      <p className="text-base font-semibold text-aces-green mb-3">
        {member.role}
      </p>
      <p className="text-base font-medium text-muted-foreground leading-relaxed line-clamp-3">
        {member.bio}
      </p>
      
      {/* View Full Bio button */}
      {(member.fullBio || member.bio.length > 150) && (
        <Button 
          variant="link" 
          className="px-0 text-aces-blue font-semibold mt-2 h-auto"
          onClick={() => onViewBio(member)}
        >
          Read Full Bio →
        </Button>
      )}
      
      {/* Contact link */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <a 
          href="mailto:info@acespdsi.org"
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-aces-blue hover:text-white transition-colors"
          aria-label={`Email ${member.name}`}
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  </motion.div>
);

const TeamBioDialog = ({ member, open, onClose }: { member: TeamMember | null; open: boolean; onClose: () => void }) => {
  if (!member) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-xl object-cover object-top"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-aces-blue to-aces-green flex items-center justify-center text-white text-2xl font-heading font-bold flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <DialogTitle className="text-2xl font-heading font-bold text-foreground">
                {member.name}
              </DialogTitle>
              <p className="text-lg font-semibold text-aces-green mt-1">
                {member.role}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <p className="text-base font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
            {member.fullBio || member.bio}
          </p>
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <a 
              href="mailto:info@acespdsi.org"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-aces-blue text-white font-semibold hover:bg-aces-blue/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact {member.name.split(' ')[0]}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const About = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const hasTeamMembers = leadershipTeam.length > 0 || specialistsTeam.length > 0 || operationsTeam.length > 0;

  const handleViewBio = (member: TeamMember) => {
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us"
        description="Learn about ACES Professional Development & School Improvement. Supporting educators and districts across Connecticut since 1992 with research-based professional learning."
        url="/about"
        keywords="about ACES PDSI, education history, Connecticut educators, school improvement mission"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-pattern" />
          <div className="absolute top-32 right-[10%] w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-base font-semibold mb-6">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                About Us
              </h1>
              <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
                Supporting educators and districts across Connecticut and beyond since 1992.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <div className="space-y-8">
                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <p className="text-foreground leading-relaxed text-lg">
                      The ACES Professional Development & School Improvement (PDSI) supports schools, districts, and educational organizations across the greater New Haven area, South Central Region, and beyond through research-based professional learning, coaching, and school improvement services. Our work includes curriculum and instructional support, leadership development, school climate and restorative practices, play-based and developmentally appropriate learning, and data-informed planning and implementation. PDSI partners closely with educators and leaders to design learning experiences and improvement efforts that are practical, sustainable, and responsive to local needs.
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground mb-3">The Center for AI</h3>
                        <p className="text-muted-foreground text-base font-medium leading-relaxed">
                          As this work expanded, particularly at the intersection of leadership, instructional design, systems improvement, and innovation, it led to the development of the ACES Center for Artificial Intelligence. The Center for AI builds on PDSI's systems-oriented approach by supporting districts in understanding and applying artificial intelligence through leadership readiness, ethical use, instructional design, and organizational decision-making. Services include role-specific professional learning, strategic planning, policy guidance, and support for integrating AI in ways that align with instructional goals and district values.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground mb-3">Collaborative Partnership</h3>
                        <p className="text-muted-foreground text-base font-medium leading-relaxed">
                          Today, PDSI and the ACES Center for AI work collaboratively and in partnership to support educators, leaders, and districts. Together, we offer integrated services that connect instructional improvement, school climate, data use, and emerging technologies helping organizations move beyond isolated initiatives toward coherent, aligned systems. While rooted in South Central Connecticut, this collaborative work is growing beyond the region and increasingly supporting organizations nationwide.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-aces flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground mb-3">Our Mission</h3>
                        <p className="text-muted-foreground text-base font-medium leading-relaxed">
                          Grounded in equity and driven by impact, our work helps schools move from planning to practice, supporting educators in creating learning environments where all students can thrive academically, socially, and emotionally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section - Only show if there are team members */}
        {hasTeamMembers && (
          <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block text-base font-bold text-aces-blue uppercase tracking-wider mb-3">Our People</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Meet the Team
                </h2>
                <p className="text-muted-foreground text-lg font-medium max-w-3xl mx-auto">
                  Our dedicated team of educators, leaders, and specialists bring decades of combined experience in transforming education across Connecticut and beyond.
                </p>
              </motion.div>

              {/* Leadership Team */}
              {leadershipTeam.length > 0 && (
                <div className="mb-16">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3"
                  >
                    <div className="w-10 h-1 bg-gradient-to-r from-aces-blue to-aces-green rounded-full" />
                    Leadership
                  </motion.h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leadershipTeam.map((member, index) => (
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} />
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Learning Specialists */}
              {specialistsTeam.length > 0 && (
                <div className="mb-16">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3"
                  >
                    <div className="w-10 h-1 bg-gradient-to-r from-aces-green to-aces-blue rounded-full" />
                    Professional Learning Specialists
                  </motion.h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specialistsTeam.map((member, index) => (
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} />
                    ))}
                  </div>
                </div>
              )}

              {/* Operations Team */}
              {operationsTeam.length > 0 && (
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3"
                  >
                    <div className="w-10 h-1 bg-gradient-to-r from-aces-blue to-aces-green rounded-full" />
                    Operations & Support
                  </motion.h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                    {operationsTeam.map((member, index) => (
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                What Guides Us
              </h2>
              <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
                Our core principles shape everything we do.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "Practical & Sustainable",
                  description: "We design learning experiences and improvement efforts that are responsive to local needs and built to last."
                },
                {
                  icon: Users,
                  title: "Partnership-Driven",
                  description: "We work closely with educators and leaders, building collaborative relationships that drive meaningful change."
                },
                {
                  icon: Heart,
                  title: "Equity-Centered",
                  description: "Our work is grounded in equity, ensuring all students can thrive academically, socially, and emotionally."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-xl gradient-aces flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-base font-medium">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Team Member Bio Dialog */}
      <TeamBioDialog 
        member={selectedMember} 
        open={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </div>
  );
};

export default About;
