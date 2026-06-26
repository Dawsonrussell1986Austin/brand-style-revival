import html from "../pages/resources.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RResources() {
  return <RedesignPage html={html} title={"Educational Resources"} url={"/resources"} />;
}
