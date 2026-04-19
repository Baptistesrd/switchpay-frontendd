import { motion } from "framer-motion";

const NODES = [
  { title: "Customer" },
  { title: "Your Shop" },
  { title: "switchpay", hero: true, subtitle: "Routing · Retries · Failover · Metrics" },
  { title: "PSPs", subtitle: "Stripe · Adyen · Rapyd · Wise" },
  { title: "Acquirer" },
  { title: "Card Network", subtitle: "Visa · Mastercard" },
  { title: "Issuer" },
];

export default function PaymentStackMap() {
  return (
    <section style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      <div style={{ padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          The stack
        </p>
        <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Where switchpay sits <span style={{ color: "rgba(255,255,255,0.3)" }}>in the payment stack.</span>
        </h2>
      </div>

      {/* Scrollable sur mobile, pleine largeur sur desktop */}
      <div style={{
        padding: "clamp(32px, 5vw, 56px) clamp(16px, 3vw, 40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        gap: "0",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}>
        {NODES.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              style={{
                padding: node.hero ? "14px 16px" : "10px 12px",
                border: node.hero ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                background: node.hero ? "rgba(255,255,255,0.05)" : "transparent",
                textAlign: "center",
                flexShrink: 0,
                cursor: "default",
                transition: "border-color 0.2s",
                minWidth: node.hero ? "100px" : "70px",
              }}
            >
              {node.hero && (
                <p style={{ margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
                  Decision Layer
                </p>
              )}
              <p style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: node.hero ? "15px" : "12px", color: node.hero ? "#fff" : "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                {node.title}
              </p>
              {node.subtitle && (
                <p style={{ margin: "3px 0 0", fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.2)", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  {node.subtitle}
                </p>
              )}
            </motion.div>

            {i < NODES.length - 1 && (
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)", position: "relative", minWidth: "8px" }}>
                <div style={{ position: "absolute", right: "-3px", top: "-3px", width: "6px", height: "6px", borderTop: "1px solid rgba(255,255,255,0.15)", borderRight: "1px solid rgba(255,255,255,0.15)", transform: "rotate(45deg)" }} />
              </div>
            )}

          </div>
        ))}
      </div>

      <div style={{ padding: "0 clamp(24px, 6vw, 80px) clamp(32px, 5vw, 56px)" }}>
        <p style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "clamp(13px, 1.5vw, 16px)", color: "rgba(255,255,255,0.2)", lineHeight: 1.7 }}>
          Routing decisions are continuously optimized for the highest authorization rate, maximizing successful payments and aligning merchant revenue with customer intent.
        </p>
      </div>

    </section>
  );
}
