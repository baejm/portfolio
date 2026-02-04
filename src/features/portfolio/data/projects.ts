import type { ProjectCard } from "@/types/project-card";

export const PROJECT_CARDS: ProjectCard[] = [
  {
    id: "run-crew",
    title: "RUN-Crew 러닝 신청 서비스",
    period: { start: "2024.10", end: "2024.12" },
    summary:
      "러닝 크루 모집 및 신청을 위한 웹 애플리케이션입니다. Nuxt3 기반 UI 구조 설계와 Firebase 인증/데이터 연동을 구현했습니다.",
    highlights: [
      "Nuxt3 기반 화면/컴포넌트 구조 설계",
      "Firebase 인증 및 데이터 저장 연동",
      "상태 변화 기반 UI 인터랙션 구현",
      "반응형 UI 대응",
    ],
    tech: ["Nuxt3", "Vue", "Firebase", "Tailwind", "Responsive UI"],
    media: {
      type: "video",
      src: "/media/run-crew.mp4",
      // poster: "/media/run-crew-poster.jpg",
    },
    links: [
      { label: "사이트", href: "https://nuxt3-crew2.web.app/", kind: "site" },
      {
        label: "소스",
        href: "https://github.com/baejm/run-crew",
        kind: "source",
      },
    ],
    isFeatured: false,
  },
  {
    id: "parking-admin",
    title: "Parking-Admin 관리자 주차 프로그램",
    period: { start: "2021.01", end: "2021.04" },
    summary:
      "Vue2 기반으로 제작한 관리자용 주차 시스템 UI입니다. 실시간 주차 정보 확인 및 차량/결제 관리를 할 수 있습니다.",
    highlights: [
      "Vue2 환경에서 관리자 UI 전반 구축",
      "실시간 주차 정보 표시 기능 구현",
      "출차시간·차량정보·금액 확인 및 제어 화면 구현",
      "Vuex 상태관리 및 Vue-Socket.IO 연동 경험",
    ],
    tech: ["Vue2", "Vue-Socket.IO", "Vuex", "Responsive UI"],
    media: {
      type: "image",
      src: "/media/parking-admin-screenshot.gif",
      alt: "Parking-Admin 관리자 UI",
    },
    links: [
      {
        label: "사이트",
        href: "https://baejm.github.io/parking-admin",
        kind: "site",
      },
      {
        label: "소스",
        href: "https://github.com/baejm/parking-admin",
        kind: "source",
      },
    ],
  },
  {
    id: "blog-nuxt",
    title: "Blog-Nuxt 개인 블로그",
    period: { start: "2023.07", end: "2023.08" },
    summary:
      "Nuxt 기반으로 제작한 개인 블로그 프로젝트로, 콘텐츠 구조와 화면 레이아웃에 집중한 프론트엔드 중심 프로젝트입니다.",
    highlights: [
      "Nuxt 기반 블로그 화면 구조 설계",
      "게시글 목록 및 상세 페이지 레이아웃 구현",
      "레이아웃/컴포넌트 분리를 통한 재사용 구조 구성",
      "퍼블리싱 중심의 UI 구현 및 스타일링",
    ],
    tech: ["Nuxt", "Vue", "UI Publishing", "Component Structure"],
    media: {
      type: "image",
      src: "/media/blog-nuxt-screenshot.gif",
      alt: "Nuxt 기반 개인 블로그 UI",
    },
    links: [
      {
        label: "소스",
        href: "https://github.com/baejm/blog-nuxt",
        kind: "source",
      },
    ],
  },
  {
    id: "rolling-team4",
    title: "Rolling-Team4 협업 UI 프로젝트",
    period: { start: "2025.07", end: "2025.08" },
    summary:
      "팀 프로젝트로 수행한 협업형 웹 애플리케이션입니다. UI/UX 구조 설계 및 컴포넌트 단위 화면 구현에 집중하여 사용자 피드백 기반 롤링페이퍼 기능을 구현했습니다.",
    highlights: [
      "팀 기반 UI/UX 설계 및 화면 구조 설계 참여",
      "컴포넌트 단위 화면 구현 및 상태 관리",
      "협업 메시지/롤링 기능 구현",
      "Vue 기반 라이프사이클과 상태 흐름 이해",
    ],
    tech: ["Vue", "Vue Router", "Vuex", "Component Driven UI"],
    media: {
      type: "video",
      src: "/media/rolling-team4.mp4",
    },
    links: [
      {
        label: "소스",
        href: "https://github.com/yujin-fe/Rolling-team4",
        kind: "source",
      },
    ],
  },
  {
    id: "linkbrary",
    title: "Linkbrary 웹 즐겨찾기",
    period: { start: "2025.09", end: "2025.10" },
    summary:
      "개인용 웹 즐겨찾기 서비스로, 폴더/링크 CRUD와 즐겨찾기 기능을 중심으로 인증·검색·페이지네이션까지 구현한 프로젝트입니다.",
    highlights: [
      "Next.js 14(App Router) 기반 화면 구성",
      "JWT 인증 및 토큰 만료 처리",
      "React Query 기반 서버 상태 관리/캐싱(useQuery/useMutation)",
      "즐겨찾기 토글 Optimistic Update로 즉시 UI 반영",
      "폴더/링크 CRUD, Pagination + Debounce 검색",
      "URL SearchParams로 폴더 선택 상태 동기화(새로고침 유지)",
      "Skeleton UI / Empty State 처리",
    ],
    tech: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "React Query",
      "JWT",
      "Custom Hooks",
    ],
    media: {
      type: "video",
      src: "/media/linkbrary.mp4",
    },
    links: [
      {
        label: "사이트",
        href: "https://linkbrary-gilt.vercel.app/",
        kind: "site",
      },
      {
        label: "소스",
        href: "https://github.com/baejm/Linkbrary",
        kind: "source",
      },
    ],
    isFeatured: false,
  },
  {
    id: "global-nomad",
    title: "GlobalNomad 여행 체험 예약 플랫폼",
    period: { start: "2025.12", end: "2026.01" },
    summary:
      "여행 체험 상품을 탐색하고 예약할 수 있는 웹 플랫폼으로, 팀 프로젝트로 진행한 프론트엔드 중심 서비스입니다. 최신 React/Next.js 환경에서 화면 구조와 예약 흐름 UI 구현을 담당했습니다.",
    highlights: [
      "Next.js(App Router) 기반 서비스 화면 구조 설계",
      "체험 상세 페이지 및 예약 플로우 UI 구현",
      "React Query를 활용한 데이터 패칭 및 캐싱 처리",
      "컴포넌트 단위 설계로 화면 재사용성 및 유지보수성 확보",
      "팀 협업 환경에서 기획/디자인/백엔드와 연계하여 화면 구현",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "Tailwind CSS",
      "Team Collaboration",
    ],
    media: {
      type: "video",
      src: "/media/global-nomad.mp4",
    },
    links: [
      {
        label: "소스",
        href: "https://github.com/baejm/GlobalNomad",
        kind: "source",
      },
    ],
  },
  {
    id: "shinsegae-point",
    title: "신세계포인트 웹/모바일 서비스",
    period: { start: "2021.05", end: "2024.06" },
    summary:
      "신세계포인트 웹 및 모바일 서비스의 프론트엔드 화면 개발과 운영 유지보수를 담당했습니다. Vue2 기반 환경에서 안정적인 서비스 운영을 중심으로 페이지 단위 개발과 UI 개선 업무를 수행했습니다.",
    highlights: [
      "Vue2(Option API) 기반 운영 서비스 화면 개발 및 유지보수",
      "Vue Router를 활용한 페이지 전환 및 라우팅 구조 관리",
      "Vuex 상태 관리를 통한 공통 데이터 및 화면 상태 처리",
      "기획 변경, 프로모션, 운영 이슈에 따른 화면 수정 및 배포 대응",
      "모바일 환경(m.shinsegaepoint.com)을 포함한 반응형 UI 퍼블리싱",
      "브라우저 환경 차이로 인한 UI 이슈 및 버그 수정",
    ],
    tech: [
      "Vue2",
      "Vue Router",
      "Vuex",
      "Option API",
      "Responsive UI",
      "Service Operation",
    ],
    media: {
      type: "video",
      src: "/media/shinsegae-point.mp4",
    },
    links: [
      {
        label: "사이트",
        href: "https://www.shinsegaepoint.com/",
        kind: "site",
      },
      {
        label: "모바일전용",
        href: "https://www.m.shinsegaepoint.com/",
        kind: "site",
      },
    ],
  },
  {
    id: "cj-onstyle",
    title: "CJ온스타일 프론트엔드 모듈 개발",
    period: { start: "2025.01", end: "2025.06" },
    summary:
      "CJ온스타일 웹·모바일·앱 환경에서 공통으로 사용되는 프론트엔드 모듈 개발에 참여했습니다. Vue3와 Nuxt3 기반 환경에서 신규 화면 및 모듈 구현을 담당했습니다.",
    highlights: [
      "Vue3 + Nuxt3 기반 프론트엔드 모듈 및 화면 개발",
      "Composition API를 활용한 컴포넌트 단위 구현",
      "Pinia 상태 관리를 통한 공통 데이터 및 UI 상태 처리",
      "Vue Router 기반 페이지 및 화면 흐름 구성",
      "TypeScript 적용을 통한 컴포넌트 및 상태 타입 안정성 확보",
      "모바일, PC, 앱(WebView) 공통 대응 UI 개발",
      "기획·디자인·백엔드와 협업하여 요구사항 기반 화면 구현",
    ],
    tech: [
      "Vue3",
      "Nuxt3",
      "Composition API",
      "Pinia",
      "Vue Router",
      "TypeScript",
      "Multi-platform UI",
    ],
    media: {
      type: "video",
      src: "/media/cj-onstyle.mp4",
    },
    links: [
      {
        label: "사이트",
        href: "https://display.cjonstyle.com/p/homeTab/main?hmtabMenuId=H00005",
        kind: "site",
      },
    ],
  },
  {
    id: "mozaiq",
    title: "MOZAIQ 인터랙티브 웹 프로젝트",
    period: { start: "2025.08", end: "2025.10" },
    summary:
      "Figma 디자인을 기반으로 전체 페이지 퍼블리싱과 인터랙션 구현을 담당한 웹 프로젝트입니다. 초기 세팅부터 파일 구조와 컴포넌트 구조를 직접 설계하여 화면을 구축했습니다.",
    highlights: [
      "Figma 디자인 시안을 기반으로 전체 페이지 퍼블리싱 수행",
      "프로젝트 초기 세팅 및 파일/폴더 구조 설계",
      "컴포넌트 단위 구조 설계 및 화면 구성",
      "사용자 동작에 따른 다양한 UI 인터랙션 구현",
      "페이지 전반의 인터랙션 흐름을 고려한 UI 구성",
      "반응형 UI 대응 및 디바이스별 화면 최적화",
    ],
    tech: [
      "Vue3",
      "UI Publishing",
      "Interaction",
      "Component Architecture",
      "Responsive UI",
      "Figma",
    ],
    media: {
      type: "video",
      src: "/media/mozaiq.mp4",
      // poster: "/media/mozaiq-poster.jpg",
    },
    links: [
      {
        label: "사이트",
        href: "https://mozaiq.co.kr/",
        kind: "site",
      },
    ],
  },
];
