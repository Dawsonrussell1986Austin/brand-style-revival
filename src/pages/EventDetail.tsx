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
    registrationUrl: "#",
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
    registrationUrl: "#",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Join us for the ACES AI Certification for Leaders & Educators, a three-day, in-person event, designed to equip educational leaders with the knowledge and strategies to effectively integrate AI in schools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This is Day 3 of the certification program, focusing on implementation strategies, policy development, and creating sustainable AI integration plans for your district.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Day 3 Focus Areas</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Developing district-wide AI implementation strategies</li>
          <li>Creating AI usage policies and guidelines</li>
          <li>Building sustainable professional development models</li>
          <li>Addressing ethical considerations and data privacy</li>
          <li>Action planning for your school or district</li>
        </ul>
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
    registrationUrl: "#",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Incidents of conflict, wrongdoing, and harm occur everywhere, every day in schools, workplaces, college campuses, neighborhoods, and families. The restorative conference provides a way to engage with those who cause and experience harm.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This is Day 2 of the Restorative Conferencing training, where participants will deepen their understanding and practice of facilitation techniques.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li>Advanced conference facilitation techniques</li>
          <li>Managing complex emotions and dynamics</li>
          <li>Creating space for meaningful dialogue</li>
          <li>Building agreements and accountability plans</li>
          <li>Follow-up and sustainability strategies</li>
        </ul>
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

            {event.registrationUrl && (
              <Button asChild size="lg" className="gradient-aces text-white btn-glow">
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
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

            {event.registrationUrl && (
              <div className="mt-12 p-8 bg-secondary rounded-2xl text-center">
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  Ready to Join Us?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Secure your spot for this professional development opportunity.
                </p>
                <Button asChild size="lg" className="gradient-aces text-white btn-glow">
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
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
