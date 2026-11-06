import { EditorialHero } from "@/components/editorial-hero";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Editorial magazine hero layout for the top of the page (LIGHT) */}
        <EditorialHero />

        {/* Selected Works & Projects (DARK) */}
        <ProjectsSection />

        {/* Work Experience & Timeline (LIGHT) */}
        <ExperienceSection />

        {/* Technical Stack & Capabilities (DARK) */}
        <SkillsSection />
      </main>

      {/* Climax Footer (LIGHT) */}
      <ContactSection />
    </div>
  );
}

// Refresh 1793953438913