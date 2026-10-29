import { ArrowDown, ArrowUpRight, CalendarDays, Check, Monitor, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { RedesignLayout } from "../RedesignLayout";
import { digitalToolsDateSummary, digitalToolsDescription, trackDigitalToolsRegistration } from "../digital-tools-sessions";
import { useDigitalToolsSessions } from "../use-digital-tools-sessions";

const tools = [
  { name: "ACES Curriculum Studio", category: "Curriculum & planning", image: "/redesign-assets/curriculum-creator.png", alt: "ACES Curriculum Studio course setup screen", description: "Take a unit from blank page to student-ready. Every unit follows the same backbone: Understanding by Design, with Universal Design for Learning built in, aligned to Connecticut’s curriculum design principles. A three-framework audit shows what’s ready and what’s missing, and leaders review and approve curriculum in one place before it’s published. Units export to Word, ready for the classroom." },
  { name: "ACES Early Learning Studio", category: "Early childhood", image: "/redesign-assets/ec-studio-materials.jpg", alt: "Early childhood learning materials including blocks, books, and a tablet", description: "For birth-to-five programs. Turn what children love into play-based topics of inquiry, with ready-to-use provocations, dramatic play, and sensory experiences. Quick Capture saves observations in the moment, connects them to CT ELDS, and builds each child’s evidence for CT DOTS. Family updates go home in English or Spanish." },
  { name: "ACES Test Prep", category: "Educator preparation", image: "/redesign-assets/test-prep.png", alt: "ACES test preparation practice question and readiness dashboard", description: "Help the people already in your building earn their certification. Paraeducators, teachers on a DSAP, and educators adding a cross-endorsement get a diagnostic, a personal study plan built around their test date, and lessons in English and Spanish for their Praxis exam." },
  { name: "ACES K–12 AI Literacy Curriculum", category: "AI literacy & learning", image: "/redesign-assets/k12-curriculum.png", alt: "ACES AI literacy prompting progression across grade levels", description: "Classroom-ready lessons that teach students to question AI, not just use it. Four phases (Navigator, Co-Pilot, Editor, Director) grow with students from kindergarten through grade 12, built on UbD and UDL and aligned to Connecticut’s design principles." },
];

const toolIds = ["curriculum-studio", "early-learning-studio", "praxis-prep", "ai-literacy"];

export default function RDigitalToolsWebinar() {
  const sessions = useDigitalToolsSessions();
  const registrationOpen = sessions.length > 0;
  const sessionCta = sessions.length === 1 ? "Choose the remaining session" : "Choose your session";
  return (
    <>
      <SEO title="Built for Connecticut Educators: A Live Look at ACES Digital Tools" description={digitalToolsDescription} url="/digital-tools-webinar" />
      <RedesignLayout>
        <div className="dt-webinar">
          <section className="dt-hero" aria-labelledby="dt-title">
            <img className="dt-hero-photo" src="/redesign-assets/ai-innovation-hero-crop.png" alt="" />
            <div className="wrap dt-hero-inner">
              <div className="dt-eyebrow"><Video size={18} aria-hidden="true" /> Free live webinar · {digitalToolsDateSummary(sessions)}</div>
              <h1 id="dt-title">Built for Connecticut Educators:<br /><b>A Live Look at ACES Digital Tools</b></h1>
              <p className="dt-hero-lead">Curriculum Studio · Early Learning Studio<br />ACES Test Prep · K–12 AI Literacy Curriculum</p>
              <p className="dt-hero-copy">{digitalToolsDescription}</p>
              {registrationOpen && <Button asChild size="lg" className="dt-primary"><a href="#choose-session">{sessionCta} <ArrowDown aria-hidden="true" /></a></Button>}
              <div className="dt-hero-notes"><span><Check size={16} aria-hidden="true" /> Free to attend</span><span><Monitor size={16} aria-hidden="true" /> Live on Zoom</span></div>
            </div>
          </section>

          <section id="choose-session" className="dt-sessions" aria-labelledby="dt-sessions-title">
            <div className="wrap">
              <div className="dt-section-heading"><div><span className="dt-eyebrow">{registrationOpen ? "Your day. Your choice." : "November 2026 webinars"}</span><h2 id="dt-sessions-title">{registrationOpen ? <>Save your <b>seat.</b></> : <>Registration <b>closed.</b></>}</h2></div><p>{registrationOpen ? <>Every session covers the same content,<br />so pick the time that fits your day.</> : "All four sessions have started. Registration is now closed."}</p></div>
              {!registrationOpen && <p role="status">Contact our team about ACES digital tools: <a href="/contact">Talk With Our Team</a>.</p>}
              <div className="dt-session-grid">
                {sessions.map((session) => (
                  <article className="dt-session" key={session.id}>
                    <CalendarDays size={22} aria-hidden="true" />
                    <p className="dt-weekday">{session.label.split(",")[0]}</p>
                    <h3><time dateTime={session.date}>{session.label.split(", ")[1]}</time></h3>
                    <p className="dt-time"><time dateTime={session.startsAt}>{session.time}</time><span>Eastern Time · 2026</span></p>
                    <Button asChild className="dt-register"><a href={session.url} target="_blank" rel="noopener noreferrer" onClick={(event) => {
                      if (Date.now() >= Date.parse(session.startsAt)) {
                        event.preventDefault();
                        return;
                      }
                      trackDigitalToolsRegistration(session);
                    }} aria-label={`Register for ${session.label}, 2026 at ${session.time} Eastern Time`}>Register free <ArrowUpRight aria-hidden="true" /></a></Button>
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
                  <article id={toolIds[i]} className="dt-tool scroll-mt-32" key={tool.name}>
                    <div className="dt-tool-image"><img src={tool.image} alt={tool.alt} loading="lazy" /></div>
                    <div className="dt-tool-copy"><span className="dt-tool-number">0{i + 1}</span><div><p className="dt-eyebrow">{tool.category}</p><h3>{tool.name}</h3><p>{tool.description}</p></div></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="dt-audience" aria-labelledby="dt-audience-title">
            <div className="wrap"><span className="dt-eyebrow">Who should attend</span><h2 id="dt-audience-title">For the leaders supporting <b>educators.</b></h2>
              <ul>{["Superintendents and assistant superintendents", "Curriculum and instruction leaders", "Principals", "Early childhood and preschool directors", "Special education and pupil services leaders", "HR and talent leaders", "Teacher leaders"].map((audience) => <li key={audience}><Check size={18} aria-hidden="true" />{audience}</li>)}</ul>
            </div>
          </section>

          <section className="dt-close" aria-labelledby="dt-close-title">
            <div className="wrap"><span className="dt-eyebrow">ACES Center for Artificial Intelligence</span><h2 id="dt-close-title">See what fits <b>your practice.</b></h2><p>{registrationOpen ? "Join Connecticut educators for a live look at the ACES digital tools." : "Registration for the November 2026 webinars is closed."}</p>{registrationOpen && <Button asChild size="lg" className="dt-primary"><a href="#choose-session">{sessionCta} <ArrowUpRight aria-hidden="true" /></a></Button>}</div>
          </section>
        </div>
      </RedesignLayout>
    </>
  );
}