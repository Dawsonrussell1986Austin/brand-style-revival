import html from "../pages/ai-innovation.html?raw";
import { RedesignPage } from "../RedesignPage";
import { useContent } from "@/hooks/useSiteContent";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

export default function RAIInnovation() {
  const { content: walkthroughButtonLabel } = useContent(
    "innovative-tools",
    "solutions",
    "walkthrough_button_label",
    "Request a walkthrough for my school",
  );
  const pageHtml = html.replace("{{WALKTHROUGH_BUTTON_LABEL}}", escapeHtml(walkthroughButtonLabel));

  return <RedesignPage html={pageHtml} title={"Innovation & Design"} url={"/center-for-ai-services/innovative-tools"} />;
}
