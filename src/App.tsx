import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/ScrollToTop";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import Index from "./pages/Index";
import About from "./pages/About";
import AICenter from "./pages/AICenter";
import Services from "./pages/Services";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import DynamicPage from "./pages/DynamicPage";
import CurriculumCreator from "./pages/CurriculumCreator";
import RegionalForums from "./pages/RegionalForums";
import CenterForAIServices from "./pages/CenterForAIServices";
import ARC from "./pages/ARC";
import AIReadySchools from "./pages/AIReadySchools";
import InnovativeTools from "./pages/InnovativeTools";
import ResearchEthics from "./pages/ResearchEthics";

declare global {
  interface Window {
    __adcloudiq__: Array<(() => void) | { track: (config: { advertiserId: string; pixelId: string }) => void }>;
  }
}

const queryClient = new QueryClient();

const App = () => {
  // Global AdCloudIQ tracking pixel for all pages
  useEffect(() => {
    // Load the SDK script
    const script = document.createElement("script");
    script.src = "https://p.jmlp.app/sdk.js";
    script.defer = true;
    document.head.appendChild(script);

    // Initialize tracking
    window.__adcloudiq__ = window.__adcloudiq__ || [];
    window.__adcloudiq__.push(function () {
      (window.__adcloudiq__ as any).track({
        advertiserId: "91a68c22-c504-4e16-8588-1f817ed6f937",
        pixelId: "4c4d7d48-ae40-47e6-aeb0-731bb3a954fa"
      });
    });
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalytics />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-center" element={<Navigate to="/center-for-ai-services" replace />} />
            <Route path="/center-for-a-i" element={<Navigate to="/ai-center" replace />} />
            <Route path="/center-for-a-i/*" element={<Navigate to="/ai-center" replace />} />
            <Route path="/services" element={<Navigate to="/pdsi-services" replace />} />
            <Route path="/pdsi-services" element={<Services />} />
            <Route path="/pdsi-services/regional-forums" element={<RegionalForums />} />
            <Route path="/events" element={<Navigate to="/workshops-events" replace />} />
            <Route path="/workshops-events" element={<Events />} />
            <Route path="/workshops-events/:slug" element={<EventDetail />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/staff-portal-9472" element={<Admin />} />
            <Route path="/curriculum-creator" element={<CurriculumCreator />} />
            <Route path="/regional-forums" element={<Navigate to="/pdsi-services/regional-forums" replace />} />
            <Route path="/center-for-ai-services" element={<CenterForAIServices />} />
            <Route path="/center-for-ai-services/ai-ready-schools" element={<AIReadySchools />} />
            <Route path="/center-for-ai-services/innovative-tools" element={<InnovativeTools />} />
            <Route path="/center-for-ai-services/research-ethics" element={<ResearchEthics />} />
            <Route path="/arc" element={<ARC />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/:slug" element={<DynamicPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
