"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./ui/MagneticButton";

export default function Footer() {
  return (
    <footer className="relative bg-[--color-brand-darker] text-white pt-32 pb-10 overflow-hidden flex-shrink-0">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[--color-brand-primary] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            >
              Pronto para <br />
              <span className="text-[--color-brand-primary]">Escalar?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/60 text-lg mb-8"
            >
              Junte-se às empresas que dominam seus mercados e multiplicam resultados com nossa metodologia de marketing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="px-8 py-4 font-bold bg-[--color-brand-primary] text-white hover:bg-[#3b8780] shadow-[0_0_30px_rgba(47,107,101,0.3)]">
                  Falar com Especialista
                </MagneticButton>
              </a>
            </motion.div>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg mb-2">Serviços</h4>
              <Link href="#servicos" className="text-white/60 hover:text-[--color-brand-primary] transition-colors">Tráfego Pago</Link>
              <Link href="#servicos" className="text-white/60 hover:text-[--color-brand-primary] transition-colors">SEO & Orgânico</Link>
              <Link href="#servicos" className="text-white/60 hover:text-[--color-brand-primary] transition-colors">Web Design</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg mb-2">Empresa</h4>
              <Link href="#sobre" className="text-white/80 hover:text-[--color-brand-primary] transition-colors">Sobre Nós</Link>
              <Link href="/blog" className="text-white/80 hover:text-[--color-brand-primary] transition-colors">Blog</Link>
              <Link href="#contato" className="text-white/80 hover:text-[--color-brand-primary] transition-colors">Contato</Link>
              <Link href="#" className="text-white/80 hover:text-[--color-brand-primary] transition-colors">Política de Privacidade</Link>
            </div>
          </div>
        </div>

        {/* Big Text Animation at the bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-none opacity-10 select-none">
            AGÊNCIA DN
          </div>
          <p className="text-white/40 text-sm mt-8 md:mt-0">
            © {new Date().getFullYear()} DN Marketing Digital. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
