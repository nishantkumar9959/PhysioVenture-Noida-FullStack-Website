import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, ChevronRight, BookOpen } from "lucide-react";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { CardContent } from "@/components/ui/card";
import SeoContentBlock from "@/components/shared/SeoContentBlock";

export const metadata: Metadata = {
  title: "Physiotherapy Blog in Noida | PhysioVenture Health Guides",
  description:
    "Read PhysioVenture blogs on physiotherapy in Noida, home physiotherapy, pain relief, stroke rehab, sports injury recovery, and senior care.",
  keywords: [
    "physiotherapy in noida",
    "physiotherapy",
    "physiotherapy noida",
    "home physiotherapy noida",
    "physiotherapy at home in noida",
    "physiotherapist in noida",
    "physiotherapy clinic near me",
  ],
  alternates: {
    canonical: "/blogs/",
  },
  openGraph: {
    title: "Physiotherapy Blog in Noida | PhysioVenture",
    description:
      "Clinical guides from PhysioVenture on physiotherapy, home visits, rehabilitation, pain relief, and recovery in Noida.",
    url: "/blogs/",
    siteName: "PhysioVenture",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/home_ergonomics_blog.png",
        width: 1200,
        height: 630,
        alt: "PhysioVenture physiotherapy blog and health guides in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy Blog in Noida | PhysioVenture",
    description: "Read physiotherapy and rehabilitation guides from PhysioVenture Noida.",
    images: ["/images/home_ergonomics_blog.png"],
  },
};

const CATEGORIES = [
  { name: "All Articles", slug: "all" },
  { name: "Orthopedic Care", slug: "orthopedic-care" },
  { name: "Neurological Rehabilitation", slug: "neurological-rehabilitation" },
  { name: "Sports Rehabilitation", slug: "sports-rehabilitation" },
  { name: "Home Physiotherapy", slug: "home-physiotherapy" },
  { name: "Geriatric Care", slug: "geriatric-care" }
];

export default function BlogsPage() {
  // Main index displays all articles
  const articles = BLOG_ARTICLES;

  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground text-left">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-primary font-medium">Blogs</li>
          </ol>
        </nav>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Health Insights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-primary leading-tight mb-4">
            PhysioVenture Clinical Blog & Health Hub
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Explore advanced physical rehabilitation insights, spine ergonomics guides, and recovery tips curated by Dr. Rohit Verma and our specialist team in Noida.
          </p>
        </div>

        {/* Categories Navigation Header */}
        <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-border/40 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Filter by Category
          </span>
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={category.slug === "all" ? "/blogs/" : `/blogs/category/${category.slug}/`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${category.slug === "all"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary/80 hover:text-primary"
                  }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <Link
                key={idx}
                href={`/blogs/${article.slug}/`}
                className="group bg-card border border-border/40 overflow-hidden flex flex-col h-full rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none text-left"
              >
                {/* Image wrapper */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/20">
                  <Image
                    src={article.image}
                    alt={`Blog cover: ${article.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 dark:bg-card/90 text-primary shadow-xs">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {article.date}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-primary group-hover:text-accent transition-colors duration-200 mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto border-t border-border/30 pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors duration-200">
                      Read Article <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border/60">
            <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold text-primary mb-2">No articles found</h3>
          </div>
        )}

        <SeoContentBlock pageType="blogs" title="physiotherapy blogs" />
      </div>
    </div>
  );
}
