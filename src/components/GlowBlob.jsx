// src/components/GlowBlob.jsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function GlowBlob({
  top = "10%",
  left = "60%",
  size = "420px",
  delay = 0,
}) {
  const light = useColorModeValue(
    "radial-gradient(600px circle at 0% 0%, rgba(80,150,255,0.25), transparent 40%)",
    "radial-gradient(600px circle at 0% 0%, rgba(120,180,255,0.15), transparent 40%)"
  );

  return (
    <MotionBox
      position="absolute"
      top={top}
      left={left}
      width={size}
      height={size}
      pointerEvents="none"
      backgroundImage={light}
      filter="blur(60px) saturate(120%)"
      style={{ mixBlendMode: "screen" }}
      initial={{ opacity: 0, scale: 0.8, x: "-2%", y: "-2%" }}
      animate={{
        opacity: 1,
        scale: [1, 1.05, 1],
        x: ["-2%", "2%", "-2%"],
        y: ["-2%", "2%", "-2%"],
      }}
      transition={{
        duration: 8,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
      zIndex={0}
    />
  );
}
