"use client";

import React from "react";
import Image from "next/image";

export function ClinicalJournalSection() {
  const articles = [
    {
      id: 1,
      tag: "PCOS & Diet",
      title: "Reversing Insulin Resistance with Local Foods in Bangladesh",
      desc: "Discover how to substitute refined white rice with complex seeds without sacrificing culinary satisfaction.",
      doctor: "Dr. Farhana",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "Diabetes",
      title: "Why Cold-Pressed Black Seed Oil Regulates Blood Sugar",
      desc: "A look into thymoquinone content and its biological action on pancreatic enzyme secretions.",
      doctor: "Dr. Mahbubur",
      readTime: "4 min read",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&h=400&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "Lifestyle",
      title: "Managing Thyroid Fatigue Through Daily Hydration & Honey",
      desc: "Simple non-pharmaceutical morning rituals to enhance your adrenal health and reduce sluggishness.",
      doctor: "Dr. Nusrat",
      readTime: "7 min read",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&h=400&auto=format&fit=crop",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-[#047857] font-black text-xs tracking-widest uppercase block mb-1">
              Clinical Journal
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
              Health Insights &amp; Guidance
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-[#FDFBF7] rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-soft transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <Image
                    src={art.img}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-[#0D4035] uppercase shadow-sm">
                    {art.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0D4035] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {art.desc}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center">
                  <i className="fa-regular fa-user text-[#047857] mr-1.5" />
                  {art.doctor}
                </span>
                <span>{art.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
