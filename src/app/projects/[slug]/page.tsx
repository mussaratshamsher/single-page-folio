import React from "react";
import profile from "@/components/ui/PortfolioData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = profile.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/projects" className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Projects
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(t => <Badge key={t} variant="outline" className="text-emerald-300 border-emerald-500/30">{t}</Badge>)}
        </div>
        
        <p className="text-lg text-slate-300 mb-8">{project.longDescription || project.desc}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-300 mb-3">Challenges</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                    {project.challenges?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-300 mb-3">Solution</h3>
                <p className="text-slate-400">{project.solution}</p>
            </div>
        </div>

        <Link href={project.link} target="_blank" className="inline-flex items-center bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-400 transition">
            View Live Project <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </main>
  );
}
