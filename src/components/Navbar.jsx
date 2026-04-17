import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const LANDING_LINKS = [
  { label: "How it works", hash: "#how" },
  { label: "AI", hash: "#assistant" },
  { label: "Pricing", hash: "#pricing" },
  { label: "Waitlist", hash: "#waitlist" },
];

export default function Navbar({ onRefresh, lastUpdated }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(3,3,3,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <Link to="/" style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.01em", background: "linear-gradient(90deg, #a5b4fc, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>
        switchpay
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {isLanding && LANDING_LINKS.map(({ label, hash }) => (
          <button key={label} onClick={() => scrollTo(hash)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "rgba(255,255,255,0.5)", padding: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            {label}
          </button>
        ))}
        {!isLanding && onRefresh && (
          <button onClick={onRefresh}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "9999px", cursor: "pointer", fontSize: "13px", color: "rgba(255,255,255,0.5)", padding: "6px 16px" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Refresh"}
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        {isLanding ? (
          <Link to="/app" style={{ padding: "8px 20px", borderRadius: "9999px", background: "linear-gradient(135deg, #6366f1, #7c3aed)", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Get started
          </Link>
        ) : (
          <Link to="/" style={{ padding: "8px 20px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none" }}>
            Home
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
