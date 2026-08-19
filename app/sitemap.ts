import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/navigation";
import { getProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = ALL_ROUTES.map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const projects: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
