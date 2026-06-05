import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Project } from "@/components/ui/PortfolioData";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const section = {
    card: "group relative rounded-2xl bg-slate-900/40 border border-emerald-500/10 backdrop-blur-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full",
    badge: "rounded-xl bg-emerald-500/5 border-emerald-500/20 text-emerald-400 text-[10px] py-0 px-2",
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`${section.card} ${className}`}>
        {/* Mobile Background Image (Older Version Style) */}
        <div className="absolute inset-0 md:hidden pointer-events-none">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Desktop Image Container (Modern Style) */}
        <div className="hidden md:block relative h-52 w-full overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-transparent transition-colors duration-500" />
          
          {/* Floating Badge (Desktop) */}
          <div className="absolute top-4 right-4 flex gap-2">
            {project.tags.slice(0, 1).map((t, i) => (
              <Badge key={i} className="bg-emerald-500 text-slate-950 border-none font-bold text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <CardHeader className="pt-6 pb-2 relative z-10">
          <CardTitle className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col px-6 relative z-10">
          <p className="text-sm text-slate-400 line-clamp-2 mb-6 group-hover:text-slate-300 transition-colors">
            {project.desc}
          </p>
          
          <div className="mt-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((t, i) => (
                <Badge key={i} variant="outline" className={section.badge}>
                  {t}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-3 pb-4">
              <Button variant="outline" size="sm" asChild
                className="rounded-xl border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 flex-1 transition-all">
                <Link href={`/projects/${project.slug}`} className="flex items-center justify-center gap-2" >
                  <span>Details</span>
                  <BookOpenText className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button size="sm" asChild
                className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 flex-1 transition-all">
                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2" >
                  <span>Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Decorative corner glow */}
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
      </Card>
    </motion.div>
  );
}
