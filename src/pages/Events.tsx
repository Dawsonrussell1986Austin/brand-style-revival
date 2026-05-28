import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Monitor, Clock, CalendarDays, Users, Building2, ClipboardCheck, BookOpen, HeartHandshake, Compass, Layers, FileText, Calculator, Sparkles, GraduationCap, Zap, ShieldCheck, UserCog, Cpu } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { useImage } from "@/hooks/useSiteContent";
import heroEvents from "@/assets/home/events-hero.jpg";
import ctaImg from "@/assets/home/partner-ballroom.jpg";
import imgAi from "@/assets/home/featured-ai.jpg";
import imgPlay from "@/assets/home/featured-play.jpg";
import imgRigor from "@/assets/home/featured-rigor.jpg";

declare global {
  interface Window {
    __adcloudiq__: Array<(() => void) | { track: (config: { advertiserId: string; pixelId: string }) => void }>;
  }
}

interface Event {
  id: string;
  slug: string;
  date: Date;
  endTime: string;
  title: string;
  location: string;
  address?: string;
  type: "virtual" | "in-person";
  description: string;
  image?: string;
  category?: string;
}

const upcomingEvents: Event[] = [
  {
    id: "u1",
    slug: "teaching-ai-literacy-jan-2026",
    date: new Date(2026, 0, 13, 9, 0),
    endTime: "12:00 pm",
    title: "Teaching AI Literacy: Guiding Student Understanding",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "This session is for educators who want to build students' AI literacy. Explore how AI works, where students encounter it daily, and how to foster curiosity, critical thinking, and digital responsibility. Leave with strategies, model lessons, and tools to empower students as informed users of AI.",
  },
  {
    id: "u2",
    slug: "supporting-students-ai-paraeducators-jan-2026",
    date: new Date(2026, 0, 14, 9, 0),
    endTime: "12:00 pm",
    title: "Supporting Students with AI: For Paraeducators",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "Created for paraeducators, this hands-on session shows how AI can support individualized learning, behavior tracking, and communication tools. Participants will gain practical strategies, ethical guidance, and confidence to use AI in daily student support.",
  },
  {
    id: "u3",
    slug: "ai-student-data-privacy-ethics-feb-2026",
    date: new Date(2026, 1, 5, 9, 0),
    endTime: "12:00 pm",
    title: "AI & Student Data: Privacy, Ethics, & Safety",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "This session is for all educators, administrators, and support staff concerned with AI, privacy, and student safety. Explore how AI tools use data, examine issues like bias and consent, and leave with strategies to ask the right questions, engage families, and uphold equity and ethics in AI use.",
  },
  {
    id: "u4",
    slug: "ai-classroom-tools-educators-feb-2026",
    date: new Date(2026, 1, 11, 9, 0),
    endTime: "12:00 pm",
    title: "AI in the Classroom: Tools for Today's Educators",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "This workshop is for teachers who want to explore how AI can enhance planning, assessment, and student engagement while keeping relationships central. Try classroom-ready tools, see examples, and take away ethical strategies to integrate AI into teaching.",
  },
  {
    id: "u5",
    slug: "ai-administrative-assistants-mar-2026",
    date: new Date(2026, 2, 3, 9, 0),
    endTime: "12:00 pm",
    title: "AI for Administrative Assistants",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "Designed for administrative assistants, this session introduces AI tools to streamline scheduling, communication, and office tasks. You'll leave with easy-to-use strategies to save time, reduce stress, and boost efficiency while supporting students, staff, and families.",
  },
  {
    id: "u6",
    slug: "ai-strategy-district-school-leaders-mar-2026",
    date: new Date(2026, 2, 5, 9, 0),
    endTime: "12:00 pm",
    title: "AI Strategy for District & School Leaders",
    location: "Virtual",
    type: "virtual",
    category: "Leadership",
    description: "For district and school leaders, this session explores strategic uses of AI through case studies, frameworks, and scenarios. Leaders will build a vision aligned with district priorities, address ethics and policy, and leave with tools and next steps for schoolwide integration.",
  },
  {
    id: "u7",
    slug: "creative-intelligence-ai-arts-apr-2026",
    date: new Date(2026, 3, 2, 9, 0),
    endTime: "12:00 pm",
    title: "Creative Intelligence: AI in the Arts",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "This session is for arts educators in music, visual arts, theater, and beyond. Explore how AI can support creativity through hands-on work with generative tools, examine ethical considerations, and leave with strategies to help students use AI to expand, never replace, their originality and imagination.",
  },
  {
    id: "u8",
    slug: "leading-with-ai-certification-spring-2026",
    date: new Date(2026, 3, 7, 8, 30),
    endTime: "2:30 pm",
    title: "Leading with AI: ACES AI Certification Course for Leaders & Educators",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Leadership",
    description: "In collaboration with Bob Hutchins of Human Voice Media, this course immerses participants in hands-on activities, case studies, and collaborative planning. Educators and leaders will leave with practical tools and a clear, actionable plan for bringing AI into their schools and classrooms. Upon completion, participants will earn an ACES AI Certification Course Certificate and Digital Badge, recognizing their readiness to lead and support AI implementation in education. Spring Course Dates: April 7, 8 and May 5, 2026.",
  },
  {
    id: "u9",
    slug: "supporting-students-ai-paraeducators-may-2026",
    date: new Date(2026, 4, 19, 9, 0),
    endTime: "12:00 pm",
    title: "Supporting Students with AI: For Paraeducators",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "Created for paraeducators, this hands-on session shows how AI can support individualized learning, behavior tracking, and communication tools. Participants will gain practical strategies, ethical guidance, and confidence to use AI in daily student support.",
  },
];

