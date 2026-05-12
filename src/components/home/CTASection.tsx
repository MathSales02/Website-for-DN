"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import DynamicGridBackground from "../ui/DynamicGridBackground";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleContent = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative bg-[--color-brand-dark] py-20 md:py-40 px-4 md:px-6 overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
        <DynamicGridBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[--color-brand-darker] to-[--color-brand-dark] opacity-90" />
        <motion.div 
          style={{ y: yBackground }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[--color-brand-primary] rounded-full blur-[200px] opacity-15 pointer-events-none" 
        />
      </div>

      <motion.div 
        style={{ scale: scaleContent }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-7 sm:p-12 md:p-24 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-primary]/20 to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 md:mb-8 leading-tight">
              Pronto para Escalar o seu <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[--color-brand-primary]">Faturamento?</span>
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-12 font-medium">
              Pare de perder dinheiro com estratégias que não convertem. Agende uma consultoria gratuita e descubra o potencial oculto do seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="px-10 py-5 bg-[--color-brand-primary] text-white text-lg font-bold hover:bg-[#255651] shadow-[0_0_40px_rgba(47,107,101,0.6)] hover:shadow-[0_0_60px_rgba(47,107,101,0.8)] transition-all flex items-center gap-3">
                  Quero Escalar Minhas Vendas
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </a>
            </div>
            <p className="mt-8 text-white/40 text-sm">
              * Vagas limitadas para novos projetos este mês.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
