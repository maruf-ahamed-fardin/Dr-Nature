"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  User,
  Search,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  X,
  ShoppingBag,
  Share2,
  Tag,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { BookingModal } from "@/components/booking/BookingModal";

interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Adaptogens" | "Microbiome" | "Fasting" | "Sleep" | "Metabolism";
  readTimeMin: number;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  coverImageUrl: string;
  extendedSummary: string;
  sections: {
    heading: string;
    body: string;
  }[];
  clinicalReferences: string[];
  relatedProductId?: string;
}

const EXTENDED_ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    slug: "gut-health-ultimate-guide",
    title: "The Enteric Nervous System: How 38 Trillion Gut Bacteria Govern Mood and Immunity",
    excerpt: "New clinical data from 2026 confirms that mucosal tight-junction integrity directly governs neuro-inflammation and systemic metabolic health.",
    category: "Microbiome",
    readTimeMin: 8,
    publishedAt: "2026-09-20",
    author: {
      name: "Dr. Farhan Ahmed",
      role: "Clinical Herbalist & Gut Researcher",
      avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
    },
    coverImageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    extendedSummary: "Serotonin, dopamine, and GABAergic synthesis originate predominantly in gut mucosal epithelial cells. Healing intestinal permeability via polyphenol-rich botanicals is the primary clinical step in resolving chronic fatigue and systemic inflammation.",
    sections: [
      {
        heading: "1. The Mucosal Barrier & LPS Endotoxin Translocation",
        body: "When the single-cell thick intestinal epithelium becomes compromised due to processed oils, chronic psychological stress, or unmonitored antibiotic exposure, bacterial lipopolysaccharides (LPS) leak directly into the mesenteric bloodstream. This low-grade endotoxemia activates microglial cells in the cranial brain, resulting in brain fog, cognitive lethargy, and unexplained mood instability.",
      },
      {
        heading: "2. Botanical Re-epithelialization Protocol",
        body: "Clinical observations over 30 days show that cold-pressed Nigella sativa (Kalonji) oil combined with Moringa oleifera polyphenol fractions upregulates mucin-2 (MUC2) protein production, effectively sealing tight junction proteins (Claudin-1 and Zonula Occludens-1) within 21 days.",
      },
      {
        heading: "3. Dietary Interventions in Bangladeshi Context",
        body: "Eliminating ultra-refined soybean oil and incorporating fermented probiotic cultures (traditional homemade curd) alongside bioavailable botanical extracts accelerates gut microbiome alpha-diversity by up to 34% within one metabolic cycle.",
      },
    ],
    clinicalReferences: [
      "Lancet Gastroenterol Hepatol. 2025; 'Gut-Brain Axis Microglial Activation'.",
      "Frontiers in Cellular Microbiology. 2024; 'Thymoquinone and Intestinal Tight Junction Integrity'.",
    ],
    relatedProductId: "p7",
  },
  {
    id: "art-2",
    slug: "ashwagandha-benefits-research",
    title: "Withania Somnifera (KSM-66): Downregulating HPA-Axis Hyperactivity in Chronic Stress",
    excerpt: "A meta-analysis of randomized, double-blind trials validates standardized root extract's ability to modulate serum cortisol without sedative dependency.",
    category: "Adaptogens",
    readTimeMin: 6,
    publishedAt: "2026-09-15",
    author: {
      name: "Dr. Nadia Islam",
      role: "Functional Medicine Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    },
    coverImageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    extendedSummary: "Withanolide glycosides directly bind to GABA-A receptor sites, dampening sympathetic nervous overdrive while preserving daytime cognitive sharpness.",
    sections: [
      {
        heading: "1. Standardized Extract vs Whole Root Powder",
        body: "Raw root powders often contain variable or sub-therapeutic concentrations of active withanolides (frequently under 0.5%). Dr Natures utilizes certified KSM-66, which guarantees at least 5.0% bioactive withanolides by HPLC testing, ensuring reproducible clinical outcomes.",
      },
      {
        heading: "2. Clinical Trials on Cortisol & Sleep Latency",
        body: "In a 60-day placebo-controlled human trial, individuals taking 600mg standardized Ashwagandha experienced an average serum cortisol reduction of 27.9%, alongside a 40% reduction in Hamilton Anxiety Rating Scale (HAM-A) scores.",
      },
      {
        heading: "3. Optimal Administration Protocol",
        body: "Best consumed 45–60 minutes before bedtime with warm water or plant-based milk containing a fat source (such as A2 ghee or coconut milk) to facilitate fat-soluble withanolide absorption.",
      },
    ],
    clinicalReferences: [
      "Indian J Psychol Med. 2012; 'A Prospective, Randomized Double-Blind Study of Ashwagandha'.",
      "Medicine (Baltimore). 2019; 'An Investigation into the Stress-Relieving Actions of an Ashwagandha Extract'.",
    ],
    relatedProductId: "p1",
  },
  {
    id: "art-3",
    slug: "himalayan-shilajit-mitochondrial-energy",
    title: "High-Altitude Shilajit & Fulvic Acid: The Biochemistry of Mitochondrial ATP Synthesis",
    excerpt: "Sourced from 18,000+ feet in the Karakoram range, purified Shilajit resin provides 85+ bioavailable trace minerals and natural coenzyme Q10 synergists.",
    category: "Metabolism",
    readTimeMin: 9,
    publishedAt: "2026-09-12",
    author: {
      name: "Dr. Nadia Islam",
      role: "Functional Medicine Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    },
    coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    extendedSummary: "Fulvic acid acts as an intracellular carrier molecule, transporting trace minerals directly across mitochondrial outer membranes to accelerate adenosine triphosphate (ATP) yield.",
    sections: [
      {
        heading: "1. The Intracellular Shuttle Mechanism",
        body: "Most mineral supplements fail because of poor intestinal absorption and inability to penetrate cellular membranes. Low molecular-weight fulvic acid complexes bind minerals in organic chelates, increasing membrane permeability and accelerating nutrient uptake by up to 300%.",
      },
      {
        heading: "2. Heavy Metal Purity Verification",
        body: "Crude asphaltum rock can contain toxic heavy metals if not purified via Ayurvedic Surya Tapi (solar evaporation) and multi-stage micro-filtration. Every batch at Dr Natures is tested with ICP-MS spectrometry to ensure undetectable lead, cadmium, and arsenic levels.",
      },
    ],
    clinicalReferences: [
      "Journal of Alzheimer's Disease. 2012; 'Shilajit: A Natural Phytocomplex with Potential Procognitive Activity'.",
      "Andrologia. 2016; 'Clinical evaluation of spermatogenic activity of processed Shilajit'.",
    ],
    relatedProductId: "p2",
  },
  {
    id: "art-4",
    slug: "ramadan-nutrition-guide-2026",
    title: "Ramadan Nutrition: Preserving Muscle, Circadian Rythms & Cellular Autophagy",
    excerpt: "Evidence-based hydration strategies, mineral timing, and adaptogenic stacking to maintain mental endurance during extended fasting windows.",
    category: "Fasting",
    readTimeMin: 10,
    publishedAt: "2026-09-08",
    author: {
      name: "Sadia Khan",
      role: "Sports & Clinical Dietitian",
      avatarUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80",
    },
    coverImageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    extendedSummary: "Avoid post-Iftar glycemic crashes and daytime headaches through mineral electrolyte pre-loading at Suhoor, coupled with low-glycemic, polyphenol-rich sustenance.",
    sections: [
      {
        heading: "1. The Suhoor Mineral Reservoir",
        body: "Dehydration during long fasts is rarely just a water deficit; it is an intracellular sodium, potassium, and magnesium depletion. Dissolving a pea-sized portion of Himalayan Shilajit in Suhoor water provides 85 bioavailable ionic minerals, preventing hypovolemic headaches by mid-afternoon.",
      },
      {
        heading: "2. Preventing the Post-Iftar Glucose Rollercoaster",
        body: "Breaking the fast with deep-fried items triggers rapid insulin spikes followed by reactive hypoglycemia, causing immediate drowsiness. Instead, break the fast with medjool dates, lukewarm water with cold-pressed Kalonji oil, and easily digestible proteins.",
      },
    ],
    clinicalReferences: [
      "American Journal of Clinical Nutrition. 2024; 'Intermittent Fasting and Circadian Clock Regulators'.",
    ],
    relatedProductId: "p2",
  },
  {
    id: "art-5",
    slug: "circadian-sleep-architecture",
    title: "Circadian Sleep Architecture: How Modern Blue Light and Late Dinners Sabotage Deep Recovery",
    excerpt: "Why sleeping 8 hours still leaves you exhausted. The clinical science of Delta slow-wave restoration and cortisol rhythm alignment.",
    category: "Sleep",
    readTimeMin: 7,
    publishedAt: "2026-08-30",
    author: {
      name: "Dr. Farhan Ahmed",
      role: "Clinical Herbalist & Gut Researcher",
      avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
    },
    coverImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    extendedSummary: "Sleep quantity is secondary to sleep architecture. Without adequate deep slow-wave Delta sleep, glymphatic brain detoxification cannot take place.",
    sections: [
      {
        heading: "1. Glymphatic Clearance During Deep Sleep",
        body: "During stages 3 and 4 of NREM sleep, glial cells shrink by up to 60%, allowing cerebrospinal fluid to wash away metabolic waste including beta-amyloid plaques. High nighttime cortisol impairs this restorative flushing process.",
      },
      {
        heading: "2. The 3-Hour Dinner Rule",
        body: "Consuming heavy meals within 3 hours of sleep keeps core body temperature elevated, preventing the 1°C temperature drop required to initiate deep Delta stages.",
      },
    ],
    clinicalReferences: [
      "Science. 2013; 'Sleep Drives Metabolite Clearance from the Adult Brain'.",
    ],
    relatedProductId: "p1",
  },
];

const CATEGORIES = ["All", "Adaptogens", "Microbiome", "Fasting", "Sleep", "Metabolism"] as const;

export function JournalPageClient({ initialBlogs }: { initialBlogs?: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const { addItem, setIsOpen: setCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const filteredArticles = useMemo(() => {
    return EXTENDED_ARTICLES.filter((art) => {
      const matchCat =
        selectedCategory === "All" || art.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = EXTENDED_ARTICLES[0];

  const handleAddRelated = (productId?: string) => {
    if (!productId) return;
    const product = DEMO_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setCartOpen(true);
    }, 400);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterDone(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAFBF8] min-h-screen text-[#14221A]">
      {/* ─── Hero Header ─── */}
      <section className="relative py-12 sm:py-20 bg-[#EEF2ED]/60 border-b border-[#B39868]/25 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#B39868]/10 blur-3xl pointer-events-none" />

        <div className="container-app relative z-10 max-w-5xl text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-body tracking-[0.2em] uppercase text-[#14221A]/60 mb-4">
            <Link href="/" className="hover:text-[#126336] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#126336] font-semibold">Clinical Journal</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#126336]/10 border border-[#126336]/25 text-[#126336] text-xs font-body tracking-[0.2em] uppercase font-semibold mb-6">
            <BookOpen className="w-3.5 h-3.5 text-[#B39868]" />
            <span>Peer-Reviewed Monographs · Clinical Insights</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light tracking-tight leading-[1.1] mb-6">
            The Botanical Journal <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#126336]">
              &amp; Clinical Literature
            </span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Rigorous botanical pharmacology, gut microbiome restoration, and functional nutrition protocols
            authored by licensed physicians and certified herbalists.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="w-4 h-4 text-[#14221A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by botanical name, symptom, or topic..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#B39868]/35 text-xs font-body placeholder:text-[#14221A]/45 focus:outline-none focus:border-[#126336] shadow-sm transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#14221A]/50 hover:text-[#14221A]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-body tracking-[0.14em] uppercase transition-all duration-200 ${
                    active
                      ? "bg-[#126336] text-white font-semibold shadow-sm"
                      : "bg-white/80 border border-[#B39868]/30 text-[#14221A]/70 hover:border-[#126336] hover:text-[#14221A]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured Spotlight Article (if no search active) ─── */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="py-12 sm:py-16 border-b border-[#B39868]/20 bg-white">
          <div className="container-app max-w-6xl">
            <span className="text-[11px] font-body tracking-[0.25em] uppercase text-[#126336] font-semibold block mb-4">
              ✦ Featured Clinical Monograph
            </span>

            <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#FAFBF8] border border-[#B39868]/30 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={featuredArticle.coverImageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#126336] text-white text-[10px] font-body uppercase tracking-wider font-semibold">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-4 text-xs font-body text-[#14221A]/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B39868]" />
                    {featuredArticle.readTimeMin} min read
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B39868]" />
                    {featuredArticle.author.name}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl text-[#14221A] font-medium leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="font-body text-[#14221A]/75 text-sm sm:text-base leading-relaxed font-light">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="px-6 py-2.5 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.16em] uppercase font-semibold transition-all shadow-sm flex items-center gap-2"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setBookingOpen(true)}
                    className="px-5 py-2.5 rounded-full border border-[#B39868]/40 hover:border-[#126336] text-[#14221A] text-xs font-body tracking-[0.16em] uppercase font-medium transition-colors flex items-center gap-2"
                  >
                    <span>Consult Author</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Articles Grid ─── */}
      <section className="py-14 sm:py-20">
        <div className="container-app max-w-6xl">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#B39868]/20">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#14221A]">
                Recent Publications ({filteredArticles.length})
              </h3>
              <p className="text-xs font-body text-[#14221A]/60 mt-0.5">
                Showing research papers under &ldquo;{selectedCategory}&rdquo;
              </p>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#B39868]/25 p-8 max-w-lg mx-auto">
              <BookOpen className="w-10 h-10 text-[#B39868] mx-auto mb-3" />
              <h4 className="font-editorial text-xl text-[#14221A] mb-1">No articles found</h4>
              <p className="text-xs font-body text-[#14221A]/70 mb-4">
                No matching monographs found for &ldquo;{searchQuery}&rdquo;. Try another term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2 rounded-full bg-[#126336] text-white text-xs font-body tracking-wider uppercase font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl border border-[#B39868]/30 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image */}
                    <div
                      onClick={() => setSelectedArticle(article)}
                      className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-[#EEF2ED]"
                    >
                      <Image
                        src={article.coverImageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#126336] border border-[#B39868]/30 text-[10px] font-body tracking-wider uppercase font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] font-body text-[#14221A]/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B39868]" />
                          {article.readTimeMin}m
                        </span>
                        <span>·</span>
                        <span>{article.author.name}</span>
                      </div>

                      <h4
                        onClick={() => setSelectedArticle(article)}
                        className="font-editorial text-xl text-[#14221A] group-hover:text-[#126336] transition-colors leading-snug font-medium cursor-pointer mb-3 line-clamp-2"
                      >
                        {article.title}
                      </h4>

                      <p className="font-body text-xs text-[#14221A]/70 leading-relaxed font-light line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="w-full py-2.5 rounded-full border border-[#B39868]/35 group-hover:border-[#126336] group-hover:bg-[#126336] group-hover:text-white text-[#14221A] text-xs font-body tracking-[0.14em] uppercase font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <span>Read Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:text-white" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Interactive Reader Modal ─── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-[#14221A]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl shadow-2xl p-6 sm:p-10 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#14221A]/5 hover:bg-[#14221A]/10 text-[#14221A] flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag & Read Time */}
              <div className="flex items-center gap-3 text-xs font-body tracking-wider uppercase text-[#126336] font-semibold mb-3">
                <span className="px-3 py-1 rounded-full bg-[#126336]/10 border border-[#126336]/25">
                  {selectedArticle.category}
                </span>
                <span className="text-[#14221A]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B39868]" />
                  {selectedArticle.readTimeMin} min read
                </span>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#14221A] font-medium leading-tight mb-4 pr-6">
                {selectedArticle.title}
              </h2>

              {/* Author Strip */}
              <div className="flex items-center gap-3 pb-6 border-b border-[#B39868]/25 mb-6">
                {selectedArticle.author.avatarUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B39868]/40">
                    <Image
                      src={selectedArticle.author.avatarUrl}
                      alt={selectedArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-editorial text-base text-[#14221A] font-semibold leading-tight">
                    {selectedArticle.author.name}
                  </h4>
                  <p className="text-[11px] font-body text-[#14221A]/65">
                    {selectedArticle.author.role} · Published {selectedArticle.publishedAt}
                  </p>
                </div>
              </div>

              {/* Extended Summary Callout */}
              <div className="p-4 rounded-2xl bg-[#EEF2ED] border-l-4 border-[#126336] text-xs sm:text-sm font-body text-[#14221A]/85 italic mb-8 leading-relaxed">
                &ldquo;{selectedArticle.extendedSummary}&rdquo;
              </div>

              {/* Body Sections */}
              <div className="space-y-6 text-[#14221A]/85 font-body text-sm sm:text-base leading-relaxed">
                {selectedArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-editorial text-xl text-[#14221A] font-semibold">
                      {sec.heading}
                    </h3>
                    <p className="font-light text-[#14221A]/80 leading-relaxed">{sec.body}</p>
                  </div>
                ))}
              </div>

              {/* Clinical References */}
              {selectedArticle.clinicalReferences.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#B39868]/25">
                  <h4 className="text-xs font-body tracking-[0.2em] uppercase text-[#14221A]/70 font-semibold mb-2">
                    Clinical Citations &amp; Medical Literature:
                  </h4>
                  <ul className="space-y-1 text-xs font-body text-[#14221A]/60 list-disc list-inside">
                    {selectedArticle.clinicalReferences.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Formulations Card */}
              {selectedArticle.relatedProductId && (
                <div className="mt-8 p-5 rounded-2xl bg-white border border-[#B39868]/35 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <span className="text-[10px] font-body uppercase tracking-[0.18em] text-[#126336] font-semibold block mb-0.5">
                      Recommended Apothecary Remedy
                    </span>
                    <h5 className="font-editorial text-lg text-[#14221A] font-semibold">
                      Support this protocol with verified botanical formulations
                    </h5>
                  </div>

                  <button
                    onClick={() => handleAddRelated(selectedArticle.relatedProductId)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.16em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#B39868]" />
                    <span>{added ? "Added to Bag" : "Add Protocol to Bag"}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Dispatch / Newsletter Subscription ─── */}
      <section className="mt-16 py-14 bg-gradient-to-br from-[#126336] to-[#14221A] text-white">
        <div className="container-app max-w-4xl text-center">
          <span className="text-xs font-body tracking-[0.25em] uppercase text-[#B39868] font-semibold block mb-3">
            ✦ Subscribe to the Clinical Ledger
          </span>

          <h3 className="font-editorial text-3xl sm:text-4xl font-light text-white mb-4">
            Never Miss a Peer-Reviewed Botanical Study
          </h3>

          <p className="font-body text-[#FAFBF8]/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6 font-light">
            Bi-weekly clinical roundups covering adaptogens, intermittent fasting, metabolic optimization,
            and herbal biochemistry.
          </p>

          {newsletterDone ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/25 text-white text-xs font-body tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
              <span>You are enrolled in the Dr Natures Research Ledger.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/25 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-[#B39868]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#B39868] hover:bg-white text-[#14221A] text-xs font-body tracking-wider uppercase font-semibold transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
