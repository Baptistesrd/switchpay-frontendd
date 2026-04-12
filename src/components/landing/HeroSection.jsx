import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ElegantShape from "./ElegantShape";

const MotionDiv = motion.div;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 90%, rgba(244,63,94,0.14) 0%, transparent 60%), #030303",
      }}
    >
      {/* Gradient overlays top/bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(to bottom, #030303 0%, transparent 18%, transparent 80%, #030303 100%)",
        }}
      />

      {/* Geometric shapes */}
      <ElegantShape
        width={520}
        height={140}
        top="14%"
        left="60%"
        rotate={-15}
        gradient="linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))"
        delay={0}
      />
      <ElegantShape
        width={380}
        height={100}
        top="65%"
        left="-6%"
        rotate={20}
        gradient="linear-gradient(135deg, rgba(244,63,94,0.15), rgba(251,113,133,0.08))"
        delay={0.2}
      />
      <ElegantShape
        width={300}
        height={80}
        top="18%"
        left="-4%"
        rotate={-8}
        gradient="linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08))"
        delay={0.4}
      />
      <ElegantShape
        width={260}
        height={70}
        top="78%"
        left="70%"
        rotate={12}
        gradient="linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.08))"
        delay={0.15}
      />
      <ElegantShape
        width={200}
        height={55}
        top="45%"
        left="88%"
        rotate={-20}
        gradient="linear-gradient(135deg, rgba(6,182,212,0.15), rgba(34,211,238,0.08))"
        delay={0.35}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "860px",
          gap: "28px",
        }}
      >

        {/* Headline */}
        <MotionDiv
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            style={{
              margin: 0,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontSize: "clamp(48px, 8vw, 96px)",
            }}
          >
            <span style={{ color: "#ffffff", display: "block" }}>
              Don't let one PSP
            </span>
            <span
              style={{
                display: "block",
                background:
                  "linear-gradient(90deg, #a5b4fc 0%, rgba(255,255,255,0.9) 50%, #fda4af 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              decide your success.
            </span>
          </h1>
        </MotionDiv>

        {/* Subheadline */}
        <MotionDiv
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: "560px",
            }}
          >
            Automatically route each payment to the best PSP based on auth
            rate, country, currency, fees, and device.
          </p>
        </MotionDiv>

        {/* CTA buttons */}
        <MotionDiv
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <motion.button
            onClick={() => navigate("/app")}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(251,191,36,0.15)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "14px 32px",
              borderRadius: "9999px",
              border: "1px solid rgba(251,191,36,0.25)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "15px",
              color: "rgba(255,255,255,0.9)",
              background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(244,63,94,0.10) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            Start routing
          </motion.button>
          <motion.button
            onClick={() => navigate("/docs")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "14px 32px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "15px",
              color: "rgba(255,255,255,0.7)",
              background: "transparent",
            }}
          >
            Read the docs
          </motion.button>
        </MotionDiv>

        {/* KPI row */}
        <MotionDiv
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>95%+ Auth Rate</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>4 PSPs</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>&lt;200ms Routing</span>
        </MotionDiv>
      </div>
    </div>
  );
}
