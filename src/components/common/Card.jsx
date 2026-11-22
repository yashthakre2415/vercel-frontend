import React from 'react';
import { motion } from 'framer-motion';

export function Card({
  children,
  className = '',
  hoverEffect = false,
  glass = true,
  onClick,
  ...props
}) {
  const base = `${glass ? 'glass-card' : 'bg-navy-900 border border-white/10'} rounded-2xl p-6 transition-all duration-300`;
  const hoverClass = hoverEffect ? 'hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer' : '';

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className={`${base} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}
