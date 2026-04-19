import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { n: "01", title: "Collect", desc: "Your frontend sends the payment request secured with an API key." },
  { n: "02", title: "Route", desc: "Our router instantly selects the most efficient PSP for this transaction." },
  { n: "03", title: "Settle", desc: "Transaction processed. KPIs updated in real time." },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how" style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      <div style={{ padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          How it works
        </p>
        <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Three steps,<span style={{ color: "rgba(255,255,255,0.3)" }}> one decision layer.</span>
        </h2>
      </div>

      {/* Desktop: 3 colonnes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            style={{
              padding: "clamp(28px, 4vw, 48px) clamp(20px, 4vw, 40px)",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              background: active === i ? "rgba(255,255,255,0.02)" : "transparent",
              transition: "background 0.2s",
              position: "relative",
            }}
          >
            {active === i && (
              <motion.div
                layoutId="step-indicator"
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "#fff" }}
              />
            )}
            <p style={{ margin: "0 0 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              {step.n}
            </p>
            <h3 style={{ margin: "0 0 12px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(22px, 3vw, 28px)", color: active === i ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
              {step.title}
            </h3>
            <AnimatePresence>
              {active === i && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}
                >
                  {step.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
