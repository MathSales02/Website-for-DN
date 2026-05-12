"use client";

import { motion } from "framer-motion";

interface MenuToggleIconProps {
  open: boolean;
}

export function MenuToggleIcon({ open }: MenuToggleIconProps) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between items-center">
      <motion.span
        className="w-full h-[2px] bg-current block rounded-full origin-left"
        animate={open ? { rotate: 45, y: -2, x: 2 } : { rotate: 0, y: 0, x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-full h-[2px] bg-current block rounded-full"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-full h-[2px] bg-current block rounded-full origin-left"
        animate={open ? { rotate: -45, y: 2, x: 2 } : { rotate: 0, y: 0, x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
