import { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/services-data";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

// Helper function to safely parse custom date strings in blogs-data (e.g. "June 01, 2026")
function parseArticleDate(dateStr: string): Date {
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  } catch {
    // ignore and return fallback below
  }
  return new Date(); // fallback to build/current time
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, ""); // strip trailing slash if present

  // 1. Determine the latest blog article date across the entire publication
  let overallLatestBlogDate = new Date("2026-03-01"); // baseline fallback date
  BLOG_ARTICLES.forEach((article) => {
    if (article.date) {
      const parsedDate = parseArticleDate(article.date);
      if (parsedDate > overallLatestBlogDate) {
        overallLatestBlogDate = parsedDate;
      }
    }
  });

  // 2. Core static pages with optimized frequencies, priorities and dynamic lastModified dates
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const, lastModified: overallLatestBlogDate }, // Home is updated when new blogs publish
    { path: "/services/", priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/testimonials/", priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/blogs/", priority: 0.9, changeFrequency: "weekly" as const, lastModified: overallLatestBlogDate }, // Blogs hub is updated on new publishes
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/book/", priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/privacy/", priority: 0.3, changeFrequency: "monthly" as const, lastModified: new Date() },
    { path: "/terms/", priority: 0.3, changeFrequency: "monthly" as const, lastModified: new Date() },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 3. Individual service detail landing pages (Hub-and-Spoke model)
  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: service.isSubService ? 0.7 : 0.8, // Primary services get 0.8, sub-services/treatments get 0.7
  }));

  // 4. Dynamically generate blog category routes based on actual content
  const blogCategorySlugs = Array.from(
    new Set(
      BLOG_ARTICLES.map((article) =>
        article.category.toLowerCase().replace(/\s+/g, "-")
      )
    )
  );

  const blogCategoryRoutes = blogCategorySlugs.map((slug) => {
    // Find articles belonging to this category
    const categoryArticles = BLOG_ARTICLES.filter(
      (article) => article.category.toLowerCase().replace(/\s+/g, "-") === slug
    );

    // Compute the latest modification date among articles in this specific category
    let latestCategoryDate = new Date("2026-03-01"); // baseline fallback date
    categoryArticles.forEach((article) => {
      if (article.date) {
        const parsedDate = parseArticleDate(article.date);
        if (parsedDate > latestCategoryDate) {
          latestCategoryDate = parsedDate;
        }
      }
    });

    return {
      url: `${baseUrl}/blogs/category/${slug}/`,
      lastModified: latestCategoryDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  // 5. Individual blog posts with precise lastModified timestamps derived from the article metadata
  const blogRoutes = BLOG_ARTICLES.map((article) => {
    const lastModifiedDate = article.date ? parseArticleDate(article.date) : new Date();

    return {
      url: `${baseUrl}/blogs/${article.slug}/`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...blogCategoryRoutes, ...blogRoutes];
}
