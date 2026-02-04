import type { Registry } from "shadcn/schema";

import { blocks } from "./registry-blocks";
import { components } from "./registry-components";
import { examples } from "./registry-examples";
import { hook } from "./registry-hook";
import { lib } from "./registry-lib";

export const registry = {
  name: "baejm",
  homepage: "https://portfolio-seven-xi-33.vercel.app/components",
  items: [
    ...lib,
    ...hook,
    ...components,
    ...blocks,

    // Internal use only
    ...examples,
  ],
} satisfies Registry;
