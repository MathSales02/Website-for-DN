"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { y: 50, opacity: 0, rotationX: -90 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: delay,
      }
    );
  }, [isVisible, delay]);

  // Splitting text into words and then characters to preserve word wrapping
  return (
    <div ref={containerRef} className={`${className} perspective-[1000px] flex flex-wrap`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em] overflow-hidden leading-tight">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="char inline-block origin-bottom">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
