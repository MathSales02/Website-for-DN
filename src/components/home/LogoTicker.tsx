"use client";

import React from "react";
import { 
  Briefcase, 
  Building2, 
  Globe2, 
  Landmark, 
  MonitorSmartphone, 
  Hexagon, 
  CircleDot, 
  Triangle 
} from "lucide-react";

export default function LogoTicker() {
  const logos = [
    { icon: <Briefcase className="w-8 h-8" />, name: "Empresa 1" },
    { icon: <Building2 className="w-8 h-8" />, name: "Agência 2" },
    { icon: <Globe2 className="w-8 h-8" />, name: "Tech 3" },
    { icon: <Landmark className="w-8 h-8" />, name: "Banco 4" },
    { icon: <MonitorSmartphone className="w-8 h-8" />, name: "App 5" },
    { icon: <Hexagon className="w-8 h-8" />, name: "Construtora 6" },
    { icon: <CircleDot className="w-8 h-8" />, name: "Clínica 7" },
    { icon: <Triangle className="w-8 h-8" />, name: "Logística 8" },
  ];

  // We duplicate the logos array to create a seamless infinite scroll loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-[--color-brand-dark] border-b border-white/5 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Empresas que confiaram em <span className="text-[--color-brand-primary]">nós</span>
        </h2>
        <p className="text-white/40 text-sm tracking-widest uppercase font-medium">
          Marcas que escalam com nosso método
        </p>
      </div>

      {/* The fading edges for the carousel */}
      <div className="relative w-full max-w-7xl mx-auto flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[--color-brand-dark] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[--color-brand-dark] to-transparent pointer-events-none" />
        
        {/* The scrolling container */}
        <div className="flex animate-scroll w-max hover:cursor-grab active:cursor-grabbing">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 px-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <div className="text-white">{logo.icon}</div>
              <span className="text-white font-semibold text-xl tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
