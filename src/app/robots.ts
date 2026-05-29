import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      // Explicitly allow Google Search bot
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/api/",
      },
      // Explicitly allow Bing / Microsoft Copilot bot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: OpenAI ChatGPT browsing
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: OpenAI GPTBot (training + live)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Anthropic Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Google AI Overview / Gemini
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Meta AI
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Apple Applebot (Siri)
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: "/api/",
      },
      // GEO: Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
