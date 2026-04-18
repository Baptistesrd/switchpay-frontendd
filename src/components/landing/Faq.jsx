import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  {
    q: "What exactly does switchpay do?",
    a: "switchpay intelligently routes every transaction to the most efficient PSP based on country, currency, fees, and device. One adaptive API in front of Stripe, Adyen, Wise, and Rapyd.",
  },
  {
    q: "How do I try it right now?",
    a: null,
  },
  {
    q: "Which PSPs are supported today?",
    a: "Currently integrated: Stripe, Adyen, Wise, and Rapyd. We're adding dLocal and Checkout.com next, each with country-specific routing logic.",
  },
  {
    q: "Is switchpay live or just a prototype?",
    a: "The current build is a live sandbox environment running on FastAPI and React. Every transaction uses simulated data but real PSP logic.",
  },
  {
    q: "Can I integrate this into my own app?",
    a: "Yes. switchpay is API-first. The same routing logic powering this demo can be embedded in your stack to automatically minimize fees and improve success rates.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="faq" style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Header */}
      <div style={{ padding: "64px 80px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          FAQ
        </p>
        <h2 style={{ margin: "0 0 48px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Everything you need<br />
          <span style={{ color: "rgba(255,255,255,0.3)" }}>to know.</span>
        </h2>
      </div>

      {/* Items */}
      <div>
        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: "40px",
                padding: "28px 80px", background: "none", border: "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "20px", color: open === i ? "#fff" : "rgba(255,255,255,0.6)", transition: "color 0.2s", lineHeight: 1.3 }}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div style={{ padding: "0 80px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "640px" }}>
                    {i === 1 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <span>Jump into the sandbox and make your first transaction.</span>
                        <button
                          onClick={() => navigate("/app")}
                          style={{ alignSelf: "flex-start", padding: "9px 22px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}
                        >
                          Make a transaction →
                        </button>
                      </div>
                    ) : item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

    </section>
  );
}
