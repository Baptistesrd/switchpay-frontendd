// src/components/Counter.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Compteur animé "count-up" amélioré.
 * Props:
 * - to: number (valeur finale)
 * - duration: ms (par défaut 1200)
 * - decimals: nb de décimales (par défaut 0)
 * - isMoney: pour formatter style devise fr-FR
 * - prefix/suffix: ajoute du texte avant ou après
 */
export default function Counter({
  to = 0,
  duration = 1200,
  decimals = 0,
  isMoney = false,
  prefix = "",
  suffix = "",
}) {
  const [val, setVal] = useState(0);
  const start = useRef(null);

  useEffect(() => {
    let raf;
    const animate = (timestamp) => {
      if (!start.current) start.current = timestamp;
      const progress = Math.min((timestamp - start.current) / duration, 1);

      // effet overshoot pour un rebond naturel
      const eased = easeOutBack(progress);
      const current = to * eased;

      setVal(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  const formatted = isMoney
    ? new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(val)
    : val.toFixed(decimals);

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={Math.round(val * Math.pow(10, decimals))}
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {prefix}
        {formatted}
        {suffix}
      </motion.span>
    </AnimatePresence>
  );
}

// easing avec petit overshoot
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
