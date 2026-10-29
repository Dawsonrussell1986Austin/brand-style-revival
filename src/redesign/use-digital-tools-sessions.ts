import { useEffect, useState } from "react";
import { remainingDigitalToolsSessions } from "./digital-tools-sessions";

export function useDigitalToolsSessions() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      const next = remainingDigitalToolsSessions(current)[0];
      // Exact boundary timer plus wall-clock checks for suspended tabs/clock changes.
      if (next) timer = setTimeout(refresh, Math.min(60_000, Date.parse(next.startsAt) - current));
    };
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return remainingDigitalToolsSessions(now);
}