const pastEvents: Event[] = [
  {
    id: "1",
    slug: "ai-information-literacy-dec-2025",
    date: new Date(2025, 11, 9, 13, 0),
    endTime: "4:00 pm",
    title: "AI & Information Literacy: Navigating AI Responsibly (Virtual)",
    location: "Virtual",
    type: "virtual",
    category: "AI & Technology",
    description: "This virtual half-day session offers library media specialists a guided exploration of how AI is transforming digital literacy and research practices. Participants will learn how to incorporate AI tools into their instruction, support students in evaluating AI-generated content, and curate ethical and relevant resources in a changing information landscape.",
  },
  {
    id: "2",
    slug: "ai-certification-leaders-day-3",
    date: new Date(2025, 10, 14, 8, 30),
    endTime: "2:30 pm",
    title: "Leading with AI: ACES Certification Course for Leaders & Educators (Day 3)",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Leadership",
    description: "Join us for the ACES AI Certification for Leaders & Educators, a three-day, in-person event, designed to equip educational leaders with the knowledge and strategies to effectively integrate AI in schools.",
  },
  {
    id: "3",
    slug: "restorative-conferencing-cohort-1-day-2",
    date: new Date(2025, 10, 14, 8, 30),
    endTime: "2:30 pm",
    title: "Restorative Conferencing (Cohort 1, Day 2)",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    category: "Social-Emotional",
    description: "Incidents of conflict, wrongdoing, and harm occur everywhere, every day in schools, workplaces, college campuses, neighborhoods, and families. The restorative conference provides a way to engage with those who cause and experience harm.",
  },
];

