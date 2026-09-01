import html from "../pages/pdsi-k12.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RPDSIK12() {
  return (
    <RedesignPage
      html={html}
      title={"K–12 Support — ACES PDSI"}
      description={
        "ACES PDSI partners with K–12 educators, schools, and districts across eight areas of support: climate and culture, mathematics, literacy, teaching and learning, MTSS, curriculum and assessment, career readiness, and leadership."
      }
      url={"/pdsi/k-12-support"}
    />
  );
}
