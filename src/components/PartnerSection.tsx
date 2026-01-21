export function PartnerSection() {
  const highlights = [
    {
      title: "Expertise across roles and systems",
      description: "— from classrooms to district leadership",
    },
    {
      title: "Clear strategies for managing and sustaining change",
      description: "— not just ideas, but actionable direction",
    },
    {
      title: "Collaborative partnerships",
      description: "— we work with you, not just for you",
    },
    {
      title: "Proven impact",
      description: "— measurable outcomes that matter",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              ACES, your partner in professional learning.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At ACES PDSI, we partner with educators, from paraeducators to superintendents, to turn strategy into action and build what's next in education. We provide cost-effective, customized solution pathways that strengthen systems, solve real challenges, and lead lasting change.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6">
              What sets us apart?
            </h3>
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">
                    <strong>{item.title}</strong>
                    <span className="text-muted-foreground">{item.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
