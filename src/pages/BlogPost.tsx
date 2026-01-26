import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}

export const blogPosts: BlogPostData[] = [
  {
    slug: "coaching-saved-classroom",
    title: "Coaching Saved the Classroom: How One District Improved Teacher Retention in Year 1",
    date: "November 20, 2024",
    author: "Drew Powell",
    readTime: "4 min read",
    category: "Success Story",
    image: blog1,
    excerpt: "Discover how coaching transformed classroom dynamics and helped one district drop teacher turnover from 28% to 8%.",
    content: (
      <>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          In a quiet district just outside Hartford, something unusual happened this year: teachers stayed.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Faced with a 28% annual attrition rate, the district partnered with ACES to pilot a classroom-based coaching program that paired new and mid-career teachers with experienced instructional mentors. One year later, teacher turnover dropped to 8%.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Coaching Over Compliance</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Unlike traditional evaluation models, this initiative focused on relational trust, not performance pressure. Teachers were observed weekly—but not judged. Coaches offered real-time feedback, modeled instructional techniques, and helped educators feel heard.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-foreground">
          "It wasn't about fixing me. It was about supporting me in real time."
          <footer className="text-sm text-muted-foreground mt-2 not-italic">— Melissa, first-year middle school science teacher</footer>
        </blockquote>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">The Data Tells the Story</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Surveys conducted midyear showed:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          <li><strong className="text-foreground">92%</strong> of participants felt more confident in their teaching</li>
          <li><strong className="text-foreground">74%</strong> reported fewer behavioral disruptions</li>
          <li><strong className="text-foreground">100%</strong> said coaching helped them "stay" in the profession</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-6">
          And most critically, no new teachers resigned midyear—a sharp contrast from the previous year's exodus.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">Beyond the Pilot</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The district now plans to expand the coaching program districtwide by 2026. The ACES model—focused on consistency, empathy, and tactical instructional support—has become a framework for sustainable staffing.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-foreground">
          "We've shifted from survival to strategy."
          <footer className="text-sm text-muted-foreground mt-2 not-italic">— District Director of Instruction</footer>
        </blockquote>
      </>
    ),
  },
  {
    slug: "legislative-changes-pd-budget",
    title: "3 Legislative Changes That Could Impact Your PD Budget",
    date: "November 19, 2024",
    author: "ACES Team",
    readTime: "3 min read",
    category: "Policy",
    image: blog2,
    excerpt: "Stay ahead of funding changes that affect professional development.",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Full article coming soon. Check back for updates on important policy changes affecting professional development funding.
      </p>
    ),
  },
  {
    slug: "lessons-from-toddlers",
    title: "What Toddlers Taught Us: 3 Lessons from the Classroom",
    date: "October 13, 2024",
    author: "ACES Team",
    readTime: "3 min read",
    category: "Early Childhood",
    image: blog3,
    excerpt: "Insights that apply everywhere in education.",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Full article coming soon. Discover valuable insights from early childhood education that apply across all grade levels.
      </p>
    ),
  },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} | ACES Blog`}
        description={post.excerpt}
        type="article"
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Button asChild variant="ghost" className="mb-6 -ml-2">
              <Link to="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-lg"
          >
            {post.content}
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
              More Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-5">
                      <span className="text-xs text-primary font-medium">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-heading font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
