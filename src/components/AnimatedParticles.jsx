import { Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

/**
 * AnimatedParticles (Canvas-based aurora waves)
 */
export default function AnimatedParticles({ fixed = true }) {
  const canvasRef = useRef(null);

  // ✅ Hook appelé uniquement au bon endroit
  const baseBg = useColorModeValue("#f9fafc", "#080d19");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, t = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.002;
      ctx.clearRect(0, 0, w, h);

      // ✅ Ici on utilise la variable, pas le hook
      ctx.fillStyle = baseBg;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        if (i === 0) {
          grad.addColorStop(0, "rgba(120,80,255,0.25)");
          grad.addColorStop(1, "rgba(0,220,255,0.2)");
        } else if (i === 1) {
          grad.addColorStop(0, "rgba(255,200,100,0.18)");
          grad.addColorStop(1, "rgba(0,150,255,0.15)");
        } else {
          grad.addColorStop(0, "rgba(255,120,180,0.15)");
          grad.addColorStop(1, "rgba(120,200,255,0.12)");
        }
        ctx.fillStyle = grad;

        ctx.beginPath();
        const amplitude = 150 + i * 50;
        const speed = 0.5 + i * 0.2;
        for (let x = 0; x <= w; x += 15) {
          const y =
            Math.sin(x * 0.002 + t * speed) * amplitude +
            Math.cos(x * 0.0015 + t * (speed + 0.3)) * 80 +
            h / 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resize);
  }, [baseBg]); // ✅ le hook est passé comme dépendance

  return (
    <Box
      position={fixed ? "fixed" : "absolute"}
      inset={0}
      zIndex={0}
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          filter: "blur(40px) saturate(130%)",
        }}
      />
    </Box>
  );
}
