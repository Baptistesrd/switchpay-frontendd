import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LANDING_LINKS = [
  { label: "How it works", hash: "#how" },
  { label: "Pricing", hash: "#pricing" },
  { label: "Docs", route: "/docs" },
];

export default function Navbar({ onRefresh, lastUpdated }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: "60px",
          background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "background 0.3s",
        }}
      >
        <Link to="/" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "18px", color: "#fff", textDecoration: "none" }}>
          switchpay
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {isLanding && LANDING_LINKS.map(({ label, hash, route }) => (
            route ? (
              <Link key={label} to={route}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                {label}
              </Link>
            ) : (
              <button key={label} onClick={() => scrollTo(hash)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", padding: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                {label}
              </button>
            )
          ))}

          {!isLanding && onRefresh && (
            <button onClick={onRefresh}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", padding: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Refresh"}
            </button>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isLanding ? (
            <Link to="/app"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#080808", background: "#fff", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Get started
            </Link>
          ) : (
            <Link to="/"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none" }}
            >
              Home
            </Link>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(8,8,8,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px" }}
          >
            {LANDING_LINKS.map(({ label, hash, route }) => (
              route ? (
                <Link key={label} to={route} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "32px", color: "#fff", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ) : (
                <button key={label} onClick={() => scrollTo(hash)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "32px", color: "#fff" }}
                >
                  {label}
                </button>
              )
            ))}
            <Link to="/app" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#080808", background: "#fff", borderRadius: "9999px", padding: "12px 28px", textDecoration: "none", marginTop: "8px" }}
            >
              Get started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
