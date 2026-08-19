import { Hero } from "@/components/hero/Hero";
import { HomeSection } from "@/components/home/HomeSection";
import { ExpertisePreview } from "@/components/home/ExpertisePreview";
import { TimelinePreview } from "@/components/home/TimelinePreview";
import { CyberPreview } from "@/components/home/CyberPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { SKILLS } from "@/lib/skills";
import { TIMELINE } from "@/lib/timeline";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <HomeSection
        index="01"
        label="Selected work"
        title="A few systems worth explaining."
        annotation={`${featured.length} of ${getProjects().length} projects`}
        description="Each plate carries the project's architecture as a figure. The full register is one click away."
        href="/projects"
        hrefLabel="All projects"
      >
        <ProjectGrid projects={featured} />
      </HomeSection>

      <HomeSection
        index="02"
        label="Expertise"
        title="Measured, not claimed."
        annotation={`${SKILLS.length} skills tracked`}
        description="Levels are a personal assessment of practical depth. Every one of them is tied to a project you can open."
        href="/expertise"
        hrefLabel="Full breakdown"
      >
        <ExpertisePreview />
      </HomeSection>

      <HomeSection
        index="03"
        label="Progression"
        title="How it got here."
        annotation={`${TIMELINE.length} milestones`}
        href="/timeline"
        hrefLabel="Full timeline"
      >
        <TimelinePreview />
      </HomeSection>

      <HomeSection
        index="04"
        label="Cyber / Lab"
        title="Security as a discipline."
        annotation="Specialisation"
        href="/cyber"
        hrefLabel="Enter the lab"
      >
        <CyberPreview />
      </HomeSection>

      <ContactCta />

    </>
  );
}
