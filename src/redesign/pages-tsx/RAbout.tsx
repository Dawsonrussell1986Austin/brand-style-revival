import html from "../pages/about.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RAbout() {
  return <RedesignPage html={html} title={"About"} url={"/about"} />;
}
