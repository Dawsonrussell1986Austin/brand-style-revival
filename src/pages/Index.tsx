import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromoBanner } from "@/components/PromoBanner";
import { PartnerSection } from "@/components/PartnerSection";
import { ProfessionalLearning } from "@/components/ProfessionalLearning";
import { ServicesSection } from "@/components/ServicesSection";
import { NewsSection } from "@/components/NewsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PromoBanner />
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
