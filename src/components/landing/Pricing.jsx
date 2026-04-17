import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TIERS = [
  {
    title: "Starter",
    price: "Free",
    desc: "For indie devs & startups testing payments.",
    features: ["100 tx/month", "Sandbox PSPs", "Basic metrics"],
    accent: "rgba(255,255,255,0.15)",
    cta: "Join waitlist",
  },
  {
    title: "Growth",
    price: "€99/mo",
    desc: "For scaling teams optimizing conversion.",
    features: ["10k tx/month", "Smart routing", "switchpayAI Assistant", "Advanced dashboard"],
    accent: "rgba(99,102,241,0.5)",
    highlight: true,
    cta: "Join waitlist",
  },
  {
    title: "Enterprise",
    price: "Custom",
    desc: "For global players needing reliability at scale.",
    features: ["Unlimited tx", "Dedicated PSP mix", "24/7 support", "SLAs & compliance"],
    accent: "rgba(245,158,11,0.4)",
    premium: true,
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
    <section id="pricing" style={{ background: "#030303", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            Simple, transparent pricing.
          </h2>
          <p style={{ margin: "16px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
            Start for free. Scale without limits.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: "20px", padding: "32px",
                background: tier.premium
                  ? "linear-gradient(160deg, rgba(245,158,11,0.07), rgba(10,8,4,0.6))"
                  : tier.highlight
                    ? "rgba(99,102,241,0.05)"
                    : "rgba(255,255,255,0.03)",
                border: `${tier.highlight ? "2px" : "1px"} solid ${tier.accent}`,
                display: "flex", flexDirection: "column", gap: "24px",
              }}
            >
              {/* Header */}
              <div>
                <span style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: tier.premium ? "#fcd34d" : tier.highlight ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                  background: tier.premium ? "rgba(245,158,11,0.1)" : tier.highlight ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${tier.accent}`,
                  borderRadius: "9999px", padding: "4px 12px",
                }}>
                  {tier.title}
                </span>
                <div style={{ marginTop: "20px", fontSize: "42px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {tier.price}
                </div>
                <p style={{ margin: "10px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  {tier.desc}
                </p>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: tier.premium ? "rgba(245,158,11,0.15)" : "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke={tier.premium ? "#fcd34d" : "#a5b4fc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => tier.price === "Custom" ? navigate("/contact") : scrollToWaitlist()}
                style={{
                  width: "100%", padding: "14px", borderRadius: "9999px",
                  border: "none", cursor: "pointer", fontWeight: 600, fontSize: "15px",
                  color: "#fff",
                  background: tier.premium
                    ? "linear-gradient(135deg, #facc15, #d97706)"
                    : "linear-gradient(135deg, #6366f1, #7c3aed)",
                }}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
