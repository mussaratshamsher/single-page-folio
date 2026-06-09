import React from "react";
import { m } from "framer-motion";
import {
  Code2, Server, Database, Sparkles, Laptop, Rocket, Palette, Search, Layers, PenTool,
  MessageSquare, Workflow, Bot, Terminal, Cpu, Globe, GitBranch, Shield
} from "lucide-react";

// Robust mapping of skills to icons
const skillIcons: { [key: string]: React.ReactNode } = {
  "Next.js": <Code2 />, "React": <Code2 />, "TypeScript": <Code2 />, "Tailwind": <Palette />,
  "Python": <Terminal />, "FastAPI": <Server />, "OpenAI sdk": <Bot />, "Postgre SQL": <Database />,
  "MongoDB": <Database />, "Supabase": <Database />, "Qdrant": <Database />, "Figma": <Palette />,
  "Git": <GitBranch />, "GitHub Actions": <Rocket />, "SEO": <Search />, "Automation": <Workflow />,
  "Agents sdk": <Bot />, "HTML": <Globe />, "CSS": <Palette />, "JavaScript": <Code2 />,
  "shadcn/ui": <Layers />, "daisyUI": <Palette />, "Framer Motion": <Sparkles />, "AOS": <Sparkles />,
  "swiper-js": <Layers />, "Sanity CMS": <Database />, "Stripe": <Shield />, "OAuth": <Shield />,
  "Clerk": <Shield />, "Netlify": <Rocket />, "Vercel": <Rocket />, "Railway": <Rocket />,
  "Streamlit": <Server />, "Chainlit": <Server />, "Hugging Face": <Cpu />, "Firebase": <Database />,
  "Canva": <Palette />, "Adobe Illustrator": <Palette />, "Adobe Photoshop": <Palette />,
  "GIMP": <Palette />, "Ubersuggest": <Search />, "Semrush": <Search />, "Google Trends": <Search />,
  "Keyword.io": <Search />, "mongols": <Database />, "Schema Generator": <Code2 />,
  "google analytics": <Search />, "Lighthouse": <Search />, "Page Speed Insights": <Search />,
  "SEO Quake": <Search />, "Google Analytics": <Search />,
};

interface TechArsenalProps {
  skills: string[];
}

const MarqueeRow = ({ skills, direction = 1 }: { skills: string[], direction?: 1 | -1 }) => {
  const [isPaused, setIsPaused] = React.useState(false);
  
  return (
    <div 
      className="flex overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <m.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: isPaused ? 0 : 40, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 [&_svg]:w-5 [&_svg]:h-5">
              {skillIcons[skill] || <Sparkles />}
            </div>
            <span className="text-sm font-medium text-slate-200">{skill}</span>
          </div>
        ))}
      </m.div>
    </div>
  );
};

export const TechArsenal = ({ skills }: TechArsenalProps) => {
  const midPoint = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, midPoint);
  const row2 = skills.slice(midPoint);

  return (
    <section id="skills" className="border-t border-white/5 py-20 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">Tech Arsenal</h2>
        <p className="text-slate-400">Tools and technologies I use to build digital experiences.</p>
      </div>

      <MarqueeRow skills={row1} direction={1} />
      <MarqueeRow skills={row2} direction={-1} />
    </section>
  );
};
