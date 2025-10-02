"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import {Mail,Linkedin,ChevronRight,Phone,MapPin,ExternalLink,Download,
  Rocket,Layers, ShieldCheck, Laptop, Facebook,Twitter} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import profile from "@/components/ui/PortfolioData";
import Link from "next/link";
import Contact from "@/components/ui/contact";


export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-quart", once: true, offset: 40 });
  }, []);

  const section = {
    title: "text-emerald-300 tracking-tight",
    sub: "text-slate-300/80",
    card: "rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/30 transition",
    badge: "rounded-xl border-emerald-500/30 text-emerald-300",
  } as const;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-400/30 overflow-hidden">
      {/* Top Gradient Glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <header className="fixed w-full top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <Image className="w-24 h-24" src="/logo.png" alt="logo" width={96} height={96} priority quality={100} 
          /> 
          <nav className="hidden md:flex items-center gap-1 ">
            {[
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-2 rounded-xl text-sm text-slate-300 hover-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="btn text-emerald-300 hover:text-slate-200">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download className="w-4 h-4 mr-2 " /> Resume
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 lg:pt-24 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm uppercase tracking-wider text-emerald-400/80 mb-3" data-aos="fade-up">Full‑Stack Developer</p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" data-aos="fade-up" data-aos-delay="50">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">performant</span> products with
            <br /> clarity, quality & care.
          </h1>
          <p className="mt-4 text-slate-300/90 max-w-xl" data-aos="fade-up" data-aos-delay="100">{profile.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3" data-aos="fade-up" data-aos-delay="150">
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
          </div>
        </div>
        {/* Right Visual: stacked stat cards with AOS */}
<div className="relative" data-aos="zoom-in">
  <div
    className="grid grid-cols-2 gap-4"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    {[ 
      { icon: Rocket, title: "Performance", desc: "Core Web Vitals" }, 
      { icon: ShieldCheck, title: "Quality", desc: "Testing & Type Safety" }, 
      { icon: Layers, title: "Scalability", desc: "APIs, Caching" }, 
      { icon: Laptop, title: "DX", desc: "Clean Architecture" }
    ].map((item, i) => (
      <div
        key={i}
        className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/30 transition"
        data-aos="fade-up"
        data-aos-delay={i * 100} // staggered delay
      >
        <item.icon className="w-5 h-5 text-emerald-300" />
        <div className="mt-2 font-semibold text-slate-200">{item.title}</div>
        <div className="text-sm text-slate-400">{item.desc}</div>
      </div>
    ))}
  </div>

  {/* Floating orb with CSS animation */}
  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl float-orb" />
