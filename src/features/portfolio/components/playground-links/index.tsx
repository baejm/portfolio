import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import { PLAYGROUND_LINKS } from "../../data/playground-links";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";

export function PlaygroundLinks() {
  return (
    <Panel id="playground">
      <PanelHeader>
        <PanelTitle className="text-xl text-muted-foreground">
          Playground
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-3 pt-1">
        <p className="text-xs text-muted-foreground/80">
          Mini side experiments
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PLAYGROUND_LINKS.map((link, index) => (
            <a
              key={index}
              href={addQueryParams(link.href, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-3 rounded-xl border border-edge/70 bg-muted/20 p-3 transition-colors hover:bg-muted/35"
            >
              <div className="relative size-9 shrink-0 opacity-85">
                <Image
                  src={link.iconLight}
                  alt={link.title}
                  width={36}
                  height={36}
                  className="rounded-lg"
                  quality={100}
                  unoptimized
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-foreground/90">
                  {link.title}
                </h3>
                {link.description && (
                  <p className="truncate text-xs text-muted-foreground">
                    {link.description}
                  </p>
                )}
              </div>

              <ArrowUpRightIcon className="size-3.5 text-muted-foreground/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
