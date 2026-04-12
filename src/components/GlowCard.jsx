import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function GlowCard({ children, interactive = true, ...props }) {
  return (
    <MotionBox
      position="relative"
      overflow="hidden"
      bg="rgba(255,255,255,0.03)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={6}
      shadow="xl"
      {...(interactive && {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.25, ease: "easeOut" },
      })}
      _hover={{
        borderColor: "rgba(255,255,255,0.15)",
        bg: "rgba(255,255,255,0.05)",
        boxShadow: "0 0 0 1px rgba(99,102,241,0.25), 0 12px 28px rgba(99,102,241,0.12)",
      }}
      _before={{
        content: '""',
        position: "absolute",
        inset: "-2px",
        borderRadius: "inherit",
        background:
          "linear-gradient(130deg, #6366f1, #7c3aed, #a78bfa, #6366f1)",
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
