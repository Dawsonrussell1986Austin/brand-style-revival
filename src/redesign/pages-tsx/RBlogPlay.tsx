import html from "../pages/blog-play.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RBlogPlay() {
  return <RedesignPage html={html} title={"Everyone Loves to Play"} url={"/blog/everyone-loves-to-play"} />;
}
