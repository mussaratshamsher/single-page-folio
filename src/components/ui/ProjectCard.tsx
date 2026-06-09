import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Project } from "@/components/ui/PortfolioData";

interface ProjectCardProps {
  project: Project;
  className?: string;
  isFeatured?: boolean;
  index?: number; // Added for stacking effects
}

export function ProjectCard({ project, className, isFeatured, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform values for 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Reflection transforms
  const reflectionX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const reflectionY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const section = {
    card: "group relative rounded-[2rem] bg-slate-900/40 border border-emerald-500/10 backdrop-blur-2xl overflow-hidden hover:border-emerald-500/40 transition-colors duration-700 flex flex-col h-full shadow-2xl",
    badge: "rounded-lg bg-emerald-500/5 border-emerald-500/20 text-emerald-400 text-[11px] font-semibold py-0.5 px-3 uppercase tracking-wider",
  };

  if (isFeatured) {
    return (
      <m.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`h-full relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-slate-950 group shadow-2xl ${className}`}
      >
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image} 
            alt={`${project.title} - ${project.desc.substring(0, 100)}...`} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-emerald-950/20" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-8 md:p-10 lg:p-12">
          <div className="flex justify-between items-start mb-6">
            <Badge className="bg-emerald-500 text-slate-950 border-none font-black text-[10px] px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest">
              Featured Masterpiece
            </Badge>
            <div className="flex gap-2">
              {project.tags.slice(0, 3).map((t, i) => (
                <Badge key={i} variant="outline" className="rounded-lg bg-white/5 border-white/10 text-white/70 text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              {project.title}
            </h3>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
              {project.desc}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 px-8 h-14 font-black text-base shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1">
                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  Launch Live <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 h-14 font-bold text-base backdrop-blur-md transition-all">
                <Link href={`/projects/${project.slug}`} className="flex items-center gap-2">
                  View Case Study <BookOpenText className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </m.div>
    );
  }

  return (
    <m.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`h-full perspective-1000 ${className}`}
    >
      <Card className={`${section.card} border-white/5 relative overflow-hidden group/card`}>
        {/* Mobile Background Image (Visible only on small screens) */}
        <div className="absolute inset-0 md:hidden z-0 overflow-hidden">
          <Image 
            src={project.image} 
            alt={`${project.title} - ${project.desc.substring(0, 100)}...`} 
            fill 
            sizes="100vw"
            className="object-cover opacity-20 blur-[3px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
        </div>

        {/* Project Image Container (Desktop Only) */}
        <div className="relative hidden md:block h-48 w-full overflow-hidden">
          <Image 
            src={project.image} 
            alt={`${project.title} - ${project.desc.substring(0, 100)}...`} 
            fill 
            sizes="(max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Enhanced Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-emerald-500 text-slate-950 border-none font-black text-[10px] px-3 py-1 rounded-full shadow-xl">
              {project.tags[0]}
            </Badge>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
             <h3 className="font-black text-white group-hover:text-emerald-400 transition-colors duration-300 leading-tight text-xl">
               {project.title}
             </h3>
          </div>
        </div>
        
        <CardContent className="flex-grow flex flex-col px-2 pt-2 pb-2 relative z-10">
          {/* Title for mobile (hidden on desktop because it's on the image) */}
          <div className="md:hidden mb-3">
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-[9px] px-2 py-0.5 rounded-full">
                {project.tags[0]}
              </Badge>
            </div>
            <h3 className="font-black text-white text-lg leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 md:mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors">
            {project.desc}
          </p>
          
          <div className="mt-auto space-y-4 md:space-y-6">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((t, i) => (
                <Badge key={i} variant="outline" className={`${section.badge} text-[10px] px-2`}>
                  {t}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <Button variant="outline" size="sm" asChild
                className="rounded-lg border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 flex-1 h-8 md:h-9 px-2 md:px-4 transition-all font-bold text-[10px] md:text-[11px]">
                <Link href={`/projects/${project.slug}`} className="flex items-center justify-center gap-1" >
                  <span>Details</span>
                  <BookOpenText className="w-3 h-3" />
                </Link>
              </Button>
              <Button size="sm" asChild
                className="rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex-1 h-8 md:h-9 px-2 md:px-4 transition-all font-black text-[10px] md:text-[11px] shadow-lg shadow-emerald-500/20">
                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1" >
                  <span>Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>

        {/* 3D Reflection Light Effect */}
        <m.div 
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            x: reflectionX,
            y: reflectionY,
          }}
        />
      </Card>
    </m.div>
  );
}
