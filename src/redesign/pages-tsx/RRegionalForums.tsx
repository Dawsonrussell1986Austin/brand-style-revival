import html from "../pages/regional-forums.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RRegionalForums() {
  return <RedesignPage html={html} title={"Regional Forums"} url={"/pdsi-services/regional-forums"} />;
}
