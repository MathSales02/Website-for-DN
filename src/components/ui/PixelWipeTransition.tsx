"use client";

import { useEffect, useRef, useMemo } from "react";

export interface PixelWipeProps {
  /** Cor das células que formam a "cortina" (geralmente a cor da seção anterior) */
  fromColor?: string;
  /** Número de colunas da grade */
  cols?: number;
  /** Número de linhas da grade */
  rows?: number;
  /** Padrão de animação: onda a partir do centro, diagonal ou espiral */
  pattern?: "wave" | "diagonal" | "spiral";
  /** Duração total da animação em ms */
  duration?: number;
  /** Altura do strip de transição */
  height?: number;
  className?: string;
}

/** Gera a ordem espiral dos índices */
function spiralOrder(cols: number, rows: number): number[][] {
  const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1, i = 0;
  while (top <= bottom && left <= right) {
    for (let x = left; x <= right; x++) grid[top][x] = i++;
    top++;
    for (let y = top; y <= bottom; y++) grid[y][right] = i++;
    right--;
    if (top <= bottom) { for (let x = right; x >= left; x--) grid[bottom][x] = i++; bottom--; }
    if (left <= right) { for (let y = bottom; y >= top; y--) grid[y][left] = i++; left++; }
  }
  return grid;
}

export default function PixelWipeTransition({
  fromColor = "var(--color-brand-darker, #0a1211)",
  cols = 16,
  rows = 6,
  pattern = "wave",
  duration = 900,
  height = 80,
  className = "",
}: PixelWipeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  // Calcula delays normalizados [0..1] para cada célula
  const delays = useMemo(() => {
    const raw: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    const spiral = pattern === "spiral" ? spiralOrder(cols, rows) : null;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (pattern === "wave") {
          raw[y][x] = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
        } else if (pattern === "diagonal") {
          raw[y][x] = x + y;
        } else if (spiral) {
          raw[y][x] = spiral[y][x];
        }
      }
    }

    let min = Infinity, max = -Infinity;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      if (raw[y][x] < min) min = raw[y][x];
      if (raw[y][x] > max) max = raw[y][x];
    }
    const range = max - min || 1;
    return raw.map(row => row.map(v => (v - min) / range));
  }, [cols, rows, pattern]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const cells = el.querySelectorAll<HTMLDivElement>("[data-cell]");
          cells.forEach((cell) => {
            const delayFraction = parseFloat(cell.dataset.delay ?? "0");
            const delayMs = delayFraction * duration * 0.7;
            const fadeDuration = duration * 0.35;
            cell.animate(
              [{ opacity: 1 }, { opacity: 0 }],
              {
                delay: delayMs,
                duration: fadeDuration,
                easing: "ease-in-out",
                fill: "forwards",
              }
            );
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration]);

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          data-cell
          data-delay={delays[y][x].toString()}
          style={{ backgroundColor: fromColor }}
          className="w-full h-full"
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}
