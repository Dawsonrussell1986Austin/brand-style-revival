import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PartnerSection } from "@/components/PartnerSection";
import { ProfessionalLearning } from "@/components/ProfessionalLearning";
import { ServicesSection } from "@/components/ServicesSection";
import { NewsSection } from "@/components/NewsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
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
          "url": "https://brand-style-revival.lovable.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://brand-style-revival.lovable.app/events?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Header />
      <main>
        <Hero />
        <PartnerSection />
        <ProfessionalLearning />
        <ServicesSection />
        <NewsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
