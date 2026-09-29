"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, User, X, BookOpen, Sparkles, CheckCircle2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

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

const ARTICLE_EXTENDED_CONTENT: Record<string, { summary: string; sections: { heading: string; body: string }[]; relatedProductId: string }> = {
  "gut-health-ultimate-guide": {
    summary: "New clinical data from 2026 confirms that gut barrier integrity directly governs neuro-inflammation and systemic metabolic health.",
    sections: [
      {
        heading: "The Enteric Nervous System & Serotonin Production",
        body: "Over 90% of the human body's serotonin is synthesized not in the cranial brain, but within the enterochromaffin cells of the intestinal lining. When gut dysbiosis occurs due to antibiotic misuse or refined seed oils, mucosal tight-junction permeability increases, allowing lipopolysaccharide (LPS) toxins to enter the bloodstream.",
      },
      {
        heading: "Evidence-Based Botanical Restorative Protocol",
        body: "Clinical trials indicate that combining multi-strain soil-based probiotics with cold-pressed Nigella sativa (Kalonji) oil and polyphenol-dense Moringa leaf helps regenerate the mucus epithelial layer within 21 to 28 days.",
      },
    ],
    relatedProductId: "p7",
  },
  "ashwagandha-benefits-research": {
    summary: "A meta-analysis of randomized, double-blind trials validates KSM-66 root extract's ability to downregulate HPA-axis hyper-reactivity.",
    sections: [
      {
        heading: "Cortisol Modulation & GABAergic Signaling",
        body: "Withanolide glycosides found in organic Withania somnifera bind directly to GABA-A receptor sites in the central nervous system. In clinical trials involving 64 participants over 60 days, subjects taking 600mg daily experienced an average serum cortisol reduction of 27.9% compared to 7.9% in the placebo group.",
      },
      {
        heading: "Endurance & VO2 Max Augmentation",
        body: "Athletic subjects supplementing with standardized Ashwagandha extract demonstrated significant enhancements in cardiorespiratory endurance and accelerated muscle recovery after high-intensity anaerobic training.",
      },
    ],
    relatedProductId: "p1",
  },
  "ramadan-nutrition-guide-2026": {
    summary: "Optimizing circadian biology, cellular autophagy, and electrolyte preservation during fasting.",
    sections: [
      {
        heading: "The Cellular Autophagy Window",
        body: "During intermittent fasting windows exceeding 14 hours, cells initiate macro-autophagy — clearing misfolded proteins and damaged mitochondrial organelles. To support this without experiencing brain fog or hypoglycemic crashes, electrolyte balance is paramount.",
      },
      {
        heading: "Suhoor Adaptogenic Stacking",
        body: "Incorporate high-altitude Himalayan Shilajit (300mg) during Suhoor with warm milk or herbal infusion. The 85+ bioavailable minerals and fulvic acid complexes prevent intracellular dehydration throughout the hot daylight hours in Bangladesh.",
      },
    ],
    relatedProductId: "p2",
  },
};

