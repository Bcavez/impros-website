import type { MetadataRoute } from "next";
import { shows, showCategories } from "@/data/shows";
import { corporateServices } from "@/data/corporate";

const BASE = "https://impro.be";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/cours`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cours/initiation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/spectacles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/entreprises`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/a-propos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(showCategories).map((cat) => ({
    url: `${BASE}/spectacles/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const showRoutes: MetadataRoute.Sitemap = shows.map((show) => ({
    url: `${BASE}/spectacles/${show.category}/${show.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = corporateServices.map((svc) => ({
    url: `${BASE}/entreprises/${svc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...showRoutes, ...serviceRoutes];
}
