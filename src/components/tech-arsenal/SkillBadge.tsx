import { m } from "framer-motion";

export const SkillBadge = ({ name }: { name: string }) => (
  <m.div
    whileHover={{ y: -2, scale: 1.05 }}
    className="group relative px-4 py-2 rounded-xl bg-white/5 border border-white/10 
               hover:border-white/30 backdrop-blur-sm cursor-default transition-all"
  >

    {/* Subtle Glow Effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    opacity-0 group-hover:opacity-100 transition-opacity blur" />
    <span className="relative text-sm font-medium text-slate-200 group-hover:text-white">
      {name}
    </span>
  </m.div>
);
