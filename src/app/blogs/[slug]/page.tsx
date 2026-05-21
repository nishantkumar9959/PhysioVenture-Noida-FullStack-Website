import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, BLOG_ARTICLES } from "@/lib/blogs-data";
import { Calendar, ChevronRight } from "lucide-react";

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
    alternates: {
      canonical: `https://physioventure.vercel.app/blogs/${resolvedParams.slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "en_IN",
      url: `https://physioventure.vercel.app/blogs/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-left">
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
            <Link href="/blogs" className="hover:text-accent transition-colors">
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
          By Dr. Rohit Kumar · PhysioVenture Noida
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
          Book a consultation with Dr. Rohit Kumar — at our Sector 49 clinic or through a convenient home visit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-accent transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold border border-border bg-card hover:bg-secondary/50 text-primary transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </article>
  );
}
