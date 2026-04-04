import { motion } from "framer-motion";

export default function ElegantShape({
  width = 400,
  height = 120,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  gradient,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{
        opacity: 1,
        y: [0, 15, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay, ease: "easeOut" },
        y: {
          duration: 12,
          delay: delay + 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width,
        height,
        borderRadius: 9999,
        background: gradient,
        filter: "blur(1px)",
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
      }}
    />
  );
}
