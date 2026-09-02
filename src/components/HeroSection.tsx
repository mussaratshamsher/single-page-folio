'use client';

import React from "react";
import { m } from "framer-motion";
import { ChevronRight, Facebook, Linkedin, Twitter, Rocket, ShieldCheck, Layers, Laptop, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  tagline: string;
  socials: any;
}

export function HeroSection({ tagline, socials }: HeroSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 lg:pt-24 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <m.p 
          className="text-sm uppercase tracking-wider text-emerald-400/80 mb-3"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          Agentic AI Developer
        </m.p>
        <m.h1 
          className="text-3xl md:text-4xl font-extrabold leading-tight"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
        >
        <span className="block text-2xl md:text-3xl text-emerald-400/90 mb-2 font-bold">Hi, I'm Mussarat Shamsher.</span>
        I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Autonomous</span> AI Agents that work
<br /> so your business scales without you.
        </m.h1>   
       
        <m.p 
          className="mt-4 text-slate-300/90 max-w-xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
        >
          {tagline}
        </m.p>
        <m.div 
          className="mt-6 flex flex-wrap items-center gap-3"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
        >
          <Button asChild className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-900 hover:opacity-90">
            <a href={socials.github} target="_blank" rel="noreferrer">
              GitHub <Github className="w-4 h-4 ml-1 text-white" />
            </a>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
            <a href={socials.facebook} target="_blank" rel="noreferrer" className="flex items-center">
              <Facebook className="w-4 h-4 mr-2" /> Facebook
            </a>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
            <a href={socials.twitter} target="_blank" rel="noreferrer" className="flex items-center">
              <Twitter className="w-4 h-4 mr-2" /> Twitter
            </a>
          </Button>
        </m.div>
      </div>
      {/* Right Visual: stacked stat cards */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[ 
            { icon: Rocket, title: "Performance", desc: "Core Web Vitals" }, 
            { icon: ShieldCheck, title: "Quality", desc: "Testing & Type Safety" }, 
            { icon: Layers, title: "Scalability", desc: "APIs, Caching" }, 
            { icon: Laptop, title: "DX", desc: "Clean Architecture" }
          ].map((item, i) => (
            <m.div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md md:backdrop-blur-xl hover:border-emerald-400/30 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
            >
              <item.icon className="w-5 h-5 text-emerald-300" />
              <div className="mt-2 font-semibold text-slate-200">{item.title}</div>
              <div className="text-sm text-slate-400">{item.desc}</div>
            </m.div>
          ))}
        </div>

        {/* Floating orb with CSS animation */}
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl float-orb" />
      </div>
    </section>
  );
}
