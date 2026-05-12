"use client";

import { useEffect } from "react";

export default function LanguageAutoTranslator() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      // Se o usuário não selecionou manualmente um idioma nesta sessão, force para português (removendo cookies do Google Translate)
      if (!sessionStorage.getItem("langSelected")) {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
      }

      // Lê o cookie atual do Google Translate
      const cookieNow = document.cookie.split("; ").find((row) => row.startsWith("googtrans="));
      
      // Se não tem cookie, ou o cookie for de PT (idioma nativo), não faz nada (não carrega o tradutor)
      if (!cookieNow || cookieNow === "googtrans=" || cookieNow.includes("/pt/pt")) {
        return;
      }

      // Carrega o script na página
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "pt",
            includedLanguages: "en,es,fr,pt",
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
