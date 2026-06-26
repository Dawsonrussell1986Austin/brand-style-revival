import html from "../pages/events.html?raw";
import { run as pageInit } from "../scripts/events";
import { RedesignPage } from "../RedesignPage";

export default function REvents() {
  return <RedesignPage html={html} title={"Workshops & Events"} url={"/workshops-events"} pageInit={pageInit} />;
}