</div>

      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-t border-white/5">
        <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-emerald-500/10 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2" data-aos="fade-right">
            <h2 className={`text-2xl md:text-3xl font-bold ${section.title}`}>About</h2>
            <p className="mt-4 text-slate-300/90 leading-relaxed">
    I’m Co-Founder of <Link href="https://www.innolyze.com/" target="_blank" className="text-emerald-300 hover:underline">ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒</Link>,
    and a Full-Stack Developer, specialized in Next.js, Python, and FastAPI, building clean,maintainable systems
     end-to-end — from delightful UI's to secure APIs. I transform Figma designs into pixel-perfect, functional
    web apps, blending performance, accessibility, and SEO to deliver products that scale. With a background 
    in graphic design. I bring an eyecapturing effect for detail and visual polish to every project. Currently, I’m expanding
    my expertise by learning Agentic AI at GIAIC.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Remote Friendly</Badge>
              <Badge variant="outline" className={`rounded-xl ${section.badge}`}>Contract / Part‑time</Badge>
              <Badge variant="secondary" className="rounded-xl bg-white/5 text-slate-200">UTC+5</Badge>
            </div>
          </div>
          <Card className={section.card} data-aos="fade-left">
            <CardHeader>
              <CardTitle className="text-slate-200">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-300" /><a href={`mailto:${profile.email}`} className="hover:underline text-slate-300">{profile.email}</a></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-300" /><span className="text-slate-300">{profile.phone}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-300" /><span className="text-slate-300">{profile.location}</span></div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className={`text-2xl md:text-3xl font-bold ${section.title}`} data-aos="fade-up">Services</h2>
          <p className={`mt-2 ${section.sub}`} data-aos="fade-up" data-aos-delay="50">From concept to production with quality gates.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.services.map((s, i) => (
              <Card key={i} className={`${section.card} group`} data-aos="zoom-in" data-aos-delay={i * 70}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-emerald-300">
                    {s.icon}
                    <CardTitle className="text-base font-semibold text-slate-200">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS (alternating image cards) */}
      <section id="projects" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/30 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className={`text-2xl md:text-3xl font-bold ${section.title}`} data-aos="fade-up">Featured Projects</h2>
          <div className="mt-10 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-white/10 to-transparent" />
            <div className="space-y-10">
              {profile.projects.map((p, idx) => (
                <div key={p.title} className={`grid md:grid-cols-2 gap-6 items-stretch ${idx % 2 === 0 ? '' : 'md:grid-flow-dense'}`} data-aos="fade-up" data-aos-delay={idx * 80}>
                  <div className={`md:col-start-1 ${idx % 2 !== 0 ? 'md:col-start-2' : ''}`}>
  <Card className={`${section.card} relative overflow-hidden h-full`}>    
    {/* Background image (only visible on small screens) */}
    <div className="absolute inset-0 md:hidden">
      <Image src={p.image} alt={p.title} fill className="object-cover opacity-20"/>
      <div className="absolute inset-0 bg-black/10" /> 
    </div>
    <CardHeader className="pb-2 relative z-10">
      <CardTitle className="text-lg text-slate-200">{p.title}</CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <p className="text-sm text-slate-400">{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t, i) => (
          <Badge key={`${p.title}-tag-${i}`} variant="outline" className={section.badge}>
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-6">
        <Button variant="outline" size="sm" asChild
          className="rounded-xl border-emerald-500/30 text-emerald-300 hover:bg-white/5">
          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center" >
            Visit <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>
    </CardContent>
  </Card>
</div>
  {/* image column  */}
  <div className={`hidden md:block ${idx % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}`}>
    <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-emerald-500/20">
    <Image src={p.image} alt={p.title} fill className="scale-90 rounded-2xl hover:scale-100 ease-in-out duration-900"/>
  </div>
     </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS cloud */}
<section id="skills" className="border-t border-white/5">
  <div className="mx-auto max-w-6xl px-6 py-16">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Tech Arsenal</h2>
    <p className="mt-2 text-slate-400">Tools I use frequently.</p>

    <div className="mt-8 space-y-6">
      {/* First row - left to right */}
      <div className="overflow-hidden relative group">
        <div className="flex gap-3 animate-marquee group-hover:[animation-play-state:paused]">
          {profile.skills.map((skill, i) => (
            <Badge key={`row1-${i}`} variant="secondary"
              className="rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10">
                 {skill} 
              </Badge>
          ))}
          {/* duplicate for seamless loop */}
          {profile.skills.map((skill, i) => (
            <Badge key={`row1-dup-${i}`} variant="secondary"
            className="rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10">
                 {skill} 
              </Badge>
          ))}
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="overflow-hidden relative group">
        <div className="flex gap-3 animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {profile.skills.map((skill, i) => (
            <Badge key={`row2-${i}`} variant="secondary"
            className="rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10">
              {skill} </Badge>
          ))}
          {/* duplicate for seamless loop */}
          {profile.skills.map((skill, i) => (
            <Badge key={`row2-dup-${i}`} variant="secondary"
            className="rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10">
              {skill} </Badge>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.  
          <Link href="https://www.innolyze.com/" target="_blank">Visit our company  
           <span className="text-emerald-300 ml-1">ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒</span> </Link></p>
          <div className="flex items-center gap-4">
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-slate-200 inline-flex items-center gap-1"><Twitter className="w-4 h-4" /> Twitter</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-200 inline-flex items-center gap-1"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-slate-200 inline-flex items-center gap-1"><Facebook className="w-4 h-4" /> Facebook</a>
            <a href={`mailto:${profile.email}`} className="hover:text-slate-200 inline-flex items-center gap-1"><Mail className="w-4 h-4" /> Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
