import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/ScrollToTop";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import EventDetail from "./pages/EventDetail";
import ThankYou from "./pages/ThankYou";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import DynamicPage from "./pages/DynamicPage";
import ARC from "./pages/ARC";
// Redesign pages
import RIndex from "./redesign/pages-tsx/RIndex";
import RAbout from "./redesign/pages-tsx/RAbout";
import REvents from "./redesign/pages-tsx/REvents";
import RServices from "./redesign/pages-tsx/RServices";
import RRegionalForums from "./redesign/pages-tsx/RRegionalForums";
import RAICenter from "./redesign/pages-tsx/RAICenter";
import RAILiteracy from "./redesign/pages-tsx/RAILiteracy";
import RAIInnovation from "./redesign/pages-tsx/RAIInnovation";
import RAIResearch from "./redesign/pages-tsx/RAIResearch";
import RCurriculumCreator from "./redesign/pages-tsx/RCurriculumCreator";
import RResources from "./redesign/pages-tsx/RResources";
import RContact from "./redesign/pages-tsx/RContact";
import RBlogAI from "./redesign/pages-tsx/RBlogAI";
import RBlogPlay from "./redesign/pages-tsx/RBlogPlay";
import RBlogRooted from "./redesign/pages-tsx/RBlogRooted";

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
            <Route path="/" element={<RIndex />} />
            <Route path="/about" element={<RAbout />} />
            <Route path="/ai-center" element={<Navigate to="/center-for-ai-services" replace />} />
            <Route path="/center-for-a-i" element={<Navigate to="/center-for-ai-services" replace />} />
            <Route path="/center-for-a-i/*" element={<Navigate to="/center-for-ai-services" replace />} />
            <Route path="/services" element={<Navigate to="/pdsi-services" replace />} />
            <Route path="/pdsi-services" element={<RServices />} />
            <Route path="/pdsi-services/regional-forums" element={<RRegionalForums />} />
            <Route path="/events" element={<Navigate to="/workshops-events" replace />} />
            <Route path="/workshops-events" element={<REvents />} />
            <Route path="/workshops-events/:slug" element={<EventDetail />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/resources" element={<RResources />} />
            <Route path="/contact" element={<RContact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/blog/saving-time-with-ai" element={<RBlogAI />} />
            <Route path="/blog/everyone-loves-to-play" element={<RBlogPlay />} />
            <Route path="/blog/rooted-in-relationships-and-rigor" element={<RBlogRooted />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/staff-portal-9472" element={<Admin />} />
            <Route path="/curriculum-creator" element={<RCurriculumCreator />} />
            <Route path="/regional-forums" element={<Navigate to="/pdsi-services/regional-forums" replace />} />
            <Route path="/center-for-ai-services" element={<RAICenter />} />
            <Route path="/center-for-ai-services/ai-ready-schools" element={<RAILiteracy />} />
            <Route path="/center-for-ai-services/innovative-tools" element={<RAIInnovation />} />
            <Route path="/center-for-ai-services/research-ethics" element={<RAIResearch />} />
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
