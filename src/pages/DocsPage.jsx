import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import { PSP_TABLE } from "../data/pspData";

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
  border: "1px solid rgba(255,255,255,0.06)",
  muted: "rgba(255,255,255,0.4)",
};

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "auth", label: "Authentication" },
  { id: "transaction", label: "Create a Transaction" },
  { id: "metrics", label: "Retrieve Metrics" },
  { id: "advanced", label: "Advanced Features" },
  { id: "psps", label: "PSP Landscape" },
];

const Code = ({ children }) => (
  <code style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", padding: "2px 8px", borderRadius: "4px", fontSize: "13px", fontFamily: "monospace" }}>
    {children}
  </code>
);

const CodeBlock = ({ children }) => (
  <pre style={{ background: "#0d0d0d", border: s.border, borderLeft: "2px solid rgba(255,255,255,0.2)", padding: "20px", overflowX: "auto", fontSize: "13px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace", lineHeight: 1.8, margin: "20px 0" }}>
    <code>{children}</code>
  </pre>
);

const P = ({ children }) => (
  <p style={{ margin: "0 0 20px", fontFamily: s.sans, fontSize: "15px", color: s.muted, lineHeight: 1.8 }}>{children}</p>
);

const Li = ({ children }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px", fontFamily: s.sans, fontSize: "14px", color: s.muted, lineHeight: 1.6 }}>
    <span style={{ color: "rgba(255,255,255,0.2)", marginTop: "2px", flexShrink: 0 }}></span>
    {children}
  </li>
);

