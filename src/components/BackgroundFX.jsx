import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * BackgroundFX
 * - Quadrillage + radials + léger bruit
 * - Par défaut, position: absolute; mais peut être fixé (fixed) si besoin
 *   via la prop `fixed`.
 * - L’opacité du quadrillage est ajustable via `gridOpacity`.
 */
export default function BackgroundFX({ fixed = false, gridSize = 32, gridOpacity = 0.8 }) {
  const gridColor = useColorModeValue("rgba(10, 37, 64, 0.035)", "rgba(255,255,255,0.06)");
  const radial = useColorModeValue(
    "radial-gradient(800px circle at 20% 0%, rgba(35,104,245,0.12), transparent 40%), radial-gradient(800px circle at 80% 10%, rgba(120,145,255,0.12), transparent 40%)",
    "radial-gradient(800px circle at 20% 0%, rgba(35,104,245,0.18), transparent 40%), radial-gradient(800px circle at 80% 10%, rgba(120,145,255,0.14), transparent 40%)"
  );

  return (
    <Box
      position={fixed ? "fixed" : "absolute"}
      inset={0}
      zIndex={0}
      pointerEvents="none"
    >
      {/* Radial lighting */}
      <Box position="absolute" inset={0} bgImage={radial} />

      {/* Grid */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`}
        backgroundSize={`${gridSize}px ${gridSize}px`}
        opacity={gridOpacity}
      />

      {/* Subtle noise */}
      <Box
        position="absolute"
        inset={0}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.07 0.13 0.07 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        opacity={0.25}
        mixBlendMode="overlay"
      />
    </Box>
  );
}
