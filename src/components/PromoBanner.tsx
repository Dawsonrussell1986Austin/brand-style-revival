import { Button } from "./ui/button";

export function PromoBanner() {
  return (
    <section className="bg-aces-navy py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/90 text-lg mb-2 font-medium">
              ENTER TODAY to win a pair of
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-3">
              Apple AirPods Pro 3
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-6">
              (With Live Translation, powered by Apple Intelligence)
            </p>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-aces-navy rounded-none px-8 py-6 text-sm font-semibold tracking-wide"
            >
              CLICK HERE TO ENTER
            </Button>
          </div>

          {/* Image Placeholder */}
          <div className="w-48 h-48 md:w-56 md:h-56 bg-aces-blue rounded-full flex items-center justify-center">
            <div className="text-primary-foreground text-center p-4">
              <svg
                className="w-24 h-24 mx-auto opacity-80"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <p className="text-sm mt-2 font-medium">AirPods Pro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
