import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fade = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" } },
});

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "clamp(100px, 12vw, 120px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 80px)",
      background: "#080808",
      position: "relative",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}>

      {/* Vertical lines, desktop only */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "40px", width: "1px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: "40px", width: "1px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      {/* Image droite, masquée sur mobile */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0,
        width: "52%",
        pointerEvents: "none",
        zIndex: 0,
        display: "var(--img-display, block)",
      }}>
        <img
          src="/sumup-MO7kLbpDRTc-unsplash.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #080808 0%, #080808 10%, rgba(8,8,8,0.85) 30%, rgba(8,8,8,0.2) 60%, rgba(8,8,8,0) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 85%, #080808 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.35)" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        <motion.div variants={fade(0.1)} initial="hidden" animate="visible">
          <h1 style={{
            margin: "0 0 24px",
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 6vw, 82px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            maxWidth: "600px",
          }}>
            Don't let one PSP<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>decide your success.</span>
          </h1>
        </motion.div>

        <motion.div variants={fade(0.2)} initial="hidden" animate="visible">
          <p style={{
            margin: "0 0 36px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75,
            maxWidth: "420px",
          }}>
            Route each transaction to the best PSP automatically, based on auth rate, country, currency, fees, and device.
          </p>
        </motion.div>

        <motion.div
          variants={fade(0.3)}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}
        >
          <motion.button
            onClick={() => navigate("/app")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "13px 30px", borderRadius: "9999px", border: "none",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: "14px", color: "#080808",
              background: "#fff", width: "auto",
            }}
          >
            Start routing
          </motion.button>
          <motion.button
            onClick={() => navigate("/docs")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "13px 30px", borderRadius: "9999px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              fontSize: "14px", color: "rgba(255,255,255,0.5)",
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Read the docs →
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fade(0.4)}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: "clamp(24px, 4vw, 48px)", flexWrap: "wrap" }}
        >
          {[["95%+", "Auth Rate"], ["4", "PSPs"], ["<200ms", "Routing"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "6px" }}>{label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero-img { display: none !important; }
        }
      `}</style>
    </section>
  );
}
