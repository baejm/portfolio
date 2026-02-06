import { LayersIcon, LinkIcon, MapPinIcon, SparklesIcon } from "lucide-react";

import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { EmailItem } from "./email-item";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2.5">
        {USER.jobs.map((job, index) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
            />
          );
        })}

        <div
          className={cn(
            "relative grid gap-x-4 gap-y-2.5 sm:grid-cols-2",
            "before:absolute before:-top-4 before:-right-8 before:w-[calc(50%+var(--spacing)*14)] before:border-t before:border-dashed before:border-edge/80 max-sm:before:content-none"
          )}
        >
          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                aria-label={`Location: ${USER.address}`}
              >
                {USER.address}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <SparklesIcon />
            </IntroItemIcon>
            <IntroItemContent>퍼블리싱 · 프론트엔드 신입</IntroItemContent>
          </IntroItem>

          <EmailItem email={USER.email} />

          <IntroItem>
            <IntroItemIcon>
              <LinkIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={USER.website}
                aria-label={`Personal website: ${urlToName(USER.website)}`}
              >
                {urlToName(USER.website)}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          {USER.phoneNumber ? (
            <PhoneItem phoneNumber={USER.phoneNumber} />
          ) : null}

          <IntroItem>
            <IntroItemIcon>
              <LayersIcon />
            </IntroItemIcon>
            <IntroItemContent className="flex flex-wrap items-center gap-1">
              <span className="inline-flex items-center gap-0.5">
                <img
                  src="/images/tech/react-light.svg"
                  alt="React"
                  className="size-4 dark:hidden"
                />
                <img
                  src="/images/tech/react-dark.svg"
                  alt="React"
                  className="hidden size-4 dark:inline"
                />
                React
              </span>
              <span className="px-0.5 text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-0.5">
                <img
                  src="/images/tech/nextjs-light.svg"
                  alt="Next.js"
                  className="size-4 dark:hidden"
                />
                <img
                  src="/images/tech/nextjs-dark.svg"
                  alt="Next.js"
                  className="hidden size-4 dark:inline"
                />
                Next.js
              </span>
              <span className="px-0.5 text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-0.5">
                <img
                  src="/images/tech/vuejs-light.svg"
                  alt="Vue"
                  className="size-4 dark:hidden"
                />
                <img
                  src="/images/tech/vuejs-dark.svg"
                  alt="Vue"
                  className="hidden size-4 dark:inline"
                />
                Vue
              </span>
              <span className="px-0.5 text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-0.5">
                <img
                  src="/images/tech/nuxt-light.svg"
                  alt="Nuxt"
                  className="size-4 dark:hidden"
                />
                <img
                  src="/images/tech/nuxt-dark.svg"
                  alt="Nuxt"
                  className="hidden size-4 dark:inline"
                />
                Nuxt
              </span>
            </IntroItemContent>
          </IntroItem>
        </div>
      </PanelContent>

      <div className="absolute top-0 left-[calc(50%-var(--spacing)*2-1px)] -z-1 h-full border-r border-edge/80 max-sm:hidden" />
    </Panel>
  );
}
