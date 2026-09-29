"use client";

const INGREDIENTS = [
  { name: "Himalayan Shilajit", note: "Grade-A Resin · 85+ Minerals" },
  { name: "Organic Ashwagandha", note: "KSM-66® Extract · 600mg" },
  { name: "Moringa Oleifera", note: "Sun-Dried Green Superfood" },
  { name: "Nigella Sativa", note: "Cold-Pressed First Extraction" },
  { name: "Triphala Compound", note: "Haritaki · Bibhitaki · Amalaki" },
  { name: "Wild Forest Honey", note: "Raw & Unpasteurized" },
  { name: "Curcumin C3 Complex", note: "95% Standardized Curcuminoids" },
  { name: "Shatavari Root", note: "Certified Organic Adaptogen" },
];

export function IngredientMarquee() {
  const repeated = [...INGREDIENTS, ...INGREDIENTS];

  return (
    <div className="relative w-full py-5 bg-[#EEF2ED] border-y border-[#B39868]/25 overflow-hidden select-none">
      <div className="animate-marquee-infinite flex items-center gap-12 whitespace-nowrap">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <div className="flex items-baseline gap-2.5">
              <span className="font-editorial text-lg md:text-xl text-[#1F2B25] font-normal tracking-wide">
                {item.name}
              </span>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] font-medium">
                ({item.note})
              </span>
            </div>
            <span className="text-[#B39868] text-xs font-serif opacity-70">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
