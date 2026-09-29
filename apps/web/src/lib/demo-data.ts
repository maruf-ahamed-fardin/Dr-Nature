// ─── Demo fallback data (used when API is unavailable) ───

export const DEMO_PRODUCTS = [
  {
    id: "p1", name: "Organic Ashwagandha Root Extract", slug: "organic-ashwagandha-root-extract",
    price: "1200", compareAtPrice: "1800", shortDescription: "Pure adaptogen for stress relief and vitality. Clinically tested, 600mg per capsule.",
    category: { name: "Supplements", slug: "supplements" },
    images: [{ url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", alt: "Ashwagandha" }],
    inventory: { quantity: 48, reserved: 2 }, _count: { reviews: 124 }, rating: 4.8,
  },
  {
    id: "p2", name: "Himalayan Shilajit Resin", slug: "himalayan-shilajit-resin",
    price: "2400", compareAtPrice: "3200", shortDescription: "Authentic Grade-A Shilajit. 85+ minerals, fulvic acid rich. Boosts energy & immunity.",
    category: { name: "Supplements", slug: "supplements" },
    images: [{ url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80", alt: "Shilajit" }],
    inventory: { quantity: 22, reserved: 5 }, _count: { reviews: 89 }, rating: 4.9,
  },
  {
    id: "p3", name: "Moringa Leaf Powder (500g)", slug: "moringa-leaf-powder",
    price: "650", compareAtPrice: null, shortDescription: "Organic moringa, naturally dried. Packed with vitamins A, C, E, iron & calcium.",
    category: { name: "Wellness", slug: "wellness" },
    images: [{ url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", alt: "Moringa" }],
    inventory: { quantity: 95, reserved: 0 }, _count: { reviews: 67 }, rating: 4.7,
  },
  {
    id: "p4", name: "Functional Nutrition Bible", slug: "functional-nutrition-bible",
    price: "850", compareAtPrice: "1200", shortDescription: "A comprehensive guide to food as medicine. 400+ pages by Dr. Rahman.",
    category: { name: "Books", slug: "books" },
    images: [{ url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", alt: "Book" }],
    inventory: { quantity: 15, reserved: 3 }, _count: { reviews: 203 }, rating: 4.9,
  },
  {
    id: "p5", name: "Black Seed (Kalonji) Oil 250ml", slug: "black-seed-kalonji-oil",
    price: "980", compareAtPrice: "1400", shortDescription: "Cold-pressed, first-extraction Nigella sativa oil. Immune support & anti-inflammatory.",
    category: { name: "Wellness", slug: "wellness" },
    images: [{ url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80", alt: "Black Seed Oil" }],
    inventory: { quantity: 38, reserved: 4 }, _count: { reviews: 156 }, rating: 4.8,
  },
  {
    id: "p6", name: "Vitamin D3 + K2 Drops", slug: "vitamin-d3-k2-drops",
    price: "1100", compareAtPrice: null, shortDescription: "Bioavailable liquid form. D3 5000IU + K2 MK-7 100mcg. Bone & immune support.",
    category: { name: "Supplements", slug: "supplements" },
    images: [{ url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", alt: "Vitamins" }],
    inventory: { quantity: 60, reserved: 0 }, _count: { reviews: 91 }, rating: 4.6,
  },
  {
    id: "p7", name: "Gut Health Probiotic Complex", slug: "gut-health-probiotic-complex",
    price: "1550", compareAtPrice: "2100", shortDescription: "12 strains, 50 billion CFU. Supports digestion, immunity and mental clarity.",
    category: { name: "Supplements", slug: "supplements" },
    images: [{ url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80", alt: "Probiotic" }],
    inventory: { quantity: 28, reserved: 6 }, _count: { reviews: 178 }, rating: 4.7,
  },
  {
    id: "p8", name: "Healing Herbs of Bangladesh", slug: "healing-herbs-of-bangladesh",
    price: "720", compareAtPrice: null, shortDescription: "Traditional medicinal plants — identification, uses & preparations. Illustrated guide.",
    category: { name: "Books", slug: "books" },
    images: [{ url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80", alt: "Herbs Book" }],
    inventory: { quantity: 40, reserved: 0 }, _count: { reviews: 45 }, rating: 4.5,
  },
];

export const DEMO_CATEGORIES = [
  { id: "c1", name: "Supplements", slug: "supplements", description: "Natural health supplements", _count: { products: 5 } },
  { id: "c2", name: "Books", slug: "books", description: "Health & nutrition books", _count: { products: 3 } },
  { id: "c3", name: "Wellness", slug: "wellness", description: "Wellness & lifestyle products", _count: { products: 4 } },
];

export const DEMO_BLOGS = [
  {
    id: "b1", slug: "gut-health-ultimate-guide",
    title: "The Ultimate Guide to Gut Health: What Science Says in 2026",
    excerpt: "Your gut is your second brain. Discover how 38 trillion bacteria influence everything from mood to immunity, and the evidence-based steps to optimize your microbiome.",
    coverImageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    readTimeMin: 8, publishedAt: "2026-09-20T00:00:00Z",
    author: { name: "Dr. Farhan Ahmed" },
    tags: [{ tag: { name: "Gut Health" } }, { tag: { name: "Nutrition" } }],
  },
  {
    id: "b2", slug: "ashwagandha-benefits-research",
    title: "Ashwagandha: 12 Proven Benefits Backed by Clinical Research",
    excerpt: "From cortisol reduction to testosterone support — we break down what peer-reviewed studies actually show about this ancient adaptogen, and who should (and shouldn't) take it.",
    coverImageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    readTimeMin: 6, publishedAt: "2026-09-15T00:00:00Z",
    author: { name: "Dr. Nadia Islam" },
    tags: [{ tag: { name: "Adaptogens" } }, { tag: { name: "Stress" } }],
  },
  {
    id: "b3", slug: "ramadan-nutrition-guide-2026",
    title: "Ramadan Nutrition: How to Stay Energized While Fasting",
    excerpt: "Practical meal planning, supplement timing and hydration strategies for maintaining peak performance during Ramadan, based on the latest intermittent fasting research.",
    coverImageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    readTimeMin: 10, publishedAt: "2026-09-08T00:00:00Z",
    author: { name: "Nutritionist Sadia Khan" },
    tags: [{ tag: { name: "Fasting" } }, { tag: { name: "Ramadan" } }],
  },
];

export const DEMO_CONSULTANTS = [
  {
    id: "con1", bio: "Registered Dietitian & Functional Medicine practitioner with 12 years experience. Specializes in metabolic disorders and plant-based nutrition.",
    specialization: "Functional Nutrition & Metabolic Health", imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    user: { name: "Dr. Nadia Islam", email: "nadia@drnatures.com" },
  },
  {
    id: "con2", bio: "Clinical Nutritionist & Herbalist. Expert in Ayurvedic nutrition, gut restoration and chronic fatigue protocols. Published researcher.",
    specialization: "Ayurvedic & Gut Health", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
    user: { name: "Dr. Farhan Ahmed", email: "farhan@drnatures.com" },
  },
  {
    id: "con3", bio: "Sports nutritionist and wellness coach. Helps athletes and busy professionals optimize performance through personalized diet and lifestyle protocols.",
    specialization: "Sports Nutrition & Performance", imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80",
    user: { name: "Sadia Khan", email: "sadia@drnatures.com" },
  },
];

export const DEMO_SERVICES = [
  { id: "s1", name: "Online Consultation", slug: "online", durationMin: 45, price: "800", description: "Private 45-minute video consultation. Personalized nutrition plan included." },
  { id: "s2", name: "In-Person Consultation", slug: "in-person", durationMin: 60, price: "1500", description: "60-minute face-to-face session at our Dhaka clinic. Full health assessment." },
  { id: "s3", name: "Diet Plan Package", slug: "diet-plan", durationMin: 30, price: "2500", description: "30-min consultation + 4-week customized meal plan + 2 follow-up check-ins." },
];

export const DEMO_STATS = {
  totalOrders: 1284, totalRevenue: "৳18,45,200", totalCustomers: 3461, totalProducts: 48,
  recentOrders: [
    { id: "ord1", orderNumber: "DN-2026-1284", status: "SHIPPED", total: "3400", createdAt: "2026-09-29T10:30:00Z", user: { name: "Rahel Ahmed" } },
    { id: "ord2", orderNumber: "DN-2026-1283", status: "CONFIRMED", total: "1550", createdAt: "2026-09-29T09:15:00Z", user: { name: "Mitu Begum" } },
    { id: "ord3", orderNumber: "DN-2026-1282", status: "PENDING", total: "2400", createdAt: "2026-09-29T08:45:00Z", user: { name: "Karim Hossain" } },
    { id: "ord4", orderNumber: "DN-2026-1281", status: "DELIVERED", total: "720", createdAt: "2026-09-28T17:20:00Z", user: { name: "Riya Das" } },
    { id: "ord5", orderNumber: "DN-2026-1280", status: "DELIVERED", total: "4100", createdAt: "2026-09-28T15:00:00Z", user: { name: "Nasrin Akter" } },
  ],
};
