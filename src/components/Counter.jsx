// src/components/Counter.jsx
import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé "count-up".
 * Props:
 * - to: number (valeur finale)
 * - duration: ms (par défaut 1200)
 * - decimals: nb de décimales (par défaut 0)
 * - isMoney: pour formatter style devise fr-FR
 */
export default function Counter({ to = 0, duration = 1200, decimals = 0, isMoney = false }) {
  const [val, setVal] = useState(0);
  const start = useRef(null);

  useEffect(() => {
    let raf;
    const animate = (timestamp) => {
      if (!start.current) start.current = timestamp;
      const progress = Math.min((timestamp - start.current) / duration, 1);
      const current = to * easeOutCubic(progress);
      setVal(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  if (isMoney) {
    return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(val);
  }
  return val.toFixed(decimals);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
