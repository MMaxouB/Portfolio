/**
 * Single source of truth for identity, URLs and contact details.
 *
 * ⚠️ REMPLIR AVANT MISE EN LIGNE — les valeurs ci-dessous sont des placeholders.
 * Tout le site (nav, footer, palette, terminal, metadata, sitemap, OG) lit ici.
 */

export const SITE = {
  name: "Maxime",
  role: "Software Engineer",
  tagline: "Software / Engineering / Security",
  description:
    "Portfolio of Maxime, Software Engineer building software that matters with a security mindset.",

  /** Canonical origin — required for metadataBase, sitemap and OG images. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** TODO: remplacer par la vraie adresse */
  email: "hello@example.com",

  links: {
    /** TODO: remplacer par le vrai profil */
    github: "https://github.com/example",
    /** TODO: remplacer par le vrai profil */
    linkedin: "https://linkedin.com/in/example",
  },
} as const;

/** True while the placeholders above have not been replaced. */
export const SITE_PLACEHOLDERS_PENDING =
  SITE.url.includes("example.com") || SITE.email.includes("example.com");
