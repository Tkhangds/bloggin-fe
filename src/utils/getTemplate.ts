import { initialContent } from "@/lib/editor/data/initialContent";
import { dailyTemplate } from "@/lib/editor/data/dailyTemplate";
import { adviceTemplate } from "@/lib/editor/data/adviceTemplate";
import { technicalTemplate } from "@/lib/editor/data/technicalTemplate";
import { tipTemplate } from "@/lib/editor/data/tipTemplate";

export default function getTemplate(templateName: string) {
  switch (templateName) {
    case "daily":
      return dailyTemplate;
    case "advice":
      return adviceTemplate;
    case "technical":
      return technicalTemplate;
    case "tip":
      return tipTemplate;
    default:
      return initialContent;
  }
}
