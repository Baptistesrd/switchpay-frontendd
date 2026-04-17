import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const LOGOS = [
  { name: "Stripe", src: "/Stripe_Logo,_revised_2016.svg.png" },
  { name: "Adyen", src: "/Adyen_Corporate_Logo.svg.png" },
  { name: "PayPal", src: "/PayPal.svg.png" },
  { name: "Wise", src: "/Wise2020.svg" },
  { name: "Rapyd", src: "/Rapyd-logo-768x236.webp" },
  { name: "Airwallex", src: "/Airwallex_Logo_-_Black.png", invert: true },
];

const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

export default function PspCarousel() {
  const controls = useAnimation();

  const start = () => controls.start({
    x: ["0%", "-33.333%"],
    transition: { duration: 22, ease: "linear", repeat: Infinity },
  });

  useEffect(() => { start(); }, []); // eslint-disable-line

  return (
    <div style={{ padding: "24px 0", overflow: "hidden", background: "#030303" }}>
      <div
        onMouseEnter={() => controls.stop()}
        onMouseLeave={start}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div animate={controls} style={{ display: "flex", gap: "12px", width: "max-content" }}>
          {tripled.map((logo, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px 24px", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
              flexShrink: 0, width: "160px", height: "72px",
            }}>
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  height: "32px", width: "auto", objectFit: "contain",
                  filter: logo.invert ? "brightness(0) invert(1) opacity(0.8)" : "opacity(0.8)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
