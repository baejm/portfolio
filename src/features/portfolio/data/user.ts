import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "정민",
  lastName: "배",
  displayName: "배정민",
  username: "baejm",
  gender: "male",
  pronouns: "그/그의",
  bio: "프론트엔드 개발자입니다.",
  flipSentences: [
    "퍼블리싱을 기반으로 프론트엔드 영역까지 확장해온 개발자입니다.",
    "Next.js · React · TypeScript",
    "Publishing · Frontend",
  ],

  address: "Seoul, KR",
  phoneNumber: "",
  email: "anVrbWFuQG5hdmVyLmNvbQ==",
  website: "https://portfolio-seven-xi-33.vercel.app/",

  jobTitle: "웹 퍼블리셔",
  jobs: [{ title: "웹 퍼블리셔", company: "", website: "" }],

  about: `
- 사용자 경험을 고려한 UI 구현에 집중합니다.
- Next.js / React 기반의 프론트엔드 개발을 합니다.
- 디자인 의도에 맞는 인터랙션과 퍼블리싱에 강점이 있습니다.
`,

  avatar: "/images/iam.png",
  ogImage: "/images/iam4.png",

  namePronunciationUrl: "",

  timeZone: "Asia/Seoul",
  keywords: [
    "frontend developer",
    "next.js",
    "react",
    "typescript",
    "portfolio",
  ],
  dateCreated: "2026-02-04",
} satisfies User;
