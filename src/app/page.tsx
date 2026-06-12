import React from "react";
import profile from "@/components/ui/PortfolioData";
import { TechArsenal } from "@/components/tech-arsenal/TechArsenal";
import { ExpertiseGrid } from "@/components/tech-arsenal/ExpertiseGrid";
import Contact from "@/components/ui/contact";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Card } from "@/components/ui/card";

export default function Home() {
  const section = {
    title: "text-emerald-300 tracking-tight",
    sub: "text-slate-300/80",
    card: "rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md md:backdrop-blur-xl hover:border-emerald-400/30 transition",
  } as const;

  return (
    <main className="min-h-screen pt-20 selection:bg-emerald-400/30 overflow-hidden">
      {/* Top Gradient Glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
      </div>

      <HeroSection tagline={profile.tagline} socials={profile.socials} />

      <AboutSection profile={profile} />

      {/* SERVICES - Static enough to keep here if we use standard HTML/Tailwind for entrance */}
      <section id="services" className="border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16 text-justify">
          <h2 className={`text-2xl md:text-3xl font-bold ${section.title}`}>Services</h2>
          <p className={`mt-2 ${section.sub}`}>From concept to production with quality gates.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3
           gap-6">
            {profile.services.map((s, i) => (
              <div 
                key={i} 
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectShowcase projects={profile.projects} />

      <TechArsenal skills={profile.skills} />
      <ExpertiseGrid />

      <Contact />
    </main>
  );
}
