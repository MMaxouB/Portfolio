import { Metadata } from "next";
import { Mail } from "lucide-react";
import { GitHubIcon, DiscordIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} — engineering work, security engagements and collaborations.`,
};

/**
 * Spec §12: extremely simple. Email, GitHub, LinkedIn — no form in V1, so
 * there is no input to validate, no rate limit to run and nothing stored.
 */
const CHANNELS = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
    note: "Best for project enquiries",
    external: false,
  },
  {
    label: "GitHub",
    value: SITE.links.github.replace(/^https?:\/\//, ""),
    href: SITE.links.github,
    icon: GitHubIcon,
    note: "Open source and public work",
    external: true,
  },
  {
    label: "Discord",
    value: "mmaxoub_87590",
    href: SITE.links.discord,
    icon: DiscordIcon,
    note: "Community & gaming",
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="container mx-auto min-h-screen max-w-3xl px-6 py-24">
      <SectionHeading
        as="h1"
        index="05"
        label="Contact"
        title="Let's build something."
        annotation="Remote · France"
        description="Engineering work, security engagements, or a problem with no clear answer yet — email is the fastest way to reach me."
        className="mb-16 max-w-2xl"
      />

      <ul className="flex flex-col">
        {CHANNELS.map(({ label, value, href, icon: Icon, note, external }, i) => (
          <Reveal key={label} delay={i * 0.06}>
           <li>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="group flex items-center gap-5 border-b border-border-subtle py-6 transition-colors first:border-t hover:bg-surface/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="title-block w-7 shrink-0 tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-border-subtle text-text-muted transition-colors group-hover:border-accent-dim group-hover:text-accent">
                <Icon size={16} aria-hidden="true" />
              </span>

              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold text-text-primary">
                  {label}
                </span>
                <span className="truncate font-mono text-xs text-text-muted">
                  {value}
                </span>
              </span>

              <span className="title-block ml-auto hidden shrink-0 sm:block">
                {note}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-4 shrink-0 bg-accent-dim transition-all duration-500 ease-out group-hover:w-9 group-hover:bg-accent sm:block"
              />
            </a>
           </li>
          </Reveal>
        ))}
      </ul>

      <p className="title-block mt-12">
        Based in France · Available for remote work
      </p>
    </div>
  );
}
