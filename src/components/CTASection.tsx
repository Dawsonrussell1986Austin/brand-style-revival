import { Button } from "./ui/button";
import ctaBanner from "@/assets/cta-banner.jpg";

export function CTASection() {
  return (
    <section
      className="relative py-20 md:py-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${ctaBanner})` }}
    >
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <Button
          variant="outline"
          className="bg-background/95 border-none text-foreground hover:bg-background rounded-none px-12 py-8 text-lg font-semibold tracking-wide"
        >
          TALK WITH OUR TEAM
        </Button>
      </div>
    </section>
  );
}
