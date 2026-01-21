import { Button } from "./ui/button";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const articles = [
  {
    date: { day: "20", month: "Nov" },
    image: blog1,
    title: "COACHING SAVED THE CLASSROOM: HOW ONE DISTRICT IMPROVED TEACHER RETENTION IN YEAR 1",
  },
  {
    date: { day: "19", month: "Nov" },
    image: blog2,
    title: "THE HIDDEN LINE ITEM: 3 LEGISLATIVE CHANGES THAT COULD SHRINK OR STRETCH YOUR PD BUDGET",
  },
  {
    date: { day: "13", month: "Oct" },
    image: blog3,
    title: "WHAT TODDLERS TAUGHT US: 3 LESSONS FROM OUR WORK IN EARLY CHILDHOOD CLASSROOMS",
  },
];

export function NewsSection() {
  return (
    <section className="py-16 md:py-24 bg-aces-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground text-center mb-4">
          WHAT'S NEW AT ACES PDSI
        </h2>
        <div className="w-24 h-1 bg-aces-secondary-blue mx-auto mb-12" />

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-aces-navy rounded-lg overflow-hidden group"
            >
              {/* Image with Date Badge */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-aces-blue text-primary-foreground px-3 py-2 rounded text-center">
                  <div className="text-xl font-bold">{article.date.day}</div>
                  <div className="text-xs uppercase">{article.date.month}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-primary-foreground font-heading font-bold text-sm leading-relaxed mb-4 min-h-[4.5rem]">
                  {article.title}
                </h3>
                <div className="w-8 h-px bg-primary-foreground/30 mx-auto mb-4" />
                <Button
                  variant="outline"
                  className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-aces-navy rounded-none text-xs px-6 py-2"
                >
                  READ MORE
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
