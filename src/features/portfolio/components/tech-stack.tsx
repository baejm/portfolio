import Image from "next/image";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <TooltipProvider>
          <ul className="flex flex-wrap items-center gap-4 select-none">
            {TECH_STACK.map((tech) => {
              return (
                <li key={tech.key} className="flex">
                  <TooltipRoot>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tech.title}
                        />
                      }
                    >
                      <>
                        <Image
                          src={`/images/tech/${tech.key}-light.svg`}
                          alt={`${tech.title} light`}
                          width={32}
                          height={32}
                          className="hidden [html.light_&]:block"
                        />
                        <Image
                          src={`/images/tech/${tech.key}-dark.svg`}
                          alt={`${tech.title} dark`}
                          width={32}
                          height={32}
                          className="hidden [html.dark_&]:block"
                        />
                      </>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </TooltipRoot>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </PanelContent>
    </Panel>
  );
}
