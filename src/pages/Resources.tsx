import { motion } from "framer-motion";
import { BookOpen, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Workbook {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string;
  description: string;
  status: "available" | "coming-soon";
}

interface FreeResource {
  id: string;
  title: string;
  description: string;
}

const workbooks: Workbook[] = [
  {
    id: "k5",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "Games, Strategies and Activities for K–5 Classrooms",
    description: "This workbook equips K–5 educators with ready-to-use games, strategies, and activities that build executive functioning skills while fostering connection and belonging through restorative practices.",
    status: "coming-soon",
  },
  {
    id: "68",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "Games, Strategies and Activities for 6–8 Classrooms",
    description: "This workbook equips 6-8 educators with ready-to-use games, strategies, and activities that build executive functioning skills while fostering connection and belonging through restorative practices.",
    status: "coming-soon",
  },
  {
    id: "912",
    title: "Rooted in Relationships",
    subtitle: "Teaching Executive Functioning Through Restorative Practices",
    gradeLevel: "Games, Strategies and Activities for 9–12 Classrooms",
    description: "High school educators will find a collection of ready-to-implement strategies, activities, and discussion protocols in this practical workbook. It's designed to strengthen students' executive functioning skills while integrating restorative practices to foster a positive classroom culture of connection, accountability, and belonging among adolescents.",
    status: "coming-soon",
  },
];

const freeResources: FreeResource[] = [
  {
    id: "climate",
    title: "ACES School Climate Improvement Plan Template",
    description: "This comprehensive template provides schools with a structured framework to develop, implement, and monitor their School Climate Improvement Plan in alignment with Connecticut legislation and school climate standards. The tool guides School Climate Coordinators, Specialists, and Committees through each step of the process — from forming a representative climate team to analyzing survey data, setting measurable goals, and outlining tiered action steps. With built-in sections for family, student, and staff engagement, as well as clear alignment to restorative practices and equity priorities, the template helps schools create safe, inclusive, and supportive learning environments where all members of the community feel valued and connected.",
  },
  {
    id: "btc",
    title: "Building Thinking Classrooms: Look Fors Template",
    description: "This practical tool supports educators and leaders in implementing Peter Liljedahl's Building Thinking Classrooms framework. Organized into four scaffolded toolkits, the template outlines clear 'look-fors' — observable teacher and student behaviors, along with evidence — that guide schools through each stage of BTC implementation. From creating a culture of collaboration with random grouping and vertical non-permanent surfaces, to fostering student autonomy, consolidating thinking, and designing assessments that value process over answers, this resource helps districts monitor progress and sustain growth. Use it to reflect on practice, set implementation goals, and ensure classrooms are evolving into student-centered environments that prioritize problem-solving, critical thinking, and engagement.",
  },
  {
    id: "k2-exec",
    title: "K-2 Executive Functioning Station Activities",
    description: "This resource provides engaging, play-based activities designed to help young learners strengthen key executive functioning skills, including impulse control, working memory, cognitive flexibility, and self-regulation. Each station offers a simple game or mindful practice—such as 'Impulse Freeze,' 'Memory Chain,' 'Category Flip,' and 'Mindful Tools'—paired with reflection questions and supportive affective statements that encourage growth. Teachers can use these activities during small-group instruction, transitions, or as part of social-emotional learning routines to build foundational skills that support academic and behavioral success.",
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-aces-navy to-aces-blue py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-8 py-6 inline-block">
              <h1 className="font-roboto-slab text-4xl md:text-5xl lg:text-6xl font-bold text-aces-blue mb-4">
                PDSI Resources
              </h1>
              <p className="text-lg md:text-xl text-aces-navy">
                Insights & Actionable Items for Your Everyday Success
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-roboto-slab text-2xl md:text-3xl lg:text-4xl font-bold text-aces-navy mb-6">
              PDSI Resources for Leaders & Educators
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At ACES PDSI, we don't just deliver professional learning — we also create practical, innovative resources that extend that learning into everyday practice. Our resources page offers access to the products we develop in collaboration with educators, including print-on-demand workbooks designed to support instruction and leadership, as well as free downloadable tools and templates you can use right away. Whether you're looking for ready-to-use materials or inspiration to strengthen your own practice, these resources reflect our commitment to building capacity and driving impact in schools and districts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Workbooks Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-roboto-slab text-2xl md:text-3xl lg:text-4xl font-bold text-aces-navy mb-4">
              Premium Workbooks & Guides
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
              The <em>Rooted in Relationships</em> workbook series, available for grades K–12, was created by ACES PDSI experts to provide teachers with practical strategies and activities that foster students' social-emotional growth and strengthen classroom community through engaging, relationship-centered tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workbooks.map((workbook, index) => (
              <motion.div
                key={workbook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                {/* Workbook Cover Placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-b from-sky-200 via-teal-200 to-green-100 rounded-lg mb-4 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-aces-navy" />
                  <h3 className="font-roboto-slab text-2xl font-bold text-purple-700 mb-2">
                    {workbook.title}
                  </h3>
                  <p className="text-teal-600 text-sm font-medium mb-4">
                    {workbook.subtitle}
                  </p>
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-green-200 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-10 w-10 text-amber-700" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-aces-blue py-3">
                    <p className="text-white text-sm font-medium px-4">
                      {workbook.gradeLevel}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {workbook.description}
                </p>

                {/* CTA Button */}
                <Button 
                  className="bg-aces-blue hover:bg-aces-blue/90 text-white font-semibold w-fit"
                  disabled={workbook.status === "coming-soon"}
                >
                  {workbook.status === "coming-soon" ? "COMING SOON!" : "ORDER NOW"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-roboto-slab text-2xl md:text-3xl lg:text-4xl font-bold text-aces-navy mb-4">
              Free Tools & Templates
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
              Developed in partnership with schools and districts, these free tools make it easier to plan, implement, and sustain effective practices. Each resource is designed to be practical, research-based, and immediately useful, helping educators and leaders strengthen instruction, streamline planning, and support continuous improvement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {freeResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="h-6 w-6 text-aces-blue flex-shrink-0 mt-1" />
                  <h3 className="font-roboto-slab text-xl font-bold text-aces-navy">
                    {resource.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {resource.description}
                </p>
                <Button className="bg-aces-blue hover:bg-aces-blue/90 text-white font-semibold w-fit gap-2">
                  <Download className="h-4 w-4" />
                  DOWNLOAD
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-aces-blue to-aces-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-roboto-slab text-3xl md:text-4xl font-bold text-white mb-4">
              Need a Custom Resource?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              We partner with districts to develop tailored tools, guides, and materials that address your unique needs.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-aces-blue hover:bg-white/90 font-semibold px-8"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
