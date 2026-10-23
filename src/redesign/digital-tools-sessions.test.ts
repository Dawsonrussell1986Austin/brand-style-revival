import { describe, expect, it } from "vitest";
import { digitalToolsSessions } from "./digital-tools-sessions";

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