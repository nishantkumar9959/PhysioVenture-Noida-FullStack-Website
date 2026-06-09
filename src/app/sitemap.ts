import { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/services-data";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, ""); // strip trailing slash if present

  // Core static pages with optimized frequencies and priorities
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/services/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/testimonials/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blogs/", priority: 0.9, changeFrequency: "weekly" as const }, // High-priority dynamic blog hub
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/book/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "monthly" as const }, // Legal compliance pages (low priority)
    { path: "/terms/", priority: 0.3, changeFrequency: "monthly" as const },   // Legal compliance pages (low priority)
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Individual service detail landing pages (Hub-and-Spoke model)
  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: service.isSubService ? 0.7 : 0.8, // Primary services get 0.8, sub-services/treatments get 0.7
  }));

  // Blog category archive/filter landing pages
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
    priority: 0.6,
  }));

  // Individual blog posts with precise lastModified timestamps derived from the article metadata
  const blogRoutes = BLOG_ARTICLES.map((article) => {
    let lastModifiedDate = new Date();
    try {
      if (article.date) {
        const parsedDate = new Date(article.date);
        if (!isNaN(parsedDate.getTime())) {
          lastModifiedDate = parsedDate;
        }
      }
    } catch {
      // Fallback to build time in case of any parsing exception
    }

    return {
      url: `${baseUrl}/blogs/${article.slug}/`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...blogCategoryRoutes, ...blogRoutes];
}
