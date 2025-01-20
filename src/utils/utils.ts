import { messageBodyType } from "@/lib/types/custom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customDomParse = (html: string, parser: DOMParser) => {
  const doc = parser.parseFromString(html, "text/html");
  return doc;
};

export function extraContent(payload: messageBodyType, parser: DOMParser) {
  const doc = customDomParse(payload.body?.data, parser);
  return extractFromParts(payload.parts, parser, doc.body.textContent || "");
}

const extractFromParts = (
  parts: messageBodyType[],
  parser: DOMParser,
  result: string = ""
) => {
  if (!parts || parts.length === 0) return result;

  const answer: string[] = parts.map((part) => {
    const paritialResult: string[] = parts?.map(
      (part) => customDomParse(part.body?.data, parser).body.textContent || ""
    );
    return extractFromParts(
      part.parts,
      parser,
      result + "\n\n" + paritialResult.join("\n\n")
    );
  });

  return answer.join("\n\n");
};
