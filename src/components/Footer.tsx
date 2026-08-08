'use client';

import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Github, Mail, Globe, ArrowUpRight, CalendarClock } from 'lucide-react';
import profile from '@/components/ui/PortfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.socials.twitter, label: 'Twitter' },
    { icon: Facebook, href: profile.socials.facebook, label: 'Facebook' },
    // Adding placeholder for Github or others if they exist in profile, otherwise just these three
  ];

  return (
    <footer className="relative mt-24 pb-16 px-6 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        {/* Glassmorphic Container */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="rounded-3xl bg-slate-900/40 border border-emerald-500/20 backdrop-blur-xl p-8 md:p-14 shadow-2xl shadow-emerald-500/10 overflow-hidden relative"
        >
          {/* Decorative background glow */}
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Business Status Badge */}
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new projects
            </m.div>

            {/* Big Headline */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 italic">automate</span> your future?
            </h2>

            {/* Social Hub */}
            <div className="flex flex-wrap justify-center gap-5 mb-12">
              {socialLinks.map((social, i) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-slate-800/50 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all group shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </m.a>
              ))}
<m.a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-90 transition-all group shadow-lg"
              >
                <CalendarClock className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Book a Consultation</span>
              </m.a>
              <m.a
                href="#contact"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group shadow-lg"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Get in Touch</span>
              </m.a>
            </div>

            {/* Bottom Section: Brand & Copyright */}
            <div className="w-full pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 text-[13px] text-slate-400 font-medium">
              <p>© {currentYear} {profile.name}. All rights reserved.</p>
              <span className="hidden md:inline text-white/10 text-lg">|</span>
              <Link 
                href="https://www.innolyze.com/" 
                target="_blank" 
                className="group flex items-center hover:text-emerald-300 transition-colors"
              >
                <span className="text-slate-400 group-hover:text-emerald-300">Visit our company</span>
                <span className="text-emerald-300 ml-1.5 italic text-lg transition-transform group-hover:scale-105 inline-block">
                  ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-emerald-300" />
              </Link>
            </div>
          </div>
        </m.div>

        {/* Navigation Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <Link href="#about" className="hover:text-emerald-400 transition-colors">About</Link>
          <Link href="#projects" className="hover:text-emerald-400 transition-colors">Projects</Link>
          <Link href="#services" className="hover:text-emerald-400 transition-colors">Services</Link>
          <Link href="#contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
