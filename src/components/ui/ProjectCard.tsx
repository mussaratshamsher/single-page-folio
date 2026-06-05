import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  tags: string[];
  desc: string;
  image: string;
  link: string;
  longDescription?: string;
  challenges?: string[];
  solution?: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const section = {
    card: "rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 group",
    badge: "rounded-xl border-emerald-500/30 text-emerald-300",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`${section.card} relative overflow-hidden h-full flex flex-col ${className}`}>
        {/* Mobile Background Image (Low Opacity) */}
        <div className="absolute inset-0 md:hidden pointer-events-none">
          <Image src={project.image} alt={project.title} fill className="object-cover opacity-10"/>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Desktop Featured Image */}
        <div className="hidden md:block relative h-48 w-full overflow-hidden border-b border-emerald-500/10">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg text-slate-200 group-hover:text-emerald-300 transition-colors">{project.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 flex-grow flex flex-col">
          <p className="text-sm text-slate-400 line-clamp-3 mb-4">{project.desc}</p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 3).map((t, i) => (
                <Badge key={`${project.title}-tag-${i}`} variant="outline" className={section.badge}>
                  {t}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <span className="text-[10px] text-slate-500 self-center">+{project.tags.length - 3} more</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild
                className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 flex-1">
                <Link href={`/projects/${project.slug}`} className="inline-flex items-center justify-center" >
                  Case Study <BookOpenText className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild
                className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 flex-1">
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center" >
                  Live <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
