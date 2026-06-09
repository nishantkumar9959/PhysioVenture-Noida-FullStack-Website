import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, BLOG_ARTICLES } from "@/lib/blogs-data";
import SeoContentBlock from "@/components/shared/SeoContentBlock";
import { SITE_URL, DOCTOR_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    return { title: "Article Not Found | PhysioVenture" };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [
      "physiotherapy in noida",
      "physiotherapy",
      "physiotherapy noida",
      "home physiotherapy noida",
      "physiotherapist in noida",
      "physiotherapy clinic near me",
      article.category,
      article.title,
    ],
    alternates: {
      canonical: `/blogs/${resolvedParams.slug}/`,
    },
    authors: [{ name: "Dr. Rohit Verma", url: "/about/" }],
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "en_IN",
      url: `/blogs/${resolvedParams.slug}/`,
      siteName: "PhysioVenture",
      images: [
        {
          url: `${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "image": `${SITE_URL}${article.image}`,
    "url": `${SITE_URL}/blogs/${resolvedParams.slug}/`,
    "datePublished": article.date,
    "dateModified": article.date,
    "inLanguage": "en-IN",
    "author": {
      "@type": "Person",
      "name": DOCTOR_NAME,
      "@id": `${SITE_URL}/about/#physician`
    },
    "publisher": {
      "@type": "Organization",
      "name": "PhysioVenture",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${resolvedParams.slug}/`
    },
    "keywords": article.category,
    "articleSection": article.category,
    "wordCount": article.body ? article.body.join(" ").split(" ").length : undefined
  };

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
        "name": article.title,
        "item": `${SITE_URL}/blogs/${resolvedParams.slug}/`
      }
    ]
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
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
          <li className="text-primary font-medium truncate max-w-[200px] sm:max-w-none">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 text-primary font-bold text-xs">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          By Dr. Rohit Verma · PhysioVenture Noida
        </p>
      </header>

      {/* Article Body */}
      <div className="prose prose-sm sm:prose-base max-w-none space-y-5">
        {article.body.map((paragraph, idx) => (
          <p key={idx} className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-secondary/30 border border-border/40 text-center">
        <h2 className="text-xl font-display font-extrabold text-primary mb-3">
          Need Expert Physiotherapy in Noida?
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Book a consultation with Dr. Rohit Verma — at our Sector 49 clinic or through a convenient home visit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-accent transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            href="/contact/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold border border-border bg-card hover:bg-secondary/50 text-primary transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <SeoContentBlock pageType="blog" title={article.title} category={article.category} />
    </article>
  );
}
