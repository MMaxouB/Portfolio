import { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { SKILLS } from "@/lib/skills";
import { SkillExplorer } from "@/components/expertise/SkillExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Skills, proficiency levels and technology areas — grounded in real projects, not claims.",
};

export default function ExpertisePage() {
  return (
    <div className="container mx-auto min-h-screen max-w-6xl px-6 py-28">
      <SectionHeading
        as="h1"
        index="02"
        label="Expertise"
        title="Measured, not claimed."
        annotation={`${SKILLS.length} skills · select to inspect`}
        description="My own assessment of practical skill across languages, engineering, AI tools and security. Select any skill to see the projects behind it."
        className="mb-20 max-w-3xl"
      />

      <SkillExplorer projects={getProjects()} />
    </div>
  );
}
