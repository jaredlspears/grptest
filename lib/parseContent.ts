import type { DiscussionInput, Section } from "./types";

/**
 * Parses moderator-pasted content into a DiscussionInput.
 *
 * Expected format:
 *
 *   ## Section Heading
 *   Paragraph text here...
 *
 *   - Question one?
 *   - Question two?
 *
 *   ## Next Section
 *   ...
 */
export function parseContent(
  raw: string,
  title: string,
  author: string
): DiscussionInput {
  const sections: Section[] = [];

  // Split on ## headers
  const chunks = raw.split(/^##\s+/m).filter((c) => c.trim().length > 0);

  for (const chunk of chunks) {
    const lines = chunk.split("\n");
    const heading = lines[0].trim();
    const rest = lines.slice(1).join("\n").trim();

    // Separate question lines (start with "- ") from body text
    const bodyLines: string[] = [];
    const questions: string[] = [];

    let inBody = true;
    for (const line of rest.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) {
        inBody = false;
        questions.push(trimmed.slice(2).trim());
      } else if (inBody) {
        bodyLines.push(line);
      }
    }

    const body = bodyLines.join("\n").trim();

    if (heading) {
      sections.push({ heading, body, questions });
    }
  }

  return { title, author, sections };
}
