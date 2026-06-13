"use client";

import React, { JSX } from "react";
import { m } from "framer-motion";
import { Bot, Layers, Cloud, Code2, Search } from "lucide-react";
import profile from "../ui/PortfolioData";

const iconMap: { [key: string]: JSX.Element } = {
  Bot: <Bot className="w-8 h-8 text-emerald-400" />,
  Layers: <Layers className="w-8 h-8 text-blue-400" />,
  Cloud: <Cloud className="w-8 h-8 text-purple-400" />,
  Code2: <Code2 className="w-8 h-8 text-orange-400" />,
  Search: <Search className="w-8 h-8 text-pink-400" />,
};

export const ExpertiseGrid = () => {
  return (
    <section className="pb-5 md:pb-10 lg:pb-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Areas of Expertise</h2>
            <p className="text-slate-400 mt-2">Core domains where I deliver professional results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.expertise.map((item, i) => (
            <m.div
              key={i}
              className={`${item.colSpan} p-2 md:p-4 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{iconMap[item.icon]}</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
