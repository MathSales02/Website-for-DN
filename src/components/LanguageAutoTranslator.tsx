"use client";

import { useEffect } from "react";

export default function LanguageAutoTranslator() {
  useEffect(() => {
    try {
      // Evita rodar no servidor
      if (typeof window === "undefined") return;

      // Detecta a linguagem do navegador (ex: "en-US" -> "en")
      const navLang = navigator.language || (navigator as any).userLanguage;
      const langCode = navLang ? navLang.split('-')[0].toLowerCase() : 'pt';
      
      // Idiomas alvo que a ferramenta suportará ativamente na lógica (além do padrão do google)
      const supportedLangs = ['en', 'es', 'fr', 'pt'];
      const targetLang = supportedLangs.includes(langCode) ? langCode : 'en';

      // Se for pt (idioma nativo do site), não precisamos traduzir.
      if (targetLang === 'pt') return;

      // Define o cookie do Google Translate para forçar a tradução ANTES do script carregar
      // Formato: /idiomaOriginal/idiomaDestino
      const cookieValue = `/pt/${targetLang}`;
      const currentCookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));
      
      // Apenas define o cookie se não existir ou se não for a do idioma detectado 
      // (Isso permite que o usuário mude manualmente depois sem a gente forçar de volta)
      if (!currentCookie) {
        document.cookie = `googtrans=${cookieValue}; path=/`;
        document.cookie = `googtrans=${cookieValue}; domain=.${location.hostname}; path=/`;
      }

      // Prepara a inicialização do script do Google
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { 
            pageLanguage: 'pt', 
            includedLanguages: 'en,es,fr,pt', 
            autoDisplay: false 
          },
          'google_translate_element'
        );
      };

      // Carrega o script na página
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    } catch (e) {
      console.error("Erro ao inicializar o tradutor:", e);
    }
  }, []);

  // O container precisa existir no DOM, mas manteremos ele oculto para não quebrar o layout premium
  return <div id="google_translate_element" className="hidden" />;
}
