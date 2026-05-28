import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Users, Target, Lightbulb, Heart, Mail, X, Compass, Handshake, TrendingUp, Sparkles, Ear, PenTool, LifeBuoy, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useImage } from "@/hooks/useSiteContent";
import heroAbout from "@/assets/home/about-team.png";
import partnerImg from "@/assets/home/partner-ballroom.jpg";

// Team headshot imports (fallbacks)
import michelleGohagonFallback from "@/assets/team/michelle-gohagon.png";
import rosariaGiannettiFallback from "@/assets/team/rosaria-giannetti.png";
import jessicaWhiteFallback from "@/assets/team/jessica-white.png";
import lisaSealesFallback from "@/assets/team/lisa-seales.png";
import maryStoneFallback from "@/assets/team/mary-stone.png";
import johnGustafsonFallback from "@/assets/team/john-gustafson.png";
import kimCelliniFallback from "@/assets/team/kim-cellini.png";
import alisonZanardiFallback from "@/assets/team/alison-zanardi.png";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

// Leadership Team
const leadershipTeam: TeamMember[] = [
  {
    name: "Michelle Gohagon",
    role: "Director",
    bio: "Leads ACES PDSI with a focus on innovative professional development and school improvement strategies.",
    fullBio: "Michelle Gohagon serves as the Director of ACES Professional Development & School Improvement. With extensive experience in educational leadership, she guides the organization's mission to support educators and districts across Connecticut through research-based professional learning, coaching, and school improvement services.",
    image: michelleGohagonFallback,
    email: "mgohagon@aces.org"
  },
  {
    name: "Rosaria Giannetti",
    role: "Assistant Director",
    bio: "Supports PDSI initiatives and leads key professional development programs across the region.",
    fullBio: "Rosaria Giannetti serves as Assistant Director at ACES PDSI, where she coordinates professional development initiatives and supports educators in implementing research-based practices. Her work spans curriculum development, instructional coaching, and systems improvement.",
    image: rosariaGiannettiFallback,
    email: "rgiannetti@aces.org"
  },
  {
    name: "Jessica White",
    role: "Assistant Director",
    bio: "Oversees professional learning programs and supports district-wide improvement efforts.",
    fullBio: "Jessica White is an Assistant Director at ACES PDSI, bringing expertise in educational leadership and professional development. She works closely with districts to design and implement sustainable learning experiences that drive meaningful change in schools.",
    image: jessicaWhiteFallback,
    email: "jewhite@aces.org"
  },
  {
    name: "Carolyn Autore",
    role: "Office Manager",
    bio: "Manages operations and administrative functions to ensure smooth organizational processes.",
    fullBio: "Carolyn Autore serves as the Office Manager for ACES PDSI, overseeing daily operations and administrative functions. Her organizational expertise ensures the team can focus on their mission of supporting educators across Connecticut.",
    email: "cautore@aces.org"
  },
  {
    name: "John Gustafson",
    role: "Project Coordinator",
    bio: "Coordinates projects and initiatives to support professional development delivery.",
    fullBio: "John Gustafson is the Project Coordinator at ACES PDSI, responsible for managing project timelines, coordinating events, and supporting the delivery of professional development services to districts and schools.",
    image: johnGustafsonFallback,
    email: "jgustafson@aces.org"
  }
];

