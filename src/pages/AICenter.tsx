import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import heroImage from "@/assets/ai-center-hero.jpg";
import workshopImage from "@/assets/ai-workshop.jpg";
import certificationImage from "@/assets/ai-certification.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Brain, 
  GraduationCap, 
  Wrench, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Code,
  Lightbulb,
  Target,
  Building2,
  UserCheck,
  UserCog,
  Heart
} from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "AI-Ready Educators",
    description: "Empowering educators with the knowledge and skills to integrate AI into their teaching practice effectively and ethically.",
    features: [
      "Professional development workshops",
      "AI literacy training",
      "Classroom integration strategies",
      "Ongoing mentorship and support"
    ],
    hasDetailedContent: true,
    contentKey: "aiReadyEducators"
  },
  {
    icon: Wrench,
    title: "Innovative Tools",
    description: "Providing access to cutting-edge AI tools and resources designed specifically for educational environments.",
    features: [
      "AI-powered learning platforms",
      "Vibe Coding environments",
      "Adaptive assessment tools",
      "Content creation assistants"
    ],
    hasDetailedContent: true,
    contentKey: "innovativeTools"
  },
  {
    icon: Shield,
    title: "Research & Ethics",
    description: "Leading the conversation on responsible AI use in education through research, policy development, and ethical guidelines.",
    features: [
      "AI ethics curriculum",
      "Privacy and data protection",
      "Bias detection and mitigation",
      "Research partnerships"
    ],
    hasDetailedContent: true,
    contentKey: "researchEthics"
  }
];

const aiReadyEducatorsContent = {
  intro: "Pillar I focuses on preparing educators, leaders, students, and families to become AI-fluent and confident in using artificial intelligence responsibly, ethically, and creatively. The goal is to ensure that every level of the school community — from the classroom to the district office to families at home — has the knowledge, skills, and tools needed to integrate AI in meaningful ways. This work builds capacity across roles, fosters collaboration, and establishes a foundation for innovation that enhances teaching, learning, and leadership.",
  vision: "By equipping educators with practical strategies, leaders with policy and decision-making frameworks, students with AI literacy skills, and families with resources to support learning at home, Pillar I creates a holistic ecosystem where AI strengthens—not replaces—human connection and professional expertise.",
  supports: [
    {
      audience: "District & School Leaders",
      icon: Building2,
      items: [
        { title: "AI Leadership Academy", description: "Cohort-based program introducing leaders to AI strategy, ethics, and adoption planning." },
        { title: "Executive Briefings", description: "High-level updates on AI trends and their implications for policy, operations, and instruction." },
        { title: "Policy & Planning Workshops", description: "Support for districts in creating AI adoption roadmaps, communication strategies, and equity-driven implementation plans." },
        { title: "Data-Informed Decision-Making Seminars", description: "Guidance on leveraging AI analytics for strategic planning and improved outcomes." }
      ]
    },
    {
      audience: "Teachers & Instructional Staff",
      icon: UserCheck,
      items: [
        { title: "AI Literacy for Educators Course", description: "Foundational professional learning on AI concepts, ethics, and classroom applications." },
        { title: "Content-Specific Workshops", description: "Strategies for integrating AI into ELA, Math, Science, Social Studies, Arts, and CTE classrooms." },
        { title: "AI-Powered Lesson Design Studio", description: "Hands-on labs where educators design lessons and units enhanced with AI tools." },
        { title: "Embedded Coaching Cycles", description: "Ongoing coaching support to ensure successful classroom implementation." },
        { title: "Micro-Credentials & Badges", description: "Recognition for educators demonstrating competency in AI integration and ethics." },
        { title: "Role-Specific Workbooks", description: "Practical guides offering curated prompts and examples tailored for teachers, leaders, and paraeducators." }
      ]
    },
    {
      audience: "Paraeducators & Support Staff",
      icon: UserCog,
      items: [
        { title: "AI for Instructional Support Workshops", description: "Training on using AI to adapt materials, generate accommodations, and support student learning." },
        { title: "Role-Specific Short Courses", description: "Modules designed for librarians, counselors, office staff, and specialists." }
      ]
    },
    {
      audience: "Students & Families",
      icon: Heart,
      items: [
        { title: "AI Literacy Curriculum Modules (K–12)", description: "Age-appropriate lessons that build understanding of AI fundamentals, ethics, and creativity." },
        { title: "Family Workshops & Toolkits", description: "Sessions and resources to help families use AI in daily life (e.g., resumes, homework support, budgeting) and to understand its role in schools." },
        { title: "Student AI Projects & Showcases", description: "Opportunities for students to design and present AI applications that demonstrate creativity and problem-solving." }
      ]
    }
  ]
};

