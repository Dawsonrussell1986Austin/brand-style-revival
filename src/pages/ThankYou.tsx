import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    __adcloudiq__: Array<(() => void) | { track: (config: { advertiserId: string; pixelId: string }) => void }>;
  }
}

const ThankYou = () => {
  // AdCloudIQ conversion tracking pixel
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
        pixelId: "84ced74c-71c6-4f85-ab08-9c24cecc4f2d"
      });
    });

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://p.jmlp.app/sdk.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Thank You"
        description="Thank you for contacting ACES PDSI. We've received your message and will get back to you soon."
        url="/thank-you"
      />
      <Header />
      
      <main className="pt-20">
        <section className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-aces-green/10 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-12 h-12 text-aces-green" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-aces-navy mb-6">
                Thank You!
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                We've received your message and appreciate you reaching out. 
                A member of our team will get back to you within 1-2 business days.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="gradient-aces text-white font-semibold px-8 h-12 rounded-xl btn-glow"
                >
                  <Link to="/">
                    <Home className="mr-2 w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="border-aces-blue text-aces-blue hover:bg-aces-blue/5 font-semibold px-8 h-12 rounded-xl"
                >
                  <Link to="/resources">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Explore Resources
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
