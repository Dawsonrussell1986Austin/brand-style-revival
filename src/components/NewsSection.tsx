import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const articles = [
  { slug: "coaching-saved-classroom", date: "Nov 20", image: blog1, category: "Success Story", title: "How One District Improved Teacher Retention in Year 1", excerpt: "Discover how coaching transformed classroom dynamics." },
  { slug: "legislative-changes-pd-budget", date: "Nov 19", image: blog2, category: "Policy", title: "The Hidden Line Item: 3 Legislative Changes That Could Shrink or Stretch Your PD Budget", excerpt: "New federal and state-level changes may expand your options." },
  { slug: "lessons-from-toddlers", date: "Oct 13", image: blog3, category: "Early Childhood", title: "What Toddlers Taught Us: 3 Lessons from Our Work in Early Childhood Classrooms", excerpt: "Big lessons unfold daily—for students and educators." },
];

export function NewsSection() {
  return (
    <section className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="accent-line w-16 mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              What's New
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full border-border hover:border-primary/50 group">
            <Link to="/resources">
              View All Articles
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Articles */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link to={`/blog/${article.slug}`} key={article.title}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden mb-5">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-foreground">
                    {article.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
