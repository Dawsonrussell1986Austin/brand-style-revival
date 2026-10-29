import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { useDigitalToolsSessions } from "./use-digital-tools-sessions";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it("removes each session at its start while mounted and ends with none", () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-04T14:29:59.999Z"));
  const result: { current: ReturnType<typeof useDigitalToolsSessions> } = { current: [] };
  function Probe() { result.current = useDigitalToolsSessions(); return null; }
  const root = createRoot(document.createElement("div"));
  act(() => root.render(<Probe />));
  expect(result.current.map(s => s.id)).toEqual(["nov4-morning", "nov4-afternoon", "nov13-morning", "nov13-afternoon"]);
  act(() => vi.advanceTimersByTime(1));
  expect(result.current.map(s => s.id)).toEqual(["nov4-afternoon", "nov13-morning", "nov13-afternoon"]);
  for (const [start, ids] of [
    ["2026-11-04T18:30:00Z", ["nov13-morning", "nov13-afternoon"]],
    ["2026-11-13T14:30:00Z", ["nov13-afternoon"]],
    ["2026-11-13T18:30:00Z", []],
  ] as const) {
    act(() => { vi.setSystemTime(new Date(start)); window.dispatchEvent(new Event("focus")); });
    expect(result.current.map(s => s.id)).toEqual(ids);
  }
  act(() => root.unmount());
  expect(vi.getTimerCount()).toBe(0);
});