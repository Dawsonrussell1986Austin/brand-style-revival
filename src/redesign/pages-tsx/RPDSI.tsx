import html from "../pages/pdsi.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RPDSI() {
  return (
    <RedesignPage
      html={html}
      title={"PDSI — Professional Development & School Improvement"}
      description={
        "ACES PDSI partners with educators, schools, districts, and early childhood programs to strengthen teaching, learning, leadership, and organizational practice."
      }
      url={"/pdsi"}
    />
  );
}
