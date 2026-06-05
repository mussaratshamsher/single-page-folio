import React from "react";
import profile from "@/components/ui/PortfolioData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Selected Works
        </Link>
        
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(t => (
                <Badge key={t} variant="outline" className="bg-emerald-500/5 text-emerald-300 border-emerald-500/20 px-3 py-1">
                  {t}
                </Badge>
              ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            {project.longDescription || project.desc}
          </p>
        </header>

        {/* Hero Image / Preview */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-emerald-500/20 mb-16 shadow-2xl shadow-emerald-500/5">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="h-8 w-1 bg-emerald-500 rounded-full" />
                      The Challenge
                    </h2>
                    <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
                        {project.challenges && project.challenges.length > 0 ? (
                          <ul className="list-disc list-inside space-y-3">
                            {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        ) : (
                          <p>Identifying key pain points and architecting a scalable, intelligent solution to meet modern performance standards.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="h-8 w-1 bg-cyan-500 rounded-full" />
                      The Solution
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                        {project.solution || "Leveraging agentic AI workflows and a robust full-stack architecture to automate complex tasks and deliver a seamless user experience."}
                    </p>
                </section>
            </div>

            <aside className="space-y-8">
                <div className="bg-slate-900/50 border border-emerald-500/10 backdrop-blur-xl p-8 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6">Project Links</h3>
                    <div className="space-y-4">
                        <Button asChild className="w-full rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold py-6 transition-all shadow-lg shadow-emerald-500/20">
                            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                                View Live Site <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                        <Button variant="outline" asChild className="w-full rounded-2xl border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 py-6 font-bold">
                            <Link href="/#contact">Inquire About Similar Work</Link>
                        </Button>
                    </div>
                </div>

                <div className="px-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Core Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(t => (
                          <span key={t} className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                            {t}
                          </span>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
      </div>
    </main>
  );
}
