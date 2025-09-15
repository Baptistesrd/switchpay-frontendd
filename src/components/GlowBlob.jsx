// src/components/GlowBlob.jsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function GlowBlob({ top = "10%", left = "60%", size = "420px", delay = 0 }) {
  const light = useColorModeValue(
    "radial-gradient(600px circle at 0% 0%, rgba(35,104,245,0.25), transparent 40%)",
    "radial-gradient(600px circle at 0% 0%, rgba(35,104,245,0.15), transparent 40%)"
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
      filter="blur(40px)"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay }}
      zIndex={0}
    />
  );
}