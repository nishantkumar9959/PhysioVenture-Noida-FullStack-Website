import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, BookOpen, ArrowLeft } from "lucide-react";
import { BLOG_ARTICLES } from "@/lib/blogs-data";
import { CardContent } from "@/components/ui/card";
import SeoContentBlock from "@/components/shared/SeoContentBlock";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORIES = [
  { name: "All Articles", slug: "all", path: "/blogs/" },
  { name: "Orthopedic Care", slug: "orthopedic-care", path: "/blogs/category/orthopedic-care/" },
  { name: "Neurological Rehabilitation", slug: "neurological-rehabilitation", path: "/blogs/category/neurological-rehabilitation/" },
  { name: "Sports Rehabilitation", slug: "sports-rehabilitation", path: "/blogs/category/sports-rehabilitation/" },
  { name: "Home Physiotherapy", slug: "home-physiotherapy", path: "/blogs/category/home-physiotherapy/" },
  { name: "Geriatric Care", slug: "geriatric-care", path: "/blogs/category/geriatric-care/" }
];

function getCategoryDisplayName(slug: string): string {
  switch (slug) {
    case "orthopedic-care":
      return "Orthopedic Care";
    case "neurological-rehabilitation":
      return "Neurological Rehabilitation";
    case "sports-rehabilitation":
      return "Sports Rehabilitation";
    case "home-physiotherapy":
      return "Home Physiotherapy";
    case "geriatric-care":
      return "Geriatric Care";
    default:
      return "";
  }
}

// Generate static routes at build time
export async function generateStaticParams() {
  return [
    { category: "orthopedic-care" },
    { category: "neurological-rehabilitation" },
    { category: "sports-rehabilitation" },
    { category: "home-physiotherapy" },
    { category: "geriatric-care" }
  ];
}

// Dynamic SEO metadata based on category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = getCategoryDisplayName(resolvedParams.category);

  if (!categoryName) {
    return {
      title: "Category Not Found | PhysioVenture Noida",
    };
  }

  let title = `${categoryName} Guides Noida | PhysioVenture`;
  let description = `Read clinical guidelines, exercise tips, and recovery resources for ${categoryName} in Noida by Dr. Rohit Verma.`;

  if (resolvedParams.category === "orthopedic-care") {
    title = "Orthopedic Care Guides & Sciatica Treatment Noida | PhysioVenture";
    description = "Read expert articles on slip disc, back pain recovery tips, cervical spondylitis exercises, and osteoarthritis management in Noida.";
  } else if (resolvedParams.category === "neurological-rehabilitation") {
    title = "Neurological Rehabilitation & Stroke Recovery Noida | PhysioVenture";
    description = "Access specialized guides on post-stroke mobility, Parkinson's disease exercises, and paralysis nerve recovery in Noida.";
  } else if (resolvedParams.category === "sports-rehabilitation") {
    title = "Sports Injury Rehab & ACL Recovery Guides Noida | PhysioVenture";
    description = "Read evidence-based guides on ACL reconstruction timeline, meniscus tear rehabilitation, and tennis elbow treatments in Noida.";
  } else if (resolvedParams.category === "home-physiotherapy") {
    title = "Home Visit Physiotherapy & Post-Surgery Rehab Noida | PhysioVenture";
    description = "Discover the clinical benefits of home-visit physiotherapy, safety audits, and recovering from surgery at home in Noida.";
  } else if (resolvedParams.category === "geriatric-care") {
    title = "Geriatric Care & Senior Fall Prevention Noida | PhysioVenture";
    description = "Read clinical articles on senior balance exercises, healthy aging guides, and fall prevention strategies in Noida.";
  }

  return {
    title,
    description,
    keywords: [
      "physiotherapy in noida",
      "physiotherapy",
      "physiotherapy noida",
      "home physiotherapy noida",
      "physiotherapist in noida",
      categoryName,
      `${categoryName} Noida`,
    ],
    alternates: {
      canonical: `/blogs/category/${resolvedParams.category}/`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      url: `/blogs/category/${resolvedParams.category}/`,
      siteName: "PhysioVenture",
      images: [
        {
          url: "/images/home_ergonomics_blog.png",
          width: 1200,
          height: 630,
          alt: `${categoryName} physiotherapy guides by PhysioVenture Noida`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/home_ergonomics_blog.png"],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const categoryName = getCategoryDisplayName(resolvedParams.category);

  if (!categoryName) {
    notFound();
  }

  const filteredArticles = BLOG_ARTICLES.filter(
    (article) => article.category === categoryName
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": `${SITE_URL}/blogs/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `${SITE_URL}/blogs/category/${resolvedParams.category}/`
      }
    ]
  };

  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
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
            <li>
              <Link href="/blogs/" className="hover:text-accent transition-colors">
                Blogs
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-primary font-medium">{categoryName}</li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="text-left mb-6">
          <Link
            href="/blogs/"
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Hub
          </Link>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent">{categoryName} Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-primary leading-tight mb-4">
            {categoryName} Insights
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Explore localized clinical guidelines, step-by-step exercise routines, and expert recovery tips for {categoryName.toLowerCase()} in Noida.
          </p>
        </div>

        {/* Categories Navigation Header */}
        <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-border/40 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Other Blog Categories
          </span>
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={category.path}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${category.slug === resolvedParams.category
                    ? "bg-primary text-primary-foreground shadow-xs animate-none"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary/80 hover:text-primary"
                  }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
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
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              We haven&apos;t added articles to this category yet. Check back soon for expert updates!
            </p>
          </div>
        )}

        <SeoContentBlock pageType="blogs" title={`${categoryName} guides`} />
      </div>
    </div>
  );
}
