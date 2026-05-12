"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EbookSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".ebook-content > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".ebook-visual",
      { opacity: 0, scale: 0.9, rotateY: 15 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
    
    // Floating animation
    gsap.to(".ebook-visual", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[--color-brand-darker] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[--color-brand-primary] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[--color-brand-primary] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Content */}
          <div className="ebook-content flex flex-col gap-6 md:pr-10">
            <div className="inline-block px-4 py-2 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 backdrop-blur-md w-fit">
              <span className="text-[--color-brand-primary] font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Material Gratuito
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Acesse o mapa para o crescimento exponencial.
            </h2>
            
            <p className="text-lg text-white/70 leading-relaxed font-light">
              Baixe nosso e-book gratuito e descubra os bastidores das estratégias de growth e performance que utilizamos para escalar empresas e dominar o mercado digital.
            </p>
            
            <ul className="flex flex-col gap-4 mt-2 text-white/80 font-light">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                <span className="opacity-90">Estratégias avançadas de tráfego pago e aquisição</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                <span className="opacity-90">Como estruturar funis de altíssima conversão</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                <span className="opacity-90">O segredo do design e branding focados em vendas</span>
              </li>
            </ul>
            
            <div className="pt-6">
              <a 
                href="https://drive.google.com/file/d/13Wvu0cTBiBTcgAAvO0VUTwmwfDsmtA2M/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[--color-brand-primary] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(47,107,101,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Baixar E-book Agora</span>
                <svg className="relative z-10 group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Visual/Mockup */}
          <div className="ebook-visual perspective-[1000px] flex justify-center mt-8 md:mt-0">
            <div 
              className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[1/1.4] rounded-r-2xl rounded-l-md bg-gradient-to-br from-[--color-brand-primary] to-[#122c2a] shadow-[20px_20px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex flex-col justify-between p-10 transform-gpu transition-all duration-700 hover:rotate-y-[-10deg]"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-5deg)' }}
            >
              {/* Fake book spine/shadow */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black/60 to-transparent z-10" />
              <div className="absolute left-[8px] top-0 w-[1px] h-full bg-white/20 z-20" />
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />
              
              <div className="relative z-20 flex flex-col items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="text-white font-black text-xl tracking-tighter">DN</span>
                </div>
                <div className="text-white/60 text-xs font-mono tracking-widest mt-8 uppercase">
                  Agência DN
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight mt-2 drop-shadow-lg">
                  O Manual do <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    Crescimento Exponencial
                  </span>
                </h3>
              </div>
              
              <div className="relative z-20 w-full flex justify-between items-end pb-2">
                <div className="text-white/50 text-[10px] tracking-widest uppercase">Estratégias de Elite</div>
                <div className="w-8 h-[2px] bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
