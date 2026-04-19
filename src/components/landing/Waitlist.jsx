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
    <section id="waitlist" style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{
        padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(40px, 6vw, 80px)",
        alignItems: "center",
      }}>

        {/* Left */}
        <div>
          <p style={{ margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            Early access
          </p>
          <h2 style={{ margin: "0 0 20px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
            Join the waitlist.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Be first to route.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
            Get early access to smart payment routing. We'll reach out as soon as your spot opens.
          </p>
        </div>

        {/* Right */}
        <div>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(20px, 3vw, 24px)", color: "#fff", marginBottom: "8px" }}>
                  You're on the list.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
                  We'll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "12px", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    style={{
                      flex: 1, minWidth: "200px", background: "none", border: "none", outline: "none",
                      fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
                      color: "#fff", padding: "0",
                    }}
                  />
                  <motion.button
                    onClick={submit}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "#fff", border: "none", borderRadius: "9999px",
                      padding: "10px 22px", cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                      fontSize: "13px", color: "#080808", opacity: loading ? 0.6 : 1,
                      flexShrink: 0,
                    }}
                  >
                    {loading ? "..." : "Join →"}
                  </motion.button>
                </div>
                {error && (
                  <p style={{ margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(244,63,94,0.8)" }}>{error}</p>
                )}
                <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
                  No spam. Unsubscribe anytime.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
