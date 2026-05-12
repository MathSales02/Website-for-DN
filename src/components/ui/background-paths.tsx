"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
    const [paths] = React.useState(() => Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(255,255,255,${0.05 + i * 0.02})`, // Adjusted color for dark bg
        width: 0.5 + i * 0.03,
        duration: 20 + Math.random() * 10,
    })));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white/10"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Design de Elite. Performance Extrema.",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[--color-brand-dark]">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 2.3 }}
                        className="inline-block mb-8 px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/5 backdrop-blur-md"
                    >
                        <span className="text-[--color-brand-primary] font-medium text-sm tracking-widest uppercase">
                            Sua Agência de Performance
                        </span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => {
                            // Highlights the last two words ("Performance Extrema.")
                            const isGradient = wordIndex >= words.length - 2; 
                            return (
                                <motion.span
                                    key={wordIndex}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: wordIndex * 0.15 + 2.4,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                    }}
                                    className={`inline-block mr-3 md:mr-4 last:mr-0 text-transparent bg-clip-text ${
                                        isGradient 
                                        ? "bg-gradient-to-r from-white to-[--color-brand-primary]" 
                                        : "bg-gradient-to-r from-white to-white/80"
                                    }`}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 2.8 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mb-12"
                    >
                        Somos especialistas em escalar negócios B2B e B2C através de estratégias avançadas de Growth, Tráfego Pago e Web Design de alta conversão.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 3.0 }}
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                    >
                        <div
                            className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10 
                            p-px rounded-2xl backdrop-blur-lg 
                            overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="ghost"
                                    className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                                    bg-[--color-brand-primary]/90 hover:bg-[--color-brand-primary] 
                                    text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-white/10
                                    hover:shadow-[0_0_30px_rgba(47,107,101,0.5)]"
                                >
                                    <span className="opacity-100 transition-opacity">
                                        Solicitar Orçamento
                                    </span>
                                    <span
                                        className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                        transition-all duration-300"
                                    >
                                        →
                                    </span>
                                </Button>
                            </a>
                        </div>
                        
                        <a href="#cases">
                            <Button 
                                variant="ghost" 
                                className="px-8 py-6 text-lg font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[1.15rem] transition-all duration-300 hover:shadow-lg"
                            >
                                Ver Nossos Cases
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="text-white/40 text-xs tracking-widest uppercase">Explorar</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
                />
            </motion.div>
        </div>
    );
}
