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

function Node({ title, subtitle, hero }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: "14px", padding: "16px 20px", textAlign: "center",
        background: hero ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
        border: hero ? "2px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hero ? "0 0 32px rgba(99,102,241,0.2)" : "none",
        minWidth: "100px", flexShrink: 0,
      }}
    >
      {hero && (
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a5b4fc", background: "rgba(99,102,241,0.15)", borderRadius: "9999px", padding: "2px 10px", display: "inline-block", marginBottom: "6px" }}>
          Decision Layer
        </span>
      )}
      <div style={{ fontSize: hero ? "16px" : "13px", fontWeight: 600, color: "#fff" }}>{title}</div>
      {subtitle && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px", lineHeight: 1.4 }}>{subtitle}</div>}
    </motion.div>
  );
}

function Arrow() {
  return (
    <div style={{ width: "24px", height: "2px", background: "linear-gradient(to right, #22d3ee, #a78bfa)", opacity: 0.5, borderRadius: "9999px", flexShrink: 0 }} />
  );
}

export default function PaymentStackMap() {
  return (
    <section style={{ background: "#030303", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", background: "linear-gradient(90deg, #22d3ee, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Where switchpay sits in the payment stack
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: "15px", color: "rgba(255,255,255,0.4)" }}>
            One decision layer. Multiple providers. Same global card rails.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "8px" }}>
          {NODES.map((node, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Node {...node} />
              {i < NODES.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: "32px", padding: "16px 24px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}
        >
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
            Routing decisions are continuously optimized for the highest authorization rate, maximizing successful payments and aligning merchant revenue with customer intent.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
