import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import tailHtml from "../pages/events-tail.html?raw";
import { RedesignLayout } from "../RedesignLayout";
import { SEO } from "@/components/SEO";
import { useEvents, type DBEvent } from "@/hooks/useEvents";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(iso: string) {
  const d = new Date(iso);
  return { d: d.getUTCDate(), m: MONTHS[d.getUTCMonth()], y: d.getUTCFullYear() };
}

export default function REvents() {
  const { data: events = [], isLoading } = useEvents();
  const [filter, setFilter] = useState("all");

  const upcoming = useMemo(() => {
    const cutoff = Date.now() - 86400000;
    return (events as DBEvent[])
      .filter((e) => new Date(e.date).getTime() >= cutoff)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [events]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    upcoming.forEach((e) => {
      const key = (e as any).category_key || e.category;
      if (key && e.category) map.set(key, e.category);
    });
    return Array.from(map, ([value, label]) => ({ value, label })).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [upcoming]);

  const shown = useMemo(
    () =>
      filter === "all"
        ? upcoming
        : upcoming.filter((e) => ((e as any).category_key || e.category) === filter),
    [upcoming, filter]
  );

  return (
    <>
      <SEO
        title="Workshops & Events"
        description="Browse the full ACES PDSI professional learning calendar — workshops on AI, literacy, mathematics, MTSS, restorative practices, and leadership."
        url="/workshops-events"
      />
      <RedesignLayout>
        <section className="pagehero photo events">
          <div className="bg" />
          <div className="inner">
            <div className="crumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span>Workshops &amp; Events</span>
            </div>
            <h1>
              Workshops &amp; <b>Events</b>
            </h1>
            <p>Professional learning grounded in practice and focused on impact.</p>
          </div>
        </section>

        <section className="features">
          <div className="wrap">
            <div className="ev-filterbar">
              <div className="fbar-head">
                <h2 id="browse-events">Browse the calendar</h2>
                <span className="note">
                  {isLoading ? "Loading sessions…" : `${shown.length} session${shown.length === 1 ? "" : "s"} shown`}
                </span>
              </div>
              <div className="ev-filterselect">
                <label htmlFor="ev-category">Filter by category</label>
                <select
                  id="ev-category"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ev-layout">
              <div className="ev-main">
                <div className="evlist">
                  {shown.map((e) => {
                    const p = parts(e.date);
                    const ev = e as any;
                    return (
                      <div className="evrow" key={e.id}>
                        <div className="when">
                          <div className="d">{p.d}</div>
                          <div className="m">{p.m}</div>
                          <div className="yr">{p.y}</div>
                        </div>
                        <div className="info">
                          <h3>{e.title}</h3>
                          {e.description ? <p>{e.description}</p> : null}
                          <div className="tags">
                            {e.category ? <span>{e.category}</span> : null}
                            {ev.date_label ? <span className="v">{ev.date_label}</span> : null}
                            {ev.facilitator ? <span className="v">{ev.facilitator}</span> : null}
                            {e.end_time ? <span className="v">{e.end_time}</span> : null}
                          </div>
                        </div>
                        <div className="act">
                          {e.registration_url ? (
                            <a
                              className="btn btn-green"
                              href={e.registration_url}
                              target="_blank"
                              rel="noopener"
                            >
                              Register
                            </a>
                          ) : null}
                          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                            {e.location || "ProTraxx"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isLoading && shown.length === 0 && (
                  <div className="ev-empty" style={{ display: "block" }}>
                    <h3>No sessions in this category yet</h3>
                    <p>Check back soon, or request the full calendar to see everything we have coming up.</p>
                  </div>
                )}

                <div className="ww-promo">
                  <div>
                    <span className="ww-promo-kicker">Free Webinar Series</span>
                    <h3>Wired Wednesdays: Powering Human-Centered AI in Education</h3>
                    <p>
                      Free 30-minute Zoom webinars on select Wednesdays, 3:30 – 4:00 PM, beginning
                      September 9, 2026. Practical, human-centered AI for teaching, leadership, and
                      school operations — hosted by Melissa Rosenthal.
                    </p>
                  </div>
                  <Link className="btn btn-green" to="/workshops-events/wired-wednesdays">
                    View the series
                  </Link>
                </div>
              </div>

              <aside className="ev-aside">
                <div className="upcoming">
                  <div className="uphead">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
                      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
                    </svg>
                    <h3>Upcoming Events</h3>
                  </div>
                  <p className="upsub">The next sessions on the calendar.</p>
                  <div className="uplist">
                    {upcoming.slice(0, 5).map((e) => {
                      const p = parts(e.date);
                      return (
                        <a
                          className="up-item"
                          key={e.id}
                          href={e.registration_url || "#browse-events"}
                          target={e.registration_url ? "_blank" : undefined}
                          rel="noopener"
                        >
                          <div className="up-date">
                            <span className="dd">{p.d}</span>
                            <span className="mm">{p.m}</span>
                          </div>
                          <div className="up-body">
                            <h4>{e.title}</h4>
                            <span className="up-cat">{e.category}</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <a
                    className="upcta"
                    href="https://catalog.protraxx.com/Customers/CustomerSearch.aspx?CustomerId=254"
                    target="_blank"
                    rel="noopener"
                  >
                    View all on ProTraxx
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: tailHtml }} />
      </RedesignLayout>
    </>
  );
}
