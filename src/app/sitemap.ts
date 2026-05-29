import { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/services-data";
import { BLOG_ARTICLES } from "@/lib/blogs-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://physioventurenoida.vercel.app";

  const staticRoutes = [
    "",
    "/services",
    "/about",
    "/testimonials",
    "/blogs",
    "/contact",
    "/book",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blogs/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
