'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/components/ui/PortfolioData";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <Link href="/">
          <Image 
            className="w-24 h-24" 
            src="/logo.png" 
            alt="logo" 
            width={96} 
            height={96} 
            priority 
            quality={100} 
          /> 
        </Link>
        <nav className="hidden md:flex items-center gap-1 ">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              className="px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-emerald-300 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="btn text-emerald-300 hover:text-slate-200">
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <Download className="w-4 h-4 mr-2 " /> Resume
          </a>
        </Button>
      </div>
    </header>
  );
}