const researchEthicsContent = {
  intro: "Pillar III ensures that AI integration in schools is safe, ethical, and evidence-based. While AI holds enormous promise for transforming teaching and learning, its adoption must be guided by rigorous standards that protect students, promote equity, and ensure tools are effective in real classrooms. The ACES Center for AI positions itself as a trusted authority in this space—conducting applied research, developing certification systems, and establishing ethical frameworks that schools and vendors can rely on.",
  vision: "Through partnerships with district leaders, researchers, and industry experts, the Center will set benchmarks for what responsible AI use looks like in education. By providing readiness audits, ethics training, and a Seal of Approval for AI tools, Pillar III builds trust and transparency, ensuring that AI enhances learning while safeguarding the values and well-being of students, families, and educators.",
  supports: [
    {
      audience: "District & School Leaders",
      icon: Building2,
      items: [
        {
          title: "AI Readiness & Risk Audit Tool",
          description: "Assesses institutional readiness, identifies risks, and recommends strategies for responsible AI adoption."
        },
        {
          title: "Policy & Vendor Guidance",
          description: "Resources and consulting to support safe procurement and adoption of AI solutions."
        }
      ]
    },
    {
      audience: "Teachers & Instructional Staff",
      icon: UserCheck,
      items: [
        {
          title: "AI Ethics Simulation Scenarios",
          description: "Interactive training modules that help educators navigate classroom-based ethical dilemmas."
        },
        {
          title: "Professional Learning Modules on AI Ethics",
          description: "Training that builds teacher confidence in selecting and using AI responsibly."
        }
      ]
    },
    {
      audience: "Paraeducators & Specialists",
      icon: UserCog,
      items: [
        {
          title: "Ethics & Equity Evaluation Rubric",
          description: "Role-specific frameworks to guide equitable and accessible AI practices."
        },
        {
          title: "Certification-Aligned Resources",
          description: "Supports for integrating safe and ethical AI into specialized roles."
        }
      ]
    },
    {
      audience: "Students & Families",
      icon: Heart,
      items: [
        {
          title: "Student Digital Citizenship & AI Toolkit",
          description: "Public-facing resources that teach families how to navigate AI tools responsibly and critically."
        },
        {
          title: "Community Engagement Platforms",
          description: "Podcasts, communications, and workshops to build shared understanding and trust."
        }
      ]
    }
  ]
};

const innovativeToolsContent = {
  intro: "Pillar II focuses on designing and scaling AI-powered tools that directly respond to real challenges in schools and classrooms. Unlike generic EdTech solutions, the ACES Center for AI develops products co-designed with educators, ensuring every tool is practical, ethical, and grounded in authentic classroom needs. By building innovative platforms for lesson design, assessment, adaptive learning, and school operations, Pillar II aims to reduce educator workload, increase personalization, and expand access to high-quality learning opportunities.",
  vision: "This work is anchored in the Innovation Lab, where educators collaborate with AI specialists, UX designers, and developers to test and refine prototypes in controlled \"sandbox\" environments before scaling them across districts. Through pilot partnerships, educator feedback cycles, and strategic EdTech collaborations, the Center ensures that each product is safe, effective, and ready to improve teaching and learning at scale.",
  categories: [
    {
      title: "Innovation & Development Infrastructure",
      items: [
        { title: "Educator Co-Design Process", description: "Formalized structures that center educator voice in every stage of product development." },
        { title: "Innovation Sandbox", description: "Safe, small-scale pilot environments where districts test tools before broader adoption." },
        { title: "Strategic EdTech Partnerships", description: "Collaborations with industry leaders to accelerate development and ensure interoperability." }
      ]
    },
    {
      title: "Instructional Products for Educators",
      items: [
        { title: "AI Curriculum Writing Assistant", description: "Generates standards-aligned units, lessons, and assessments." },
        { title: "Lesson Planning Studio", description: "Collaborative platform for AI-enhanced lesson and unit design." },
        { title: "Assessment Generator", description: "Creates formative and summative assessments with scaffolds and multiple solution pathways." }
      ]
    },
    {
      title: "Family & Community Engagement Tools",
      items: [
        { title: "AI Chatbots for Families", description: "Multilingual communication tools for real-time engagement with schools." },
        { title: "Family Communication Dashboard", description: "Central hub for translated updates, school-home communication, and resource sharing." }
      ]
    },
    {
      title: "Leadership & Operations Tools",
      items: [
        { title: "AI Data Dashboard for Leaders", description: "Decision-support system for analyzing student outcomes, resource allocation, and trends." },
        { title: "AI-Powered Operations Tools", description: "Automates scheduling, communication, and non-instructional tasks to free leaders for strategic work." },
        { title: "Workflow Optimization Suite", description: "Reduces administrative burden and increases efficiency across school operations." }
      ]
    },
    {
      title: "Supports for Paraeducators & Specialists",
      items: [
        { title: "ParaPro Exam Support Platform", description: "AI-assisted preparation for paraeducator certification." },
        { title: "AI Productivity Suite", description: "Recordkeeping, translation, scheduling, and communication tools designed for support staff." },
        { title: "Accessibility Tools", description: "AI-driven accommodations and modifications for diverse learning needs." },
        { title: "Role-Specific Applications", description: "Tailored AI tools for librarians, counselors, specialists, and office staff." }
      ]
    }
  ]
};