export function BlogPreview({ blogs }: { blogs: BlogItem[] }) {
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);
  const { addItem, setIsOpen } = useCart();
  const [added, setAdded] = useState(false);

  const articleDetails = selectedArticle ? ARTICLE_EXTENDED_CONTENT[selectedArticle.slug] : null;
  const relatedProduct = articleDetails
    ? DEMO_PRODUCTS.find((p) => p.id === articleDetails.relatedProductId)
    : null;

  const handleAddRelated = (product: typeof DEMO_PRODUCTS[0]) => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsOpen(true);
    }, 500);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => {
          const dateStr = blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent Publication";

          return (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelectedArticle(blog)}
              className="group flex flex-col bg-[#FAFBF8] border border-[#B39868]/30 rounded-2xl overflow-hidden hover:border-[#B39868] hover:shadow-[0_20px_40px_rgba(31,43,37,0.06)] transition-all duration-500 cursor-pointer"
            >
              {/* Cover Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF2ED] border-b border-[#B39868]/20">
                {blog.coverImageUrl ? (
                  <Image
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-editorial text-4xl text-[#B39868] bg-[#EEF2ED]">
                    ✦
                  </div>
                )}

                {blog.tags && blog.tags[0] && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-[9px] font-body tracking-[0.22em] uppercase bg-[#FAFBF8]/95 backdrop-blur-md text-[#1F2B25] border border-[#B39868]/30 rounded-full shadow-sm">
                    {blog.tags[0].tag.name}
                  </span>
                )}
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta details */}
                  <div className="flex items-center gap-3 text-[10px] font-body tracking-[0.18em] uppercase text-[#1F2B25]/60 mb-3">
                    <span>{blog.author?.name ?? "Apothecary Board"}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B39868]" />
                      {blog.readTimeMin ? `${blog.readTimeMin} min read` : "5 min read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-2xl text-[#1F2B25] font-light leading-snug line-clamp-2 mb-3 group-hover:text-[#B39868] transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#1F2B25]/70 font-body line-clamp-3 leading-relaxed mb-6 font-light">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Action Bottom */}
                <div className="pt-4 border-t border-[#B39868]/20 flex items-center justify-between text-xs font-body tracking-[0.18em] uppercase">
                  <span className="text-[10px] text-[#1F2B25]/50">{dateStr}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(blog);
                    }}
                    className="inline-flex items-center gap-1.5 text-[#1F2B25] group-hover:text-[#B39868] font-medium transition-colors"
                  >
                    <span>Read Clinical Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Interactive Clinical Brief / Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-[#14221A]/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Header Image & Close */}
              <div className="relative aspect-[21/9] bg-[#EEF2ED] border-b border-[#B39868]/30">
                {selectedArticle.coverImageUrl && (
                  <Image
                    src={selectedArticle.coverImageUrl}
                    alt={selectedArticle.title}
                    fill
                    className="object-cover opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14221A] via-[#14221A]/40 to-transparent" />

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center text-white transition-colors z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] block mb-1">
                    ✦ Dr Natures Clinical Literature
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-light leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              {/* Article Content Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-4 text-[11px] font-body text-[#14221A]/60 pb-4 border-b border-[#B39868]/20 tracking-wider uppercase">
                  <span>Author: {selectedArticle.author?.name ?? "Dr Natures Clinical Board"}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTimeMin ?? 6} min read</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EEF2ED] border border-[#B39868]/30 text-xs sm:text-sm font-body text-[#14221A] leading-relaxed italic">
                  &ldquo;{articleDetails?.summary ?? selectedArticle.excerpt}&rdquo;
                </div>

                {articleDetails?.sections.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-editorial text-xl sm:text-2xl text-[#14221A] font-medium">
                      {sec.heading}
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#14221A]/80 leading-relaxed font-light">
                      {sec.body}
                    </p>
                  </div>
                ))}

                {/* Related Formulation Box */}
                {relatedProduct && (
                  <div className="mt-8 p-5 rounded-2xl border border-[#B39868]/40 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#EEF2ED] shrink-0 border border-[#B39868]/20">
                        <Image
                          src={relatedProduct.images[0].url}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-body tracking-wider uppercase text-[#B39868] block">
                          Targeted Formulation
                        </span>
                        <h5 className="font-editorial text-lg text-[#14221A] font-medium leading-tight">
                          {relatedProduct.name}
                        </h5>
                        <p className="text-xs text-[#14221A]/70 font-editorial font-light">
                          ৳{parseFloat(relatedProduct.price).toLocaleString()} BDT
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddRelated(relatedProduct)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#14221A] hover:bg-[#B39868] text-white text-xs font-body tracking-[0.18em] uppercase transition-colors shrink-0 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>{added ? "Added" : "Add to Bag"}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
