import { Button } from "./ui/button";
import teacherImage from "@/assets/teacher-classroom.jpg";

export function ProfessionalLearning() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Professional Learning Opportunities */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Professional Learning Opportunities
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl mb-8">
            We offer workshops, courses, and certification programs that help educators acquire new skills and advance in their profession. From instructional practices to subject-area expertise to technology integration, our sessions are designed to meet the needs of today's schools. The ACES Staff Development Building in Hamden also operates as a hub for local and statewide professional learning and conferences.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-sm font-semibold tracking-wide">
            EVENTS
          </Button>
        </div>

        {/* In-District & Program Support */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              In-District & Program Support
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our education specialists partner directly with schools, districts, and programs to design supports that are tailored to their unique goals. Whether the focus is curriculum development, technology integration, data analysis, or leadership growth, we customize every service to align with your priorities and ensure impact where it matters most.
            </p>
            <p className="text-foreground italic font-medium">
              You won't just get support. You'll get a partner who shows up, listens, and helps you lead.
            </p>
          </div>
          <div className="relative">
            <img
              src={teacherImage}
              alt="Teacher engaging students in classroom"
              className="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
