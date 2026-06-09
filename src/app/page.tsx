'use client';

import React, { useState, useMemo } from "react";
import { m, motion, AnimatePresence } from "framer-motion";
import {
  Mail, Linkedin, ChevronRight, Phone, MapPin, ExternalLink, Download,
  Rocket, Layers, ShieldCheck, Laptop, Facebook, Twitter, Search, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import profile from "@/components/ui/PortfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { TechArsenal } from "@/components/tech-arsenal/TechArsenal";
import { ExpertiseGrid } from "@/components/tech-arsenal/ExpertiseGrid";
import Contact from "@/components/ui/contact";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewAllMobile, setViewAllMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const section = {
    title: "text-emerald-300 tracking-tight",
    sub: "text-slate-300/80",
    card: "rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/30 transition",
    badge: "rounded-xl border-emerald-500/30 text-emerald-300",
  } as const;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  } as const;

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    profile.projects.forEach(p => p.tags.slice(0, 1).forEach(t => tagSet.add(t)));
    return Array.from(tagSet).slice(0, 6);
  }, []);

  const filteredProjects = useMemo(() => {
    return profile.projects
      .filter(p => !selectedTag || p.tags.includes(selectedTag))
      .slice(0, 5);
  }, [selectedTag]);

  return (
    <main className="min-h-screen pt-20 bg-slate-950 text-slate-100 selection:bg-emerald-400/30 overflow-hidden">
      {/* Top Gradient Glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 lg:pt-24 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <m.p className="text-sm uppercase tracking-wider text-emerald-400/80 mb-3" {...fadeIn}>Agentic AI Developer</m.p>
          <m.h1 className="text-3xl md:text-4xl font-extrabold leading-tight" 
            {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.05 }}>
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">autonomous</span> products with
            <br /> clarity, quality & care.
          </m.h1>
          <m.p className="mt-4 text-slate-300/90 max-w-xl" 
            {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }}>{profile.tagline}</m.p>
          <m.div className="mt-6 flex flex-wrap items-center gap-3" 
            {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.15 }}>
            <Button asChild className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-900 hover:opacity-90">
              <a href="#contact">Contact Me <ChevronRight className="w-4 h-4 ml-1" /></a>
            </Button>
            <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
              <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="flex items-center">
                <Facebook className="w-4 h-4 mr-2" /> Facebook
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
              <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="flex items-center">
                <Twitter className="w-4 h-4 mr-2" /> Twitter
              </a>
            </Button>
          </m.div>
        </div>
        {/* Right Visual: stacked stat cards with AOS replacement */}
        <m.div className="relative" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ 
              { icon: Rocket, title: "Performance", desc: "Core Web Vitals" }, 
              { icon: ShieldCheck, title: "Quality", desc: "Testing & Type Safety" }, 
              { icon: Layers, title: "Scalability", desc: "APIs, Caching" }, 
              { icon: Laptop, title: "DX", desc: "Clean Architecture" }
            ].map((item, i) => (
              <m.div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/30 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-emerald-300" />
                <div className="mt-2 font-semibold text-slate-200">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </m.div>
            ))}
          </div>

          {/* Floating orb with CSS animation */}
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl float-orb" />
        </m.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-t border-white/5">
        <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-emerald-500/10 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <m.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className={`text-2xl md:text-3xl font-bold ${section.title}`}>About</h2>
            <p className={`mt-4 text-slate-300/90 leading-relaxed text-justify ${isExpanded ? '' : 'line-clamp-4'}`}>
              I’m the Co-Founder of <Link href="https://www.innolyze.com/" target="_blank" className="text-emerald-300 hover:underline">ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒</Link>,
              and an Agentic AI Developer & Full-Stack Engineer passionate about building intelligent software that solves 
              real-world problems. I specialize in Next.js, Python, FastAPI, and modern AI technologies, creating scalable web applications and autonomous AI systems.
              From transforming Figma designs into pixel-perfect experiences to architecting AI-powered workflows, I enjoy turning ideas into products that are fast, 
              functional, and impactful. With additional expertise in graphic design and SEO, I focus on delivering solutions that not only work seamlessly but also provide exceptional user experiences.
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
          <m.div className="mt-0 flex items-center justify-center md:h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
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

      {/* SERVICES */}
      <section id="services" className="border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16 text-justify">
          <m.h2 className={`text-2xl md:text-3xl font-bold ${section.title}`} {...fadeIn}>Services</m.h2>
          <m.p className={`mt-2 ${section.sub}`} {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.05 }}>From concept to production with quality gates.</m.p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.services.map((s, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="h-full"
              >
                  <Card className={`${section.card} group h-full flex flex-col p-4`}>
                      <div className="flex items-start gap-2.5">
                        <div className="shrink-0 text-emerald-300 mt-0.5">
                          {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                        </div>
                        <h3 className="text-sm font-semibold text-slate-100 leading-snug flex-1">
                          {s.title}
                        </h3>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-[13px] text-slate-400 text-justify leading-snug line-clamp-3">
                          {s.desc}
                        </p>
                      </div>

                      <div className=" border-t border-emerald-500/10 flex flex-wrap gap-1">
                        {s.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300/80 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                  </Card>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/30 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center gap-6">
            <div>
              <m.h2 className={`text-2xl md:text-4xl font-black ${section.title}`} {...fadeIn}>Selected Projects</m.h2>
              <m.p className={`mt-2 max-w-xl ${section.sub}`} {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.05 }}>
                A showcase of AI agents, intelligent systems, and high-performance web applications.
              </m.p>

            </div>
            
            {/* Filter Bar */}
            <m.div 
              className="flex flex-wrap gap-2 justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!selectedTag ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/5 hover:border-emerald-500/30'}`}
              >
                All
              </button>
              {tags.map(t => (
                <button 
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedTag === t ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/5 hover:border-emerald-500/30'}`}
                >
                  {t}
                </button>
              ))}
            </m.div>
          </div>
          
          {/* Projects Display */}
          <div className="mt-12 overflow-visible">
            {/* Mobile: Hybrid Display */}
            <div className="md:hidden">
              {!viewAllMobile ? (
                <div className="flex flex-col gap-8">
                  {/* Horizontal Slider (First 3) */}
                  <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                    {filteredProjects.slice(0, 3).map((p, idx) => (
                      <m.div 
                        key={p.title}
                        className="min-w-[85vw] snap-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        <ProjectCard project={p} />
                      </m.div>
                    ))}
                  </div>
                  
                  {/* View All Button for Mobile Slider */}
                  <Button 
                    onClick={() => setViewAllMobile(true)}
                    className="w-full py-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all"
                  >
                    View All Projects <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                /* Full Vertical Stacking List */
                <div className="flex flex-col gap-0 -mx-6 px-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((p, idx) => (
                      <m.div 
                        key={p.title}
                        className="sticky top-20 mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <ProjectCard project={p} />
                      </m.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Collapse Button (Optional but professional) */}
                  <Button 
                    onClick={() => setViewAllMobile(false)}
                    variant="ghost"
                    className="mt-4 text-slate-500 text-xs uppercase tracking-widest font-bold"
                  >
                    Show Less
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop: Refined Bento Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-fr">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
                  <m.div 
                    key={p.title}
                    layout
                    className={`${idx === 0 ? 'md:col-span-2' : ''}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <ProjectCard project={p} isFeatured={idx === 0} />
                  </m.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <m.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <Button asChild className="group rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 px-10 py-4 h-auto text-base font-bold transition-all shadow-lg shadow-emerald-500/10">
                <Link href="/projects" className="flex items-center gap-3">
                  View All Projects 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-emerald-400" />
                </Link>
             </Button>
          </m.div>
        </div>
      </section>

      <TechArsenal skills={profile.skills} />
      <ExpertiseGrid />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.  
          <Link href="https://www.innolyze.com/" target="_blank">Visit our company  
           <span className="text-emerald-300 ml-1">ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒</span> </Link></p>
        </div>
      </footer>
    </main>
  );
}
