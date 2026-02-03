import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "고스트코어",
    companyName: "고스트코어",
    companyLogo: "/images/tech/ghostcore.gif",
    companyWebsite: "http://www.ghost-corps.com/",
    positions: [
      {
        id: "ghostcore-frontend & Publishing",
        title: "Frontend Developer & Publishing",
        employmentPeriod: {
          start: "2021.05",
          end: "2025.06",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- 초기에는 디자이너가 제공한 시안을 기반으로 Vue2(Option API) 환경에서 퍼블리싱 중심의 화면 개발을 담당
- HTML, CSS, JavaScript를 활용하여 반응형 UI를 구현하고, 운영 서비스 화면의 레이아웃 및 스타일 수정 업무 수행
- 이후 Vue3 및 Nuxt3(Composition API) 환경으로 전환되면서, 기존 퍼블리싱 결과물에 간단한 API 연동을 추가하여 데이터 기반 화면 구현 경험
- 백엔드에서 제공하는 API를 활용해 리스트, 상세, 상태 변경 등 기본적인 데이터 처리 로직을 화면 단에서 구현
- 기존 구조를 해치지 않는 범위 내에서 화면 수정 및 기능 보완 작업을 수행하며 운영 안정성 유지
- 운영 중 발생하는 이슈(브라우저 호환, 반응형 깨짐, 데이터 표시 오류 등)에 대한 수정 및 대응 경험
- 기획자, 디자이너, 백엔드 개발자와 협업하여 요구사항에 맞는 화면 구현 및 수정 작업 진행`,
        skills: [
          "Vue2",
          "Vue3",
          "Nuxt3",
          "TypeScript",
          "Pinia",
          "Pigma",
          "Responsive UI",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "mozaiq",
    companyName: "모자이크",
    companyLogo: "/images/tech/mozaiq.svg",
    companyWebsite: "https://mozaiq.co.kr//",
    positions: [
      {
        id: "mozaiq",
        title: "Publishing & Interaction",
        employmentPeriod: {
          start: "2025.08",
          end: "2025.10",
        },
        employmentType: "Part-time",
        icon: "education",
        description: `
        - Figma를 통해 전달받은 디자인을 기반으로, 서비스 전체 페이지에 대한 퍼블리싱 및 화면 구축을 단독으로 수행
- 프로젝트 초기 단계부터 파일 구조 설계, 폴더 및 컴포넌트 구조 정의 등 프론트엔드 기본 골격을 직접 구성
- Vue3 환경에서 공통 레이아웃, 페이지 단위 컴포넌트, 재사용 가능한 UI 컴포넌트들을 설계·구현
- 사용자 행동에 따라 화면 상태가 변화하는 다양한 인터랙션 요소를 직접 구현하며, 디자인 의도를 최대한 반영
- 초기 셋업부터 실제 화면 구현까지 전 과정을 담당하여, 퍼블리싱과 인터랙션 구현이 결합된 화면을 완성
- 작업 결과물이 이후 개발 및 운영 단계에서 확장 가능하도록 구조적 일관성을 고려하여 구현
        `,
        skills: ["Vue3", "Interaction"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "sunil",
    companyName: "선일일렉콤",
    companyLogo: "/images/tech/sunil.png",
    companyWebsite: "http://www.ezlighting.co.kr/",
    positions: [
      {
        id: "sunil-corporate",
        title: "자사사이트 Publishing",
        employmentPeriod: {
          start: "2018.12",
          end: "2021.04",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- 선일일렉콤 및 선일선박 자사 웹사이트의 화면 구축, 퍼블리싱 및 유지보수 업무 담당
- 디자이너 시안을 기반으로 HTML, CSS를 활용한 반응형 웹 퍼블리싱 수행
- 제품 인증, 스펙, 집계 정보 등 운영 콘텐츠 업데이트 및 관리
- 기존 사이트 리뉴얼 작업에 참여하여 레이아웃 개선 및 반응형 구조로 개편
- 운영 중 발생하는 UI 이슈 수정 및 브라우저 환경 대응 경험`,
        skills: ["HTML", "CSS", "Responsive UI", "WordPress", "Photoshop"],
      },
      {
        id: "sunil-parking-si",
        title: "주차관리 시스템 Publishing & Frontend",
        employmentPeriod: {
          start: "2020.04",
          end: "2021.04",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- SI 주차관리 시스템 웹 프로그램 개발 프로젝트에 퍼블리셔/프론트엔드로 참여
- 화면 흐름에 따른 UI 구조 설계 및 화면 정의 작업 수행
- Vue 환경에서 HTML, CSS 기반 퍼블리싱 및 화면 구성
- 사용자 입력과 상태 변화에 따른 양방향 데이터 표시 화면 구현
- 디자이너, 개발자와 협업하여 기능 요구사항에 맞는 화면 구현
        `,
        skills: ["Vue2", "HTML", "CSS", "UI/UX Design"],
      },
      {
        id: "sunil-shoppingmall",
        title: "쇼핑몰 사이트 Publishing & Design",
        employmentPeriod: {
          start: "2018.12",
          end: "2019.05",
        },
        employmentType: "Full-time",
        icon: "idea",
        description: `- 자사 쇼핑몰 사이트의 퍼블리싱, 디자인 수정 및 운영 관리 업무 담당
- 상품 페이지, 이벤트 페이지 등 화면 구성 및 스타일 수정 작업 수행
- 사이트 리뉴얼을 통해 레이아웃 개선 및 사용자 편의성 강화
- 홍보 영상 촬영 및 편집을 통해 온라인 콘텐츠 관리 및 운영 지원
        `,
        skills: ["HTML", "CSS", "UI/UX Design", "Photoshop"],
      },
    ],
    isCurrentEmployer: true,
  },
  //   {
  //     id: "quaric",
  //     companyName: "Quaric Co., Ltd.",
  //     companyLogo: "https://assets.chanhdai.com/images/companies/quaric.svg",
  //     companyWebsite: "https://quaric.com",
  //     positions: [
  //       {
  //         id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
  //         title: "Design Engineer",
  //         employmentPeriod: {
  //           start: "03.2024",
  //         },
  //         employmentType: "Part-time",
  //         icon: "code",
  //         description: `- Created Quaric Brand Identity.
  // - Created the Quaric Design System to standardize design practices and accelerate development.

  // In-house Project: [Quaric Website](https://quaric.com)
  // - Designed the UI/UX for Quaric Website, delivering a seamless experience.
  // - Developed online ordering to streamline purchases.
  // - Integrated VNPAY-QR for secure transactions.
  // - Registered the e-commerce site with [online.gov.vn](http://online.gov.vn/website/chi-tiet-115855) for compliance.

  // In-house Project: [ZaDark](https://zadark.com)
  // - Build and maintain ZaDark.com with Docusaurus, integrating AdSense.
  // - Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox — with 20k+ active users via Chrome Web Store (as of Sep 2025).`,
  //         skills: [
  //           "Next.js",
  //           "Strapi",
  //           "Auth0",
  //           "VNPAY-QR",
  //           "Docker",
  //           "NGINX",
  //           "Google Cloud",
  //           "Docusaurus",
  //           "Extension",
  //           "UI/UX Design",
  //           "UX Writing",
  //           "Design System",
  //           "Brand Design",
  //           "Figma",
  //           "Research",
  //         ],
  //       },
  //       {
  //         id: "991692c4-7d02-4666-8d31-933c4831768d",
  //         title: "Founder & Director",
  //         employmentPeriod: {
  //           start: "03.2024",
  //         },
  //         employmentType: "Part-time",
  //         icon: "idea",
  //         description: `- Lead and manage the company's strategy.
  // - Oversee technical teams and product development.
  // - Manage relationships with customers and partners.`,
  //         skills: ["Business Ownership", "Business Law", "Business Tax"],
  //       },
  //     ],
  //     isCurrentEmployer: true,
  //   },
  //   {
  //     id: "tungtung",
  //     companyName: "Tung Tung JSC",
  //     companyLogo: "https://assets.chanhdai.com/images/companies/tungtung.webp",
  //     positions: [
  //       {
  //         id: "3e831244-8d8c-41e2-b2ce-7f3946956afd",
  //         title: "Web Developer",
  //         employmentPeriod: {
  //           start: "2020",
  //           end: "2022",
  //         },
  //         employmentType: "Full-time",
  //         description: `- Built a scalable design system for consistency and efficiency.
  // - Built a complex rich-text editor based on ProseMirror and Slate for customizable content creation.
  // - Integrated APIs with the Backend Team to enhance functionality.`,
  //         icon: "code",
  //         skills: [
  //           "React",
  //           "Redux",
  //           "Storybook",
  //           "Lerna",
  //           "Agile",
  //           "Teamwork",
  //           "Research",
  //         ],
  //       },
  //       {
  //         id: "13bd34c3-db84-4fad-8132-a6c89a42957e",
  //         title: "Mobile Developer",
  //         employmentPeriod: {
  //           start: "2019",
  //           end: "2020",
  //         },
  //         employmentType: "Full-time",
  //         description: `- Rebuilt the app with React Native for better UX and performance.
  // - Integrated MoMo and in-app purchases for seamless payments.
  // - Optimized deployment for staging and production.
  // - Published on App Store and Google Play, ensuring compliance.`,
  //         icon: "code",
  //         skills: [
  //           "React Native",
  //           "Redux",
  //           "MoMo Payment API",
  //           "App Store",
  //           "Google Play Store",
  //           "App Center",
  //           "Agile",
  //           "Teamwork",
  //           "Research",
  //         ],
  //       },
  //       {
  //         id: "73151add-7adf-4035-a237-b5803ceb5478",
  //         title: "UI/UX Designer",
  //         employmentPeriod: {
  //           start: "2018",
  //           end: "2019",
  //         },
  //         employmentType: "Full-time",
  //         description: `- Designed a Landing Page for enterprise clients.
  // - Redesigned the Online Quiz Platform for a modern look on web and mobile.
  // - Redesigned the Pricing interface for individual customers.
  // - Enhanced UX by improving usability, navigation, and user flow.`,
  //         icon: "design",
  //         skills: ["UI/UX Design", "Sketch"],
  //       },
  //     ],
  //   },
  //   {
  //     id: "freelance",
  //     companyName: "Freelance",
  //     positions: [
  //       {
  //         id: "f0becfba-057d-40db-b252-739e1654faa1",
  //         title: "Full-stack Developer",
  //         employmentPeriod: {
  //           start: "2018",
  //           end: "2020",
  //         },
  //         employmentType: "Part-time",
  //         description: `- Built an order management website with real-time delivery tracking.
  // - Developed an e-commerce site for bird's nest products.
  // - Created a map to display monitoring station data.
  // - Designed a customizable WordPress landing page.`,
  //         icon: "code",
  //         skills: [
  //           "Laravel",
  //           "React",
  //           "Express.js",
  //           "Socket.IO",
  //           "MongoDB",
  //           "Firebase",
  //           "WordPress",
  //           "Docker",
  //           "NGINX",
  //         ],
  //       },
  //       {
  //         id: "0eecdfcb-028d-41f4-93e9-1269ba7eff7e",
  //         title: "Graphic & UI/UX Designer",
  //         employmentPeriod: {
  //           start: "2018",
  //           end: "2019",
  //         },
  //         employmentType: "Part-time",
  //         description: "Designed logos, posters, ads, and UI.",
  //         icon: "design",
  //         skills: [
  //           "Creativity",
  //           "UI/UX Design",
  //           "Graphic Design",
  //           "Sketch",
  //           "Adobe Photoshop",
  //           "Adobe Illustrator",
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: "education",
  //     companyName: "Education",
  //     positions: [
  //       {
  //         id: "c47f5903-88ae-4512-8a50-0b91b0cf99b6",
  //         title: "University of Science — VNUHCM",
  //         employmentPeriod: {
  //           start: "08.2018",
  //           end: "10.2026",
  //         },
  //         icon: "education",
  //         description: `- Currently studying for a Bachelor's degree in Information Systems.
  // - Language Proficiency: B1 level in English (CEFR).
  // - Achieved several awards, including:
  //   - Bronze Medal — 10th Design, Manufacturing, and Application Award 2022
  //   - 2nd Prize — Business Startup Competition 2019`,
  //         skills: [
  //           "C++",
  //           "Java",
  //           "Python",
  //           "Data Structures",
  //           "Algorithms",
  //           "Advanced Databases",
  //           "Systems Design",
  //           "Distributed Systems",
  //           "Software Engineering",
  //           "Self-learning",
  //           "Teamwork",
  //           "Presentation",
  //         ],
  //       },
  //       {
  //         id: "70131ed8-36d9-4e54-8c78-eaed18240eca",
  //         title: "Ly Tu Trong High School for the Gifted — Can Tho City",
  //         employmentPeriod: {
  //           start: "08.2015",
  //           end: "06.2018",
  //         },
  //         icon: "education",
  //         description: `- Student of the Specialized Computer Science Program.
  // - Granted direct admission to university due to achieving 3rd Prize at the national level.
  // - [Achieved numerous awards](https://baocantho.com.vn/nguyen-chanh-dai-17-tuoi-va-19-giai-thuong-a97348.html) at city and national levels, including:
  //   - [3rd Prize](https://muctim.tuoitre.vn/cong-cu-ho-tro-viec-day-va-hoc-55107.htm) — National Science and Engineering Fair 2018 (ViSEF)
  //   - 1st Prize — Can Tho City Science and Engineering Fair 2018
  //   - Creativity Award — Binh Duong Hackathon 2017
  //   - Consolation Prize — National Youth and Children's Creativity Contest 2016
  //   - [1st Prize](https://www.youtube.com/watch?v=OYgugvjqU4A) — Can Tho City Youth and Children's Creativity Contest 2016
  //   - 3rd Prize — National Young Informatics Contest 2016
  // - Achieved the title of Outstanding Student from Grade 10-12.
  // - Selected for the National Excellent Student Contest in Informatics for two consecutive years during high school.
  // - Honored on the school's "Hall of Fame" for academic achievements.
  // - Developed a feature using Node.js and Pandoc to recognize multiple-choice questions from .docx files and upload them to an [online quiz platform](https://youtu.be/QjR99wdmTyo) I created.
  // - Developed websites based on Laravel framework.
  // - Built websites with PHP and MySQL, following the MVC architecture.`,
  //         skills: [
  //           "Algorithms",
  //           "C++",
  //           "PHP",
  //           "MySQL",
  //           "Laravel",
  //           "Node.js",
  //           "Pandoc",
  //           "Self-learning",
  //         ],
  //       },
  //       {
  //         id: "36c4c6fb-02d0-48c0-8947-fda6e9a24af7",
  //         title: "Thuan Hung Secondary School",
  //         employmentPeriod: {
  //           start: "08.2011",
  //           end: "06.2015",
  //         },
  //         icon: "education",
  //         description: `- Recognized as the most outstanding student of the district.
  // - Achieved numerous awards at city and national levels:
  //   - Consolation Prize — National Young Informatics Contest 2015
  //   - Consolation Prize — National Young Informatics Contest 2014
  //   - 1st Prize — Can Tho City Young Informatics Contest 2014
  // - Achieved the title of Outstanding Student from Grade 6-9.
  // - Developed websites using the open-source NukeViet CMS.`,
  //         skills: [
  //           "Pascal",
  //           "NukeViet",
  //           "HTML",
  //           "CSS",
  //           "JavaScript",
  //           "Self-learning",
  //         ],
  //       },
  //     ],
  //   },
];
