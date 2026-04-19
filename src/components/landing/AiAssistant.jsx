import { motion } from "framer-motion";
import AnimatedChat from "../AnimatedChat";

const FEATURES = [
  { title: "Interactive Docs", text: "Live API snippets you can copy-paste directly into your code." },
  { title: "Real-time Data", text: "Up-to-date PSP fees & routing logic integrated into your workflow." },
  { title: "Dev-Friendly", text: "Guides, examples & SDKs for a seamless integration journey." },
];

export default function AiAssistant() {
  return (
    <section id="assistant" style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      <div style={{ padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          AI Assistant
        </p>
        <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Meet switchpayAI.<span style={{ color: "rgba(255,255,255,0.3)" }}> Ask anything about payments.</span>
        </h2>
      </div>

      <div style={{ padding: "clamp(32px, 5vw, 56px) clamp(24px, 6vw, 80px)", display: "flex", flexDirection: "column", gap: "clamp(32px, 5vw, 56px)" }}>
        <AnimatedChat />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0" }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                padding: "clamp(20px, 3vw, 32px) clamp(16px, 3vw, 40px)",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 style={{ margin: "0 0 10px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(17px, 2vw, 20px)", color: "#fff" }}>
                {f.title}
              </h3>
              <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
