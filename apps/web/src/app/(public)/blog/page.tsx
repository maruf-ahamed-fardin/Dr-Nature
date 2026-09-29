import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { DEMO_BLOGS } from "@/lib/demo-data";

export const metadata = {
  title: "Health & Nutrition Journal | Dr Natures Healthcare",
  description: "Evidence-based wellness articles, nutritional science, adaptogen research, and natural health guides written by certified practitioners.",
};

export default function BlogPage() {
  const featuredPost = DEMO_BLOGS[0];
  const regularPosts = DEMO_BLOGS.slice(1);

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      {/* Banner */}
      <div className="bg-primary text-white py-14 mb-10">
        <div className="container-app">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-green-300 mb-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Evidence-Based Nutrition & Medicine
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              Dr Natures Wellness Journal
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Clinical insights, functional medicine breakthroughs, and practical health guides crafted by certified practitioners to help you make informed choices.
            </p>
          </div>
        </div>
      </div>

      <div className="container-app">
        {/* Featured Story */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Link href={`/blog/${featuredPost.slug}`} className="relative aspect-[16/10] md:aspect-auto md:h-full min-h-[300px] overflow-hidden bg-muted block">
                {featuredPost.coverImageUrl && (
                  <Image
                    src={featuredPost.coverImageUrl}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Featured Article
                </span>
              </Link>

              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <User className="w-3.5 h-3.5" />
                    {featuredPost.author?.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTimeMin} min read
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 leading-snug hover:text-primary transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h3 className="text-xl font-bold font-display text-foreground mb-6">
            Latest Articles & Clinical Notes
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
              >
                <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted block">
                  {blog.coverImageUrl && (
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {blog.tags && blog.tags[0] && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-sm text-primary rounded-md shadow-sm">
                      {blog.tags[0].tag.name}
                    </span>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author?.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTimeMin} min read
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-display text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h4>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-6 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">Clinical Research</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
