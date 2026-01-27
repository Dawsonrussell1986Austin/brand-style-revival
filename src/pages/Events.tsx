import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ChevronDown, MapPin, Calendar, Monitor, ArrowRight, CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "month">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Start at Jan 2026 where events are

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
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 section-brand" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aces-blue/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <CalendarDays className="w-4 h-4 text-aces-green" />
              <span className="text-base text-white/90 font-semibold">Professional Development Events</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aces-green to-white">
                Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join us for professional development workshops, certification courses, and community learning opportunities designed for educators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b border-border relative -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: CalendarDays, value: "50+", label: "Events Yearly" },
              { icon: Users, value: "2,000+", label: "Attendees" },
              { icon: Clock, value: "100+", label: "PD Hours" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center py-4"
              >
                <stat.icon className="w-6 h-6 text-aces-blue mx-auto mb-2" />
                <div className="text-2xl font-bold font-heading text-aces-navy">{stat.value}</div>
                <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-border p-6 mb-10"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base rounded-xl border-border focus:border-aces-blue"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button className="gradient-aces text-white font-semibold px-8 h-12 rounded-xl btn-glow">
                  FIND EVENTS
                </Button>
                <div className="hidden md:flex items-center bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-white text-aces-navy shadow-sm"
                        : "text-muted-foreground hover:text-aces-navy"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("month")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === "month"
                        ? "bg-white text-aces-navy shadow-sm"
                        : "text-muted-foreground hover:text-aces-navy"
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls - Only show for list view */}
          {viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-aces-navy">
                Upcoming Events
              </h2>
            </motion.div>
          )}

          {/* Month Calendar View */}
          {viewMode === "month" && (
            <MonthCalendarView 
              events={allEvents} 
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />
          )}

          {/* Upcoming Events - List View */}
          {viewMode === "list" && (
          <div className="grid gap-6 mb-16">
            {upcomingEvents.map((event, index) => {
              const dateInfo = formatDate(event.date);
              return (
                <Link to={`/events/${event.slug}`} key={event.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-border hover:border-aces-green/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr_280px] gap-0">
                      {/* Date Badge */}
                      <div className="bg-gradient-to-br from-aces-green to-aces-blue p-4 md:p-6 flex md:flex-col items-center md:justify-center text-center gap-3 md:gap-0">
                        <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
                          {dateInfo.month}
                        </span>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none md:my-1">
                          {dateInfo.day}
                        </span>
                        <span className="text-sm text-white/70">{dateInfo.year}</span>
                      </div>

                      {/* Event Details */}
                      <div className="p-6 lg:p-8 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {event.category && (
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                          )}
                          <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.date)} - {event.endTime}
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-aces-navy group-hover:text-aces-blue transition-colors cursor-pointer">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-start gap-2 text-base font-medium">
                          {event.type === "virtual" ? (
                            <div className="flex items-center gap-2 bg-blue-50 text-aces-blue px-3 py-1.5 rounded-lg">
                              <Monitor className="h-4 w-4" />
                              <span className="font-semibold">Virtual Event</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 text-aces-green flex-shrink-0" />
                              <span>
                                <span className="font-bold text-aces-navy">{event.location}</span>
                                {event.address && <span className="font-medium text-muted-foreground"> • {event.address}</span>}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-base font-medium leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                        
                        <motion.div 
                          className="flex items-center text-aces-green font-semibold text-base pt-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          View Event Details <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Event Image */}
                      <div className="hidden lg:block p-4">
                        <div className="h-full aspect-[4/3] bg-gradient-to-br from-secondary via-aces-green/10 to-aces-blue/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 dot-pattern opacity-30" />
                          <Calendar className="h-16 w-16 text-aces-green/30" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
          )}

          {/* Past Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-aces-navy">
                Latest Past Events
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid gap-6">
              {pastEvents.map((event, index) => {
                const dateInfo = formatDate(event.date);
                return (
                  <Link to={`/events/${event.slug}`}>
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl border border-border hover:border-aces-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr_280px] gap-0">
                      {/* Date Badge */}
                      <div className="bg-gradient-to-br from-aces-navy to-aces-blue p-4 md:p-6 flex md:flex-col items-center md:justify-center text-center gap-3 md:gap-0">
                        <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
                          {dateInfo.month}
                        </span>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none md:my-1">
                          {dateInfo.day}
                        </span>
                        <span className="text-sm text-white/70">{dateInfo.year}</span>
                      </div>

                      {/* Event Details */}
                      <div className="p-6 lg:p-8 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {event.category && (
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                          )}
                          <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.date)} - {event.endTime}
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-aces-navy group-hover:text-aces-blue transition-colors cursor-pointer">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-start gap-2 text-base font-medium">
                          {event.type === "virtual" ? (
                            <div className="flex items-center gap-2 bg-blue-50 text-aces-blue px-3 py-1.5 rounded-lg">
                              <Monitor className="h-4 w-4" />
                              <span className="font-semibold">Virtual Event</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 text-aces-green flex-shrink-0" />
                              <span>
                                <span className="font-bold text-aces-navy">{event.location}</span>
                                {event.address && <span className="font-medium text-muted-foreground"> • {event.address}</span>}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-base font-medium leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                        
                        <motion.div 
                          className="flex items-center text-aces-blue font-semibold text-base pt-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          View Event Details <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Event Image */}
                      <div className="hidden lg:block p-4">
                        <div className="h-full aspect-[4/3] bg-gradient-to-br from-secondary via-aces-blue/5 to-aces-green/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 dot-pattern opacity-30" />
                          <Calendar className="h-16 w-16 text-aces-blue/20" />
                        </div>
                      </div>
                    </div>
                    </motion.article>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-brand relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-aces-blue/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Want to Host an Event with ACES?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Partner with us to bring professional development and learning opportunities to your district.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-aces-navy hover:bg-white/90 shadow-xl px-8">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Learn About Partnerships
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
