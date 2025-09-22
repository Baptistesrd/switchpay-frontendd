import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * BackgroundFX (Aurora Signature)
 *
 * Next-level background design:
 * - Multi-layer drifting auroras with different speeds (parallax-like depth)
 * - Subtle noise overlay for premium organic texture
 * - Auto adapts to light/dark mode
 */
export default function BackgroundFX({ fixed = true }) {
  const auroraLight1 = `
    radial-gradient(900px circle at 15% 20%, rgba(64, 132, 255, 0.28), transparent 70%)
  `;
  const auroraLight2 = `
    radial-gradient(700px circle at 85% 35%, rgba(240, 80, 110, 0.22), transparent 65%)
  `;
  const auroraLight3 = `
    radial-gradient(1100px circle at 40% 90%, rgba(255, 200, 80, 0.18), transparent 75%)
  `;

  const auroraDark1 = `
    radial-gradient(1000px circle at 10% 20%, rgba(130, 80, 255, 0.35), transparent 70%)
  `;
  const auroraDark2 = `
    radial-gradient(800px circle at 85% 45%, rgba(50, 150, 255, 0.28), transparent 65%)
  `;
  const auroraDark3 = `
    radial-gradient(1200px circle at 60% 85%, rgba(0, 220, 255, 0.22), transparent 75%)
  `;

  const baseBg = useColorModeValue("#f8fafd", "#080d19");

  return (
    <Box
      position={fixed ? "fixed" : "absolute"}
      inset={0}
      zIndex={0}
      pointerEvents="none"
      bg={baseBg}
      overflow="hidden"
    >
      {/* Layer 1 */}
      <Box
        position="absolute"
        inset={0}
        bgImage={useColorModeValue(auroraLight1, auroraDark1)}
        backgroundSize="200% 200%"
        filter="blur(50px) saturate(130%)"
        animation="auroraFloat1 60s ease-in-out infinite"
      />
      {/* Layer 2 */}
      <Box
        position="absolute"
        inset={0}
        bgImage={useColorModeValue(auroraLight2, auroraDark2)}
        backgroundSize="250% 250%"
        filter="blur(60px) saturate(120%)"
        animation="auroraFloat2 90s ease-in-out infinite"
      />
      {/* Layer 3 */}
      <Box
        position="absolute"
        inset={0}
        bgImage={useColorModeValue(auroraLight3, auroraDark3)}
        backgroundSize="300% 300%"
        filter="blur(80px) saturate(140%)"
        animation="auroraFloat3 120s ease-in-out infinite"
      />
      {/* Noise overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.07}
        mixBlendMode="overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
        }}
      />
    </Box>
  );
}

// Global CSS (theme or index.css)
const styles = `
@keyframes auroraFloat1 {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; transform: scale(1.05); }
  100% { background-position: 0% 50%; }
}
@keyframes auroraFloat2 {
  0% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; transform: scale(1.1); }
  100% { background-position: 50% 0%; }
}
@keyframes auroraFloat3 {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; transform: scale(0.95); }
  100% { background-position: 0% 0%; }
}
`;
