"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./ui/MagneticButton";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/#servicos" },
    { name: "Método", href: "/#metodo" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-6 px-4 transition-all duration-300`}
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[--color-brand-darker]/70 backdrop-blur-md border border-white/10 shadow-lg"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="DN Logo" width={80} height={32} className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-6 py-2 text-sm font-bold bg-[--color-brand-primary] text-white hover:bg-[#3b8780] border-none shadow-[0_0_15px_rgba(47,107,101,0.4)]">
                Falar com Especialista
              </MagneticButton>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[--color-brand-dark]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold text-white hover:text-[--color-brand-primary] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
            <MagneticButton className="mt-8 px-8 py-3 text-lg font-bold bg-[--color-brand-primary] text-white hover:bg-[#3b8780] shadow-[0_0_20px_rgba(47,107,101,0.4)]">
              Falar com Especialista
            </MagneticButton>
          </a>
        </motion.div>
      )}
    </>
  );
}
