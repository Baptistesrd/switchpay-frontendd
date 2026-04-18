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
      padding: "120px 80px 80px",
      background: "#080808",
      position: "relative",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Vertical lines */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "40px", width: "1px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: "40px", width: "1px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: "80px", alignItems: "flex-end" }}>

        {/* Left — headline + CTAs */}
        <div>
          <motion.div variants={fade(0.1)} initial="hidden" animate="visible">
            <h1 style={{
              margin: "0 0 32px",
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(42px, 6vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}>
              Don't let one PSP<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>decide on your sucess.</span>
            </h1>
          </motion.div>

          <motion.div variants={fade(0.2)} initial="hidden" animate="visible">
            <p style={{ margin: "0 0 40px", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "460px" }}>
              Route each transaction to the best PSP automatically, based on auth rate, country, currency, fees, and device.
            </p>
          </motion.div>

          <motion.div variants={fade(0.3)} initial="hidden" animate="visible" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <motion.button
              onClick={() => navigate("/app")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 28px", borderRadius: "9999px", border: "none",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "14px", color: "#080808",
                background: "#fff",
              }}
            >
              Start routing
            </motion.button>
            <motion.button
              onClick={() => navigate("/docs")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 28px", borderRadius: "9999px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                fontSize: "14px", color: "rgba(255,255,255,0.5)",
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Read the docs
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
