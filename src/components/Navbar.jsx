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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
          padding: "0 clamp(20px, 4vw, 40px)", height: "60px",
          background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "background 0.3s",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "18px", color: "#fff", textDecoration: "none", flexShrink: 0 }}>
          switchpay
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
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
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!isMobile && (
            isLanding ? (
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
            )
          )}

          {/* Hamburger, mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ width: "22px", height: "1px", background: "#fff", transformOrigin: "center" }} />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} style={{ width: "16px", height: "1px", background: "#fff" }} />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ width: "22px", height: "1px", background: "#fff", transformOrigin: "center" }} />
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px" }}
          >
            {LANDING_LINKS.map(({ label, hash, route }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                {route ? (
                  <Link to={route} onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "36px", color: "#fff", textDecoration: "none" }}
                  >
                    {label}
                  </Link>
                ) : (
                  <button onClick={() => scrollTo(hash)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "36px", color: "#fff" }}
                  >
                    {label}
                  </button>
                )}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <Link to="/app" onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#080808", background: "#fff", borderRadius: "9999px", padding: "14px 32px", textDecoration: "none" }}
              >
                Get started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
