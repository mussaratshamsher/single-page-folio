'use client';
import React, { useState, useMemo, useEffect } from "react";
import profile from "@/components/ui/PortfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
       <m.div 
         style={{ scale, opacity }}
         className="w-full h-full md:h-auto"
       >
         <ProjectCard project={project} index={index} />
       </m.div>
    </div>
  );
}

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState("");
  const initialTag = searchParams.get("tag");
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync state with URL 
  useEffect(() => {
    const tag = searchParams.get("tag");
    setSelectedTag(tag);
  }, [searchParams]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagChange = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
    setIsDropdownOpen(false);
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
        <m.div
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
        </m.div>
        
        {/* Unified Search & Filter Column */}
        <div className="relative mb-12 z-40" ref={dropdownRef}>
            <m.div 
                className={`w-full bg-slate-900/40 border ${isDropdownOpen ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-emerald-500/10'} rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all backdrop-blur-sm group`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ border: '1px solid rgba(16, 185, 129, 0.4)' }}
            >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                        <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter & Search</span>
                        <span className="text-slate-200 font-bold truncate">
                            {selectedTag ? `Keyword: ${selectedTag}` : (search ? `Searching: "${search}"` : "All Projects & Technologies")}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-8 w-px bg-white/5 mx-2" />
                    <m.div
                        animate={{ rotate: isDropdownOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-500"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </m.div>
                </div>
            </m.div>

            {/* Dropdown Content */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-3 p-3 bg-slate-900/95 border border-emerald-500/20 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-2 max-h-[70vh] md:max-h-[500px]"
                    >
                        {/* Internal Search Bar */}
                        <div className="relative group/search mb-2 px-2">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/search:text-emerald-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Type to search projects..." 
                                className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/30 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Keyword List */}
                        <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar">
                            <div className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-1">
                                Filter by Keyword
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                                <button 
                                    onClick={() => handleTagChange(null)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${!selectedTag ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400'}`}
                                >
                                    All Keywords
                                </button>
                                {tags.map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => handleTagChange(t)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${selectedTag === t ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>

        {/* Projects Display */}
        <div className="min-h-[300px]">
            <AnimatePresence mode="popLayout">
                {filteredProjects.length === 0 ? (
                    <m.div 
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
                    </m.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProjects.map((p, idx) => (
                            <m.div 
                                key={p.title}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="h-full"
                            >
                                <ProjectCard project={p} />
                            </m.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* CTA Section */}
        <m.section 
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
        </m.section>
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
