import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Collect", desc: "Your frontend sends the payment request secured with an API key." },
  { n: "02", title: "Route", desc: "Our smart router instantly selects the most efficient PSP for this transaction." },
  { n: "03", title: "Settle", desc: "The transaction is processed and your KPIs are updated in real time." },
];

export default function HowItWorks() {
  const [active, setActive] = useState(1);

  return (
    <section style={{ background: "#030303", padding: "100px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            How it works.
          </h2>
          <p style={{ margin: "16px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
            Three steps, one decision layer.
          </p>
        </div>

        {/* Desktop: accordion */}
        <div style={{ display: "flex", gap: "12px", height: "300px" }}
          className="hiw-desktop">
          {STEPS.map((step, i) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                animate={{ flex: isOpen ? 3 : 1 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  borderRadius: "16px", overflow: "hidden", cursor: "pointer",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOpen ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
                  padding: isOpen ? "32px" : "16px",
                  position: "relative", minWidth: 0,
                }}
              >
                {/* Watermark */}
                <div style={{
                  position: "absolute", bottom: "8px", right: "12px",
                  fontSize: "80px", fontWeight: 900, lineHeight: 1,
                  color: "rgba(99,102,241,0.06)", userSelect: "none", pointerEvents: "none",
                }}>
                  {step.n}
                </div>

                {!isOpen && (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ writingMode: "vertical-rl", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                      {step.n}
                    </span>
                  </div>
                )}

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.15 }}
                    style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}
                  >
                    <span style={{
                      fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                      color: "#a5b4fc", background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)", borderRadius: "9999px",
                      padding: "3px 12px", alignSelf: "flex-start",
                    }}>
                      Step {step.n}
                    </span>
                    <h3 style={{ margin: "24px 0 0", fontSize: "28px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                      {step.title}
                    </h3>
                    <p style={{ margin: "10px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: "260px" }}>
                      {step.desc}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: stack */}
        <div className="hiw-mobile" style={{ display: "none", flexDirection: "column", gap: "12px" }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              borderRadius: "16px", padding: "24px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(99,102,241,0.2)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", bottom: "4px", right: "10px", fontSize: "64px", fontWeight: 900, color: "rgba(99,102,241,0.06)", userSelect: "none" }}>{step.n}</div>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#a5b4fc", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "9999px", padding: "3px 12px" }}>
                Step {step.n}
              </span>
              <h3 style={{ margin: "16px 0 0", fontSize: "22px", fontWeight: 700, color: "#fff" }}>{step.title}</h3>
              <p style={{ margin: "8px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .hiw-desktop { display: none !important; }
          .hiw-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
