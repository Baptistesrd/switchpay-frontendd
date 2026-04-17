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
    <section id="faq" style={{ background: "#030303", padding: "100px 24px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        <h2 style={{ margin: "0 0 48px", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
          Everything you need to know.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: "14px",
                border: `1px solid ${open === i ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
                background: open === i ? "rgba(99,102,241,0.04)" : "rgba(255,255,255,0.02)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "16px",
                  padding: "20px 24px", background: "none", border: "none",
                  cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1V9M1 5H9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
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
                    <div style={{ padding: "0 24px 24px", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                      {i === 1 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <span>Jump into the sandbox and make your first transaction.</span>
                          <button
                            onClick={() => navigate("/app")}
                            style={{
                              alignSelf: "flex-start", padding: "8px 20px",
                              borderRadius: "9999px", border: "none", cursor: "pointer",
                              fontWeight: 600, fontSize: "13px", color: "#fff",
                              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                            }}
                          >
                            Make a transaction
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
      </div>
    </section>
  );
}