// Professional Learning Specialists
const specialistsTeam: TeamMember[] = [
  {
    name: "Francesca Bickel",
    role: "Special Education, TEAM",
    bio: "Specializes in special education support and TEAM mentoring programs.",
    fullBio: "Francesca Bickel is a Professional Learning Specialist focusing on special education and the TEAM (Teacher Education And Mentoring) program. She supports educators in developing inclusive practices and mentors new teachers entering the profession."
  },
  {
    name: "Kimberly Cellini",
    role: "Early Childhood",
    bio: "Focuses on early childhood education and developmentally appropriate practices.",
    fullBio: "Kimberly Cellini is a Professional Learning Specialist in Early Childhood education. She works with educators to implement play-based, developmentally appropriate learning experiences that support young children's growth and development.",
    image: kimCelliniFallback
  },
  {
    name: "Michelle Dellacamera",
    role: "Early Childhood",
    bio: "Supports early childhood educators with research-based instructional strategies.",
    fullBio: "Michelle Dellacamera is a Professional Learning Specialist dedicated to early childhood education. She provides coaching and professional development to help educators create engaging, developmentally appropriate learning environments."
  },
  {
    name: "Lisa Seales",
    role: "Early Childhood, Science",
    bio: "Brings expertise in early childhood education and science instruction.",
    fullBio: "Lisa Seales is a Professional Learning Specialist with expertise in both early childhood education and science instruction. She helps educators integrate hands-on, inquiry-based science learning into early childhood classrooms.",
    image: lisaSealesFallback
  },
  {
    name: "Dina Secchiaroli",
    role: "Cognitive Coaching, CTE",
    bio: "Expert in cognitive coaching and career technical education support.",
    fullBio: "Dina Secchiaroli is a Professional Learning Specialist specializing in Cognitive Coaching and Career Technical Education (CTE). She uses reflective coaching practices to support educator growth and improve instructional outcomes."
  },
  {
    name: "Mary Stone",
    role: "Early Childhood, Special Education",
    bio: "Combines early childhood and special education expertise to support inclusive practices.",
    fullBio: "Mary Stone is a Professional Learning Specialist with expertise in early childhood and special education. She supports educators in creating inclusive classrooms where all young learners can thrive academically, socially, and emotionally.",
    image: maryStoneFallback
  },
  {
    name: "Alyson Stanisci",
    role: "Early Childhood, Instructional Leadership",
    bio: "Supports educators and school systems through coaching, professional learning, and program development across preschool and elementary settings.",
    fullBio: "Alyson Stanisci is a Professional Learning Specialist at ACES PDSI with expertise in early childhood education, instructional leadership, and program development. She brings extensive experience supporting educators and school systems through coaching, professional learning, curriculum implementation, and systems coordination across preschool and elementary settings. Her areas of expertise include early childhood programming, restorative practices, SRBI support, professional development facilitation, and grant-funded program management. Alyson is especially skilled in building collaborative systems that support high-quality instruction, strengthening transitions and family partnerships, and helping educators create responsive, student-centered learning environments."
  }
];

// Operations team is empty for now
const operationsTeam: TeamMember[] = [];