const certificationPrograms = [
  {
    title: "AI Certification for Educators",
    level: "Foundation",
    duration: "6 weeks",
    description: "Master the fundamentals of AI integration in education. Learn to effectively use AI tools while maintaining pedagogical best practices.",
    topics: ["AI Fundamentals", "Prompt Engineering", "Ethical AI Use", "Classroom Integration"]
  },
  {
    title: "Advanced AI Integration",
    level: "Advanced",
    duration: "8 weeks",
    description: "Take your AI skills to the next level with advanced strategies for curriculum design and personalized learning.",
    topics: ["Advanced Prompting", "AI-Enhanced Assessment", "Personalized Learning", "AI Leadership"]
  },
  {
    title: "Vibe Coding Certification",
    level: "Specialized",
    duration: "4 weeks",
    description: "Learn the revolutionary approach to coding through natural language. Create applications without traditional programming knowledge.",
    topics: ["Natural Language Coding", "App Development", "AI Assistants", "Project Building"]
  }
];

const workshops = [
  {
    title: "Introduction to AI in Education",
    date: "Monthly Sessions",
    format: "Virtual",
    icon: Brain
  },
  {
    title: "Prompt Engineering Masterclass",
    date: "Bi-weekly",
    format: "Hybrid",
    icon: Lightbulb
  },
  {
    title: "Vibe Coding Bootcamp",
    date: "Quarterly",
    format: "In-person",
    icon: Code
  },
  {
    title: "AI Ethics & Policy Workshop",
    date: "Monthly",
    format: "Virtual",
    icon: Shield
  },
  {
    title: "Building AI-Enhanced Curriculum",
    date: "Bi-monthly",
    format: "Hybrid",
    icon: BookOpen
  },
  {
    title: "AI Leadership Summit",
    date: "Annual",
    format: "In-person",
    icon: Users
  }
];

