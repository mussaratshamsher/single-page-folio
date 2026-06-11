'use client';

import React, { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { Project } from "@/components/ui/PortfolioData";

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewAllMobile, setViewAllMobile] = useState(false);

  const section = {
    title: "text-emerald-300 tracking-tight",
    sub: "text-slate-300/80",
  } as const;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  } as const;

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(p => p.tags.slice(0, 1).forEach(t => tagSet.add(t)));
    return Array.from(tagSet).slice(0, 6);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => !selectedTag || p.tags.includes(selectedTag))
      .slice(0, 5);
  }, [selectedTag, projects]);

  return (
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
  );
}
