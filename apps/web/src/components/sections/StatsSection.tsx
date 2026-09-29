"use client";

import { motion } from "framer-motion";
import { Users, Award, ShieldCheck, HeartHandshake } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "3,400+",
    label: "Active Clients",
    desc: "Across 64 districts in Bangladesh",
  },
  {
    icon: Award,
    value: "100%",
    label: "Lab Verified",
    desc: "Strict heavy-metal & purity tested",
  },
  {
    icon: ShieldCheck,
    value: "4.9 / 5",
    label: "Customer Rating",
    desc: "Based on 1,200+ verified reviews",
  },
  {
    icon: HeartHandshake,
    value: "98%",
    label: "Satisfaction Rate",
    desc: "Patients reporting positive health shifts",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container-app">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/70 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-foreground tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
