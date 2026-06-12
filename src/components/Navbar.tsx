'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/components/ui/PortfolioData";
import { m, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  } as const;

  const navLinkVariants = {
    closed: { opacity: 0, y: 10 },
    opened: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1
      }
    })
  } as const;

  return (
    <>
      <header className="fixed w-full top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-20">
          <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
            <Image 
              className="w-16 h-16 md:w-20 md:h-20" 
              src="/logo.png" 
              alt={`${profile.name} - Professional Portfolio Logo`} 
              width={80} 
              height={80} 
              priority 
              quality={100} 
            /> 
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center md:gap-2 lg:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id === "projects" ? "/projects" : (isHome ? `#${item.id}` : `/#${item.id}`)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-emerald-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4">
              <Button asChild size="sm" className="btn text-emerald-300 hover:text-slate-200">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-slate-300 hover:text-emerald-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-slate-950 flex flex-col pt-32 px-8"
          >
            {/* Background Decor */}
            <div className="absolute top-1/4 -right-24 h-64 w-64 rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-24 h-64 w-64 rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />

            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <m.div
                  key={item.id}
                  custom={i}
                  variants={navLinkVariants}
                >
                  <Link
                    href={item.id === "projects" ? "/projects" : (isHome ? `#${item.id}` : `/#${item.id}`)}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </m.div>
              ))}
            </nav>

            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-auto mb-16"
            >
              <Button asChild size="lg" className="w-44 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-white text-sm shadow-xl shadow-emerald-500/20">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="w-6 h-6 mr-1" /> Download Resume
                </a>
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
