import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { CollapsibleList } from "@/components/collapsible-list";
import type { ProjectCard, ProjectLink } from "@/types/project-card";

import { BOOKMARKS } from "../../data/bookmarks";
import { Panel, PanelHeader, PanelTitle } from "../panel";

function LinkButton({ link }: { link: ProjectLink }) {
  const base =
    "inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted transition";
  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
    >
      {link.label}
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <section className="space-y-4 bg-black p-4 pt-0">
        <div className="flex items-end justify-between"></div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border bg-background"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                {p.media.type === "image" ? (
                  <Image
                    src={p.media.src}
                    alt={p.media.alt}
                    fill
                    className="object-cover transition group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <video
                    className="h-full w-full scale-[1.04] object-cover"
                    src={p.media.src}
                    poster={p.media.poster}
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                )}

                {p.isFeatured && (
                  <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                    Featured
                  </span>
                )}
              </div>

              <div className="space-y-3 border-t border-zinc-200/60 p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold">{p.title}</h3>
                    <span className="min-[98px] min-w-[98px] text-xs tracking-[-0.5px] text-muted-foreground">
                      {p.period.start}
                      {p.period.end ? ` ~ ${p.period.end}` : ""}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {p.summary}
                  </p>
                </div>

                {p.highlights?.length ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {p.highlights.slice(0, 4).map((h, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {p.tech.slice(0, 8).map((t, idx) => (
                    <li
                      key={idx}
                      className="rounded-lg border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {p.links.map((l) => (
                    <LinkButton key={`${p.id}-${l.kind}-${l.href}`} link={l} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Panel>
  );
}
