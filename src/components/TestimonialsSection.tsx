import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    image: testimonial1,
    quote: "ACES helped us turn our PD from passive to powerful.",
    role: "School Leader",
    location: "CT",
  },
  {
    image: testimonial2,
    quote: "They get it. Their coaching is tailored, practical, and worth every penny.",
    role: "Teacher",
    location: "Early Childhood Program",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-16">
          What Educators Are Saying
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.role}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-aces-navy text-aces-navy"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground italic mb-3">
                  "{testimonial.quote}"
                </p>

                {/* Attribution */}
                <p className="text-foreground">
                  <strong>{testimonial.role}</strong>
                  <span className="text-muted-foreground"> / {testimonial.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
