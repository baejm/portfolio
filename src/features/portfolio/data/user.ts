import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "배정민",
  lastName: "배",
  displayName: "배정민",
  username: "baejm",
  gender: "male",
  pronouns: "남성",
  bio: "퍼블리싱을 기반으로 프론트엔드 영역까지 확장해온 개발자입니다.",
  flipSentences: [
    "퍼블리싱을 기반으로 프론트엔드 영역까지 확장해온 개발자입니다.",
    "Publishing · Frontend",
    "Next.js · React · TypeScript",
    "Vuejs · Nuxt · Javascript",
  ],

  address: "서울 노원구",
  phoneNumber: "KzgyMTA2Mjc0ODEwMw==",
  email: "anVrbWFuQG5hdmVyLmNvbQ==",
  website: "https://portfolio-seven-xi-33.vercel.app/",

  jobTitle: "포트폴리오",
  jobs: [{ title: "퍼블리셔/프론트엔드", company: "", website: "" }],

  about: `
- 퍼블리싱 실무 경험을 바탕으로 프론트엔드 영역까지 확장해온 웹 개발자
- HTML/CSS 기반 마크업과 반응형 퍼블리싱을 주력으로 UI 구현을 담당
- React·Next.js를 활용한 화면 개발과 인터랙션 구현을 병행하고 있습니다.

**관심 영역**
- 디자인 의도를 정확히 반영하는 UI 구현
- 화면 단위 UI 설계와 인터랙션 구현
- 변경에 유연한 구조와 스타일 관리 방식

**Role Focus**
- UI Publishing / Markup • Frontend UI Development
`,

  avatar: "/images/iam.png",
  ogImage: "/images/iam4.png",

  // ✅ 발음 오디오 (없으면 빈 값 or 파일 제거)
  namePronunciationUrl: "",

  // ✅ 기타
  timeZone: "Asia/Seoul",
  keywords: [
    "frontend developer",
    "next.js",
    "react",
    "typescript",
    "portfolio",
  ],
  dateCreated: "2026-01-29",
} satisfies User;
