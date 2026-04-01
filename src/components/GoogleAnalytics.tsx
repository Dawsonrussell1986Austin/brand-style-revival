import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-5YYNY8BEJN";

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Send pageview on every route change
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
