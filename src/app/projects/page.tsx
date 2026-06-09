'use client';
import React, { useState, useMemo, useEffect } from "react";
import profile from "@/components/ui/PortfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense, useRef } from "react";

function ProjectStackCard({ project, index, total }: { project: any, index: number, total: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  // Overlapping effect values for mobile
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  
  return (
    <div ref={container} className="sticky top-24 md:static mb-12 md:mb-0 last:mb-0 h-[80vh] md:h-auto flex items-center justify-center">
       <motion.div 
         style={{ scale, opacity }}
         className="w-full h-full md:h-auto"
       >
         <ProjectCard project={project} index={index} />
       </motion.div>
    </div>
  );
}

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState("");
  const initialTag = searchParams.get("tag");
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

  // Sync state with URL 
  useEffect(() => {
    const tag = searchParams.get("tag");
    setSelectedTag(tag);
  }, [searchParams]);

  const handleTagChange = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    profile.projects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return profile.projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                              p.desc.toLowerCase().includes(search.toLowerCase());
        const matchesTag = selectedTag ? p.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  return (
    <div className="mx-auto max-w-6xl">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 mb-6 tracking-tighter">
                Selected <br className="md:hidden" /> Works
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
                A collection of projects ranging from autonomous AI agents to high-performance full-stack applications.
            </p>
        </motion.div>
        
        {/* Filters and Search - Removed sticky to avoid overlapping issues */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between py-4 bg-slate-950/50">
            <div className="relative w-full lg:w-[400px] group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="bg-slate-900/50 border border-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-base text-slate-200 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 w-full transition-all backdrop-blur-sm"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>
            
            <div className="flex flex-wrap gap-2.5 items-center">
                <button 
                    onClick={() => handleTagChange(null)} 
                    className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${!selectedTag ? 'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-white/5'}`}
                >
                    All Works
                </button>
                {tags.map(t => (
                    <button 
                        key={t} 
                        onClick={() => handleTagChange(t)} 
                        className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${selectedTag === t ? 'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-white/5'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>

        {/* Projects Display */}
        <div className="min-h-[300px]">
            <AnimatePresence mode="popLayout">
                {filteredProjects.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="p-6 rounded-full bg-slate-900 border border-emerald-500/10 mb-6">
                            <Search className="w-10 h-10 text-slate-700" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200">No projects found</h3>
                        <p className="text-slate-500 mt-3 text-lg">Try adjusting your search or filters.</p>
                        <Button 
                            variant="link" 
                            className="text-emerald-400 mt-6 text-lg"
                            onClick={() => {setSearch(""); handleTagChange(null);}}
                        >
                            Clear all filters
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProjects.map((p, idx) => (
                            <motion.div 
                                key={p.title}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="h-full"
                            >
                                <ProjectCard project={p} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/40 backdrop-blur-xl p-8 md:p-16 text-center"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="relative z-10">
                <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 mb-6 px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-2 inline" /> Available for new projects
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6">
                    Have a vision for your next <span className="text-emerald-400">AI product?</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                    I help startups and companies build autonomous AI agents, high-performance web apps, and intelligent automation workflows.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 px-8 py-6 text-lg font-bold transition-all shadow-xl shadow-emerald-500/20">
                        <Link href="/#contact">Let's Work Together</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-2xl border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-6 text-lg font-bold">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
        </motion.section>
    </div>
  );
}

export default function AllProjects() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-12 px-6 md:px-12 selection:bg-emerald-400/30">
       {/* Background Decor */}
       <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-24 h-96 w-96 rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

       <Suspense fallback={<div className="text-center py-20">Loading projects...</div>}>
         <ProjectsContent />
       </Suspense>
    </main>
  );
}
