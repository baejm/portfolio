export type ProjectLink = {
  label: "사이트" | "소스" | "문서" | "모바일전용";
  href: string;
  kind: "site" | "source" | "docs";
};

export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export type ProjectCard = {
  id: string;
  title: string;
  period: { start: string; end?: string };
  summary: string;
  highlights?: string[];
  tech: string[];
  media: ProjectMedia;
  links: ProjectLink[];
  isFeatured?: boolean;
};
