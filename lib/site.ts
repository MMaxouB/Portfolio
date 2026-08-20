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
    "Portfolio of Maxime, a Software Engineer who builds software with a security mindset.",

  /** Canonical origin — required for metadataBase, sitemap and OG images. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** TODO: remplacer par la vraie adresse */
  email: "briere.maxime.28@gmail.com",

  links: {
    /** TODO: remplacer par le vrai profil */
    github: "https://github.com/MMaxouB",
    /** Discord username */
    discord: "https://discord.com/users/mmaxoub_87590",
  },
} as const;

/** True while the placeholders above have not been replaced. */
export const SITE_PLACEHOLDERS_PENDING =
  SITE.url.includes("example.com") || SITE.email.includes("example.com");
