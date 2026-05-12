"use client";

import { useEffect } from "react";

export default function LanguageAutoTranslator() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      let cookieNow = document.cookie.split("; ").find((row) => row.startsWith("googtrans="));

      // Se for a primeira visita (sem cookie), detecta o idioma do navegador
      if (!cookieNow) {
        const userLang = navigator.language || (navigator as any).userLanguage;
        if (userLang && !userLang.toLowerCase().startsWith("pt")) {
          const targetLang = userLang.split('-')[0].toLowerCase();
          
          document.cookie = `googtrans=/pt/${targetLang}; path=/`;
          document.cookie = `googtrans=/pt/${targetLang}; domain=.${window.location.hostname}; path=/`;
          
          cookieNow = `googtrans=/pt/${targetLang}`;
        }
      }

      // Se o idioma for português ou vazio, não precisa carregar o tradutor
      if (!cookieNow || cookieNow === "googtrans=" || cookieNow.includes("/pt/pt")) {
        return;
      }

      // Carrega o script na página
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "pt",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

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

  // Injeta estilos globais para esconder completamente a UI padrão do Google Translate
  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Esconde o iframe do topo (banner do Google) */
          .goog-te-banner-frame.skiptranslate, .skiptranslate iframe {
            display: none !important;
          }
          /* Remove o espaço adicionado no topo do body pelo Google */
          body {
            top: 0px !important;
          }
          /* Esconde o tooltip de tradução original quando passa o mouse */
          .goog-tooltip {
            display: none !important;
          }
          .goog-tooltip:hover {
            display: none !important;
          }
          .goog-text-highlight {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
        `
      }} />
    </>
  );
}
