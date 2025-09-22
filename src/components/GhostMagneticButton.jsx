// src/components/GhostMagneticButton.jsx
import { useRef } from "react";
import { Button } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";

const MotionButton = motion.create(Button);

export default function GhostMagneticButton({ children = "Contact us", ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

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
      variant="ghost"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(122,162,255,0.25)",
      }}
      whileTap={{ scale: 0.96 }}
      style={{ x: mx, y: my, position: "relative", overflow: "hidden" }}
      size="lg"
      px={10}
      py={6}
      borderRadius="full"
      fontWeight="semibold"
      letterSpacing="0.5px"
      color="white"
      border="2px solid transparent"
      backgroundOrigin="border-box"
      backgroundClip="padding-box, border-box"
      backgroundImage="linear-gradient(#0a0f1f, #0a0f1f), linear-gradient(120deg, #7aa2ff, #29d2ff, #b388ff, #7aa2ff)"
      _hover={{ filter: "brightness(1.1)" }}
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
            "linear-gradient(120deg, rgba(255,255,255,0.25) 0%, transparent 60%)",
          transform: "skewX(-20deg)",
        }}
        animate={{ left: ["-150%", "150%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </MotionButton>
  );
}
