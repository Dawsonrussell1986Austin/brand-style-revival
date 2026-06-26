import html from "../pages/ai-center.html?raw";
import { run as pageInit } from "../scripts/ai-center";
import { RedesignPage } from "../RedesignPage";

export default function RAICenter() {
  return <RedesignPage html={html} title={"Center for Artificial Intelligence"} url={"/center-for-ai-services"} pageInit={pageInit} />;
}
