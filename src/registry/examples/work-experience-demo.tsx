import type { ExperienceItemType } from "@/registry/work-experience";
import { WorkExperience } from "@/registry/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "sample-company",
    companyName: "Sample Company",
    companyLogo: "/images/iam.png",
    positions: [
      {
        id: "role-1",
        title: "Frontend Developer",
        employmentPeriod: "03.2024 - present",
        employmentType: "Part-time",
        icon: "code",
        description: `- Built and maintained UI features for a customer-facing web app.
- Collaborated with designers to implement pixel-accurate layouts.
- Improved performance and accessibility across key pages.`,
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        isExpanded: true,
      },
      {
        id: "role-2",
        title: "UI/UX Designer",
        employmentPeriod: "03.2024 - present",
        employmentType: "Part-time",
        icon: "design",
        description: `- Designed a simple design system and UI guidelines.
- Prototyped flows and iterated on usability feedback.`,
        skills: ["UI/UX Design", "Design System", "Figma"],
      },
      {
        id: "role-3",
        title: "Project Lead",
        employmentPeriod: "03.2024 - present",
        employmentType: "Part-time",
        icon: "business",
        description: `- Led project planning and stakeholder communication.
- Coordinated scope, priorities, and delivery timelines.`,
        skills: ["Project Management", "Communication"],
      },
    ],
    isCurrentEmployer: true,
  },
];

export default function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />;
}
