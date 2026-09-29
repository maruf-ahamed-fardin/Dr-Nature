import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DEMO_BLOGS, DEMO_PRODUCTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = DEMO_BLOGS.find((b) => b.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Dr Natures Wellness Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = DEMO_BLOGS.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = DEMO_BLOGS.filter((b) => b.id !== post.id);
  const recommendedProduct = DEMO_PRODUCTS[0];

  return (
    <article className="min-h-screen bg-white pt-28 pb-20">
      <div className="container-app max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-foreground">Journal</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold truncate max-w-[200px] md:max-w-none">
            {post.title}
          </span>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider"
            >
              {t.tag.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author meta bar */}
        <div className="flex items-center justify-between pb-6 border-b border-border mb-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              {post.author?.name ? post.author.name[0] : "D"}
            </div>
            <div>
              <span className="font-bold text-foreground block text-sm">{post.author?.name}</span>
              <span>Clinical Nutrition Practitioner</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTimeMin} min read
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Peer Reviewed</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-md">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6 leading-relaxed mb-12">
          {/* Key Takeaways Callout */}
          <div className="p-6 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-primary/20 not-prose my-6">
            <h3 className="font-bold text-base text-foreground mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Key Clinical Takeaways
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>The microbiome directly communicates with the central nervous system through the vagus nerve and short-chain fatty acids.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Diversifying plant intake to 30+ different whole foods per week is shown to double microbial resilience.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Clinical adaptogens such as standardized Ashwagandha significantly modulate serum cortisol spikes within 30 days.</span>
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed text-foreground/80 font-medium">
            {post.excerpt}
          </p>

          <h2 className="text-2xl font-bold font-display text-foreground pt-4">
            1. Understanding the Biochemical Foundation
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            In modern clinical nutrition, we recognize that the human digestive tract is not merely a pipeline for food absorption, but an endocrine, immunological, and neurological command center. Over 70% of the human immune system resides in gut-associated lymphoid tissue (GALT), orchestrating inflammatory responses throughout the body.
          </p>

          <h2 className="text-2xl font-bold font-display text-foreground pt-4">
            2. The Role of Adaptogenic Compounds
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            When systemic stressors occur—whether environmental pollutants, ultra-processed seed oils, or chronic psychological tension—the hypothalamic-pituitary-adrenal (HPA) axis releases glucocorticoids. Over time, elevated cortisol breaks down mucosal barrier integrity, commonly termed intestinal permeability or &apos;leaky gut&apos;.
          </p>

          {/* Quote Block */}
          <blockquote className="border-l-4 border-primary pl-4 italic text-foreground text-lg py-2 my-6">
            &ldquo;Food is not just calories; it is biological information that instructs your genes, regulates your microbiome, and determines your metabolic vitality.&rdquo;
          </blockquote>

          <h2 className="text-2xl font-bold font-display text-foreground pt-4">
            3. Practical Protocol for Daily Life
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            To begin restoring balance, our practitioners advise three fundamental steps: prioritize bioavailable micronutrients, eliminate emulsifiers and artificial sweeteners, and introduce targeted natural extracts that support microbial diversity.
          </p>
        </div>

        {/* Doctor Consultation CTA inside article */}
        <div className="bg-primary/5 rounded-3xl border border-primary/20 p-8 mb-12 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
              Personalized Guidance
            </span>
            <h3 className="text-xl font-bold font-display text-foreground mb-1">
              Want a customized nutrition plan for this?
            </h3>
            <p className="text-xs text-muted-foreground max-w-md">
              Book a 1-on-1 private video consultation with our certified health team to assess your symptoms and build a protocol.
            </p>
          </div>
          <Button size="lg" asChild className="shrink-0">
            <Link href="/booking">Book Consultation</Link>
          </Button>
        </div>

        {/* Related Articles */}
        <div className="pt-10 border-t border-border">
          <h3 className="text-2xl font-bold font-display text-foreground mb-6">
            Related Health Reads
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="p-5 rounded-2xl border border-border bg-[hsl(var(--muted)/0.3)] hover:bg-white hover:border-primary/40 transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1">
                    {rel.tags?.[0]?.tag.name}
                  </span>
                  <h4 className="font-bold text-base text-foreground mb-2 line-clamp-2">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {rel.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
