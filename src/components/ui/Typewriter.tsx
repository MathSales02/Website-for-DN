"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function Typewriter({ text, className = "", speed = 0.04 }: TypewriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const characters = text.split("");

  return (
    <div ref={containerRef} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0, delay: index * speed }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }} 
        transition={{ 
          repeat: Infinity, 
          duration: 0.8, 
          ease: "linear", 
          delay: isInView ? characters.length * speed : 0 
        }}
        className="inline-block w-[4px] h-[0.9em] bg-[--color-brand-primary] ml-1 align-middle"
      />
    </div>
  );
}
