// src/components/MagneticButton.jsx
import { useRef } from "react";
import { Button } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";

const MotionButton = motion(Button);

export default function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    // déplacement fluide (distance / facteur)
    mx.set(relX / 12);
    my.set(relY / 12);
  };

  const handleLeave = () => {
    animate(mx, 0, { type: "spring", stiffness: 200, damping: 18 });
    animate(my, 0, { type: "spring", stiffness: 200, damping: 18 });
  };

  return (
    <MotionButton
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 0 20px rgba(35,104,245,0.25), 0 10px 30px rgba(35,104,245,0.35)",
      }}
      whileTap={{
        scale: 0.96,
        boxShadow: "inset 0 3px 8px rgba(0,0,0,0.25)",
      }}
      style={{ x: mx, y: my, position: "relative", overflow: "hidden" }}
      size="lg"
      px={10}
      py={6}
      borderRadius="full"
      fontWeight="bold"
      letterSpacing="0.5px"
      bgGradient="linear(to-r, brand.500, brand.300)"
      color="white"
      _hover={{ filter: "brightness(1.08)" }}
      {...props}
    >
      {/* Reflet animé */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "-150%",
          width: "200%",
          height: "100%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
          transform: "skewX(-20deg)",
        }}
        animate={{ left: ["-150%", "150%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </MotionButton>
  );
}
