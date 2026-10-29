import { afterEach, describe, expect, it, vi } from "vitest";
import { digitalToolsDateSummary, digitalToolsSessions, digitalToolsTimeZone, remainingDigitalToolsSessions, trackDigitalToolsRegistration } from "./digital-tools-sessions";

describe("digital tools webinar registration", () => {
  it.each([
    [0, "2026-11-04", "9:30 AM", "https://aces-org.zoom.us/webinar/register/WN_06bzCyUHQfqwxUcMDvmdog"],
    [1, "2026-11-04", "1:30 PM", "https://aces-org.zoom.us/webinar/register/WN_LzGf3tHMRBmkw5pg4OuEFg"],
    [2, "2026-11-13", "9:30 AM", "https://aces-org.zoom.us/webinar/register/WN_z7aHPCwZQuuy_4D1ZRYWmA"],
    [3, "2026-11-13", "1:30 PM", "https://aces-org.zoom.us/webinar/register/WN_zBYtdb5OTFmVzkEJffMolg"],
  ])("maps session %s to its supplied date, time, and registration", (index, date, time, url) => {
    expect(digitalToolsSessions[Number(index)]).toMatchObject({ date, time, url });
  });
});

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("start-time expiry", () => {
  it.each([
    [0, "2026-11-04T14:30:00Z", "09:30"],
    [1, "2026-11-04T18:30:00Z", "13:30"],
    [2, "2026-11-13T14:30:00Z", "09:30"],
    [3, "2026-11-13T18:30:00Z", "13:30"],
  ])("expires session %s exactly at its New York start", (index, utc, localTime) => {
    const session = digitalToolsSessions[Number(index)];
    const start = Date.parse(utc);
    expect(Date.parse(session.startsAt)).toBe(start);
    expect(new Intl.DateTimeFormat("en-GB", { timeZone: digitalToolsTimeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(start)).toBe(localTime);
    expect(remainingDigitalToolsSessions(start - 1)).toContain(session);
    expect(remainingDigitalToolsSessions(start)).not.toContain(session);
    expect(remainingDigitalToolsSessions(start + 1)).not.toContain(session);
  });

  it("summarizes only remaining days and closes after the final start", () => {
    expect(digitalToolsDateSummary(remainingDigitalToolsSessions(Date.parse("2026-11-04T14:29:59Z")))).toBe("November 4 & 13, 2026");
    expect(digitalToolsDateSummary(remainingDigitalToolsSessions(Date.parse("2026-11-04T18:30:00Z")))).toBe("November 13, 2026");
    expect(remainingDigitalToolsSessions(Date.parse("2026-11-13T18:30:00Z"))).toEqual([]);
  });
});

describe("click-only GA4 tracking", () => {
  it.each(digitalToolsSessions)("sends only the session identifiers for $id", (session) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-01T00:00:00Z"));
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    trackDigitalToolsRegistration(session);
    expect(gtag.mock.calls).toEqual([["event", "webinar_registration_click", { session_id: session.id, session_start: session.startsAt }]]);
  });
  it("does not track expired sessions or initialize a missing tag", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-13T18:30:00Z"));
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    trackDigitalToolsRegistration(digitalToolsSessions[3]);
    expect(gtag).not.toHaveBeenCalled();
    vi.stubGlobal("gtag", undefined);
    vi.setSystemTime(new Date("2026-11-01T00:00:00Z"));
    expect(() => trackDigitalToolsRegistration(digitalToolsSessions[0])).not.toThrow();
    expect(window.gtag).toBeUndefined();
  });
});