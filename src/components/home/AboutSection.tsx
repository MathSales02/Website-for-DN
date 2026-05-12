"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "manifesto",
    title: "O Manifesto",
    text: "Não somos apenas criadores de anúncios. Somos engenheiros de crescimento. Construímos ecossistemas de vendas altamente previsíveis que tornam seu negócio à prova de falhas.",
    highlight: "Alta Performance"
  },
  {
    id: "visao",
    title: "Nossa Visão",
    text: "Enxergamos além do clique superficial. Analisamos dados complexos, otimizamos jornadas e desenhamos experiências digitais que transformam visitantes em clientes absolutos.",
    highlight: "Estratégia Profunda"
  },
  {
    id: "proposito",
    title: "O Propósito",
    text: "Erradicar o amadorismo no mercado digital. Trazemos engenharia de tráfego avançada e design de classe mundial para marcas que não aceitam ser medianas.",
    highlight: "Padrão Global"
  },
  {
    id: "diferencial",
    title: "O Diferencial",
    text: "Você não contrata um fornecedor, você ganha um braço armado de crescimento. Unimos inteligência de dados, design ultra-imersivo e agressividade em mídia.",
    highlight: "Growth Machine"
  },
  {
    id: "premium",
    title: "Experiência Premium",
    text: "A percepção de valor é tudo. Do primeiro contato visual ao pós-venda estratégico, garantimos que sua marca seja posicionada como a autoridade máxima do seu setor.",
    highlight: "Exclusividade"
  }
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Simple vertical fade up for all devices
    const panels = gsap.utils.toArray(".about-panel");
    panels.forEach((panel: any) => {
      gsap.fromTo(panel, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse"
          } 
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      id="sobre"
      ref={containerRef} 
      className="relative bg-[--color-brand-darker] overflow-hidden min-h-screen py-24 md:py-40"
    >
      
      {/* Ambient Lighting & Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--color-brand-darker] via-transparent to-[--color-brand-darker] z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[--color-brand-primary] rounded-full blur-[250px] opacity-[0.05] z-0 pointer-events-none" />

      {/* Vertical Scroll Wrapper */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 md:px-12 gap-16 md:gap-32">
        {/* Header Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4 opacity-80">
            Sobre Nós
          </h2>
          <div className="w-24 h-1 bg-[--color-brand-primary] mx-auto rounded-full" />
        </div>

        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={section.id} 
              className={`about-panel w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Meta/Index Side */}
              <div className={`flex flex-col gap-4 md:w-1/3 ${!isEven ? 'md:items-end text-right' : 'md:items-start text-left'} items-center text-center`}>
                <div className={`flex items-center gap-4 ${!isEven ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-[1px] bg-[--color-brand-primary]" />
                  <div className="text-[--color-brand-primary] font-mono text-xl tracking-widest">
                    0{index + 1} / 0{sections.length}
                  </div>
                </div>
                
                <div className="inline-block px-5 py-2 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 backdrop-blur-md shadow-sm">
                  <span className="text-[--color-brand-primary] font-bold text-xs md:text-sm tracking-widest uppercase">
                    {section.highlight}
                  </span>
                </div>
              </div>

              {/* Content Box with Subtle Glassmorphism */}
              <div className="md:w-2/3 flex flex-col gap-6 relative p-8 md:p-10 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-[--color-brand-primary]/30">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  <SplitText text={section.title} delay={0.1} />
                </h3>
                
                <p className="text-base md:text-xl text-white/80 leading-relaxed font-light mt-2">
                  {section.text}
                </p>
                
                {/* Micro interaction line */}
                <div className="h-[1px] w-12 bg-[--color-brand-primary] mt-4 transition-all duration-500 hover:w-full" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
