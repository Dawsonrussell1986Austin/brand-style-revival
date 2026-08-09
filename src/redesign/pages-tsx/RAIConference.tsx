import html from "../pages/ai-conference.html?raw";
import { RedesignPage } from "../RedesignPage";

export default function RAIConference() {
  return (
    <RedesignPage
      html={html}
      title={"ACES AI Conference 2026 | Register Today"}
      description={"Join CT educators and leaders Sept 25, 2026 in Bristol, CT for the ACES AI Conference: keynotes, breakouts, and an Innovation Lab. Register today."}
      url={"/ai-conference-2026"}
    />
  );
}
