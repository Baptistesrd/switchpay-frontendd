import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/waitlist`, { email });
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" style={{ background: "#030303", padding: "100px 24px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>

        <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
          Join the waitlist.
        </h2>
        <p style={{ margin: "16px 0 40px", color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
          Be the first to access smart payment routing.
        </p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8.5 14.5L16 6" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#fff" }}>You're on the list!</p>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            >
              <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "420px" }}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  style={{
                    flex: 1, padding: "12px 16px", borderRadius: "9999px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: "15px", outline: "none",
                  }}
                />
                <motion.button
                  onClick={submit}
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "12px 24px", borderRadius: "9999px", border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: 600, fontSize: "15px", color: "#fff",
                    background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                    opacity: loading ? 0.7 : 1, whiteSpace: "nowrap",
                  }}
                >
                  {loading ? "..." : "Join"}
                </motion.button>
              </div>
              {error && (
                <p style={{ margin: 0, fontSize: "13px", color: "rgba(244,63,94,0.8)" }}>{error}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
