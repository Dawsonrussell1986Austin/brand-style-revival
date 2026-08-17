import html from "../pages/wired-wednesdays.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RWiredWednesdays() {
  return (
    <RedesignPage
      html={html}
      title={"Wired Wednesdays: Free AI Webinars for Educators"}
      description={"A free ACES Center for AI webinar series on Wednesdays, 3:30–4:00 PM, beginning September 9, 2026. Practical, human-centered AI for teaching, leadership, and school operations."}
      url={"/wired-wednesdays"}
    />
  );
}
