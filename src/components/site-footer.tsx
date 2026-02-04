import Link from "next/link";

import { SITE_INFO } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built with Next.js & Tailwind CSS - UI inspired by shadcn/ui
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          © 2026 배정민. All rights reserved.
        </p>

        <div className="screen-line-before flex justify-center gap-2 py-3 font-mono text-xs text-muted-foreground sm:hidden">
          <Link className="font-medium" href="/sponsors">
            Sponsors
          </Link>

          <span className="opacity-50">|</span>

          <a
            className="font-medium"
            href={`${SITE_INFO.url}/llms.txt`}
            target="_blank"
            rel="noopener noreferrer"
          >
            llms.txt
          </a>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
