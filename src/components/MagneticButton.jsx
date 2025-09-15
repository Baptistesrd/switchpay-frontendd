import { useRef } from "react";
import { Button } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";

const MotionButton = motion.create(Button);

/** Bouton "magnétique" : suit légèrement la souris + hover glow */
export default function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    // limite le déplacement
    mx.set(Math.max(-10, Math.min(10, relX / 10)));
    my.set(Math.max(-10, Math.min(10, relY / 10)));
  };

  const handleLeave = () => {
    animate(mx, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(my, 0, { type: "spring", stiffness: 200, damping: 20 });
  };

  return (
    <MotionButton
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{
        scale: 1.035,
        boxShadow: "0 10px 30px rgba(35,104,245,0.35)",
      }}
      whileTap={{ scale: 0.98 }}
      style={{ x: mx, y: my }}
      size="lg"
      px={8}
      borderRadius="full"
      bgGradient="linear(to-r, brand.500, brand.300)"
      color="white"
      _hover={{ filter: "brightness(1.05)" }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
