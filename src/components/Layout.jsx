// src/components/Layout.jsx
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";

const MotionBox = motion(Box);

export default function Layout({ children }) {
  const { colorMode } = useColorMode();

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={colorMode} // <-- relance l’animation à chaque toggle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        minH="100vh"
      >
        {children}
      </MotionBox>
    </AnimatePresence>
  );
}
