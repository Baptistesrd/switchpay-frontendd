import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TIERS = [
  {
    title: "Starter",
    price: "Free",
    desc: "For indie devs & startups testing payments.",
    features: ["100 tx/month", "Sandbox PSPs", "Basic metrics"],
    cta: "Join waitlist",
  },
  {
    title: "Growth",
    price: "€99",
    per: "/mo",
    desc: "For scaling teams optimizing conversion.",
    features: ["10k tx/month", "Smart routing", "switchpayAI", "Advanced dashboard"],
    highlight: true,
    cta: "Join waitlist",
  },
  {
    title: "Enterprise",
    price: "Custom",
    desc: "For global players needing reliability at scale.",
    features: ["Unlimited tx", "Dedicated PSP mix", "24/7 support", "SLAs & compliance"],
    cta: "Contact us",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const scrollToWaitlist = () => {
    const el = document.querySelector("#waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="pricing" style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      <div style={{ padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          Pricing
        </p>
        <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Simple, transparent.<span style={{ color: "rgba(255,255,255,0.3)" }}> Only pay for real value.</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {TIERS.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              padding: "clamp(28px, 4vw, 48px) clamp(20px, 4vw, 40px)",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderTop: tier.highlight ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
              background: tier.highlight ? "rgba(255,255,255,0.02)" : "transparent",
              display: "flex", flexDirection: "column", gap: "32px",
            }}
          >
            <div>
              <p style={{ margin: "0 0 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                {tier.title}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(36px, 5vw, 48px)", color: "#fff", lineHeight: 1 }}>
                  {tier.price}
                </span>
                {tier.per && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>
                    {tier.per}
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                {tier.desc}
              </p>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              {tier.features.map((f, j) => (
                <li key={j} style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => tier.cta === "Contact us" ? navigate("/contact") : scrollToWaitlist()}
              style={{
                width: "100%", padding: "13px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "9999px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px",
                color: tier.highlight ? "#080808" : "rgba(255,255,255,0.6)",
                background: tier.highlight ? "#fff" : "transparent",
                transition: "all 0.2s",
              }}
            >
              {tier.cta}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
