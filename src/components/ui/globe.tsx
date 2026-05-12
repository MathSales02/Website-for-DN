"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Marcadores focados em EUA, Canadá e Brasil + mercados globais
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0.6,
  theta: 0.25,
  dark: 1,
  diffuse: 0.5,
  mapSamples: 20000,
  mapBrightness: 1.4,
  baseColor: [0.08, 0.16, 0.14],
  markerColor: [0.18, 0.42, 0.4],
  glowColor: [0.18, 0.42, 0.4],
  markers: [
    // EUA (destaque máximo)
    { location: [40.7128, -74.006],   size: 0.12 },
    { location: [34.0522, -118.2437], size: 0.10 },
    { location: [41.8781, -87.6298],  size: 0.09 },
    { location: [29.7604, -95.3698],  size: 0.08 },
    { location: [25.7617, -80.1918],  size: 0.08 },
    { location: [47.6062, -122.3321], size: 0.07 },
    // Canadá (destaque alto)
    { location: [43.6510, -79.3470],  size: 0.10 },
    { location: [45.5017, -73.5673],  size: 0.09 },
    { location: [49.2827, -123.1207], size: 0.07 },
    { location: [51.0447, -114.0719], size: 0.06 },
    // Brasil
    { location: [-23.5505, -46.6333], size: 0.11 },
    { location: [-15.7801, -47.9292], size: 0.07 },
    { location: [-3.7327,  -38.5270], size: 0.06 },
    // Europa & Latam
    { location: [51.5074,  -0.1278],  size: 0.06 },
    { location: [48.8566,   2.3522],  size: 0.06 },
    { location: [19.4326, -99.1332],  size: 0.07 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let phi = config.phi ?? 0.6;
    let rafId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    const animate = () => {
      if (pointerInteracting.current === null) phi += 0.003;
      globe.update({ phi: phi + pointerMovement.current / 200 });
      rafId = requestAnimationFrame(animate);
    };

    animate();
    setTimeout(() => setOpacity(1), 100);

    const onResize = () => {
      if (canvas) {
        const w = canvas.offsetWidth;
        globe.update({ width: w * 2, height: w * 2 });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)}>
      <canvas
        className="size-full [contain:layout_paint_size]"
        style={{ opacity, transition: "opacity 700ms" }}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        onTouchMove={(e) => {
          if (e.touches[0] && pointerInteracting.current !== null) {
            pointerMovement.current = e.touches[0].clientX - pointerInteracting.current;
          }
        }}
      />
    </div>
  );
}

export { GLOBE_CONFIG };
