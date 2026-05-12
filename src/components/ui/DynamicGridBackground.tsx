"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DynamicGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Radial Mask to fade out edges */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, var(--color-brand-darker) 70%, var(--color-brand-dark) 100%)"
        }}
      />
      
      {/* Animated Grid Container */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ 
          duration: 15, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2f6b65" strokeWidth="0.5" strokeDasharray="4 4"/>
              <circle cx="0" cy="0" r="1.5" fill="#2f6b65" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </motion.div>
    </div>
  );
}
