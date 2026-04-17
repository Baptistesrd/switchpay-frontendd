import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import { PSP_TABLE } from "../data/pspData";

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "auth", label: "Authentication" },
  { id: "transaction", label: "Create a Transaction" },
  { id: "metrics", label: "Retrieve Metrics" },
  { id: "advanced", label: "Advanced Features" },
  { id: "psps", label: "PSP Landscape" },
];

const Code = ({ children }) => (
  <code style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", padding: "2px 8px", borderRadius: "6px", fontSize: "13px", fontFamily: "monospace" }}>
    {children}
  </code>
);

const CodeBlock = ({ children }) => (
  <pre style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid rgba(99,102,241,0.5)", borderRadius: "12px", padding: "20px", overflowX: "auto", fontSize: "13px", color: "#67e8f9", fontFamily: "monospace", lineHeight: 1.7, margin: "16px 0" }}>
    <code>{children}</code>
  </pre>
);

const Section = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    style={{ marginBottom: "64px" }}
  >
    <h2 style={{ margin: "0 0 20px", fontSize: "24px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {title}
    </h2>
    {children}
  </motion.section>
);

const P = ({ children }) => (
  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{children}</p>
);

const Accordion = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "8px", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 500, textAlign: "left" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: "18px", color: "#a5b4fc", flexShrink: 0, marginLeft: "12px" }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div style={{ padding: "0 18px 18px", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
    <path d="M2 7l3.5 3.5L12 3" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Li = ({ children }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
    <Check />{children}
  </li>
);

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <Layout>
      <Helmet>
        <title>Developer Docs — switchpay</title>
        <meta name="description" content="switchpay API documentation" />
      </Helmet>

      <div style={{ background: "#030303", minHeight: "100vh", display: "flex" }}>

        {/* Sidebar */}
        <aside style={{ width: "220px", flexShrink: 0, position: "sticky", top: 0, height: "100vh", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "80px 0 32px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "16px" }}>
            <Link to="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#a5b4fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              ← Back to home
            </Link>
          </div>
          <nav style={{ padding: "0 12px", flex: 1 }}>
            <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "0 8px", marginBottom: "8px" }}>API Reference</p>
            {SECTIONS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: activeSection === id ? 500 : 400, color: activeSection === id ? "#a5b4fc" : "rgba(255,255,255,0.45)", background: activeSection === id ? "rgba(99,102,241,0.1)" : "transparent", marginBottom: "2px", transition: "all 0.15s" }}
                onMouseEnter={(e) => { if (activeSection !== id) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { if (activeSection !== id) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "80px 64px 80px 56px", maxWidth: "860px", overflowY: "auto" }}>

          <Section id="intro" title="Introduction">
            <P>Build resilient, borderless payment systems with the <strong style={{ color: "#fff" }}>switchpay Routing API</strong>. One adaptive layer in front of Stripe, Adyen, Wise, and Rapyd.</P>
            <P>switchpay acts as a <strong style={{ color: "#fff" }}>meta-router</strong> that intelligently selects which PSP should process a given payment based on country, currency, fees, latency, and device.</P>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginTop: "24px" }}>
              {[["95%+", "Auth Rate"], ["4", "PSPs Integrated"], ["<200ms", "Routing Decision"], ["1", "Unified API"]].map(([val, label]) => (
                <div key={label} style={{ borderRadius: "12px", padding: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{val}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="auth" title="Authentication">
            <P>Every request must include an <Code>x-api-key</Code> header. Keys are environment-specific — sandbox keys only process simulated payments.</P>
            <CodeBlock>{`x-api-key: YOUR_API_KEY`}</CodeBlock>
            <Accordion q="Key types">
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <Li>Sandbox — test payments only, no real money moved</Li>
                <Li>Production — live transactions, requires KYB verification</Li>
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
            <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Response</p>
            <CodeBlock>{`{
  "transaction_id": "tx_9834ABC",
  "psp": "Stripe",
  "status": "success",
  "latency_ms": 214,
  "fees": 0.35
}`}</CodeBlock>
            <Accordion q="Use cases">
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <Li>Web checkout — route via your backend API</Li>
                <Li>Mobile apps — real-time routing per device</Li>
                <Li>Failover — automatic fallback if primary PSP fails</Li>
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
                <Li><strong>total_transactions</strong> — total number of processed payments</Li>
                <Li><strong>total_volume</strong> — aggregate transaction value in base currency</Li>
                <Li><strong>transactions_by_psp</strong> — volume breakdown per provider</Li>
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
            <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead style={{ position: "sticky", top: 0, background: "rgba(10,10,20,0.95)", backdropFilter: "blur(12px)" }}>
                    <tr>
                      {["PSP / Network", "Core Strength", "Region"].map((col) => (
                        <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PSP_TABLE.map(([psp, desc, region], i) => (
                      <tr key={i}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.05)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; }}
                      >
                        <td style={{ padding: "10px 16px", color: "#fff", fontWeight: 500 }}>{psp}</td>
                        <td style={{ padding: "10px 16px", color: "rgba(255,255,255,0.5)" }}>{desc}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <span style={{ fontSize: "11px", padding: "2px 10px", borderRadius: "9999px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{region}</span>
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
    </Layout>
  );
}
