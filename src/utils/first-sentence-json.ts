import { JSONContent } from "@tiptap/core";

export default function firstSentenceJson(str: string) {
  const json: JSONContent = JSON.parse(str);

  const firstNode = json.content?.[0];
  if (firstNode && firstNode.type === "paragraph") {
    if (firstNode.content && firstNode.content[0]) {
      return firstNode.content[0].text;
    }
  }
  return "";
}
