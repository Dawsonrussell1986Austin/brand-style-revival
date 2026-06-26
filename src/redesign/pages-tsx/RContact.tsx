import html from "../pages/contact.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RContact() {
  return <RedesignPage html={html} title={"Contact"} url={"/contact"} />;
}
