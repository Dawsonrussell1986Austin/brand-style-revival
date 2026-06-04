import { Header } from "@/components/Header";
import {
  ModernHero,
  StatsStrip,
  BentoPrograms,
  FeatureTestimonial,
  FinalCTA,
} from "@/components/home/ModernHome";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        url="/"
        keywords="professional development, school improvement, educator training, Connecticut education, ACES PDSI"
        jsonLd={{
          "@type": "WebSite",
          "name": "ACES PDSI",
          "url": "https://acespdsi.org",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://acespdsi.org/events?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Header />
      <main className="bg-[#F5F7FA]">
        <ModernHero />
        <StatsStrip />
        <BentoPrograms />
        <FeatureTestimonial />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
