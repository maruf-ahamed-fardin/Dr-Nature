"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEcosystem, DOCTORS_DATA } from "@/lib/ecosystem-context";

export function DoctorServicesSection() {
  const [filter, setFilter] = useState("All");
  const { formatPrice, openBooking } = useEcosystem();

  const filteredDoctors =
    filter === "All"
      ? DOCTORS_DATA
      : DOCTORS_DATA.filter((d) => d.specialty === filter);

  return (
    <section id="services" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-[#047857] text-xs font-black tracking-widest uppercase block mb-1">
              Clinical Specialists
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
              Consult Dr Natures Experts
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Choose between Online Telemedicine Video Visit or In-Person Clinic Appointment.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["All", "PCOS", "Diabetes", "Nutrition"].map((spec) => {
              const isSelected = filter === spec;
              const label = spec === "All" ? "All Specs" : spec;
              return (
                <button
                  key={spec}
                  onClick={() => setFilter(spec)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0D4035] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div id="doctor-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => {
            const priceFormatted = formatPrice(doc.feeBDT);
            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={doc.img}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center shadow-sm">
                      <i className="fa-solid fa-star text-[#F59E0B] mr-1" />
                      <span>
                        {doc.rating} ({doc.reviews})
                      </span>
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase bg-[#ECFDF5] text-[#0D4035] px-2.5 py-1 rounded-md">
                    {doc.specialty} Specialist
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{doc.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{doc.degree}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Fee</span>
                    <p className="text-base font-extrabold text-[#0D4035]">{priceFormatted}</p>
                  </div>
                  <button
                    onClick={() => openBooking(doc.name, doc.specialty, doc.feeBDT)}
                    className="px-5 py-2.5 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
