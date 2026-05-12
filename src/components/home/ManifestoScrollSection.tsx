'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

// ─── Design Tokens da DN ─────────────────────────────────────────────────────
const DN_GREEN   = '#2f6b65';
const DN_DARK    = '#040807';
const DN_DARKER  = '#0a1211';
const DN_CREAM   = '#f0f4f4';
const DN_WHITE   = '#ffffff';

// ─── Divisor reutilizável ─────────────────────────────────────────────────────
function Divider({ color = 'rgba(255,255,255,0.15)' }: { color?: string }) {
  return <hr style={{ borderColor: color }} className="my-[2vw] border-t border-0" />;
}

// ─── Bloco de stat ────────────────────────────────────────────────────────────
function Stat({ label, desc, color = 'rgba(255,255,255,0.6)' }: { label: string; desc: string; color?: string }) {
  return (
    <div className="min-w-[160px] flex-1">
      <p className="mb-2 text-sm font-bold uppercase tracking-wider">{label}</p>
      <p
        className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed"
        style={{ color }}
      >
        {desc}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ManifestoScrollSection() {
  return (
    <section id="manifesto-scroll" aria-label="Manifesto DN">
      <FlowArt aria-label="Manifesto da Agência DN">

        {/* ── 01 Quem Somos ─────────────────────────────────────────────────── */}
        <FlowSection
          aria-label="Quem somos"
          style={{ backgroundColor: DN_GREEN, color: DN_WHITE }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
            01 — Quem Somos
          </p>

          <Divider color="rgba(255,255,255,0.25)" />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Crescer
            <br />
            Com
            <br />
            Método
          </h2>

          <Divider color="rgba(255,255,255,0.25)" />

          <p className="mt-auto max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-90">
            Não somos uma agência comum. Somos engenheiros de crescimento — combinando
            inteligência de dados, design de conversão e mídia paga para escalar negócios
            de forma previsível e sustentável.
          </p>
        </FlowSection>

        {/* ── 02 Nossa Missão ───────────────────────────────────────────────── */}
        <FlowSection
          aria-label="Nossa missão"
          style={{ backgroundColor: DN_DARK, color: DN_WHITE }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            02 — Nossa Missão
          </p>

          <Divider />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Resultado
            <br />
            Acima
            <br />
            De Tudo
          </h2>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-80">
            Cada centavo investido em mídia deve ter um retorno mensurável. Trabalhamos
            para que o seu CAC caia e o seu LTV suba — todo mês.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="Tráfego Pago"
              desc="Campanhas de alta intenção no Google, Meta e TikTok otimizadas diariamente para o máximo ROI."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="Conteúdo Estratégico"
              desc="Criativos que param o scroll e histórias que vendem — sem achismo, com teste A/B contínuo."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="CRO & UX"
              desc="Landing pages desenhadas para converter. Cada elemento posicionado para empurrar o usuário à ação."
              color="rgba(255,255,255,0.55)"
            />
          </div>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="Analytics Avançado"
              desc="Dashboards em tempo real, atribuição multi-toque e relatórios que mostram o que realmente importa."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="Automação de Marketing"
              desc="Fluxos de e-mail, WhatsApp e remarketing que nutrem leads e reativam clientes no piloto automático."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="Inteligência Competitiva"
              desc="Monitoramos seus concorrentes e identificamos oportunidades antes que o mercado perceba."
              color="rgba(255,255,255,0.55)"
            />
          </div>

          <Divider />

          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-80">
            Cada decisão que tomamos começa com uma pergunta: isso vai aumentar o faturamento do cliente?
          </p>
        </FlowSection>

        {/* ── 03 Como Funciona ──────────────────────────────────────────────── */}
        <FlowSection
          aria-label="Como funciona"
          style={{ backgroundColor: DN_CREAM, color: '#000' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            03 — Como Funciona
          </p>

          <Divider color="rgba(0,0,0,0.15)" />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Diagnose.
            <br />
            Execute.
            <br />
            Escale.
          </h2>

          <Divider color="rgba(0,0,0,0.15)" />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-75">
            Quatro etapas. Zero desperdício. Seu negócio começa a crescer a partir do
            primeiro mês de parceria.
          </p>

          <Divider color="rgba(0,0,0,0.15)" />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="01 — Diagnóstico"
              desc="Auditoria completa do seu cenário digital, concorrência e oportunidades. Definimos metas e KPIs reais."
              color="rgba(0,0,0,0.55)"
            />
            <Stat
              label="02 — Estruturação"
              desc="Configuramos pixels, tagueamento avançado, landing pages e criativos antes de investir R$ 1 em mídia."
              color="rgba(0,0,0,0.55)"
            />
            <Stat
              label="03 — Execução"
              desc="Campanhas no ar com monitoramento diário. Ajustes cirúrgicos para manter o custo por resultado sob controle."
              color="rgba(0,0,0,0.55)"
            />
          </div>

          <Divider color="rgba(0,0,0,0.15)" />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="04 — Otimização"
              desc="Matamos o que não performa. Escalamos o que funciona. Relatório completo toda semana."
              color="rgba(0,0,0,0.55)"
            />
            <Stat
              label="05 — Expansão"
              desc="Abrimos novos canais, testamos novas audiências e verticais para sustentar o crescimento."
              color="rgba(0,0,0,0.55)"
            />
            <Stat
              label="06 — Automação"
              desc="Integramos CRM, chatbots e fluxos de nutrição para que seu negócio venda enquanto você dorme."
              color="rgba(0,0,0,0.55)"
            />
          </div>
        </FlowSection>

        {/* ── 04 Resultados ─────────────────────────────────────────────────── */}
        <FlowSection
          aria-label="Nossos números"
          style={{ backgroundColor: DN_DARKER, color: DN_WHITE }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            04 — Nossos Números
          </p>

          <Divider />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Dados
            <br />
            Que
            <br />
            Provam
          </h2>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-80">
            Não pedimos que acredite em nós. Pedimos que analise os números.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="+340%"
              desc="de ROAS médio gerado para nossos clientes de e-commerce em 90 dias."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="-62%"
              desc="de CAC (Custo de Aquisição de Cliente) após os primeiros 60 dias de otimização contínua."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="6+ anos"
              desc="de experiência acumulada em tráfego pago, design e estratégia de crescimento digital."
              color="rgba(255,255,255,0.55)"
            />
          </div>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-80">
            O mercado digital mudou. Quem continua apostando em feeling e intuição está
            entregando dinheiro para os concorrentes. Dados vencem.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="100% transparente"
              desc="Você acessa todos os dados, campanhas e relatórios em tempo real. Sem caixa preta."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="Sem contrato longo"
              desc="Acreditamos no resultado como retenção. Se não performarmos, você não fica preso."
              color="rgba(255,255,255,0.55)"
            />
            <Stat
              label="Dedicação exclusiva"
              desc="Cada cliente tem um squad dedicado. Nunca somos uma agência de prateleira."
              color="rgba(255,255,255,0.55)"
            />
          </div>
        </FlowSection>

      </FlowArt>
    </section>
  );
}