export default function AICenter() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Center for Artificial Intelligence"
        description="The ACES Center for AI prepares educators and students for the future with cutting-edge AI training, certification programs, and ethical frameworks for education."
        url="/ai-center"
        keywords="AI in education, artificial intelligence training, educator AI certification, vibe coding, AI ethics, Connecticut AI education"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-aces-blue/5 to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-aces-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-aces-green/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-aces-green/10 text-aces-green rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold font-heading">Innovation in Education</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-aces-navy mb-6">
                ACES Center for <span className="text-aces-blue">Artificial Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Transforming education through AI innovation. We prepare educators and students 
                for the future with cutting-edge training, tools, and ethical frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-aces-blue hover:bg-aces-blue/90 text-white">
                  Explore Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-aces-navy text-aces-navy hover:bg-aces-navy/5">
                  Contact Us
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img 
                src={heroImage} 
                alt="AI in Education" 
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-aces-green/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-aces-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-aces-navy">AI-Powered Learning</p>
                    <p className="text-sm text-muted-foreground">Future-ready education</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
              Our Three Pillars
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The foundation of our approach to AI in education, ensuring comprehensive 
              preparation for the future of learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:border-aces-blue/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-aces-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <pillar.icon className="w-7 h-7 text-aces-blue" />
                </div>
                <h3 className="text-xl font-bold font-heading text-aces-navy mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {pillar.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-aces-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                {pillar.hasDetailedContent && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-aces-blue text-aces-blue hover:bg-aces-blue hover:text-white transition-colors">
                        Read Full Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-heading text-aces-navy flex items-center gap-3">
                          <pillar.icon className="w-6 h-6 text-aces-blue" />
                          {pillar.contentKey === "aiReadyEducators" && "AI-Ready Educators & Communities"}
                          {pillar.contentKey === "innovativeTools" && "Innovative AI-Tools Solutions"}
                          {pillar.contentKey === "researchEthics" && "Research & Ethical Standards"}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {pillar.contentKey === "aiReadyEducators" && (
                        <div className="space-y-8 mt-4">
                          <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {aiReadyEducatorsContent.intro}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {aiReadyEducatorsContent.vision}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-heading text-aces-navy mb-6">
                              Pillar I AI-Ready Educators & Communities: Key Supports
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              {aiReadyEducatorsContent.supports.map((support) => (
                                <div
                                  key={support.audience}
                                  className="bg-secondary/50 rounded-xl p-6 border border-border"
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-aces-green/10 rounded-lg flex items-center justify-center">
                                      <support.icon className="w-5 h-5 text-aces-green" />
                                    </div>
                                    <h4 className="font-semibold font-heading text-aces-navy">
                                      For {support.audience}
                                    </h4>
                                  </div>
                                  <ul className="space-y-3">
                                    {support.items.map((item) => (
                                      <li key={item.title}>
                                        <p className="font-medium text-foreground mb-1">
                                          {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.description}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {pillar.contentKey === "innovativeTools" && (
                        <div className="space-y-8 mt-4">
                          <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {innovativeToolsContent.intro}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {innovativeToolsContent.vision}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-heading text-aces-navy mb-6">
                              Pillar II Innovative Tools for Educators: Key Supports
                            </h3>
                            <div className="space-y-6">
                              {innovativeToolsContent.categories.map((category) => (
                                <div
                                  key={category.title}
                                  className="bg-secondary/50 rounded-xl p-6 border border-border"
                                >
                                  <h4 className="font-semibold font-heading text-aces-navy mb-4 flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-aces-blue" />
                                    {category.title}
                                  </h4>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {category.items.map((item) => (
                                      <div key={item.title} className="bg-background rounded-lg p-4 border border-border">
                                        <p className="font-medium text-foreground mb-1">
                                          {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.description}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {pillar.contentKey === "researchEthics" && (
                        <div className="space-y-8 mt-4">
                          <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {researchEthicsContent.intro}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {researchEthicsContent.vision}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-heading text-aces-navy mb-6">
                              Pillar III Research & Ethical Standards: Key Supports
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              {researchEthicsContent.supports.map((support) => (
                                <div
                                  key={support.audience}
                                  className="bg-secondary/50 rounded-xl p-6 border border-border"
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-aces-green/10 rounded-lg flex items-center justify-center">
                                      <support.icon className="w-5 h-5 text-aces-green" />
                                    </div>
                                    <h4 className="font-semibold font-heading text-aces-navy">
                                      For {support.audience}
                                    </h4>
                                  </div>
                                  <ul className="space-y-4">
                                    {support.items.map((item) => (
                                      <li key={item.title}>
                                        <p className="font-medium text-foreground mb-1">
                                          {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.description}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-20 bg-aces-navy/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
                Certification Programs
              </h2>
              <p className="text-muted-foreground mb-6">
                Earn recognized credentials that demonstrate your expertise in AI-enhanced education. 
                Our certification programs are designed by experts and validated by industry leaders.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-aces-blue to-aces-green border-2 border-white flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-aces-navy">500+</span> educators certified
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <img 
                src={certificationImage} 
                alt="AI Certification Achievement" 
                className="rounded-2xl shadow-xl w-full object-cover aspect-video"
              />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certificationPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-aces-blue to-aces-green p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-medium">{program.level}</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                      {program.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {program.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {program.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-aces-navy">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-aces-blue/10 text-aces-blue px-3 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-aces-blue hover:bg-aces-blue/90 text-white">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aces-navy mb-4">
                Workshops & Training
              </h2>
              <p className="text-muted-foreground mb-6">
                Hands-on learning experiences designed to build practical AI skills for educators.
              </p>
              <img 
                src={workshopImage} 
                alt="Educators in AI workshop" 
                className="rounded-2xl shadow-lg w-full object-cover aspect-video hidden lg:block"
              />
            </motion.div>
            
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border hover:border-aces-blue/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-aces-green/10 rounded-lg flex items-center justify-center group-hover:bg-aces-green/20 transition-colors">
                  <workshop.icon className="w-6 h-6 text-aces-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-heading text-aces-navy group-hover:text-aces-blue transition-colors">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{workshop.date}</span>
                    <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
                    <span>{workshop.format}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-aces-blue group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-aces-blue to-aces-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Target className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of educators who are already leveraging AI to create 
              more engaging, personalized, and effective learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-aces-blue hover:bg-white/90">
                Get Started Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
