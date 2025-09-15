// src/components/GlowCard.jsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

/**
 * Carte avec contour subtil + surbrillance "fintech" au hover.
 * Props habituelles Chakra (p, bg, ...), children dedans.
 */
export default function GlowCard({ children, ...props }) {
  const bg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.150", "whiteAlpha.200");
  const hoverShadow = useColorModeValue(
    "0 0 0 1px rgba(35,104,245,0.35), 0 10px 30px rgba(35,104,245,0.08)",
    "0 0 0 1px rgba(122,162,255,0.45), 0 10px 30px rgba(122,162,255,0.18)"
  );

  return (
    <MotionBox
      bg={bg}
      border="1px solid"
      borderColor={borderCol}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      _hover={{ boxShadow: hoverShadow }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}
