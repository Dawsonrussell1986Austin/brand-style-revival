import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Monitor, Users, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

interface EventData {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  type: "virtual" | "in-person";
  category: string;
  registrationUrl?: string;
  content: React.ReactNode;
}

export const eventDetails: EventData[] = [
  {
    slug: "ai-information-literacy-dec-2025",
    title: "AI & Information Literacy: Navigating AI Responsibly (Virtual)",
    date: "December 9, 2025",
    time: "1:00 pm - 4:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: undefined,
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          This virtual half-day session offers library media specialists a guided exploration of how AI is transforming digital literacy and research practices.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Participants will learn how to incorporate AI tools into their instruction, support students in evaluating AI-generated content, and curate ethical and relevant resources in a changing information landscape.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The session includes live demos, interactive discussions, and time for reflection, ensuring participants walk away with strategies they can apply immediately in both physical and virtual library spaces.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>How AI is reshaping digital literacy and research practices</li>
          <li>Strategies for incorporating AI tools into library instruction</li>
          <li>Methods to help students critically evaluate AI-generated content</li>
          <li>Best practices for curating ethical, relevant resources</li>
          <li>Practical techniques applicable to physical and virtual library spaces</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Session Format</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Live demonstrations of AI tools</li>
          <li>Interactive group discussions</li>
          <li>Reflection and planning time</li>
          <li>Take-away resources and materials</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for library media specialists, school librarians, and educators interested in integrating AI literacy into their practice.
        </p>
      </>
    ),
  },
  {
    slug: "ai-certification-leaders-day-3",
    title: "Leading with AI: ACES Certification Course for Leaders & Educators (Day 3)",
    date: "November 14, 2025",
    time: "8:30 am - 2:30 pm",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Leadership",
    registrationUrl: "https://catalog.protraxx.com/ClassDetails/440742?CustomerID=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Join us for the ACES AI Certification for Leaders & Educators, a three-day, in-person event, designed to equip educational leaders with the knowledge and strategies to effectively integrate AI in schools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Created and facilitated by Bob Hutchins, Founder of Human Voice Media, this certification course offers five expert-led modules covering AI foundations, data privacy, leadership in AI-driven change, community engagement, and practical applications through pilot programs.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Participants will gain hands-on learning and actionable strategies to navigate the evolving AI landscape in education. Don't miss this opportunity to learn from an industry expert and lead AI innovation in your district!
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Course Modules</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI Foundations for Educational Leaders</li>
          <li>Data Privacy and Ethical Considerations</li>
          <li>Leadership in AI-Driven Change</li>
          <li>Community Engagement Strategies</li>
          <li>Practical Applications Through Pilot Programs</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Course Schedule</h2>
        <div className="bg-secondary/50 rounded-xl p-6 mb-6">
          <p className="text-muted-foreground leading-relaxed mb-2">
            <strong className="text-foreground">Please note:</strong> This is a three-day course:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong className="text-foreground">Day 1:</strong> October 29, 2025</li>
            <li><strong className="text-foreground">Day 2:</strong> October 30, 2025</li>
            <li><strong className="text-foreground">Day 3:</strong> November 14, 2025</li>
          </ul>
        </div>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">About the Facilitator</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          <strong className="text-foreground">Bob Hutchins</strong> is the Founder of Human Voice Media and an expert in AI integration for educational settings. His practical, hands-on approach ensures participants leave with actionable strategies they can implement immediately.
        </p>
      </>
    ),
  },
  {
    slug: "restorative-conferencing-cohort-1-day-2",
    title: "Restorative Conferencing (Cohort 1, Day 2)",
    date: "November 14, 2025",
    time: "8:30 am - 2:30 pm",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Social-Emotional",
    registrationUrl: "https://www.protraxx.com/login.aspx",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Incidents of conflict, wrongdoing, and harm occur everywhere, every day in schools, workplaces, college campuses, neighborhoods, and families. The restorative conference provides a way to engage with those who cause and experience harm, along with the related community.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This two-day workshop covers the fundamentals of facilitating a formal conference in response to an incident of wrongdoing or harm. Participants will then be able to utilize those skills to create deeper interpersonal understanding and repair relationships among those involved or affected by such an incident.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Fundamentals of facilitating a formal restorative conference</li>
          <li>Engaging with those who cause and experience harm</li>
          <li>Creating deeper interpersonal understanding</li>
          <li>Repairing relationships among those involved or affected</li>
          <li>Working with the related community in restorative processes</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Workshop Schedule</h2>
        <div className="bg-secondary/50 rounded-xl p-6 mb-6">
          <p className="text-muted-foreground leading-relaxed mb-2">
            <strong className="text-foreground">Please note:</strong> This is a two-day workshop:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong className="text-foreground">Day 1:</strong> October 24, 2025</li>
            <li><strong className="text-foreground">Day 2:</strong> November 14, 2025</li>
          </ul>
        </div>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This workshop is recommended for school and district leaders who want to implement restorative practices in their communities.
        </p>
      </>
    ),
  },
  // Upcoming Events 2026
  {
    slug: "teaching-ai-literacy-jan-2026",
    title: "Teaching AI Literacy: Guiding Student Understanding",
    date: "January 13, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440769?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          This session is for educators who want to build students' AI literacy. Explore how AI works, where students encounter it daily, and how to foster curiosity, critical thinking, and digital responsibility.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Leave with strategies, model lessons, and tools to empower students as informed users of AI.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>How AI works and where students encounter it daily</li>
          <li>Strategies for fostering curiosity and critical thinking about AI</li>
          <li>Model lessons for teaching AI literacy</li>
          <li>Tools to empower students as informed AI users</li>
          <li>Approaches to digital responsibility in the age of AI</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for K-12 educators who want to help students understand and critically engage with AI technology.
        </p>
      </>
    ),
  },
  {
    slug: "supporting-students-ai-paraeducators-jan-2026",
    title: "Supporting Students with AI: For Paraeducators",
    date: "January 14, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440767?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Created for paraeducators, this hands-on session shows how AI can support individualized learning, behavior tracking, and communication tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Participants will gain practical strategies, ethical guidance, and confidence to use AI in daily student support.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI tools for individualized learning support</li>
          <li>Behavior tracking and communication tools</li>
          <li>Practical strategies for daily student support</li>
          <li>Ethical guidance for AI use with students</li>
          <li>Building confidence in using AI tools</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed specifically for paraeducators and teaching assistants who support students in classroom settings.
        </p>
      </>
    ),
  },
  {
    slug: "ai-student-data-privacy-ethics-feb-2026",
    title: "AI & Student Data: Privacy, Ethics, & Safety",
    date: "February 5, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: undefined,
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          This session is for all educators, administrators, and support staff concerned with AI, privacy, and student safety.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Explore how AI tools use data, examine issues like bias and consent, and leave with strategies to ask the right questions, engage families, and uphold equity and ethics in AI use.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>How AI tools collect and use student data</li>
          <li>Understanding bias and consent in AI systems</li>
          <li>Strategies for asking the right questions about AI tools</li>
          <li>Engaging families in conversations about AI</li>
          <li>Upholding equity and ethics in AI use</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is for educators, administrators, and support staff who want to ensure AI is used responsibly and ethically in their schools.
        </p>
      </>
    ),
  },
  {
    slug: "ai-classroom-tools-educators-feb-2026",
    title: "AI in the Classroom: Tools for Today's Educators",
    date: "February 11, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440730?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          This workshop is for teachers who want to explore how AI can enhance planning, assessment, and student engagement while keeping relationships central.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Try classroom-ready tools, see examples, and take away ethical strategies to integrate AI into teaching.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI tools for lesson planning and curriculum development</li>
          <li>Assessment strategies enhanced by AI</li>
          <li>Methods for boosting student engagement with AI</li>
          <li>Keeping relationships central while using technology</li>
          <li>Ethical strategies for AI integration</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for classroom teachers at all grade levels who want practical, hands-on experience with AI tools.
        </p>
      </>
    ),
  },
  {
    slug: "ai-administrative-assistants-mar-2026",
    title: "AI for Administrative Assistants",
    date: "March 3, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440730?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Designed for administrative assistants, this session introduces AI tools to streamline scheduling, communication, and office tasks.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          You'll leave with easy-to-use strategies to save time, reduce stress, and boost efficiency while supporting students, staff, and families.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI tools for streamlining scheduling</li>
          <li>Communication tools powered by AI</li>
          <li>Office task automation strategies</li>
          <li>Time-saving techniques for busy professionals</li>
          <li>Supporting students, staff, and families with AI</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for administrative assistants, office managers, and support staff in educational settings.
        </p>
      </>
    ),
  },
  {
    slug: "ai-strategy-district-school-leaders-mar-2026",
    title: "AI Strategy for District & School Leaders",
    date: "March 5, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "Leadership",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440735?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          For district and school leaders, this session explores strategic uses of AI through case studies, frameworks, and scenarios.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Leaders will build a vision aligned with district priorities, address ethics and policy, and leave with tools and next steps for schoolwide integration.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Strategic uses of AI in educational leadership</li>
          <li>Case studies and frameworks for AI implementation</li>
          <li>Building a vision aligned with district priorities</li>
          <li>Addressing ethics and policy in AI adoption</li>
          <li>Tools and next steps for schoolwide integration</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for superintendents, principals, assistant principals, and other district and school leaders.
        </p>
      </>
    ),
  },
  {
    slug: "creative-intelligence-ai-arts-apr-2026",
    title: "Creative Intelligence: AI in the Arts",
    date: "April 2, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440736?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          This session is for arts educators in music, visual arts, theater, and beyond. Explore how AI can support creativity through hands-on work with generative tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Examine ethical considerations, and leave with strategies to help students use AI to expand, never replace, their originality and imagination.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Generative AI tools for music, visual arts, and theater</li>
          <li>Hands-on experience with creative AI tools</li>
          <li>Ethical considerations for AI in the arts</li>
          <li>Strategies to expand student creativity with AI</li>
          <li>Preserving originality and imagination</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed for arts educators including music teachers, visual arts instructors, theater directors, and creative writing teachers.
        </p>
      </>
    ),
  },
  {
    slug: "leading-with-ai-certification-spring-2026",
    title: "Leading with AI: ACES AI Certification Course for Leaders & Educators",
    date: "April 7, 8 & May 5, 2026",
    time: "8:30 am - 2:30 pm",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Leadership",
    registrationUrl: "https://catalog.protraxx.com/ClassDetails/440743?CustomerID=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          In collaboration with Bob Hutchins of Human Voice Media, this course immerses participants in hands-on activities, case studies, and collaborative planning.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Educators and leaders will leave with practical tools and a clear, actionable plan for bringing AI into their schools and classrooms. Upon completion, participants will earn an ACES AI Certification Course Certificate and Digital Badge, recognizing their readiness to lead and support AI implementation in education.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Course Schedule</h2>
        <div className="bg-secondary/50 rounded-xl p-6 mb-6">
          <p className="text-muted-foreground leading-relaxed mb-2">
            <strong className="text-foreground">Spring 2026 Dates:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong className="text-foreground">Day 1:</strong> April 7, 2026</li>
            <li><strong className="text-foreground">Day 2:</strong> April 8, 2026</li>
            <li><strong className="text-foreground">Day 3:</strong> May 5, 2026</li>
          </ul>
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI Foundations for Educational Leaders</li>
          <li>Data Privacy and Ethical Considerations</li>
          <li>Leadership in AI-Driven Change</li>
          <li>Community Engagement Strategies</li>
          <li>Practical Applications Through Pilot Programs</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">About the Facilitator</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          <strong className="text-foreground">Bob Hutchins</strong> is the Founder of Human Voice Media and an expert in AI integration for educational settings. His practical, hands-on approach ensures participants leave with actionable strategies they can implement immediately.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This course is designed for district and school leaders, curriculum coordinators, and educators who want to lead AI implementation in their schools.
        </p>
      </>
    ),
  },
  {
    slug: "supporting-students-ai-paraeducators-may-2026",
    title: "Supporting Students with AI: For Paraeducators",
    date: "May 19, 2026",
    time: "9:00 am - 12:00 pm",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    registrationUrl: "https://catalog.protraxx.com/classdetails/440768?Customerid=254",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Created for paraeducators, this hands-on session shows how AI can support individualized learning, behavior tracking, and communication tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Participants will gain practical strategies, ethical guidance, and confidence to use AI in daily student support.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>AI tools for individualized learning support</li>
          <li>Behavior tracking and communication tools</li>
          <li>Practical strategies for daily student support</li>
          <li>Ethical guidance for AI use with students</li>
          <li>Building confidence in using AI tools</li>
        </ul>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Who Should Attend</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This session is designed specifically for paraeducators and teaching assistants who support students in classroom settings.
        </p>
      </>
    ),
  },
];

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = eventDetails.find((e) => e.slug === slug);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI & Technology":
        return "bg-aces-blue text-white";
      case "Leadership":
        return "bg-aces-green text-white";
      case "Social-Emotional":
        return "bg-amber-500 text-white";
      default:
        return "bg-aces-secondary-blue text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${event.title} | ACES Events`}
        description={`Join us on ${event.date} for ${event.title}. ${event.type === "virtual" ? "Virtual event" : `In-person at ${event.location}`}.`}
        type="article"
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Button asChild variant="ghost" className="mb-6 -ml-2">
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>

            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
              {event.type === "virtual" ? (
                <div className="flex items-center gap-2 bg-blue-50 text-aces-blue px-3 py-1.5 rounded-lg">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">Virtual Event</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                  {event.address && <span className="text-muted-foreground">• {event.address}</span>}
                </div>
              )}
            </div>

            {event.registrationUrl ? (
              <Button asChild size="lg" className="gradient-aces text-white btn-glow">
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button asChild size="lg" className="gradient-aces text-white btn-glow">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {event.content}

          </motion.article>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
              Other Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eventDetails
                .filter((e) => e.slug !== slug)
                .slice(0, 2)
                .map((relatedEvent) => (
                  <Link
                    key={relatedEvent.slug}
                    to={`/events/${relatedEvent.slug}`}
                    className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3 ${getCategoryColor(relatedEvent.category)}`}>
                      {relatedEvent.category}
                    </span>
                    <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {relatedEvent.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {relatedEvent.date}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
