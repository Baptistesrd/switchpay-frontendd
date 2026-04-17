import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import Counter from "./components/Counter";
import DashCharts from "./components/DashCharts";
import GlowCard from "./components/GlowCard";
import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";
import RoutingEngine from "./components/RoutingEngine";
import DashboardErrorBoundary from "./components/DashboardErrorBoundary";
import { useApiKey } from "./hooks/useApiKey";

const EMPTY_METRICS = { summary: {}, by_psp: {}, thompson: {} };
const TABS = ["New Transaction", "History", "Dashboard"];

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
        axios.get(`${BACKEND_URL}/generate-temp-key`),
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
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)" }}>
      <BackgroundFX fixed />
      <Navbar onRefresh={() => fetchAll(apiKey)} lastUpdated={lastUpdated} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "96px 24px 48px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
              {isFetching ? "Updating..." : pollPaused ? "Connection lost — retrying in 60s" : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Loading..."}
            </p>
          </div>
          <button onClick={() => navigate("/contact")}
            style={{ padding: "10px 20px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "14px", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            Book a demo
          </button>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "4px" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              style={{
                flex: 1, padding: "10px", borderRadius: "9px", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 500, transition: "all 0.2s",
                background: tab === i ? "rgba(99,102,241,0.8)" : "transparent",
                color: tab === i ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <DashboardErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

              {/* New Transaction */}
              {tab === 0 && (
                <GlowCard p={8}>
                  <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: 600, color: "#fff" }}>New Transaction</h2>
                  <p style={{ margin: "0 0 24px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>Fill the form and send — routing happens in your FastAPI backend.</p>
                  <TransactionForm onNewTransaction={() => fetchAll(apiKey)} />
                </GlowCard>
              )}

              {/* History */}
              {tab === 1 && (
                <GlowCard p={6}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {[["Total", count, "#3b82f6"], ["Success", successCount, "#22c55e"], ["Failed", failCount, "#ef4444"]].map(([label, val, color]) => (
                      <span key={label} style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "9999px", background: `${color}20`, color, border: `1px solid ${color}40` }}>
                        {label}: {val}
                      </span>
                    ))}
                  </div>
                  <TransactionTable transactions={transactions} />
                </GlowCard>
              )}

              {/* Dashboard */}
              {tab === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                    {!lastUpdated ? (
                      [...Array(4)].map((_, i) => (
                        <div key={i} style={{ borderRadius: "16px", padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", height: "90px" }} />
                      ))
                    ) : (
                      [
                        { label: "Total Volume", value: <Counter to={totalAmount} isMoney decimals={2} /> },
                        { label: "Transactions", value: <Counter to={count} /> },
                        { label: "Success Rate", value: `${successRate}%` },
                        { label: "Failures", value: <Counter to={failCount} /> },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ borderRadius: "16px", padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: 500 }}>{label}</div>
                          <div style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{value}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <GlowCard p={6}>
                    <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Analytics</h3>
                    <DashCharts transactions={transactions} metricsData={metricsData} />
                  </GlowCard>

                  <GlowCard p={6}>
                    <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Routing Engine</h3>
                    <RoutingEngine metricsData={metricsData} strategy={strategy} />
                  </GlowCard>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </DashboardErrorBoundary>

      </div>
    </div>
  );
}
