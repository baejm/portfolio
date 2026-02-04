import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://portfolio-seven-xi-33.vercel.app",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Blog",
    href: "https://bangj.tistory.com/",
  },
  // {
  //   title: "Blog",
  //   href: "/blog",
  // },
  // {
  //   title: "Sponsors",
  //   href: "/sponsors",
  // },
];

export const GITHUB_USERNAME = "baejm";
export const SOURCE_CODE_GITHUB_REPO = "baejm/portfolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/baejm/portfolio";

export const SPONSORSHIP_URL = "https://github.com/sponsors/baejm";

export const UTM_PARAMS = {
  utm_source: "baejm",
};
