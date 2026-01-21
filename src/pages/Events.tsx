import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ChevronDown, MapPin, Calendar, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";


interface Event {
  id: string;
  date: Date;
  endTime: string;
  title: string;
  location: string;
  address?: string;
  type: "virtual" | "in-person";
  description: string;
  image?: string;
}

const pastEvents: Event[] = [
  {
    id: "1",
    date: new Date(2025, 11, 9, 13, 0),
    endTime: "4:00 pm",
    title: "AI & Information Literacy: Navigating AI Responsibly (Virtual)",
    location: "Virtual",
    type: "virtual",
    description: "This virtual half-day session offers library media specialists a guided exploration of how AI is transforming digital literacy and research practices. Participants will learn how to incorporate AI tools into their instruction, support students in evaluating AI-generated content, and curate ethical and relevant resources in a changing information landscape. The session includes live demos, interactive discussions, and practical strategies for immediate classroom use.",
  },
  {
    id: "2",
    date: new Date(2025, 10, 14, 8, 30),
    endTime: "2:30 pm",
    title: "Leading with AI: ACES Certification Course for Leaders & Educators (Day 3)",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    description: "Join us for the ACES AI Certification for Leaders & Educators, a three-day, in-person event, designed to equip educational leaders with the knowledge and strategies to effectively integrate AI in schools. Created and facilitated by Bob Hutchins, Founder of Human Voice Media, this certification course offers five expert-led modules covering AI foundations, data privacy, leadership strategies, and more.",
  },
  {
    id: "3",
    date: new Date(2025, 10, 14, 8, 30),
    endTime: "2:30 pm",
    title: "Restorative Conferencing (Cohort 1, Day 2)",
    location: "ACES Staff Development Administrative Offices (SDA)",
    address: "205 Skiff Street, Hamden",
    type: "in-person",
    description: "Incidents of conflict, wrongdoing, and harm occur everywhere, every day in schools, workplaces, college campuses, neighborhoods, and families. The restorative conference provides a way to engage with those who cause and experience harm, along with the related community. This two-day workshop covers the fundamentals of facilitating a formal conference in response to an incident of harm or conflict.",
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
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "month">("list");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-aces-navy to-aces-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-roboto-slab text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Events
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join us for professional development workshops, certification courses, and community learning opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-border p-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-aces-blue hover:bg-aces-blue/90 text-white font-semibold px-6 h-12">
                  FIND EVENTS
                </Button>
                <div className="flex items-center border-b-2 border-transparent">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 font-medium transition-colors ${
                      viewMode === "list"
                        ? "text-aces-navy border-b-2 border-aces-navy -mb-[2px]"
                        : "text-muted-foreground hover:text-aces-navy"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("month")}
                    className={`px-4 py-2 font-medium transition-colors ${
                      viewMode === "month"
                        ? "text-aces-navy border-b-2 border-aces-navy -mb-[2px]"
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
            className="flex items-center gap-4 mb-8"
          >
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <ChevronLeft className="h-5 w-5 text-aces-navy" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <ChevronRight className="h-5 w-5 text-aces-navy" />
            </button>
            <Button variant="outline" className="text-sm font-medium">
              Today
            </Button>
            <button className="flex items-center gap-2 text-2xl md:text-3xl font-roboto-slab font-semibold text-aces-navy hover:text-aces-blue transition-colors">
              Upcoming
              <ChevronDown className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Upcoming Events - Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-muted/50 rounded-lg p-8 text-center mb-12"
          >
            <p className="text-muted-foreground text-lg">There are no upcoming events.</p>
          </motion.div>

          {/* Past Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-roboto-slab text-2xl md:text-3xl font-bold text-aces-navy mb-8">
              Latest Past Events
            </h2>

            <div className="space-y-8">
              {pastEvents.map((event, index) => {
                const dateInfo = formatDate(event.date);
                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-[100px_1fr_300px] gap-6 pb-8 border-b border-border last:border-0"
                  >
                    {/* Date Badge */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-2 lg:gap-0">
                      <span className="text-sm font-medium text-muted-foreground uppercase">
                        {dateInfo.month}
                      </span>
                      <span className="text-4xl lg:text-5xl font-bold text-aces-navy leading-none">
                        {dateInfo.day}
                      </span>
                      <span className="text-sm text-muted-foreground">{dateInfo.year}</span>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <p className="text-muted-foreground text-sm">
                        {formatFullDate(event.date)} @ {formatTime(event.date)} - {event.endTime}
                      </p>
                      <h3 className="font-roboto-slab text-xl md:text-2xl font-bold text-aces-navy hover:text-aces-blue transition-colors cursor-pointer">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        {event.type === "virtual" ? (
                          <>
                            <Monitor className="h-4 w-4 text-aces-blue" />
                            <span className="font-semibold text-aces-navy">Virtual</span>
                            <span className="text-muted-foreground">{event.location}</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-aces-blue" />
                            <span className="font-semibold text-aces-navy">{event.location}</span>
                            {event.address && (
                              <span className="text-muted-foreground">{event.address}</span>
                            )}
                          </>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed line-clamp-4">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Image Placeholder */}
                    <div className="hidden lg:block">
                      <div className="aspect-[4/3] bg-gradient-to-br from-aces-blue/20 to-aces-green/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-aces-blue/40" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-aces-blue to-aces-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-roboto-slab text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Host an Event with ACES?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Partner with us to bring professional development and learning opportunities to your district.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-aces-blue hover:bg-white/90 font-semibold px-8"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
