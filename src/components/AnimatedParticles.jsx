import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function AnimatedParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 900 } },
          color: { value: "#7aa2ff" },
          links: { enable: true, color: "#7aa2ff", opacity: 0.18, distance: 120 },
          move: { enable: true, speed: 1.1, outModes: { default: "bounce" } },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}


