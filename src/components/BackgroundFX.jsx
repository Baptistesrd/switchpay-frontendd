import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * BackgroundFX (Aurora Gradient Flow)
 * - Fond aurora mouvant inspiré fintech unicorn (Stripe/Revolut vibes)
 * - Gère automatiquement le mode clair/sombre
 * - Se fixe derrière toute la page (position: fixed)
 */
export default function BackgroundFX({ fixed = true }) {
  // Gradients mesh/aurora différents selon mode
  const lightGrad = `
    radial-gradient(800px circle at 20% 20%, rgba(66, 133, 244, 0.25), transparent 60%),
    radial-gradient(600px circle at 80% 30%, rgba(219, 68, 55, 0.18), transparent 60%),
    radial-gradient(900px circle at 40% 80%, rgba(244, 180, 0, 0.18), transparent 70%)
  `;

  const darkGrad = `
    radial-gradient(900px circle at 10% 20%, rgba(123,63,252,0.3), transparent 60%),
    radial-gradient(700px circle at 80% 40%, rgba(35,104,245,0.25), transparent 60%),
    radial-gradient(1200px circle at 60% 80%, rgba(0,200,255,0.2), transparent 70%)
  `;

  return (
    <Box
      position={fixed ? "fixed" : "absolute"}
      inset={0}
      zIndex={0}
      pointerEvents="none"
      bg={useColorModeValue("#f9fafe", "#0a0f1f")}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: useColorModeValue(lightGrad, darkGrad),
        backgroundSize: "200% 200%",
        animation: "auroraMove 30s ease-in-out infinite",
      }}
    />
  );
}

