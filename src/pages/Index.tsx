import { Header } from "@/components/Header";
import { HeroV2 } from "@/components/home/HeroV2";
import { ServiceGridV2 } from "@/components/home/ServiceGridV2";
import { FeaturedContentV2 } from "@/components/home/FeaturedContentV2";
import { TestimonialsV2 } from "@/components/home/TestimonialsV2";
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
      <main>
        <HeroV2 />
        <ServiceGridV2 />
        <FeaturedContentV2 />
        <TestimonialsV2 />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
