import { useEffect, useRef, useState } from "react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STEPS = [
  { node: 0, pipe: 0, log: "€247.50 EUR · FR · mobile — request initiated", status: [] },
  { node: 1, pipe: 1, log: "Request received · forwarded to switchpay", status: [0] },
  { node: 2, pipe: null, log: "switchpay analyzing: Stripe 1.4% · Adyen 0.9% · Rapyd 1.1%", status: [] },
  { node: 2, pipe: 2, log: "Decision: Adyen selected — lowest fee, 96% auth rate in FR", status: [1], pspVal: "Adyen", latVal: "142ms" },
  { node: 3, pipe: 3, log: "Transaction routed to Adyen · processing...", status: [2] },
  { node: 4, pipe: 4, log: "Acquirer confirmed · settlement in progress", status: [] },
  { node: 5, pipe: null, log: "Success · tx_9f3a2c · 0.9% fee · €247.50 settled", status: [3], done: true },
];

const NODES = [
  { label: "Customer" },
  { label: "Your App" },
  { label: "switchpay", hero: true, sub: "Routing · Retries · Failover" },
  { label: "Adyen", sub: "Best rate · EU" },
  { label: "Acquirer" },
  { label: "Settled" },
];

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
};

export default function RoutingAnimation() {
  const [nodeStates, setNodeStates] = useState(Array(6).fill("idle"));
  const [pipeStates, setPipeStates] = useState(Array(5).fill(0));
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ psp: null, latency: null, status: null });
  const [visibleStats, setVisibleStats] = useState([false, false, false, false]);
  const [running, setRunning] = useState(false);
  const cancelled = useRef(false);

  const reset = () => {
    setNodeStates(Array(6).fill("idle"));
    setPipeStates(Array(5).fill(0));
    setLogs([]);
    setStats({ psp: null, latency: null, status: null });
    setVisibleStats([false, false, false, false]);
  };

  const run = async () => {
    if (running) return;
    cancelled.current = false;
    reset();
    await sleep(200);
    setRunning(true);

    for (const step of STEPS) {
      if (cancelled.current) break;

      setNodeStates((prev) => {
        const next = prev.map((s, i) => (s === "active" ? "done" : s));
        next[step.node] = "active";
        return next;
      });

      if (step.pipe !== null && step.pipe !== undefined) {
        for (let p = 0; p <= 100; p += 5) {
          if (cancelled.current) break;
          setPipeStates((prev) => { const n = [...prev]; n[step.pipe] = p; return n; });
          await sleep(18);
        }
      }

      if (step.status?.length) {
        setVisibleStats((prev) => {
          const n = [...prev];
          step.status.forEach((i) => { n[i] = true; });
          return n;
        });
      }
      if (step.pspVal) setStats((s) => ({ ...s, psp: step.pspVal }));
      if (step.latVal) setStats((s) => ({ ...s, latency: step.latVal }));
      if (step.done) {
        setStats((s) => ({ ...s, status: "Success" }));
        setVisibleStats([true, true, true, true]);
      }

      setLogs((prev) => [...prev, { text: step.log, hero: step.node === 2 }]);
      await sleep(700);
    }

    setRunning(false);
  };

  useEffect(() => {
    run();
    return () => { cancelled.current = true; };
  }, []); // eslint-disable-line

  const nodeStyle = (state, hero) => ({
    padding: hero ? "14px 18px" : "10px 14px",
    border: `1px solid ${state === "active" ? "rgba(255,255,255,0.7)" : state === "done" ? "rgba(255,255,255,0.2)" : hero ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}`,
    background: state === "active" ? "rgba(255,255,255,0.08)" : state === "done" ? "rgba(255,255,255,0.02)" : hero ? "rgba(255,255,255,0.03)" : "transparent",
    textAlign: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
  });

  return (
    <section style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "80px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: "56px" }}>
        <p style={{ margin: "0 0 16px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          Live routing
        </p>
        <h2 style={{ margin: 0, fontFamily: s.serif, fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>
          Watch a transaction route. <span style={{ color: "rgba(255,255,255,0.3)" }}>In real time.</span>
        </h2>
      </div>

      {/* Pipeline */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px", overflowX: "auto" }}>
        {NODES.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < NODES.length - 1 ? 1 : 0 }}>
            <div style={nodeStyle(nodeStates[i], node.hero)}>
              {node.hero && (
                <p style={{ margin: "0 0 4px", fontFamily: s.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Decision Layer
                </p>
              )}
              <p style={{ margin: 0, fontFamily: s.serif, fontWeight: 400, fontSize: node.hero ? "16px" : "13px", color: nodeStates[i] === "active" ? "#fff" : node.hero ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
                {node.label}
              </p>
              {node.sub && (
                <p style={{ margin: "3px 0 0", fontFamily: s.sans, fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>
                  {node.sub}
                </p>
              )}
            </div>
            {i < NODES.length - 1 && (
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)", position: "relative", minWidth: "16px" }}>
                <div style={{ position: "absolute", top: 0, left: 0, height: "1px", width: `${pipeStates[i]}%`, background: "#fff", transition: "width 0.05s linear" }} />
                <div style={{ position: "absolute", right: "-3px", top: "-3px", width: "6px", height: "6px", borderTop: "1px solid rgba(255,255,255,0.15)", borderRight: "1px solid rgba(255,255,255,0.15)", transform: "rotate(45deg)" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "48px", marginBottom: "40px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
        {[
          { label: "Amount", value: "€247.50", visible: visibleStats[0] },
          { label: "PSP Selected", value: stats.psp || "—", visible: visibleStats[1] },
          { label: "Latency", value: stats.latency || "—", visible: visibleStats[2] },
          { label: "Status", value: stats.status || "—", visible: visibleStats[3] },
        ].map(({ label, value, visible }) => (
          <div key={label} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s", textAlign: "left" }}>
            <div style={{ fontFamily: s.serif, fontSize: "28px", fontWeight: 400, color: label === "Status" && value === "Success" ? "#4ade80" : "#fff", lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontFamily: s.sans, fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "6px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Logs */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "120px" }}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              fontFamily: s.sans, fontSize: "12px", lineHeight: 1.7,
              color: log.hero ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
              animation: "fadeUp 0.3s ease forwards",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.15)", marginRight: "10px" }}>—</span>
            {log.text}
          </div>
        ))}
      </div>

      {/* Replay */}
      <button
        onClick={() => { reset(); setTimeout(run, 100); }}
        disabled={running}
        style={{ marginTop: "32px", background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)", fontFamily: s.sans, fontSize: "11px", letterSpacing: "0.08em", padding: "10px 24px", cursor: running ? "not-allowed" : "pointer", transition: "all 0.2s" }}
        onMouseEnter={(e) => { if (!running) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
      >
        {running ? "Routing..." : "Replay →"}
      </button>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
