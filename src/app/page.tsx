import { EditorialHero } from "@/components/editorial-hero";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Section 1: Editorial magazine hero layout (LIGHT: Midnight Ink + Ice Blue) */}
        <EditorialHero />

        {/* Section 2: Selected Works & Projects (DARK: Obsidian) */}
        <ProjectsSection />

        {/* Section 3: Work Experience & Timeline (LIGHT: Midnight Ink + Ice Blue) */}
        <ExperienceSection />

        {/* Section 4: Technical Stack & Capabilities (DARK: Obsidian) */}
        <SkillsSection />

        {/* Section 5: Verified Credentials & Certifications (LIGHT: Midnight Ink + Ice Blue) */}
        <CertificationsSection />
      </main>

      {/* Section 6: Contact & Climax Footer (DARK: Obsidian) */}
      <ContactSection />
    </div>
  );
}
