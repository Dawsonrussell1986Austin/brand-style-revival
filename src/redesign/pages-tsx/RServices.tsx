import html from "../pages/services.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RServices() {
  return <RedesignPage html={html} title={"PDSI Services"} url={"/pdsi-services"} />;
}
