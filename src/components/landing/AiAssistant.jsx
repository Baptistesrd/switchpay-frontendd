import { motion } from "framer-motion";
import AnimatedChat from "../AnimatedChat";

const FEATURES = [
  { title: "Interactive Docs", text: "Live API snippets you can copy-paste directly into your code." },
  { title: "Real-time Data", text: "Up-to-date PSP fees & routing logic integrated into your workflow." },
  { title: "Dev-Friendly", text: "Guides, examples & SDKs for a seamless integration journey." },
];

export default function AiAssistant() {
  return (
    <section id="assistant" style={{ background: "#030303", padding: "100px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "56px" }}>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            Meet switchpayAI.
          </h2>
          <p style={{ margin: "16px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "16px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Ask about routing, PSPs, fees or integrations — get instant answers powered by real-time data.
          </p>
        </div>

        <AnimatedChat />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", width: "100%" }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                borderRadius: "16px", padding: "24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 600, color: "#fff" }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{f.text}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
