"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "../ui/Typewriter";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".connection-fade",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[--color-brand-darker] relative overflow-hidden flex items-center justify-center">
      {/* Immersive background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[--color-brand-primary] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        
        <div className="connection-fade mb-8">
          <div className="h-24 bg-gradient-to-b from-transparent to-[--color-brand-primary] mx-auto opacity-50" style={{ width: '1px' }} />
        </div>

        <Typewriter 
          text="Você está cansado de agências que só entregam métricas de vaidade?" 
          className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-10 text-center" 
          speed={0.05}
        />
        
        <p className="connection-fade text-xl md:text-3xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto">
          Likes não pagam salários. Seguidores não sustentam empresas.
          Nós subvertemos a lógica das agências comuns: <span className="text-white font-semibold">foco absoluto no seu crescimento em Vendas.</span>
        </p>

        <div className="connection-fade mt-16">
          <div className="h-24 bg-gradient-to-t from-transparent to-[--color-brand-primary] mx-auto opacity-50" style={{ width: '1px' }} />
        </div>
        
      </div>
    </section>
  );
}