const TeamCard = ({ member, index, onViewBio, imageOverride }: { member: TeamMember; index: number; onViewBio: (member: TeamMember) => void; imageOverride?: string }) => {
  const displayImage = imageOverride || member.image;
  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    {/* Photo */}
    <div className="aspect-[4/3] bg-gradient-to-br from-aces-blue/10 via-aces-green/10 to-aces-blue/5 flex items-center justify-center relative overflow-hidden">
      {displayImage ? (
        <img 
          src={displayImage} 
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-aces-blue to-aces-green flex items-center justify-center text-white text-3xl font-heading font-bold">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
      )}
      {/* Decorative elements */}
      {!displayImage && (
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
};

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

  // CMS image overrides for team members
  const { imageUrl: michelleImg } = useImage("about", "team", "michelle_gohagon", michelleGohagonFallback);
  const { imageUrl: rosariaImg } = useImage("about", "team", "rosaria_giannetti", rosariaGiannettiFallback);
  const { imageUrl: jessicaImg } = useImage("about", "team", "jessica_white", jessicaWhiteFallback);
  const { imageUrl: lisaImg } = useImage("about", "team", "lisa_seales", lisaSealesFallback);
  const { imageUrl: maryImg } = useImage("about", "team", "mary_stone", maryStoneFallback);
  const { imageUrl: johnImg } = useImage("about", "team", "john_gustafson", johnGustafsonFallback);
  const { imageUrl: kimImg } = useImage("about", "team", "kim_cellini", kimCelliniFallback);
  const { imageUrl: alisonImg } = useImage("about", "team", "alison_zanardi", alisonZanardiFallback);

  // Map CMS images to team members
  const cmsImageMap: Record<string, string> = {
    "Michelle Gohagon": michelleImg,
    "Rosaria Giannetti": rosariaImg,
    "Jessica White": jessicaImg,
    "Lisa Seales": lisaImg,
    "Mary Stone": maryImg,
    "John Gustafson": johnImg,
    "Kimberly Cellini": kimImg,
    "Alison Zanardi": alisonImg,
  };

  const getTeamImage = (member: TeamMember) => cmsImageMap[member.name] || member.image;

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
        jsonLd={{
          "@type": "AboutPage",
          "name": "About ACES PDSI",
          "url": "https://acespdsi.org/about",
          "description": "Learn about ACES Professional Development & School Improvement. Supporting educators and districts across Connecticut since 1992.",
          "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "ACES Professional Development & School Improvement",
            "foundingDate": "1992",
            "areaServed": "Connecticut"
          }
        }}
      />
      <Header />
      <main>
        {/* Hero Section - Split layout */}
        <section className="relative pt-24 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left: Blue panel */}
            <div className="relative bg-primary text-primary-foreground px-6 md:px-12 lg:px-16 py-16 lg:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl ml-auto lg:mr-8"
              >
                <span className="block text-xs font-bold tracking-[0.2em] text-primary-foreground/80 mb-5">
                  ABOUT ACES PDSI
                </span>
                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
                  About ACES PDSI
                </h1>
                <p className="font-heading font-semibold text-xl md:text-2xl leading-snug mb-6 text-primary-foreground">
                  Grounding in Pedagogy.<br />Growing in Innovation.
                </p>
                <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed mb-8">
                  Professional learning should feel practical, human, and responsive to the schools it serves. This page introduces the mission, values, and partnership approach behind ACES PDSI.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all shadow-lg"
                  >
                    View Services
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-foreground hover:bg-foreground/90 text-background font-semibold transition-all shadow-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Photo card on light bg */}
            <div className="relative bg-secondary/40 px-6 md:px-12 py-16 lg:py-24 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full max-w-xl bg-card rounded-2xl shadow-xl p-3"
              >
                <img
                  src={heroAbout}
                  alt="ACES PDSI team gathered together"
                  className="w-full h-auto aspect-[4/3] object-cover rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-card rounded-3xl border border-border shadow-sm p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-5">
                    Our Mission
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    ACES Professional Development and School Improvement (PDSI) seeks to deliver high-quality, responsive, equity-centered professional learning that empowers educators to innovate and foster the holistic growth of students. Through partnerships with educational leaders and communities, we aim to build joyful, data-informed, forward-thinking environments that ensure equitable outcomes and learning experiences where educators thrive so that their learners can achieve.
                  </p>
                </div>
                <aside className="bg-secondary/50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    Grounded practice.<br />Thoughtful innovation.
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Partnership", "Equity", "Data-informed", "Educator thriving"].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-card border border-border rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-aces-green" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* What Guides the Work */}
        <section className="py-16 md:py-20 bg-secondary/40">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
                What Guides the Work
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-10">
                The visual system should stay grounded in real educator work while making the innovation layer feel useful and humane.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { icon: Compass, title: "Equity-centered learning", desc: "Professional learning that keeps equitable outcomes and student growth in view." },
                  { icon: Handshake, title: "Responsive partnership", desc: "Support shaped around real district needs, constraints, and goals." },
                  { icon: TrendingUp, title: "Practical innovation", desc: "New tools and ideas tested through classroom practice, reflection, and care." },
                  { icon: Sparkles, title: "Educator thriving", desc: "Learning conditions where educators feel supported, capable, and ready to lead." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card rounded-2xl border border-border p-6 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-aces-green/40 flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-aces-green" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {item.desc}
                    </p>
                    <div className="w-10 h-0.5 bg-aces-green rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Partner With Schools */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-3 shadow-lg"
              >
                <img
                  src={partnerImg}
                  alt="Educators collaborating in a professional learning session"
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                />
              </motion.div>

              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  How We Partner With Schools
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                  ACES PDSI work should read as a practical pathway: listen carefully, design with context, support implementation, and refine through evidence.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { n: "01", title: "Listen", desc: "Clarify needs, goals, learner realities, and district context." },
                    { n: "02", title: "Design", desc: "Shape professional learning, technical assistance, and resources around the work." },
                    { n: "03", title: "Support", desc: "Coach, model, facilitate, and help teams apply ideas in real settings." },
                    { n: "04", title: "Refine", desc: "Use feedback, data, and reflection to adjust and move forward." },
                  ].map((step) => (
                    <div key={step.n} className="bg-secondary/50 rounded-2xl p-5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-sm font-bold text-aces-green">{step.n}</span>
                        <h3 className="font-heading font-bold text-lg text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="container mx-auto px-4 py-14 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-6xl mx-auto">
              <div className="max-w-2xl">
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2 leading-tight">
                  Ready to build the next phase of professional learning?
                </h2>
                <p className="text-primary-foreground/85 text-sm md:text-base">
                  Partner with ACES PDSI to design learning that fits your district's reality and ambitions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all shadow-lg"
                >
                  PDSI Services
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-background hover:bg-background/90 text-foreground font-semibold transition-all shadow-lg"
                >
                  Contact
                </Link>
              </div>
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
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} imageOverride={getTeamImage(member)} />
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
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} imageOverride={getTeamImage(member)} />
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
                      <TeamCard key={member.name} member={member} index={index} onViewBio={handleViewBio} imageOverride={getTeamImage(member)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

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
