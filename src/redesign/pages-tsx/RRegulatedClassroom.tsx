import html from "../pages/regulated-classroom.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RRegulatedClassroom() {
  return (
    <RedesignPage
      html={html}
      title={"The Regulated Classroom Train the Trainer | ACES, Hamden CT"}
      description={"Two-day, 12-hour Train the Trainer hosted by ACES in Hamden, CT on October 28-29, 2026. A nervous-system-informed framework for educator stress and student dysregulation."}
      url={"/workshops-events/regulated-classroom"}
    />
  );
}
