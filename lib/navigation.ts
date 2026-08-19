import { SITE } from "./site";

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

/** Every page the site owns, in navigation order — used by `ls` and the sitemap. */
export const ALL_ROUTES: string[] = [
  "/",
  ...MAIN_NAV.map((item) => item.href),
  "/cyber",
  "/contact",
];

export const SOCIAL_NAV: NavItem[] = [
  { label: "GitHub", href: SITE.links.github },
  { label: "LinkedIn", href: SITE.links.linkedin },
  { label: "Email", href: `mailto:${SITE.email}` },
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
