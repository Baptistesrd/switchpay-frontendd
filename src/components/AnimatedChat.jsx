import { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CONVERSATION = [
  { sender: "user", text: "Which PSP gives me the best rate for EUR payments in Germany?" },
  { sender: "ai", text: "Adyen currently offers ~0.5% lower fees than Stripe for EUR in DE. I'll alert you if that changes." },
  { sender: "user", text: "What about USD payments in the UK?" },
  { sender: "ai", text: "Wise is your best option : lowest conversion fees and direct settlement support for USD in GB." },
];

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
};

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      style={{ display: "inline-block", width: "2px", height: "13px", background: "rgba(255,255,255,0.5)", marginLeft: "3px", verticalAlign: "middle" }}
    />
  );
}

function TypedMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(onDone, 400);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [text, onDone]);

  return <span>{displayed}{!done && <Cursor />}</span>;
}

function Thinking() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}
        />
      ))}
    </div>
  );
}

export default function AnimatedChat() {
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef(null);
  const hasRun = useRef(false);
  const navigate = useNavigate();

  const scrollToPricing = () => {
    const el = document.querySelector("#pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const play = useCallback(async () => {
    for (let i = 0; i < CONVERSATION.length; i++) {
      const msg = CONVERSATION[i];
      if (msg.sender === "user") {
        await new Promise((res) => setTimeout(res, 600));
        setMessages((prev) => [...prev, { ...msg, typing: false }]);
        await new Promise((res) => setTimeout(res, 900));
      } else {
        setThinking(true);
        await new Promise((res) => setTimeout(res, 1400));
        setThinking(false);
        await new Promise((res) => setTimeout(res, 80));
        setMessages((prev) => [...prev, { ...msg, typing: true }]);
        await new Promise((res) => setTimeout(res, msg.text.length * 16 + 600));
        setMessages((prev) => prev.map((m, idx) => idx === prev.length - 1 ? { ...m, typing: false } : m));
        await new Promise((res) => setTimeout(res, 500));
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasPlayed) setHasPlayed(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed && !hasRun.current) {
      hasRun.current = true;
      play();
    }
  }, [hasPlayed, play]);

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>

      {/* Chrome */}
      <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {["rgba(255,95,87,0.5)", "rgba(255,189,46,0.5)", "rgba(40,200,64,0.5)"].map((c, i) => (
            <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontFamily: s.sans, fontSize: "11px", color: "rgba(255,255,255,0.2)", marginLeft: "8px", letterSpacing: "0.06em" }}>switchpayAI</span>
      </div>

      {/* Messages */}
      <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", padding: "24px 24px 16px", minHeight: "260px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
            >
              {msg.sender === "ai" && (
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, marginRight: "10px", marginTop: "2px" }} />
              )}
              <div style={{
                maxWidth: "68%",
                padding: "10px 14px",
                fontFamily: s.sans,
                fontSize: "13px",
                lineHeight: 1.7,
                ...(msg.sender === "user" ? {
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.75)",
                  borderRadius: "12px 12px 2px 12px",
                } : {
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.5)",
                  borderRadius: "12px 12px 12px 2px",
                  borderLeft: "2px solid rgba(255,255,255,0.12)",
                })
              }}>
                {msg.typing ? <TypedMessage text={msg.text} onDone={() => { }} /> : msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
            <Thinking />
            <span style={{ fontFamily: s.sans, fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>analyzing rates</span>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div
        onClick={scrollToPricing}
        style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <input
          readOnly
          value={input}
          placeholder="Ask about routing, PSPs, fees..."
          onClick={scrollToPricing}
          style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: s.sans, fontSize: "13px", color: "rgba(255,255,255,0.2)", cursor: "pointer" }}
        />
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

    </div>
  );
}