const formatDate = (date: Date) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return {
    month: months[date.getMonth()],
    day: date.getDate(),
    year: date.getFullYear(),
  };
};

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const formatFullDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const getCategoryColor = (category?: string) => {
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

const allEvents = [...upcomingEvents, ...pastEvents];

const MiniCalendar = ({ events, currentMonth, onMonthChange }: { events: Event[]; currentMonth: Date; onMonthChange: (d: Date) => void; }) => {
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dow = ["S","M","T","W","T","F","S"];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  const eventDays = new Set(
    events
      .filter(e => e.date.getFullYear() === year && e.date.getMonth() === month)
      .map(e => e.date.getDate())
  );
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => onMonthChange(new Date(year, month - 1, 1))} className="p-1 hover:bg-secondary rounded">
          <ChevronLeft className="w-4 h-4 text-aces-navy" />
        </button>
        <span className="text-sm font-bold text-aces-navy">{monthNames[month]} {year}</span>
        <button onClick={() => onMonthChange(new Date(year, month + 1, 1))} className="p-1 hover:bg-secondary rounded">
          <ChevronRight className="w-4 h-4 text-aces-navy" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dow.map((d, i) => (
          <div key={i} className="text-[11px] font-bold text-muted-foreground py-1">{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className={`text-xs py-1.5 rounded ${d == null ? "" : eventDays.has(d) ? "bg-aces-green text-white font-bold" : "text-aces-navy"}`}>
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthCalendarView = ({ events, currentMonth, onMonthChange }: { 
  events: Event[]; 
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const days: (number | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = event.date;
      return eventDate.getFullYear() === year && 
             eventDate.getMonth() === month && 
             eventDate.getDate() === day;
    });
  };

  const goToPreviousMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    onMonthChange(new Date());
  };
  
  return (
    <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden mb-16">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-aces-navy" />
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-aces-navy" />
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
        <h3 className="text-xl font-heading font-bold text-aces-navy">
          {monthNames[month]} {year}
        </h3>
        <div className="w-24" /> {/* Spacer for balance */}
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 bg-secondary/50">
        {daysOfWeek.map(day => (
          <div key={day} className="p-3 text-center text-sm font-semibold text-aces-navy border-b border-border">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday = day && 
            new Date().getFullYear() === year && 
            new Date().getMonth() === month && 
            new Date().getDate() === day;
          
          return (
            <div 
              key={index} 
              className={`min-h-[120px] p-2 border-b border-r border-border ${
                day ? 'bg-white' : 'bg-secondary/20'
              } ${isToday ? 'bg-aces-blue/5' : ''}`}
            >
              {day && (
                <>
                  <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full ${
                    isToday ? 'bg-aces-blue text-white' : 'text-aces-navy'
                  }`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <Link 
                        key={event.id} 
                        to={`/events/${event.slug}`}
                        className={`block text-xs p-1.5 rounded truncate font-medium hover:opacity-80 transition-opacity ${getCategoryColor(event.category)}`}
                      >
                        {event.title}
                      </Link>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-xs text-muted-foreground font-medium">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Events = () => {
  // mini calendar inline helper below
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"list" | "month">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const { data: dbEvents } = useEvents();
  const { imageUrl: heroEventsSrc, altText: heroEventsAlt } = useImage("events", "hero", "hero_image", heroEvents);
  const { imageUrl: ctaImgSrc, altText: ctaImgAlt } = useImage("events", "cta", "image", ctaImg);

  // Use DB events if available, otherwise fall back to hardcoded
  const resolvedEvents: Event[] = useMemo(() => {
    if (dbEvents && dbEvents.length > 0) {
      return dbEvents.map(e => ({
        id: e.id,
        slug: e.slug,
        date: new Date(e.date),
        endTime: e.end_time,
        title: e.title,
        location: e.location,
        address: e.address || undefined,
        type: e.type as "virtual" | "in-person",
        description: e.description,
        category: e.category || undefined,
      }));
    }
    return [...upcomingEvents, ...pastEvents];
  }, [dbEvents]);

  const now = new Date();
  const allUpcoming = resolvedEvents.filter(e => e.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime());
  const categories = ["All", ...Array.from(new Set(resolvedEvents.map(e => e.category).filter(Boolean) as string[]))];
  const resolvedUpcoming = activeCategory === "All" ? allUpcoming : allUpcoming.filter(e => e.category === activeCategory);
  const eventImages = [imgAi, imgPlay, imgRigor];

  // AdCloudIQ tracking pixel
  useEffect(() => {
    // Load the SDK script
    const script = document.createElement("script");
    script.src = "https://p.jmlp.app/sdk.js";
    script.defer = true;
    document.head.appendChild(script);

    // Initialize tracking
    window.__adcloudiq__ = window.__adcloudiq__ || [];
    window.__adcloudiq__.push(function () {
      (window.__adcloudiq__ as any).track({
        advertiserId: "91a68c22-c504-4e16-8588-1f817ed6f937",
        pixelId: "75f52577-94f8-41b9-ac4b-73b928239163"
      });
    });

    return () => {
      const existingScript = document.querySelector('script[src="https://p.jmlp.app/sdk.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Events"
        description="Join ACES PDSI for professional development workshops, AI certification courses, and community learning opportunities designed for educators."
        url="/events"
        keywords="professional development events, educator workshops, AI training sessions, teacher certification courses, Connecticut PD"
        jsonLd={{
          "@type": "CollectionPage",
          "name": "ACES PDSI Events",
          "url": "https://acespdsi.org/events",
          "description": "Professional development workshops, AI certification courses, and learning opportunities for educators."
        }}
      />
      <Header />

      {/* Hero — split panel */}
      <section className="pt-24 bg-background">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col justify-center"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-accent mb-5">WORKSHOPS & EVENTS</span>
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
                Learning that feels practical from the first session.
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed mb-7 max-w-lg">
                Upcoming ACES PDSI workshops and events help educators connect new ideas to real classroom practice. Find learning opportunities that are clear, useful, and built for school teams.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#events" className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm transition-all shadow-lg">
                  View Events
                </a>
                <Link to="/contact" className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-primary-foreground font-semibold text-sm transition-all">
                  Request Support
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary rounded-2xl p-4 md:p-6 flex items-center justify-center min-h-[300px]"
            >
              <img src={heroEvents} alt="ACES PDSI team gathered together" className="w-full h-full object-cover rounded-xl max-h-[460px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Browse by theme — 11 categories */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Browse by theme</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mt-3 mb-3">Workshop & event categories</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Explore eleven focus areas across PDSI and the Center for AI Services. Each category groups upcoming and recurring learning opportunities for educators and leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: "Classroom Foundations" },
              { icon: HeartHandshake, title: "Restorative Practices" },
              { icon: Compass, title: "Leadership" },
              { icon: Layers, title: "MTSS" },
              { icon: FileText, title: "Literacy" },
              { icon: Calculator, title: "Math" },
              { icon: Sparkles, title: "AI Foundations & Literacy" },
              { icon: GraduationCap, title: "Teaching & Learning with AI" },
              { icon: Zap, title: "AI Productivity & Efficiency" },
              { icon: ShieldCheck, title: "AI Leadership Strategy & Impact" },
              { icon: UserCog, title: "AI Role-Specific" },
            ].map((cat, i) => (
              <motion.a
                key={cat.title}
                href="#events"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:border-aces-green/40 transition-all flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                  <cat.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-aces-navy text-sm leading-snug">{cat.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro + side card with filter pills */}
      <section className="py-12 md:py-16 bg-background" id="events">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-3">
                Find your next learning opportunity
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Use this page to scan upcoming workshops, trainings, and professional learning events. Filter by focus area to find what fits your team.
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      activeCategory === cat
                        ? "bg-aces-green text-white border-aces-green"
                        : "bg-white text-aces-navy border-border hover:border-aces-green"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">Upcoming at a glance</h3>
              <ClipboardCheck className="w-8 h-8 text-aces-green" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured event listings + Calendar sidebar */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-2">
              Featured event listings
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Event list 2/3 */}
            <div className="lg:col-span-2 space-y-5">
              {resolvedUpcoming.length === 0 && (
                <div className="bg-white rounded-2xl border border-border p-8 text-center text-muted-foreground">
                  No events match this filter yet — check back soon.
                </div>
              )}
              {resolvedUpcoming.map((event, index) => {
                const dateInfo = formatDate(event.date);
                const img = eventImages[index % eventImages.length];
                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-border hover:border-aces-green/50 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[90px_140px_1fr_auto] gap-4 p-4 md:p-5 items-center">
                      {/* Date chip */}
                      <div className="bg-secondary rounded-xl p-3 flex flex-col items-center justify-center text-center min-h-[80px]">
                        <span className="text-xs font-bold tracking-wider text-aces-navy/70">{dateInfo.month}</span>
                        <span className="text-2xl md:text-3xl font-bold text-aces-navy leading-none mt-1">{dateInfo.day}</span>
                      </div>
                      {/* Image */}
                      <div className="hidden md:block">
                        <img src={img} alt="" className="w-full h-[100px] object-cover rounded-lg" />
                      </div>
                      {/* Details */}
                      <div className="col-span-2 md:col-span-1 space-y-1.5">
                        {event.category && (
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-aces-green">
                            {event.category}
                          </span>
                        )}
                        <h3 className="font-heading text-lg md:text-xl font-bold text-aces-navy group-hover:text-aces-blue transition-colors leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{formatTime(event.date)} – {event.endTime}</span>
                          <span className="flex items-center gap-1.5">
                            {event.type === "virtual" ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                            {event.location}
                          </span>
                        </div>
                      </div>
                      {/* CTA */}
                      <div className="col-span-2 md:col-span-1 flex md:justify-end">
                        <Link
                          to={`/events/${event.slug}`}
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-aces-green hover:bg-aces-green/90 text-white font-semibold text-sm transition-all"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Calendar sidebar 1/3 */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">Calendar view</h3>
                <MiniCalendar events={resolvedUpcoming} currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
              </div>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <ClipboardCheck className="w-8 h-8 text-aces-green mb-3" />
                <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">Registration pattern</h3>
                <p className="text-sm text-muted-foreground">
                  Use one clear action per card. Keep buttons green and large enough for touch screens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to learn */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-aces-navy mb-3">
              Ways to learn with ACES PDSI
            </h2>
            <p className="text-base text-muted-foreground">
              We support one-time workshops, multi-session series, coaching labs, and regional convenings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CalendarDays, title: "Workshops", desc: "Focused sessions that turn strong ideas into classroom-ready moves." },
              { icon: Clock, title: "Learning Series", desc: "Multi-session structures for deeper practice and implementation." },
              { icon: Users, title: "Coaching Labs", desc: "Guided planning, modeling, reflection, and practical follow-through." },
              { icon: Building2, title: "District Support", desc: "Custom professional learning designed around local goals." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all">
                <item.icon className="w-8 h-8 text-aces-green mb-4" />
                <h3 className="font-heading font-bold text-aces-navy text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                <div className="w-10 h-0.5 bg-aces-green rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA card */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl border border-border p-5 md:p-6 shadow-sm grid md:grid-cols-[260px_1fr] gap-6 items-center">
            <img src={ctaImg} alt="ACES PDSI learning event" className="w-full h-48 md:h-full object-cover rounded-xl" />
            <div className="p-2 md:p-4">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-aces-navy mb-3 leading-snug">
                Need a learning plan for your school or district?
              </h3>
              <p className="text-base text-muted-foreground mb-5 max-w-xl">
                ACES PDSI can help teams plan customized professional learning, connect event participation to school goals, and build support that lasts.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-aces-green hover:bg-aces-green/90 text-white font-semibold text-sm transition-all">
                  Contact PDSI
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-secondary border border-aces-navy text-aces-navy font-semibold text-sm transition-all">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
