import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

/** Chip avec hover bleu + glow + léger lift */
export default function FeatureChip({ label }) {
  const baseBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const baseColor = useColorModeValue("gray.800", "gray.100");

  return (
    <MotionBox
      px={3}
      py={2}
      borderRadius="full"
      textAlign="center"
      fontWeight="medium"
      bg={baseBg}
      color={baseColor}
      border="1px solid"
      borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
      whileHover={{
        y: -3,
        boxShadow: "0 10px 24px rgba(35,104,245,0.35)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      _hover={{
        bg: "brand.500",
        color: "white",
        borderColor: "brand.500",
      }}
    >
      {label}
    </MotionBox>
  );
}
