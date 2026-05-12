"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo demora para ver os resultados?",
    answer: "Trabalhamos com estratégias de performance imediata e longo prazo. Nas primeiras semanas, otimizamos campanhas e infraestrutura, e normalmente nossos clientes veem um aumento significativo em leads qualificados já no primeiro mês."
  },
  {
    question: "Vocês atendem o meu nicho de mercado?",
    answer: "Somos especialistas em vendas e escala. Se o seu negócio possui um modelo validado, seja B2B ou B2C, nosso ecossistema de marketing de performance pode ser adaptado para encontrar e converter seu cliente ideal."
  },
  {
    question: "Qual o investimento mínimo recomendado?",
    answer: "Não trabalhamos com pacotes fixos, mas com planos estruturados de acordo com seu faturamento atual e meta de crescimento. Agende uma reunião conosco para desenharmos uma proposta personalizada que faça sentido para o seu caixa."
  },
  {
    question: "O que está incluso no escopo de vocês?",
    answer: "Diferente de agências tradicionais que vendem 'posts', nós entregamos tráfego pago, web design focado em conversão (Landing Pages de alta performance) e consultoria de growth, tudo integrado para alavancar seu ROI."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative bg-[--color-brand-darker] py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-[--color-brand-primary] rounded-full blur-[150px] opacity-10 pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold tracking-wider text-white/80 uppercase">Ficou com dúvida?</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tighter"
          >
            Perguntas Frequentes
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "bg-white/10 border-[--color-brand-primary]/50" : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-xl font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 ml-4 p-2 rounded-full transition-colors duration-300 ${isOpen ? "bg-[--color-brand-primary]/20 text-[--color-brand-primary]" : "bg-white/5 text-white/50"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-white/60 text-lg leading-relaxed border-t border-white/5 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
