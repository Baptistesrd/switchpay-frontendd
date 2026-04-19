import React, { useState } from "react";
import axios from "axios";

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
  border: "1px solid rgba(255,255,255,0.06)",
};

function WebhookButton({ transactionId }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const simulate = async () => {
    setLoading(true);
    setResult(null);
    const status = Math.random() > 0.5 ? "success" : "failed";
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/webhook/stripe`, { tx_id: transactionId, status });
      setResult(status);
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 2500);
    }
  };

  const color = result === "success" ? "#4ade80" : result === "failed" ? "#f87171" : result === "error" ? "#f87171" : "rgba(255,255,255,0.4)";
  const label = loading ? "..." : result === "success" ? "✓ Success" : result === "failed" ? "✗ Failed" : result === "error" ? "Error" : "Simulate";

  return (
    <button
      onClick={simulate}
      disabled={loading}
      title="Randomly sets the transaction to success or failed — simulates real-world PSP callback behavior."
      style={{
        background: "none", border: "1px solid rgba(255,255,255,0.08)",
        padding: "5px 12px", cursor: loading ? "not-allowed" : "pointer",
        fontFamily: s.sans, fontSize: "11px", color,
        letterSpacing: "0.04em", transition: "all 0.2s", whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { if (!loading) e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {label}
    </button>
  );
}

export default function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div style={{ padding: "48px 0", textAlign: "center", fontFamily: s.sans, fontSize: "14px", color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
        No transactions yet. Send your first transaction to get started.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "600px" }}>
        <thead>
          <tr style={{ borderBottom: s.border }}>
            {["ID", "Amount", "Currency", "Country", "PSP", "Status", "Actions"].map((col) => (
              <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontFamily: s.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <td style={{ padding: "13px 16px", fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                {tx.id.slice(0, 8)}…
              </td>
              <td style={{ padding: "13px 16px", fontFamily: s.serif, fontSize: "15px", color: "#fff", fontWeight: 400 }}>
                {new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(tx.montant)}
              </td>
              <td style={{ padding: "13px 16px", fontFamily: s.sans, color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.06em" }}>
                {tx.devise}
              </td>
              <td style={{ padding: "13px 16px", fontFamily: s.sans, color: "rgba(255,255,255,0.4)" }}>
                {tx.pays}
              </td>
              <td style={{ padding: "13px 16px", fontFamily: s.sans, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                {tx.psp}
              </td>
              <td style={{ padding: "13px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: tx.status === "success" ? "#4ade80" : "#f87171", flexShrink: 0 }} />
                  <span style={{ fontFamily: s.sans, fontSize: "12px", color: tx.status === "success" ? "#4ade80" : "#f87171", letterSpacing: "0.06em" }}>
                    {tx.status === "success" ? "Success" : "Failed"}
                  </span>
                </div>
              </td>
              <td style={{ padding: "13px 16px" }}>
                <WebhookButton transactionId={tx.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
