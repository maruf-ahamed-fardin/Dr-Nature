"use client";

import React, { useState } from "react";
import { useEcosystem } from "@/lib/ecosystem-context";

export function HealthToolsHubSection() {
  const [activeTab, setActiveTab] = useState<"bmi" | "calorie" | "water" | "pcos">("bmi");
  const { openBooking } = useEcosystem();

  // 1. BMI State
  const [bmiHeight, setBmiHeight] = useState(168);
  const [bmiWeight, setBmiWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState<{ score: string; category: string } | null>(null);

  const calculateBmi = () => {
    const h = bmiHeight / 100;
    if (h > 0 && bmiWeight > 0) {
      const score = (bmiWeight / (h * h)).toFixed(1);
      const val = parseFloat(score);
      let cat = "Normal Weight";
      if (val < 18.5) cat = "Underweight";
      else if (val >= 25 && val < 29.9) cat = "Overweight";
      else if (val >= 30) cat = "Obesity";
      setBmiResult({ score, category: cat });
    }
  };

  // 2. BMR State
  const [bmrAge, setBmrAge] = useState(28);
  const [bmrGender, setBmrGender] = useState<"female" | "male">("female");
  const [bmrWeight, setBmrWeight] = useState(65);
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  const calculateBmr = () => {
    if (bmrAge > 0 && bmrWeight > 0) {
      const genderAdj = bmrGender === "male" ? 5 : -161;
      const bmr = Math.round(10 * bmrWeight + 6.25 * 165 - 5 * bmrAge + genderAdj);
      setBmrResult(bmr);
    }
  };

  // 3. Water State
  const [waterWeight, setWaterWeight] = useState(65);
  const [waterResult, setWaterResult] = useState<string | null>(null);

  const calculateWater = () => {
    if (waterWeight > 0) {
      const liters = (waterWeight * 0.035).toFixed(1);
      setWaterResult(liters);
    }
  };

  // 4. PCOS State
  const [pcosQ1, setPcosQ1] = useState(false);
  const [pcosQ2, setPcosQ2] = useState(false);
  const [pcosQ3, setPcosQ3] = useState(false);
  const [pcosResult, setPcosResult] = useState<"high" | "low" | null>(null);

  const analyzePcos = () => {
    const count = [pcosQ1, pcosQ2, pcosQ3].filter(Boolean).length;
    setPcosResult(count >= 2 ? "high" : "low");
  };

  return (
    <section id="tools" className="py-24 bg-[#06261E] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FBBF24] text-xs font-black tracking-widest uppercase block mb-1">
            Interactive Diagnostic Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-heading">
            Clinical Health Calculators
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Get baseline biological data before scheduling your medical appointment.
          </p>
        </div>

        {/* Calculator Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("bmi")}
            className={`tool-tab-btn px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "bmi"
                ? "bg-[#F59E0B] text-[#06261E] shadow-glow"
                : "glass-dark text-slate-300 hover:text-white"
            }`}
          >
            BMI Calculator
          </button>
          <button
            onClick={() => setActiveTab("calorie")}
            className={`tool-tab-btn px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "calorie"
                ? "bg-[#F59E0B] text-[#06261E] shadow-glow"
                : "glass-dark text-slate-300 hover:text-white"
            }`}
          >
            BMR / Calorie
          </button>
          <button
            onClick={() => setActiveTab("water")}
            className={`tool-tab-btn px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "water"
                ? "bg-[#F59E0B] text-[#06261E] shadow-glow"
                : "glass-dark text-slate-300 hover:text-white"
            }`}
          >
            Water Intake
          </button>
          <button
            onClick={() => setActiveTab("pcos")}
            className={`tool-tab-btn px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "pcos"
                ? "bg-[#F59E0B] text-[#06261E] shadow-glow"
                : "glass-dark text-slate-300 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-notes-medical text-[#F59E0B] mr-1" />
            <span>PCOS Screening</span>
          </button>
        </div>

        {/* Calculator Panels Container */}
        <div className="max-w-3xl mx-auto glass-dark p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
          {/* 1. BMI Panel */}
          {activeTab === "bmi" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif-heading text-white">
                Body Mass Index (BMI) Assessment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>
              <button
                onClick={calculateBmi}
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-500 text-[#06261E] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
              >
                Calculate BMI
              </button>

              {bmiResult && (
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Your Score
                      </span>
                      <p className="text-3xl font-black text-white">{bmiResult.score}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981] text-[#06261E]">
                      {bmiResult.category}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs flex-wrap gap-2">
                    <span className="text-slate-300">
                      <i className="fa-solid fa-lightbulb text-[#F59E0B] mr-1" />
                      Recommended Supplement:
                    </span>
                    <a href="#shop" className="text-[#F59E0B] hover:underline font-bold">
                      Black Seed Immunity Oil -&gt;
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Calorie / BMR Panel */}
          {activeTab === "calorie" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif-heading text-white">
                Basal Metabolic Rate (BMR) &amp; Daily Calories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={bmrAge}
                    onChange={(e) => setBmrAge(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Gender
                  </label>
                  <select
                    value={bmrGender}
                    onChange={(e) => setBmrGender(e.target.value as "female" | "male")}
                    className="w-full bg-[#0D4035] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="female" className="text-slate-800 bg-white">Female</option>
                    <option value="male" className="text-slate-800 bg-white">Male</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmrWeight}
                    onChange={(e) => setBmrWeight(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>
              <button
                onClick={calculateBmr}
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-500 text-[#06261E] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
              >
                Calculate Daily Calories
              </button>

              {bmrResult !== null && (
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400">Estimated Daily Maintenance Calories:</p>
                  <p className="text-3xl font-black text-[#FBBF24] font-serif-heading">
                    {bmrResult.toLocaleString()} kcal/day
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. Water Intake Panel */}
          {activeTab === "water" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif-heading text-white">
                Daily Hydration Goal Calculator
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  Body Weight (kg)
                </label>
                <input
                  type="number"
                  value={waterWeight}
                  onChange={(e) => setWaterWeight(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F59E0B]"
                />
              </div>
              <button
                onClick={calculateWater}
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-500 text-[#06261E] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
              >
                Calculate Water Need
              </button>

              {waterResult !== null && (
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400">Recommended Daily Intake:</p>
                  <p className="text-3xl font-black text-blue-400 font-serif-heading">
                    {waterResult} Liters / Day
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 4. PCOS Risk Questionnaire Panel */}
          {activeTab === "pcos" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif-heading text-white">
                PCOS Symptom Risk Assessment
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pcosQ1}
                    onChange={(e) => setPcosQ1(e.target.checked)}
                    className="w-4 h-4 accent-[#F59E0B]"
                  />
                  <span>Irregular or missed menstrual cycles</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pcosQ2}
                    onChange={(e) => setPcosQ2(e.target.checked)}
                    className="w-4 h-4 accent-[#F59E0B]"
                  />
                  <span>Unexplained weight gain or difficulty losing weight</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pcosQ3}
                    onChange={(e) => setPcosQ3(e.target.checked)}
                    className="w-4 h-4 accent-[#F59E0B]"
                  />
                  <span>Excess facial hair or severe acne flareups</span>
                </label>
              </div>
              <button
                onClick={analyzePcos}
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-500 text-[#06261E] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
              >
                Analyze Risk
              </button>

              {pcosResult !== null && (
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <p className="text-xs text-slate-400">Screening Result:</p>
                  {pcosResult === "high" ? (
                    <p className="text-xl font-bold text-red-400">High Potential PCOS Risk</p>
                  ) : (
                    <p className="text-xl font-bold text-[#10B981]">Low / Moderate Risk</p>
                  )}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Recommendation: Book a consult with Dr. Farhana Ahmed &amp; review our PCOS Natural Management Book.
                  </p>
                  <button
                    onClick={() => openBooking("Dr. Farhana Ahmed", "PCOS Specialist", 1200)}
                    className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-[#10B981] text-[#06261E] font-bold text-xs hover:bg-[#F59E0B] transition-colors cursor-pointer"
                  >
                    Schedule Specialist Consult
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
