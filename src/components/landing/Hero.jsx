import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fade = (delay) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 24px",
      background: "#030303",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 20% 10%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(244,63,94,0.10) 0%, transparent 60%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>

        {/* Badge */}
        <motion.div variants={fade(0)} initial="hidden" animate="visible">
          <span style={{
            fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(165,180,252,0.8)",
            border: "1px solid rgba(99,102,241,0.25)", borderRadius: "9999px",
            padding: "6px 16px", background: "rgba(99,102,241,0.08)",
          }}>
            Smart Payment Routing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fade(0.1)} initial="hidden" animate="visible">
          <h1 style={{
            margin: 0, fontWeight: 400, lineHeight: 1.08,
            letterSpacing: "-0.02em",
            fontSize: "clamp(44px, 7.5vw, 88px)",
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}>
            <span style={{ color: "#fff", display: "block" }}>Don't let one PSP</span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.35)" }}>
              decide your success.
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.div variants={fade(0.2)} initial="hidden" animate="visible">
          <p style={{ margin: 0, fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.45)", fontWeight: 400, lineHeight: 1.65, maxWidth: "520px" }}>
            Automatically route each payment to the best PSP based on auth rate, country, currency, fees, and device.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fade(0.3)} initial="hidden" animate="visible" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.button
            onClick={() => navigate("/app")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 32px", borderRadius: "9999px", border: "none",
              cursor: "pointer", fontWeight: 600, fontSize: "15px", color: "#fff",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
            }}
          >
            Start routing
          </motion.button>
          <motion.button
            onClick={() => navigate("/docs")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 32px", borderRadius: "9999px", cursor: "pointer",
              fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.7)",
              background: "transparent", border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Read the docs
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fade(0.4)} initial="hidden" animate="visible" style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", paddingTop: "8px" }}>
          {[["95%+", "Auth Rate"], ["4", "PSPs"], ["<200ms", "Routing"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{val}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
