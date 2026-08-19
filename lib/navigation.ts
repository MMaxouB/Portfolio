export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Expertise", href: "/expertise" },
  { label: "Timeline", href: "/timeline" },
  { label: "About", href: "/about" },
];

export const SOCIAL_NAV: NavItem[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:email@example.com" },
];

/**
 * Anything that is not an app route — https:, mailto:, tel: … Router.push()
 * cannot handle these, they have to go through window.open / location.
 */
export function isExternalHref(href: string): boolean {
  return !href.startsWith("/");
}

/** Look up a social link by label, so callers can fail loudly when it is gone. */
export function getSocialHref(label: string): string | undefined {
  return SOCIAL_NAV.find((item) => item.label === label)?.href;
}
