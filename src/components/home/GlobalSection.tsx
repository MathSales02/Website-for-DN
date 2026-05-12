"use client";

import { Globe } from "@/components/ui/globe";
import { MapPin, MessageCircle, Globe2 } from "lucide-react";

export default function GlobalSection() {
  return (
    <section
      id="global"
      className="relative w-full overflow-hidden bg-[--color-brand-darker] py-24 md:py-36"
    >
      {/* Glow ambiental */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-[--color-brand-primary] blur-[200px] opacity-[0.07]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-[--color-brand-primary]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[--color-brand-primary]">
              Atendimento Global
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tighter text-white md:text-6xl">
            Performance que{" "}
            <span className="text-[--color-brand-primary]">cruza fronteiras</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/70">
            Atendemos empresas que já operam nos{" "}
            <strong className="font-semibold text-white">Estados Unidos e no Canadá</strong>{" "}
            — tráfego pago, criativos e funis de conversão pensados para o consumidor
            norte-americano, em inglês, com performance comprovada.
          </p>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-0">

          {/* ── Coluna esquerda ───────────────────────────── */}
          <div className="w-full md:w-1/2">

            {/* Card EUA — grande destaque */}
            <div className="relative mb-4 overflow-hidden rounded-3xl border border-[--color-brand-primary]/30 bg-gradient-to-br from-[--color-brand-primary]/20 to-[--color-brand-primary]/5 p-7">
              <span className="absolute -right-3 -top-4 text-[8rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
                01
              </span>
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[--color-brand-primary]/20 text-3xl backdrop-blur-sm">
                  🇺🇸
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black text-white">Estados Unidos</p>
                    <span className="rounded-full bg-[--color-brand-primary] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                      Foco #1
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/50">
                    New York · Los Angeles · Miami · Chicago · Seattle
                  </p>
                </div>
              </div>
              <p className="relative z-10 mt-4 text-sm leading-relaxed text-white/60">
                Gerenciamos campanhas de tráfego pago para negócios já estabelecidos nos EUA —
                Google, Meta e TikTok Ads em inglês, com estratégia local e métricas reais.
              </p>
            </div>

            {/* Card Canadá — destaque médio */}
            <div className="relative mb-4 overflow-hidden rounded-3xl border border-[--color-brand-primary]/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6">
              <span className="absolute -right-3 -top-4 text-[8rem] font-black leading-none text-white/[0.03] select-none pointer-events-none">
                02
              </span>
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  🇨🇦
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black text-white">Canadá</p>
                    <span className="rounded-full border border-[--color-brand-primary]/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[--color-brand-primary]">
                      Foco #2
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-white/50">
                    Toronto · Vancouver · Montreal · Calgary
                  </p>
                </div>
              </div>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/50">
                Campanhas bilíngues (EN/FR) com segmentação precisa para o mercado canadense.
              </p>
            </div>

            {/* Brasil + Europa — compactos lado a lado */}
            <div className="mb-8 grid grid-cols-2 gap-4">

              {/* Brasil */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 transition-colors hover:bg-white/[0.06]">
                <span className="text-2xl leading-none">🇧🇷</span>
                <div>
                  <p className="text-sm font-bold text-white/70">Brasil</p>
                  <p className="text-xs text-white/35">SP · CE · DF</p>
                </div>
              </div>

              {/* Europa & Latam */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 transition-colors hover:bg-white/[0.06]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Globe2 className="h-4 w-4 text-white/60" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/70">Europa & Latam</p>
                  <p className="text-xs text-white/35">UK · FR · MX</p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <a
              href="https://wa.me/558899222054"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-[--color-brand-primary]/40 bg-[--color-brand-primary]/10 px-6 py-4 text-white transition-all duration-300 hover:bg-[--color-brand-primary]/20 hover:border-[--color-brand-primary]/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[--color-brand-primary] transition-transform duration-300 group-hover:scale-110">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">Fale com um especialista</span>
            </a>
          </div>

          {/* ── Coluna direita: globo ─────────────────────── */}
          <div className="relative h-[400px] w-full overflow-hidden md:h-[580px] md:w-1/2">
            <Globe />

            {/* Legenda flutuante */}
            <div className="absolute bottom-6 left-4 z-10 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md md:left-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[--color-brand-primary]">
                Principais mercados
              </p>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                {["🇺🇸 EUA", "🇨🇦 Canadá", "🇧🇷 Brasil"].map((tag) => (
                  <span key={tag} className="text-xs text-white/70">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats faixa inferior */}
        <div className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-16 md:grid-cols-4">
          {[
            { value: "3+", label: "Países atendidos" },
            { value: "EUA & CA", label: "Mercados principais" },
            { value: "EN · FR · PT", label: "Idiomas de campanha" },
            { value: "24h", label: "Resposta ao cliente" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-[--color-brand-primary] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
