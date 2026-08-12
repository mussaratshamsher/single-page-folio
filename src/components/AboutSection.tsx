'use client';

import React, { useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
  profile: any;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const section = {
    title: "text-emerald-300 tracking-tight",
    card: "rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md md:backdrop-blur-xl hover:border-emerald-400/30 transition",
    badge: "rounded-xl border-emerald-500/30 text-emerald-300",
  } as const;

  return (
    <section id="about" className="relative border-t border-white/5">
      <div className="absolute inset-x-0 -top-8 h-8 bg-linear-to-b from-emerald-500/10 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className={`text-2xl md:text-3xl mt-5 lg:mt-8 font-bold ${section.title}`}>About</h2>
          <p className={`mt-4 text-slate-300/90 leading-relaxed text-justify ${isExpanded ? '' : 'line-clamp-4'}`}>
            I’m an Agentic AI Developer & Full-Stack Engineer passionate about building intelligent software that solves 
            real-world problems. I specialize in Next.js, React, TypeScript, Python, FastAPI, and modern AI technologies, creating scalable web applications and autonomous AI systems.
From transforming Figma designs into pixel-perfect experiences to architecting AI-powered workflows with LLMs, Agentic AI, and APIs, 
I enjoy turning ideas into products that are fast, functional, and impactful. With additional expertise in graphic design and SEO, I focus on delivering solutions that not only work seamlessly but also provide exceptional user experiences.
 </p>
          <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-emerald-400 text-sm font-semibold hover:underline"
          >
              {isExpanded ? 'Read Less' : 'Read More'}
          </button>
          <div className="mt-6 flex flex-wrap gap-3 justify-start">
            <Badge className="rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Remote Friendly</Badge>
            <Badge variant="outline" className={`rounded-xl ${section.badge}`}>Contract / Part‑time</Badge>
            <Badge variant="secondary" className="rounded-xl bg-white/5 text-slate-200">UTC+5</Badge>
          </div>
        </m.div>
        <m.div 
          className="mt-0 flex items-center justify-center md:h-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Card className={`${section.card} w-full max-w-sm`}>
            <CardHeader>
              <CardTitle className="text-slate-200">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm flex flex-col items-start">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-300" /><a href={`mailto:${profile.email}`} className="hover:underline text-slate-300">{profile.email}</a></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-300" /><span className="text-slate-300">{profile.phone}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-300" /><span className="text-slate-300">{profile.location}</span></div>
            </CardContent>
          </Card>
        </m.div>
      </div>
    </section>
  );
}
