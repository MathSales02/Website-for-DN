import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Agência DN",
  description: "Artigos, dicas e estratégias sobre Marketing Digital, Tráfego Pago, e Vendas pela Agência DN.",
};

// Dummy data for blog posts
const posts = [
  {
    id: 1,
    title: "Como escalar suas vendas com Tráfego Pago em 2026",
    excerpt: "Descubra as estratégias mais recentes de otimização de campanhas no Meta e Google Ads para maximizar o seu ROAS.",
    category: "Tráfego Pago",
    date: "10 Maio, 2026",
    readTime: "5 min de leitura",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Por que sua Landing Page não converte? (E como resolver)",
    excerpt: "Os erros mais comuns em páginas de vendas e como aplicar copywriting e UX design para dobrar sua taxa de conversão.",
    category: "Web Design",
    date: "05 Maio, 2026",
    readTime: "7 min de leitura",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "O Guia Definitivo de SEO Estratégico",
    excerpt: "Aprenda a posicionar sua empresa no topo do Google sem depender exclusivamente de anúncios pagos.",
    category: "SEO",
    date: "28 Abril, 2026",
    readTime: "10 min de leitura",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Branding vs Performance: Qual priorizar?",
    excerpt: "Entenda por que as marcas mais fortes do mercado equilibram construção de marca com anúncios de resposta direta.",
    category: "Estratégia",
    date: "15 Abril, 2026",
    readTime: "4 min de leitura",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogPage() {
  return (
    <div className="w-full bg-[--color-brand-darker] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header do Blog */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Insights & <span className="text-[--color-brand-primary]">Estratégias</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Acompanhe nossos artigos e descubra as melhores táticas de marketing digital para alavancar os resultados da sua empresa.
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-[--color-brand-dark] border border-white/5 rounded-3xl overflow-hidden group hover:border-[--color-brand-primary]/50 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[--color-brand-primary] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[--color-brand-primary] transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-white/60 mb-8 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link href="#" className="inline-flex items-center gap-2 text-[--color-brand-primary] font-semibold hover:text-white transition-colors">
                  Ler Artigo Completo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/20 rounded-3xl p-10 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não perca nenhuma novidade
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Receba as melhores estratégias de marketing digital diretamente na sua caixa de entrada, uma vez por semana.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" action="#">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-[--color-brand-dark] border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-[--color-brand-primary] transition-colors"
              required
            />
            <button 
              type="submit"
              className="bg-[--color-brand-primary] text-white px-8 py-4 rounded-full font-bold hover:bg-[#255651] transition-colors"
            >
              Inscrever-se
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
