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
    transition: { duration: 28, ease: "linear", repeat: Infinity },
  });

  useEffect(() => { start(); }, []); // eslint-disable-line

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "#080808",
      padding: "20px 0",
      overflow: "hidden",
    }}>
      {/* Label */}
      <div style={{
        textAlign: "center",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px", fontWeight: 500,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.18)",
        marginBottom: "20px",
      }}>
        Integrated Payment Service Providers so far
      </div>

      {/* Track */}
      <div
        onMouseEnter={() => controls.stop()}
        onMouseLeave={start}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div animate={controls} style={{ display: "flex", gap: "48px", width: "max-content", alignItems: "center", padding: "0 24px" }}>
          {tripled.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              style={{
                height: "22px", width: "auto", objectFit: "contain", flexShrink: 0,
                filter: logo.invert
                  ? "brightness(0) invert(1) opacity(0.25)"
                  : "brightness(0) invert(1) opacity(0.25)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = logo.invert ? "brightness(0) invert(1) opacity(0.7)" : "brightness(0) invert(1) opacity(0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(0) invert(1) opacity(0.25)"; }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
