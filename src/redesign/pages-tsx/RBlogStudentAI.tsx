import html from "../pages/blog-student-ai.html?raw";
import { RedesignPage } from "../RedesignPage";
import "../student-ai-blog.css";

export default function RBlogStudentAI() {
  return (
    <RedesignPage
      html={html}
      title="Who decided your students would get AI?"
      description="Bob Hutchins of the ACES Center for AI responds to The Wall Street Journal's investigation of Google's AI in schools, calling for AI literacy before access."
      url="/blog/who-decided-your-students-would-get-ai"
    />
  );
}