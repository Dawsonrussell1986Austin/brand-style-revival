import html from "../pages/blog-ai-educators.html?raw";
import { RedesignPage } from "../RedesignPage";
import "../student-ai-blog.css";
import "../ai-educators-blog.css";

export default function RBlogAIEducators() {
  return (
    <RedesignPage
      html={html}
      title="The Future of AI in Education Must Be Shaped by Educators"
      description="An ACES perspective on Google's new AI policy, district autonomy, AI literacy, and preparing students for an AI-driven future."
      url="/blog/future-of-ai-shaped-by-educators"
    />
  );
}
