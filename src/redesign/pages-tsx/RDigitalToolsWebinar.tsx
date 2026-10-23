import { ArrowDown, ArrowUpRight, CalendarDays, Check, Monitor, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { RedesignLayout } from "../RedesignLayout";
import { digitalToolsDescription, digitalToolsSessions } from "../digital-tools-sessions";

const tools = [
  { name: "Curriculum Studio", category: "Curriculum & planning", image: "/redesign-assets/curriculum-creator.png", alt: "ACES Curriculum Studio course setup screen", description: "See standards-aligned curriculum planning in action, from learning goals to classroom materials." },
  { name: "Early Learning Studio", category: "Early childhood", image: "/redesign-assets/ec-hero.jpg", alt: "Early childhood educators learning together at ACES", description: "Explore tools designed around early childhood practice, with educator expertise at the center." },
  { name: "ACES Test Prep", category: "Educator preparation", image: "/redesign-assets/test-prep.png", alt: "ACES test preparation practice question and readiness dashboard", description: "Take a look at personalized practice and preparation for educators working toward certification." },
  { name: "K–12 AI Literacy Curriculum", category: "AI literacy & learning", image: "/redesign-assets/k12-curriculum.png", alt: "ACES AI literacy prompting progression across grade levels", description: "Discover a progression of AI learning that keeps human thinking, judgment, and responsible use in focus." },
];

export default function RDigitalToolsWebinar() {
  return (
    <>
      <SEO title="ACES Digital Tools in Action — Free Live Webinar" description={digitalToolsDescription} url="/digital-tools-webinar" />
      <RedesignLayout>
        <div className="dt-webinar">
          <section className="dt-hero" aria-labelledby="dt-title">
            <img className="dt-hero-photo" src="/redesign-assets/ai-innovation-hero-crop.png" alt="" />
            <div className="wrap dt-hero-inner">
              <div className="dt-eyebrow"><Video size={18} aria-hidden="true" /> Free live webinar · November 2026</div>
              <h1 id="dt-title">ACES Digital Tools<br /><b>in Action.</b></h1>
              <p className="dt-hero-lead">Built for Connecticut educators.<br />By the people who already serve your schools.</p>
              <p className="dt-hero-copy">See Curriculum Studio, Early Learning Studio, ACES Test Prep, and the K–12 AI Literacy Curriculum at work—and get your questions answered.</p>
              <Button asChild size="lg" className="dt-primary"><a href="#choose-session">Choose your session <ArrowDown aria-hidden="true" /></a></Button>
              <div className="dt-hero-notes"><span><Check size={16} aria-hidden="true" /> Free to attend</span><span><Monitor size={16} aria-hidden="true" /> Live on Zoom</span></div>
            </div>
          </section>

          <section id="choose-session" className="dt-sessions" aria-labelledby="dt-sessions-title">
            <div className="wrap">
              <div className="dt-section-heading"><div><span className="dt-eyebrow">Your day. Your choice.</span><h2 id="dt-sessions-title">Save your <b>seat.</b></h2></div><p>Every session covers the same content,<br />so pick the time that fits your day.</p></div>
              <div className="dt-session-grid">
                {digitalToolsSessions.map((session) => (
                  <article className="dt-session" key={session.id}>
                    <CalendarDays size={22} aria-hidden="true" />
                    <p className="dt-weekday">{session.label.split(",")[0]}</p>
                    <h3><time dateTime={session.date}>{session.label.split(", ")[1]}</time></h3>
                    <p className="dt-time"><time dateTime={session.startsAt}>{session.time}</time><span>Eastern Time · 2026</span></p>
                    <Button asChild className="dt-register"><a href={session.url} target="_blank" rel="noopener noreferrer" aria-label={`Register for ${session.label}, 2026 at ${session.time} Eastern Time`}>Register free <ArrowUpRight aria-hidden="true" /></a></Button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="dt-tools" aria-labelledby="dt-tools-title">
            <div className="wrap">
              <span className="dt-eyebrow">Meet the tools</span>
              <h2 id="dt-tools-title">Four tools.<br /><b>One live walkthrough.</b></h2>
              <p className="dt-tools-intro">In this free live webinar you’ll see each tool at work and get your questions answered.</p>
              <div className="dt-tool-grid">
                {tools.map((tool, i) => (
                  <article className="dt-tool" key={tool.name}>
                    <div className="dt-tool-image"><img src={tool.image} alt={tool.alt} loading="lazy" /></div>
                    <div className="dt-tool-copy"><span className="dt-tool-number">0{i + 1}</span><div><p className="dt-eyebrow">{tool.category}</p><h3>{tool.name}</h3><p>{tool.description}</p></div></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="dt-close" aria-labelledby="dt-close-title">
            <div className="wrap"><span className="dt-eyebrow">ACES Center for Artificial Intelligence</span><h2 id="dt-close-title">See what fits <b>your practice.</b></h2><p>Join Connecticut educators for a live look at the ACES digital tools.</p><Button asChild size="lg" className="dt-primary"><a href="#choose-session">Choose your session <ArrowUpRight aria-hidden="true" /></a></Button></div>
          </section>
        </div>
      </RedesignLayout>
    </>
  );
}