const Accordion = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: s.border, marginTop: "8px" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: s.sans, fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: "18px", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div style={{ paddingBottom: "20px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ id, title, children }) => (
  <motion.section id={id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} style={{ paddingBottom: "72px", borderBottom: s.border, marginBottom: "72px" }}>
    <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{id}</p>
    <h2 style={{ margin: "0 0 32px", fontFamily: s.serif, fontWeight: 400, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>{title}</h2>
    {children}
  </motion.section>
);

export default function DocsPage() {
  const [active, setActive] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const scrollTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Developer Docs  switchpay</title>
        <meta name="description" content="switchpay API documentation" />
      </Helmet>

      <div style={{ background: "#080808", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Mobile top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: s.border, position: "sticky", top: 0, background: "#080808", zIndex: 100 }}>
          <Link to="/" style={{ fontFamily: s.sans, fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
          >
            ← switchpay
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: s.border, padding: "6px 12px", color: "rgba(255,255,255,0.4)", fontFamily: s.sans, fontSize: "12px", cursor: "pointer", display: "block" }}
          >
            {sidebarOpen ? "Close" : "Sections"}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ background: "#0d0d0d", borderBottom: s.border, overflow: "hidden" }}
            >
              {SECTIONS.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", border: "none", background: "transparent", fontFamily: s.sans, fontSize: "14px", color: active === id ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", borderBottom: s.border }}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flex: 1 }}>

          {/* Sidebar  desktop only */}
          <aside style={{ width: "240px", flexShrink: 0, position: "sticky", top: "53px", height: "calc(100vh - 53px)", borderRight: s.border, display: "flex", flexDirection: "column", overflowY: "auto" }}
            className="docs-sidebar"
          >
            <div style={{ padding: "24px 16px" }}>
              <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "0 8px" }}>
                API Reference
              </p>
              {SECTIONS.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", border: "none", cursor: "pointer", fontFamily: s.sans, fontSize: "13px", color: active === id ? "#fff" : "rgba(255,255,255,0.35)", background: "transparent", borderLeft: active === id ? "1px solid #fff" : "1px solid transparent", marginBottom: "2px", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { if (active !== id) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { if (active !== id) e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, padding: "clamp(32px, 5vw, 80px) clamp(20px, 5vw, 80px) 80px clamp(20px, 4vw, 72px)", maxWidth: "800px", overflowX: "hidden" }}>

            <Section id="intro" title="Introduction">
              <P>Build resilient, borderless payment systems with the <strong style={{ color: "#fff", fontWeight: 500 }}>switchpay Routing API</strong>. One adaptive layer in front of Stripe, Adyen, Wise, and Rapyd.</P>
              <P>switchpay acts as a meta-router that intelligently selects which PSP should process a given payment based on country, currency, fees, latency, and device.</P>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "0", marginTop: "32px", border: s.border }}>
                {[["95%+", "Auth Rate"], ["4", "PSPs"], ["<200ms", "Routing"], ["1", "Unified API"]].map(([val, label], i) => (
                  <div key={label} style={{ padding: "20px 16px", borderRight: i < 3 ? s.border : "none", textAlign: "center" }}>
                    <div style={{ fontFamily: s.serif, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontFamily: s.sans, fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "8px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="auth" title="Authentication">
              <P>Every request must include an <Code>x-api-key</Code> header. Keys are environment-specific  sandbox keys only process simulated payments.</P>
              <CodeBlock>{`x-api-key: YOUR_API_KEY`}</CodeBlock>
              <Accordion q="Key types">
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  <Li>Sandbox  test payments only, no real money moved</Li>
                  <Li>Production  live transactions, requires KYB verification</Li>
                  <Li>Keep keys server-side only, never expose in frontend code</Li>
                </ul>
              </Accordion>
            </Section>

            <Section id="transaction" title="Create a Transaction">
              <P>The <Code>POST /transaction</Code> endpoint automatically routes each payment through the most efficient PSP.</P>
              <CodeBlock>{`POST /transaction
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
  "amount": 125.50,
  "currency": "EUR",
  "country": "FR",
  "device": "mobile"
}`}</CodeBlock>
              <p style={{ margin: "0 0 8px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Response</p>
              <CodeBlock>{`{
  "transaction_id": "tx_9834ABC",
  "psp": "Stripe",
  "status": "success",
  "latency_ms": 214,
  "fees": 0.35
}`}</CodeBlock>
              <Accordion q="Use cases">
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  <Li>Web checkout  route via your backend API</Li>
                  <Li>Mobile apps  real-time routing per device</Li>
                  <Li>Failover  automatic fallback if primary PSP fails</Li>
                </ul>
              </Accordion>
            </Section>

            <Section id="metrics" title="Retrieve Metrics">
              <P>Use <Code>GET /metrics</Code> to monitor routing performance and PSP utilization in real time.</P>
              <CodeBlock>{`GET /metrics
x-api-key: YOUR_API_KEY

{
  "total_transactions": 487231,
  "total_volume": 12500000,
  "transactions_by_psp": {
    "Stripe": 238121,
    "Adyen": 132893,
    "Rapyd": 77320,
    "Wise": 3897
  }
}`}</CodeBlock>
              <Accordion q="Field definitions">
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  <Li><strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>total_transactions</strong>  total number of processed payments</Li>
                  <Li><strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>total_volume</strong>  aggregate transaction value in base currency</Li>
                  <Li><strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>transactions_by_psp</strong>  volume breakdown per provider</Li>
                </ul>
              </Accordion>
            </Section>

            <Section id="advanced" title="Advanced Features">
              <Accordion q="Idempotency Keys">
                <P>Prevent duplicate payments by including an <Code>Idempotency-Key</Code> header. Same key always returns the same response.</P>
                <CodeBlock>{`Idempotency-Key: tx_2025_001`}</CodeBlock>
              </Accordion>
              <Accordion q="Webhooks">
                <P>Receive live transaction updates via webhooks registered in your dashboard.</P>
                <CodeBlock>{`POST /webhook
{
  "event": "transaction.completed",
  "data": { "id": "tx_9834ABC", "status": "success" }
}`}</CodeBlock>
              </Accordion>
              <Accordion q="Smart Routing Logic">
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  <Li>Live PSP latency and uptime tracking</Li>
                  <Li>Route success rate optimization per country</Li>
                  <Li>Fee and FX-based decision making</Li>
                  <Li>Predictive AI-driven routing</Li>
                </ul>
              </Accordion>
            </Section>

            <Section id="psps" title="PSP Landscape">
              <P>An overview of the current payment provider ecosystem and where each fits in the stack.</P>
              <div style={{ border: s.border, overflow: "hidden" }}>
                <div style={{ maxHeight: "560px", overflowY: "auto", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "400px" }}>
                    <thead style={{ position: "sticky", top: 0, background: "#080808", borderBottom: s.border }}>
                      <tr>
                        {["PSP / Network", "Core Strength", "Region"].map((col) => (
                          <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontFamily: s.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PSP_TABLE.map(([psp, desc, region], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <td style={{ padding: "11px 16px", fontFamily: s.sans, color: "#fff", fontWeight: 500 }}>{psp}</td>
                          <td style={{ padding: "11px 16px", fontFamily: s.sans, color: "rgba(255,255,255,0.4)" }}>{desc}</td>
                          <td style={{ padding: "11px 16px" }}>
                            <span style={{ fontFamily: s.sans, fontSize: "11px", padding: "2px 10px", border: s.border, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{region}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

          </main>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .docs-sidebar { display: flex !important; }
        }
        @media (max-width: 767px) {
          .docs-sidebar { display: none !important; }
        }
      `}</style>
    </Layout>
  );
}
