import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import Counter from "./components/Counter";
import DashCharts from "./components/DashCharts";
import Navbar from "./components/Navbar";
import DashboardErrorBoundary from "./components/DashboardErrorBoundary";
import { useApiKey } from "./hooks/useApiKey";

const EMPTY_METRICS = { summary: {}, by_psp: {}, thompson: {} };
const TABS = ["New Transaction", "History", "Dashboard"];

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
  border: "1px solid rgba(255,255,255,0.06)",
  muted: "rgba(255,255,255,0.35)",
};

function KpiCard({ label, value }) {
  return (
    <div style={{ padding: "32px", borderRight: s.border, borderBottom: s.border }}>
      <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
        {label}
      </p>
      <div style={{ fontFamily: s.serif, fontWeight: 400, fontSize: "40px", color: "#fff", lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [metricsData, setMetricsData] = useState(EMPTY_METRICS);
  const [strategy, setStrategy] = useState("weighted_score");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiKey, setAndUseApiKey] = useApiKey();
  const [isFetching, setIsFetching] = useState(false);
  const pollErrorCountRef = useRef(0);
  const [pollPaused, setPollPaused] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const fetchTransactions = async (explicitKey) => {
    try {
      const keyToUse = explicitKey || apiKey || localStorage.getItem("apiKey");
      if (!keyToUse) return;
      const res = await axios.get(`${BACKEND_URL}/transactions`, { headers: { "x-api-key": keyToUse } });
      setTransactions(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/metrics`);
      setMetricsData(res.data || EMPTY_METRICS);
    } catch (err) { console.error(err); }
  };

  const fetchAll = async (explicitKey) => {
    setIsFetching(true);
    await Promise.all([fetchTransactions(explicitKey), fetchMetrics()]);
    setLastUpdated(new Date());
    setIsFetching(false);
  };

  useEffect(() => {
    async function init() {
      const [healthRes, keyRes] = await Promise.allSettled([
        axios.get(`${BACKEND_URL}/health`),
        process.env.REACT_APP_API_KEY
          ? Promise.resolve({ data: { api_key: process.env.REACT_APP_API_KEY } })
          : axios.get(`${BACKEND_URL}/generate-temp-key`),
      ]);
      if (healthRes.status === "fulfilled") setStrategy(healthRes.value.data?.strategy || "weighted_score");
      if (keyRes.status === "fulfilled") {
        const key = keyRes.value.data?.api_key;
        if (key) { setAndUseApiKey(key); await fetchAll(key); return; }
      }
      const fallback = localStorage.getItem("apiKey");
      if (fallback) { setAndUseApiKey(fallback); await fetchAll(fallback); }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    const id = setInterval(async () => {
      if (pollPaused) return;
      try {
        await Promise.all([fetchTransactions(apiKey), fetchMetrics()]);
        setLastUpdated(new Date());
        pollErrorCountRef.current = 0;
      } catch {
        pollErrorCountRef.current += 1;
        if (pollErrorCountRef.current >= 3) { setPollPaused(true); setTimeout(() => setPollPaused(false), 60000); }
      }
    }, 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, pollPaused]);

  const totalAmount = useMemo(() => transactions.reduce((acc, tx) => acc + Number(tx.montant || 0), 0), [transactions]);
  const count = transactions.length;
  const successCount = transactions.filter((tx) => tx.status === "success").length;
  const failCount = count - successCount;
  const successRate = count > 0 ? Math.round((successCount / count) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#080808" }}>
      <Navbar onRefresh={() => fetchAll(apiKey)} lastUpdated={lastUpdated} />

      <div style={{ position: "relative", zIndex: 1, paddingTop: "60px" }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: "48px 80px 0", borderBottom: s.border, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}
        >
          <div style={{ paddingBottom: "32px" }}>
            <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
              {isFetching ? "Updating..." : pollPaused ? "Connection lost" : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Loading..."}
            </p>
            <h1 style={{ margin: 0, fontFamily: s.serif, fontWeight: 400, fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" }}>
              Dashboard
            </h1>
          </div>
          <div style={{ paddingBottom: "32px", display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/contact")}
              style={{ padding: "10px 22px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", fontFamily: s.sans, color: "rgba(255,255,255,0.5)", fontSize: "13px", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              Book a demo
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: s.border }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                flex: 1, padding: "18px 24px", border: "none", borderBottom: tab === i ? "1px solid #fff" : "1px solid transparent",
                background: "transparent", cursor: "pointer",
                fontFamily: s.sans, fontSize: "13px", fontWeight: 500,
                color: tab === i ? "#fff" : "rgba(255,255,255,0.35)",
                transition: "all 0.2s", marginBottom: "-1px",
              }}
              onMouseEnter={(e) => { if (tab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { if (tab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <DashboardErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              {/* New Transaction */}
              {tab === 0 && (
                <div style={{ padding: "48px 80px" }}>
                  <p style={{ margin: "0 0 8px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>New Transaction</p>
                  <h2 style={{ margin: "0 0 32px", fontFamily: s.serif, fontWeight: 400, fontSize: "32px", color: "#fff" }}>Send a payment</h2>
                  <div>
                    <TransactionForm onNewTransaction={() => fetchAll(apiKey)} />
                  </div>
                </div>
              )}

              {/* History */}
              {tab === 1 && (
                <div style={{ padding: "48px 80px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
                    <div>
                      <p style={{ margin: "0 0 8px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Transaction History</p>
                      <h2 style={{ margin: 0, fontFamily: s.serif, fontWeight: 400, fontSize: "32px", color: "#fff" }}>All transactions</h2>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {[["Total", count, "#fff"], ["Success", successCount, "#4ade80"], ["Failed", failCount, "#f87171"]].map(([label, val, color]) => (
                        <div key={label} style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: s.serif, fontSize: "22px", color, lineHeight: 1 }}>{val}</div>
                          <div style={{ fontFamily: s.sans, fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "2px" }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <TransactionTable transactions={transactions} />
                </div>
              )}

              {/* Dashboard */}
              {tab === 2 && (
                <div>
                  {/* KPI grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: s.border }}>
                    {!lastUpdated ? (
                      [...Array(4)].map((_, i) => (
                        <div key={i} style={{ padding: "32px", borderRight: i < 3 ? s.border : "none", height: "120px", background: "rgba(255,255,255,0.01)" }} />
                      ))
                    ) : (
                      [
                        { label: "Total Volume", value: <Counter to={totalAmount} isMoney decimals={2} /> },
                        { label: "Transactions", value: <Counter to={count} /> },
                        { label: "Success Rate", value: `${successRate}%` },
                        { label: "Failures", value: <Counter to={failCount} /> },
                      ].map(({ label, value }, i) => (
                        <div key={label} style={{ padding: "32px", borderRight: i < 3 ? s.border : "none" }}>
                          <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{label}</p>
                          <div style={{ fontFamily: s.serif, fontWeight: 400, fontSize: "40px", color: "#fff", lineHeight: 1 }}>{value}</div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Analytics */}
                  <div style={{ padding: "48px 80px", borderBottom: s.border }}>
                    <p style={{ margin: "0 0 8px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Analytics</p>
                    <h3 style={{ margin: "0 0 32px", fontFamily: s.serif, fontWeight: 400, fontSize: "28px", color: "#fff" }}>Performance overview</h3>
                    <DashCharts transactions={transactions} metricsData={metricsData} />
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </DashboardErrorBoundary>

      </div>
    </div>
  );
}
