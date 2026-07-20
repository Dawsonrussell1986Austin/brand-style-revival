import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  children: React.ReactNode;
  /** Optional per-page init function (e.g. carousel/filter scripts) */
  pageInit?: () => void;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/workshops-events", label: "Workshops & Events" },
];

const HTML_TO_ROUTE: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "events.html": "/workshops-events",
  "services.html": "/pdsi-services",
  "regional-forums.html": "/pdsi-services/regional-forums",
  "ai-center.html": "/center-for-ai-services",
  "ai-literacy.html": "/center-for-ai-services/ai-ready-schools",
  "ai-innovation.html": "/center-for-ai-services/innovative-tools",
  "ai-research.html": "/center-for-ai-services/research-ethics",
  "curriculum-creator.html": "/curriculum-creator",
  "resources.html": "/resources",
  "contact.html": "/contact",
  "blog-ai.html": "/blog/saving-time-with-ai",
  "blog-play.html": "/blog/everyone-loves-to-play",
  "blog-rooted.html": "/blog/rooted-in-relationships-and-rigor",
};

export function RedesignLayout({ children, pageInit }: Props) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  // Intercept clicks on internal links within the rendered HTML body
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank" || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("#")) return; // in-page anchor
      e.preventDefault();
      // Strip any query/hash, resolve legacy .html hrefs to real routes
      const [pathPart, rest] = [href.split(/[?#]/)[0], href.slice(href.split(/[?#]/)[0].length)];
      const key = pathPart.replace(/^\.?\//, "");
      const mapped = HTML_TO_ROUTE[key];
      if (mapped) {
        navigate(mapped + rest);
        return;
      }
      // If it still ends in .html with no mapping, drop the extension
      if (pathPart.endsWith(".html")) {
        const slug = "/" + key.replace(/\.html$/, "");
        navigate(slug + rest);
        return;
      }
      navigate(href);
    }
    root.addEventListener("click", onClick);

    // Intercept mailing-list subscribe forms embedded in raw HTML pages
    async function onSubmit(e: SubmitEvent) {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.getAttribute("name") !== "mailing-list") return;
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(form);
      const email = String(fd.get("email") || "").trim();
      const err = form.querySelector(".mlist-err") as HTMLElement | null;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
        if (err) { err.textContent = "Please enter a valid email."; err.hidden = false; }
        return;
      }
      try {
        const { error } = await supabase.from("contact_submissions").insert({
          name: "Mailing List Subscriber",
          email,
          message: "Mailing list subscription",
          source: "mailing-list",
        });
        if (error) throw error;
        form.innerHTML = "<p class='mlist-ok'>Thanks — you're on the list!</p>";
      } catch (ex) {
        console.error("mailing-list subscribe error", ex);
        if (err) { err.textContent = "Something went wrong — please try again."; err.hidden = false; }
      }
    }
    root.addEventListener("submit", onSubmit as unknown as EventListener, true);

    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("submit", onSubmit as unknown as EventListener, true);
    };
  }, [navigate]);

  // Run shared aces.js behaviors + per-page init after mount
  useEffect(() => {
    // (Re)run global behaviors by injecting the script — it self-initializes
    const s = document.createElement("script");
    s.src = "/redesign-assets/aces.js";
    s.async = false;
    document.body.appendChild(s);
    let cleanupPage: (() => void) | undefined;
    if (pageInit) {
      // Defer so DOM is in place
      const t = setTimeout(() => {
        try { pageInit(); } catch (err) { console.error("pageInit failed", err); }
      }, 0);
      cleanupPage = () => clearTimeout(t);
    }
    return () => {
      s.remove();
      cleanupPage?.();
      // Remove mobile nav node injected by aces.js, if any
      document.querySelectorAll(".mobnav").forEach((n) => n.remove());
      document.body.classList.remove("nav-locked", "bio-locked");
      document.documentElement.classList.remove("has-reveal");
    };
  }, [pageInit]);

  return (
    <div ref={rootRef}>
      <header>
        <div className="wrap nav">
          <a className="brand" href="https://aces.org" target="_blank" rel="noopener" aria-label="ACES home — aces.org">
            <img className="logo" src="/redesign-assets/aces-logo.jpg" alt="ACES — Area Cooperative Educational Services" />
          </a>
          <nav className="links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} to={l.href}>{l.label}</Link>
            ))}
            <div className="hasmenu">
              <Link to="/center-for-ai-services">Center for Artificial Intelligence
                <svg className="car" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="submenu">
                <Link className="subitem" to="/center-for-ai-services/ai-ready-schools">AI Literacy &amp; Learning</Link>
                <Link className="subitem" to="/center-for-ai-services/innovative-tools">Innovation &amp; Design</Link>
                <Link className="subitem" to="/center-for-ai-services/research-ethics">Research &amp; Ethical Standards</Link>
                <Link className="subitem" to="/curriculum-creator">Curriculum Creator</Link>
              </div>
            </div>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="foot">
        {/* Global mailing list (blue band, full width) */}
        <div className="foot-mlist">
          <div className="wrap foot-mlist-inner">
            <div className="foot-mlist-copy">
              <h3>Join our <b>mailing list.</b></h3>
              <p>Get upcoming workshops, AI resources, and Center for AI news delivered to your inbox.</p>
            </div>
            <form className="foot-mlist-form mlist-form" name="mailing-list" method="POST">
              <input type="email" name="email" placeholder="Your email address" aria-label="Email address" required />
              <button type="submit" className="btn btn-green">Subscribe</button>
              <p className="mlist-err" hidden>Something went wrong — please try again.</p>
            </form>
          </div>
        </div>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logochip"><img src="/redesign-assets/aces-logo.jpg" alt="ACES — Area Cooperative Educational Services" /></div>
              <h5>PDSI Mission</h5>
              <p className="desc desc-wide">ACES Professional Development and School Improvement (PDSI) seeks to deliver high-quality, responsive, equity-centered professional learning that empowers educators to innovate and foster the holistic growth of students. Through partnerships with educational leaders and communities, we aim to build joyful, data-informed, forward-thinking environments that ensure equitable outcomes and learning experiences where educators thrive so that their learners can achieve.</p>
              <div className="social">
                <a href="https://www.facebook.com/acespdsi" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h5>Explore</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/workshops-events">Workshops &amp; Events</Link></li>
                <li><Link to="/center-for-ai-services">Center for Artificial Intelligence</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5>Contact Us</h5>
              <div className="contact">
                205 Skiff Street<br />Hamden, CT 06517<br /><br />
                <b>(860) 834-6147</b><br />
                <a href="mailto:mgohagon@aces.org">mgohagon@aces.org</a>
              </div>
            </div>
          </div>
          <div className="foot-bot">
            <span>© 2026 ACES Professional Development &amp; School Improvement. All rights reserved.</span>
            <span>Area Cooperative Educational Services · Hamden, CT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}