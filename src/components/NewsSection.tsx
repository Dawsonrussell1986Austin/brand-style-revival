import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react";
import { Button } from "./ui/button";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const articles = [
  {
    date: "Nov 20",
    readTime: "5 min read",
    image: blog1,
    category: "Success Story",
    title: "How One District Improved Teacher Retention in Year 1",
    excerpt: "Discover how coaching transformed classroom dynamics and saved careers.",
  },
  {
    date: "Nov 19",
    readTime: "4 min read",
    image: blog2,
    category: "Policy & Budget",
    title: "3 Legislative Changes That Could Impact Your PD Budget",
    excerpt: "Stay ahead of funding changes that affect professional development.",
  },
  {
    date: "Oct 13",
    readTime: "6 min read",
    image: blog3,
    category: "Early Childhood",
    title: "What Toddlers Taught Us: 3 Lessons from Early Childhood",
    excerpt: "Insights from our work in early childhood classrooms that apply everywhere.",
  },
];

export function NewsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
              <Newspaper className="w-4 h-4" />
              Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              What's <span className="text-gradient-aces">New</span>
            </h2>
          </div>
          <Button variant="outline" className="border-border hover:border-primary/50 text-foreground rounded-full px-6 group">
            View All Articles
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium text-foreground">
                  {article.category}
                </div>
                
                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                {article.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
