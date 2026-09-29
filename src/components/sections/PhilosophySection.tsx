// Server Component — pure SSR for instant search engine indexing and zero client JS load
const PHILOSOPHY_PARAGRAPH =
  "We believe healthcare should never begin with a symptom suppressor, but with the soil. Grounded in timeless botanical wisdom and verified by modern clinical biochemistry, Dr Natures formulates pure, heavy-metal tested adaptogens and bespoke functional protocols that awaken your body's innate ability to heal from within.";

export function PhilosophySection() {
  return (
    <section id="manifesto" className="py-16 sm:py-24 md:py-36 bg-[#FAFBF8] relative overflow-hidden">
      {/* Delicate background ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#EEF2ED]/60 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 max-w-4xl text-center">
        {/* Eyebrow */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#B39868] font-medium inline-flex items-center gap-2">
            <span>✦</span>
            <span>The Apothecary Manifesto</span>
            <span>✦</span>
          </span>
        </div>

        {/* Highlighted paragraph */}
        <blockquote className="font-editorial text-xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-light leading-[1.35] sm:leading-[1.3] text-[#1F2B25] text-balance">
          {PHILOSOPHY_PARAGRAPH}
        </blockquote>

        {/* Signature & Provenance line */}
        <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-[#B39868]/20 max-w-md mx-auto flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#1F2B25]/60">
          <span className="font-editorial text-lg italic text-[#B39868]">DN</span>
          <span>·</span>
          <span>Apothecary &amp; Functional Medicine Board</span>
        </div>
      </div>
    </section>
  );
}
