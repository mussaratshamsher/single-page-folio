"use client";
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Mail, Github,Linkedin,ChevronRight,Code2,Server,Database,Sparkles,Phone,MapPin,ExternalLink,Download,
CheckCircle2,Image as ImageIcon,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default function Portfolio() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-quart", once: true, offset: 40 });
  }, []);

  const profile = useMemo(
    () => ({
      name: "Mussarat Shamsher",
      role: "Full‑Stack Developer & AI Enthusiast",
      tagline: "Get scalable and interactive solutions for your ideas.",
      email: "musaratskhan@gmail.com",
      phone: "+92 1234983409",
      location: "Pakistan (Remote)",
      resumeUrl: "/https://milestone1-personal-static-resume.vercel.app/", 
      photoUrl: "/avatar.jpg",
      socials: {
        github: "https://github.com/your-username",
        linkedin: "https://www.linkedin.com/in/your-profile/",
        website: "https://mandoabusiness.com",
      },
      services: [
        {
          icon: <Code2 className="w-5 h-5" />,
          title: "Frontend Engineering",
          desc: "Next.js, React, TypeScript, Tailwind, shadcn/ui, Framer Motion.",
        },
        {
          icon: <Server className="w-5 h-5" />,
          title: "Backend & APIs",
          desc: "Python, FastAPI, Node.js, PHP; OAuth/Clerk auth flows.",
        },
        {
          icon: <Database className="w-5 h-5" />,
          title: "Data & Integrations",
          desc: "MySQL, PostgreSQL, Prisma, Sanity, Stripe, WhatsApp APIs.",
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: "AI & Agents",
          desc: "OpenAI Agents SDK, Chainlit, Streamlit, LLM tooling.",
        },
      ],
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "shadcn/ui",
        "Framer Motion",
        "AOS",
        "SwiperJS",
        "Python",
        "FastAPI",
        "Streamlit",
        "Chainlit",
        "OpenAI Agents",
        "Node.js",
        "PHP",
        "MySQL",
        "PostgreSQL",
        "Prisma",
        "Sanity",
        "OAuth",
        "Clerk",
      ],
      projects: [
        {
          title: "Rishty Wali — Matchmaking AI Assistant",
          tags: ["OpenAI Agents", "Streamlit", "WhatsApp API"],
          desc: "Conversational assistant with profile matching, PDF reports, and WhatsApp integration.",
          link: "#",
        },
        {
          title: "Career Counselor Agent",
          tags: ["Next.js", "Python", "PDF Reports"],
          desc: "Aptitude tests, guidance flows, session saving, and downloadable insights.",
          link: "#",
        },
        {
          title: "QR Code Generator",
          tags: ["Python", "Streamlit"],
          desc: "Simple, fast generator with batch export and brand colors.",
          link: "#",
        },
      ],
    }),
    []
  );

  const [active, setActive] = useState("about");

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-zinc-900 font-sans">
      {/* NAVBAR */}
      <header className="fixed w-full z-50 top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-zinc-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white grid place-items-center font-bold shadow-md">
              MS
            </div>
            <span className="font-semibold tracking-tight text-lg">{profile.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
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
                onClick={() => setActive(item.id)}
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  active === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-md"
                    : "hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:opacity-90"
            >
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-4 h-4 mr-2" /> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <motion.div
            className="absolute -top-24 -left-24 h-72 w-72 bg-emerald-200 blur-3xl rounded-full"
            animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-72 w-72 bg-indigo-200 blur-3xl rounded-full"
            animate={{ x: [0, -15, 10, 0], y: [0, 10, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-indigo-500 mb-3 font-semibold" data-aos="fade-up">
              Hello, I am
            </p>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              {profile.name}
            </h1>
            <p className="mt-3 text-lg md:text-2xl text-zinc-700 font-medium" data-aos="fade-up" data-aos-delay="100">
              {profile.role}
            </p>
            <p className="mt-4 text-zinc-600 max-w-xl leading-relaxed" data-aos="fade-up" data-aos-delay="150">
              {profile.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3" data-aos="fade-up" data-aos-delay="200">
              <Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:opacity-90" asChild>
                <a href="#contact">
                  Contact Me <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-xl">
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex items-center">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-xl">
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Card with photo + quick highlights */}
          <div className="md:justify-self-end" data-aos="zoom-in">
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-indigo-300/60 to-emerald-300/60 shadow-2xl">
              <div className="rounded-3xl p-8 bg-white/80 border border-white/40 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-200 to-emerald-200 grid place-items-center shadow-inner overflow-hidden">
                    {/* Replace with your image in /public/avatar.jpg if available */}
                    <ImageIcon className="w-10 h-10 text-indigo-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Availability</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open to Work
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {profile.services.slice(0, 4).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2" data-aos="fade-left" data-aos-delay={idx * 50}>
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-indigo-500" />
                      <div>
                        <div className="font-medium text-zinc-800">{s.title}</div>
                        <div className="text-sm text-zinc-600">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2" data-aos="fade-right">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              About
            </h2>
            <p className="mt-4 text-zinc-700 leading-relaxed text-lg">
              I’m a Next.js developer and Python backend engineer focused on crafting fast, accessible,
              and maintainable web applications. I specialize in elegant UI with Tailwind & shadcn/ui,
              robust APIs with FastAPI, and modern AI integrations using the OpenAI Agents SDK.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="rounded-xl bg-indigo-100 text-indigo-700">Remote Friendly</Badge>
              <Badge variant="outline" className="rounded-xl border-emerald-400 text-emerald-600">
                Contract / Full‑time
              </Badge>
              <Badge variant="secondary" className="rounded-xl">Pakistan Time (UTC+5)</Badge>
            </div>
          </div>
          <Card className="border-white/30 shadow-md bg-gradient-to-br from-white/70 to-zinc-50/90 backdrop-blur-xl" data-aos="fade-left">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>{profile.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gradient-to-b from-zinc-50 to-white border-y border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent" data-aos="fade-up">
            Services
          </h2>
          <p className="mt-2 text-zinc-600 text-lg" data-aos="fade-up" data-aos-delay="50">
            Professional tech solutions from idea to production.
          </p>
          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {profile.services.map((s, i) => (
              <Card
                key={i}
                className="hover:shadow-2xl transition rounded-2xl bg-white/80 backdrop-blur-xl border-white/30"
                data-aos="zoom-in"
                data-aos-delay={i * 60}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-indigo-600">
                    {s.icon}
                    <CardTitle className="text-base font-semibold text-zinc-800">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent" data-aos="fade-up">
            Featured Projects
          </h2>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1 font-medium"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            See more on GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {profile.projects.map((p, i) => (
            <Card
              key={i}
              className="group rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/40 hover:shadow-2xl transition"
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              <div className="h-40 w-full bg-gradient-to-br from-indigo-100 to-emerald-100 grid place-items-center">
                <ImageIcon className="w-10 h-10 text-indigo-500 group-hover:scale-110 transition" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-zinc-800">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline" className="rounded-xl border-indigo-400 text-indigo-600">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" size="sm" asChild className="rounded-xl border-indigo-400 text-indigo-600">
                    <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center">
                      Visit <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="bg-gradient-to-b from-white to-zinc-50 border-y border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent" data-aos="fade-up">
            Tech Arsenal
          </h2>
          <p className="mt-2 text-zinc-600 text-lg" data-aos="fade-up" data-aos-delay="50">
            Tools and technologies I use frequently.
          </p>
          <div className="mt-6 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-xl">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Let’s build something great
            </h2>
            <p className="mt-3 text-zinc-700">
              Share your idea, and I’ll get back to you within 24–48 hours.
            </p>
            <div className="mt-6 space-y-3 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a className="hover:underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <a className="hover:underline" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a className="hover:underline" href={profile.socials.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <Card className="border-white/40 bg-white/80 backdrop-blur-xl" data-aos="fade-left">
            <CardContent className="pt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);
                  const name = fd.get("name");
                  const email = fd.get("email");
                  alert(`Thanks ${name}! I will reply at ${email}.`);
                  form.reset();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <Button type="submit" className="rounded-xl w-full bg-gradient-to-r from-indigo-500 to-emerald-500 hover:opacity-90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:underline inline-flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
