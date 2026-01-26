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

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "month">("list");

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
              <span className="text-sm text-white/90 font-medium">Professional Development Events</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aces-green to-white">
                Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
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
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors border border-border">
                <ChevronLeft className="h-5 w-5 text-aces-navy" />
              </button>
              <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors border border-border">
                <ChevronRight className="h-5 w-5 text-aces-navy" />
              </button>
            </div>
            <Button variant="outline" className="text-sm font-medium rounded-xl">
              Today
            </Button>
            <button className="flex items-center gap-2 text-2xl md:text-3xl font-heading font-bold text-aces-navy hover:text-aces-blue transition-colors">
              Upcoming
              <ChevronDown className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Upcoming Events - Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl border-2 border-dashed border-border p-12 text-center mb-16"
          >
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">There are no upcoming events scheduled.</p>
            <p className="text-sm text-muted-foreground">Check back soon or explore our past events below.</p>
          </motion.div>

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
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.date)} - {event.endTime}
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-aces-navy group-hover:text-aces-blue transition-colors cursor-pointer">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-start gap-2 text-sm">
                          {event.type === "virtual" ? (
                            <div className="flex items-center gap-2 bg-blue-50 text-aces-blue px-3 py-1.5 rounded-lg">
                              <Monitor className="h-4 w-4" />
                              <span className="font-medium">Virtual Event</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 text-aces-green flex-shrink-0" />
                              <span>
                                <span className="font-semibold text-aces-navy">{event.location}</span>
                                {event.address && <span className="text-muted-foreground"> • {event.address}</span>}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                        
                        <motion.div 
                          className="flex items-center text-aces-blue font-medium text-sm pt-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
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
