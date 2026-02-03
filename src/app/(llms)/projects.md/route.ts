import { PROJECT_CARDS as PROJECTS } from "@/features/portfolio/data/projects";

const content = `# Projects

${PROJECTS.map((item) => {
  const skills = item.tech.length ? `\n\nSkills: ${item.tech.join(", ")}` : "";
  const description = item.summary ? `\n\n${item.summary.trim()}` : "";
  const primaryLink =
    item.links.find((link) => link.kind === "site") ?? item.links[0];
  const linkText = primaryLink ? `\n\nProject URL: ${primaryLink.href}` : "";
  return `## ${item.title}${linkText}${skills}${description}`;
}).join("\n\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
