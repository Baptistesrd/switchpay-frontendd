import { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONVERSATION = [
  { sender: "user", text: "Which PSP gives me the best rate for EUR payments in Germany?" },
  { sender: "ai", text: "Adyen currently offers ~0.5% lower fees than Stripe for EUR in DE. I'll alert you if that changes." },
  { sender: "user", text: "What about USD payments in the UK?" },
  { sender: "ai", text: "Wise is your best option — lowest conversion fees and direct settlement support for USD in GB." },
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
      style={{ display: "inline-block", width: "2px", height: "14px", background: "rgba(255,255,255,0.6)", marginLeft: "3px", verticalAlign: "middle" }}
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
    }, 18);
    return () => clearInterval(interval);
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      {!done && <Cursor />}
    </span>
  );
}

function Thinking() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}
        />
      ))}
    </div>
  );
}

export default function AnimatedChat() {
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [typingIndex, setTypingIndex] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef(null);
  const hasRun = useRef(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const play = useCallback(async () => {
    for (let i = 0; i < CONVERSATION.length; i++) {
      const msg = CONVERSATION[i];
      if (msg.sender === "user") {
        await new Promise((res) => setTimeout(res, 600));
        setMessages((prev) => [...prev, { ...msg, typing: false }]);
        await new Promise((res) => setTimeout(res, 900));
      } else {
        setThinking(true);
        await new Promise((res) => setTimeout(res, 1600));
        setThinking(false);
        await new Promise((res) => setTimeout(res, 100));
        setMessages((prev) => [...prev, { ...msg, typing: true }]);
        setTypingIndex(i);
        await new Promise((res) => setTimeout(res, msg.text.length * 18 + 800));
        setTypingIndex(null);
        setMessages((prev) => prev.map((m, idx) => idx === prev.length - 1 ? { ...m, typing: false } : m));
        await new Promise((res) => setTimeout(res, 600));
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasPlayed) setHasPlayed(true); },
      { threshold: 0.4 }
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
    <div ref={ref} style={{ width: "100%", maxWidth: "680px", margin: "0 auto" }}>

      {/* Window chrome */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {["rgba(255,95,87,0.6)", "rgba(255,189,46,0.6)", "rgba(40,200,64,0.6)"].map((c, i) => (
              <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: s.sans, fontSize: "12px", color: "rgba(255,255,255,0.25)", marginLeft: "8px", letterSpacing: "0.04em" }}>
            switchpayAI
          </span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "32px 28px", minHeight: "280px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div style={{
                maxWidth: "72%",
                padding: "12px 16px",
                background: msg.sender === "user" ? "rgba(255,255,255,0.06)" : "transparent",
                border: msg.sender === "user" ? "1px solid rgba(255,255,255,0.1)" : "none",
                borderLeft: msg.sender === "ai" ? "2px solid rgba(255,255,255,0.15)" : undefined,
                paddingLeft: msg.sender === "ai" ? "16px" : undefined,
                fontFamily: s.sans,
                fontSize: "14px",
                lineHeight: 1.65,
                color: msg.sender === "user" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.55)",
              }}>
                {msg.typing ? (
                  <TypedMessage text={msg.text} onDone={() => { }} />
                ) : msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <Thinking />
            <span style={{ fontFamily: s.sans, fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
              analyzing market rates
            </span>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderTop: "none", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, fontFamily: s.sans, fontSize: "13px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.02em" }}>
          Ask about PSPs, routing, fees...
        </div>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

    </div>
  );
}
