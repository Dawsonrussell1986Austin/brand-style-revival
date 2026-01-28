import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/ScrollToTop";
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
import AdminAuth from "./pages/AdminAuth";

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-center" element={<AICenter />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
