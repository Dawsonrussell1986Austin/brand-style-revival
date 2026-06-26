import html from "../pages/index.html?raw";
import { run as pageInit } from "../scripts/index";
import { RedesignPage } from "../RedesignPage";

export default function RIndex() {
  return <RedesignPage html={html} url={"/"} pageInit={pageInit} />;
}
