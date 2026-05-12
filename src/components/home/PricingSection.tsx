"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={containerRef} className="relative bg-[--color-brand-darker] py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Cinematic Background Glows */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[--color-brand-primary] rounded-full blur-[150px] opacity-10 pointer-events-none" 
      />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[--color-brand-primary] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold tracking-wider text-white/80 uppercase">A Escolha Definitiva</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 drop-shadow-2xl"
          >
            Sua Empresa Merece <span className="text-[--color-brand-primary] drop-shadow-[0_0_15px_rgba(47,107,101,0.8)]">Mais</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            Não vendemos pacotes de posts. Nós entregamos um ecossistema completo de vendas focado exclusivamente no seu retorno financeiro.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Card: Mercado Tradicional */}
          <motion.div 
            variants={itemVariants}
            className="bg-[--color-brand-dark] rounded-3xl p-8 md:p-12 border border-white/5 shadow-xl opacity-90 scale-95 hover:scale-[0.98] transition-transform duration-500"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white/80 mb-8 border-b border-white/10 pb-8">
              Agências Tradicionais
            </h3>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start gap-4 text-white/70">
                <X className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <span className="text-lg">Foco em métricas de vaidade (likes e seguidores).</span>
              </li>
              <li className="flex items-start gap-4 text-white/70">
                <X className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <span className="text-lg">Pacotes engessados sem alinhamento comercial.</span>
              </li>
              <li className="flex items-start gap-4 text-white/70">
                <X className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <span className="text-lg">Atendimento demorado e falta de transparência.</span>
              </li>
              <li className="flex items-start gap-4 text-white/70">
                <X className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <span className="text-lg">Design genérico usando templates prontos.</span>
              </li>
            </ul>
          </motion.div>

          {/* Card: Agência DN */}
          <motion.div 
            variants={itemVariants}
            className="bg-[--color-brand-dark] rounded-3xl p-6 md:p-12 border border-[--color-brand-primary]/30 shadow-[0_0_50px_rgba(47,107,101,0.2)] relative z-10 md:-translate-x-4 md:-translate-y-4 hover:shadow-[0_0_80px_rgba(47,107,101,0.3)] hover:-translate-y-2 md:hover:-translate-y-6 transition-all duration-500"
          >
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-[--color-brand-primary] blur-md opacity-50 animate-pulse"></div>
                <div className="relative bg-[--color-brand-primary] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase border border-white/20 shadow-lg">
                  Sua Escolha
                </div>
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-8 flex items-center gap-3">
              Agência DN<span className="text-[--color-brand-primary]">.</span>
            </h3>
            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4 text-white">
                <div className="bg-[--color-brand-primary]/20 rounded-full p-1.5 mt-0.5 shrink-0 border border-[--color-brand-primary]/30">
                  <Check className="w-5 h-5 text-[--color-brand-primary]" strokeWidth={3} />
                </div>
                <span className="text-lg text-white/90">Estratégia focada 100% em <strong className="text-white">conversão e ROI</strong>.</span>
              </li>
              <li className="flex items-start gap-4 text-white">
                <div className="bg-[--color-brand-primary]/20 rounded-full p-1.5 mt-0.5 shrink-0 border border-[--color-brand-primary]/30">
                  <Check className="w-5 h-5 text-[--color-brand-primary]" strokeWidth={3} />
                </div>
                <span className="text-lg text-white/90">Planos sob medida integrados ao seu time de vendas.</span>
              </li>
              <li className="flex items-start gap-4 text-white">
                <div className="bg-[--color-brand-primary]/20 rounded-full p-1.5 mt-0.5 shrink-0 border border-[--color-brand-primary]/30">
                  <Check className="w-5 h-5 text-[--color-brand-primary]" strokeWidth={3} />
                </div>
                <span className="text-lg text-white/90">Dashboards de performance em tempo real e proximidade.</span>
              </li>
              <li className="flex items-start gap-4 text-white">
                <div className="bg-[--color-brand-primary]/20 rounded-full p-1.5 mt-0.5 shrink-0 border border-[--color-brand-primary]/30">
                  <Check className="w-5 h-5 text-[--color-brand-primary]" strokeWidth={3} />
                </div>
                <span className="text-lg text-white/90">Design Premium e desenvolvimento Web de alto nível.</span>
              </li>
            </ul>
            
            <div className="flex justify-center mt-auto">
              <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer" className="w-full">
                <MagneticButton className="w-full py-5 bg-[--color-brand-primary] text-white text-lg font-bold hover:bg-[#255651] shadow-xl hover:shadow-2xl transition-all">
                  Agendar Reunião Estratégica
                </MagneticButton>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
