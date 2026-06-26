import html from "../pages/ai-research.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RAIResearch() {
  return <RedesignPage html={html} title={"Research & Ethical Standards"} url={"/center-for-ai-services/research-ethics"} />;
}
