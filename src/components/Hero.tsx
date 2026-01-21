import heroImage from "@/assets/hero-educators.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg mx-4 text-center animate-fade-in">
        {/* Logo Badge */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-48 h-48">
            {/* Gradient Ring */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(166, 100%, 25%)" />
                  <stop offset="100%" stopColor="hsl(202, 88%, 29%)" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="12"
              />
              {/* Text around ring */}
              <defs>
                <path
                  id="textPathTop"
                  d="M 100,100 m -70,0 a 70,70 0 1,1 140,0"
                  fill="none"
                />
                <path
                  id="textPathBottom"
                  d="M 100,100 m 70,0 a 70,70 0 1,1 -140,0"
                  fill="none"
                />
              </defs>
              <text className="text-[10px] fill-foreground font-semibold tracking-[0.2em]">
                <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
                  ADVOCACY. COMMITMENT.
                </textPath>
              </text>
              <text className="text-[10px] fill-foreground font-semibold tracking-[0.2em]">
                <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
                  EXCELLENCE. SERVICE.
                </textPath>
              </text>
            </svg>
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-heading font-bold text-primary">
                aces
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Grounded in Pedagogy, Growing in Innovation
        </h1>
      </div>
    </section>
  );
}
