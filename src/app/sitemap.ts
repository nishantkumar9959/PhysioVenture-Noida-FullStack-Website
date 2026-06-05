import { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/services-data";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, ""); // strip trailing slash if present

  const staticRoutes = [
    "/",
    "/services/",
    "/about/",
    "/testimonials/",
    "/blogs/",
    "/contact/",
    "/book/",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));

  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogCategorySlugs = [
    "orthopedic-care",
    "neurological-rehabilitation",
    "sports-rehabilitation",
    "home-physiotherapy",
    "geriatric-care"
  ];

  const blogCategoryRoutes = blogCategorySlugs.map((slug) => ({
    url: `${baseUrl}/blogs/category/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blogs/${article.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogCategoryRoutes, ...blogRoutes];
}
