"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "pt", name: "Português", short: "PT" },
  { code: "en", name: "English", short: "EN" },
  { code: "es", name: "Español", short: "ES" },
  { code: "fr", name: "Français", short: "FR" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectCurrentLang = () => {
      if (typeof window === "undefined") return "pt";

      if (!sessionStorage.getItem("langSelected")) {
        return "pt";
      }

      const match = document.cookie.match(/googtrans=\/pt\/([a-z]{2})/);
      if (match) return match[1];

      return "pt";
    };

    const langCode = detectCurrentLang();
    const lang = languages.find((l) => l.code === langCode) || languages[0];
    setCurrentLang(lang);

    // Fechar ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === currentLang.code) {
      setIsOpen(false);
      return;
    }

    // Salva na sessão que o usuário escolheu o idioma manualmente
    sessionStorage.setItem("langSelected", "true");

    // Limpa cookies antigos do google translate para garantir que vai pegar o novo
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;

    // Se não for português, define o cookie do google translate
    if (langCode !== "pt") {
      document.cookie = `googtrans=/pt/${langCode}; path=/`;
      document.cookie = `googtrans=/pt/${langCode}; domain=.${window.location.hostname}; path=/`;
    }

    // Recarrega a página para aplicar a nova tradução
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
        aria-label="Selecionar Idioma"
      >
        <Globe size={16} />
        <span>{currentLang.short}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-32 bg-[--color-brand-darker]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-4 py-2 text-sm text-left transition-colors flex items-center justify-between ${
                    currentLang.code === lang.code
                      ? "text-[--color-brand-primary] bg-white/5 font-semibold"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
