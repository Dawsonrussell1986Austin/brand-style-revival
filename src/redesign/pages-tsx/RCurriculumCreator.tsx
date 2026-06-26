import html from "../pages/curriculum-creator.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RCurriculumCreator() {
  return <RedesignPage html={html} title={"Curriculum Creator"} url={"/curriculum-creator"} />;
}
