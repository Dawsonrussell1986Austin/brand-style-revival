import html from "../pages/pdsi-early-childhood.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RPDSIEarlyChildhood() {
  return (
    <RedesignPage
      html={html}
      title={"Early Childhood — ACES PDSI"}
      description={
        "Professional learning, coaching, and customized support for early childhood educators, leaders, and programs from ACES PDSI."
      }
      url={"/pdsi/early-childhood"}
    />
  );
}
