// src/components/GlowCard.jsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function GlowCard({ children, interactive = true, ...props }) {
  const bg = useColorModeValue("rgba(255,255,255,0.7)", "rgba(20,24,38,0.6)");
  const borderCol = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const hoverShadow = useColorModeValue(
    "0 0 0 1px rgba(35,104,245,0.4), 0 12px 28px rgba(35,104,245,0.12)",
    "0 0 0 1px rgba(122,162,255,0.5), 0 12px 28px rgba(122,162,255,0.2)"
  );

  return (
    <MotionBox
      position="relative"
      overflow="hidden"
      bg={bg}
      border="1px solid"
      borderColor={borderCol}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      {...(interactive && {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.25, ease: "easeOut" },
      })}
      _hover={{ boxShadow: hoverShadow }}
      _before={{
        content: '""',
        position: "absolute",
        inset: "-2px",
        borderRadius: "inherit",
        background:
          "linear-gradient(130deg, #7aa2ff, #29d2ff, #b388ff, #7aa2ff)",
        backgroundSize: "300% 300%",
        filter: "blur(14px)",
        opacity: 0,
        transition: "opacity 0.4s ease-in-out",
        zIndex: -1,
      }}
      _hoverBefore={{ opacity: 1 }}
      style={{
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}
