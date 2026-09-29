import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, User } from "lucide-react";

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  readTimeMin?: number;
  publishedAt?: string;
  author?: { name: string };
  tags?: { tag: { name: string } }[];
}

export function BlogPreview({ blogs }: { blogs: BlogItem[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {blogs.map((blog) => {
        const dateStr = blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recent";

        return (
          <article
            key={blog.id}
            className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
          >
            {/* Cover Image */}
            <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted">
              {blog.coverImageUrl ? (
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-4xl bg-primary/10">
                  🌿
                </div>
              )}
              {blog.tags && blog.tags[0] && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-sm text-primary rounded-md shadow-sm">
                  {blog.tags[0].tag.name}
                </span>
              )}
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {blog.author?.name ?? "Dr Natures Team"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTimeMin ? `${blog.readTimeMin} min read` : "5 min"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground">{dateStr}</span>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
