export const digitalToolsSessions = [
  { id: "nov4-morning", date: "2026-11-04", label: "Wednesday, November 4", time: "9:30 AM", startsAt: "2026-11-04T09:30:00-05:00", url: "https://aces-org.zoom.us/webinar/register/WN_06bzCyUHQfqwxUcMDvmdog" },
  { id: "nov4-afternoon", date: "2026-11-04", label: "Wednesday, November 4", time: "1:30 PM", startsAt: "2026-11-04T13:30:00-05:00", url: "https://aces-org.zoom.us/webinar/register/WN_LzGf3tHMRBmkw5pg4OuEFg" },
  { id: "nov13-morning", date: "2026-11-13", label: "Friday, November 13", time: "9:30 AM", startsAt: "2026-11-13T09:30:00-05:00", url: "https://aces-org.zoom.us/webinar/register/WN_z7aHPCwZQuuy_4D1ZRYWmA" },
  { id: "nov13-afternoon", date: "2026-11-13", label: "Friday, November 13", time: "1:30 PM", startsAt: "2026-11-13T13:30:00-05:00", url: "https://aces-org.zoom.us/webinar/register/WN_zBYtdb5OTFmVzkEJffMolg" },
] as const;

export type DigitalToolsSession = (typeof digitalToolsSessions)[number];
export const digitalToolsTimeZone = "America/New_York";

export function remainingDigitalToolsSessions(now = Date.now()) {
  return digitalToolsSessions.filter((session) => now < Date.parse(session.startsAt));
}

export function digitalToolsDateSummary(sessions: readonly DigitalToolsSession[]) {
  const days = [...new Set(sessions.map((session) => session.date))];
  if (!days.length) return "Registration closed";
  return `November ${days.map((day) => Number(day.slice(-2))).join(" & ")}, 2026`;
}

// Reuse the installed tag and its consent state. This measures clicks only.
export function trackDigitalToolsRegistration(session: DigitalToolsSession) {
  if (Date.now() >= Date.parse(session.startsAt)) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "webinar_registration_click", {
      session_id: session.id,
      session_start: session.startsAt,
    });
  }
}

export const digitalToolsDescription = "ACES built a set of tools for the work only educators do, and we want to show you how they work. Join us for a free live webinar on Zoom. You’ll see each tool in action, hear how Connecticut schools are using them, and get your questions answered.";