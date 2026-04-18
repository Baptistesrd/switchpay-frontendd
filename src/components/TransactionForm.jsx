import React, { useState } from "react";
import { useApiKey } from "../hooks/useApiKey";
import axios from "axios";

const CURRENCIES = ["EUR","USD","GBP","JPY","CHF","CAD","AUD","CNY","INR","BRL","ZAR","SGD","MXN","TRY"];
const DEVICES = ["web","mobile"];

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
  border: "1px solid rgba(255,255,255,0.08)",
  label: { fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "8px" },
  input: { width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0", padding: "12px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box" },
};

export default function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({ montant: "", devise: "", pays: "", device: "" });
  const [apiKey, , setApiKeyState] = useApiKey();
  const [showApi, setShowApi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!apiKey) return "API Key is required.";
    if (!formData.montant || Number(formData.montant) <= 0) return "Amount must be > 0.";
    if (!formData.devise) return "Currency is required.";
    if (!formData.pays || formData.pays.length !== 2) return "Country must be a 2-letter code (e.g. FR).";
    if (!formData.device) return "Device is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { showToast(err, "warning"); return; }
    const payload = {
      montant: parseFloat(formData.montant),
      devise: formData.devise,
      pays: formData.pays.toUpperCase(),
      device: formData.device,
    };
    const idempotencyKey = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/transaction`,
        payload,
        { headers: { "x-api-key": apiKey, "Idempotency-Key": idempotencyKey } }
      );
      showToast(`Transaction sent � ID: ${res.data?.id || idempotencyKey}`, "success");
      onNewTransaction?.(res.data);
      setFormData({ montant: "", devise: "", pays: "", device: "" });
    } catch (err) {
      showToast(err.response?.data?.detail || "Transaction failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>

      {/* Toast */}
      {toast && (
        <div style={{ marginBottom: "24px", padding: "12px 16px", border: `1px solid ${toast.type === "success" ? "rgba(74,222,128,0.3)" : toast.type === "error" ? "rgba(248,113,113,0.3)" : "rgba(251,191,36,0.3)"}`, fontFamily: s.sans, fontSize: "13px", color: toast.type === "success" ? "#4ade80" : toast.type === "error" ? "#f87171" : "#fbbf24" }}>
          {toast.msg}
        </div>
      )}

      {/* API Key */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "32px", marginBottom: "32px" }}>
        <label style={s.label}>API Key</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid rgba(255,255,255,0.08)" }}>
          <input
            type={showApi ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="Auto-generated"
            style={{ ...s.input, border: "none", flex: 1 }}
          />
          <button type="button" onClick={() => setShowApi(!showApi)}
            style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer", borderLeft: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
            {showApi ? "hide" : "show"}
          </button>
          <button type="button" onClick={() => navigator.clipboard.writeText(apiKey)}
            style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer", borderLeft: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: s.sans, fontSize: "12px" }}>
            copy
          </button>
        </div>
      </div>

      {/* Fields grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>

        <div>
          <label style={s.label}>Amount</label>
          <input
            name="montant" type="number" min="0" step="0.01"
            placeholder="0.00"
            value={formData.montant}
            onChange={handleChange}
            style={s.input}
          />
        </div>

        <div>
          <label style={s.label}>Currency</label>
          <select name="devise" value={formData.devise} onChange={handleChange}
            style={{ ...s.input, appearance: "none", cursor: "pointer" }}>
            <option value="" style={{ background: "#080808" }}>Select</option>
            {CURRENCIES.map((c) => <option key={c} value={c} style={{ background: "#080808" }}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={s.label}>Country</label>
          <input
            name="pays" type="text" maxLength={2}
            placeholder="FR"
            value={formData.pays}
            onChange={handleChange}
            style={{ ...s.input, textTransform: "uppercase" }}
          />
        </div>

        <div>
          <label style={s.label}>Device</label>
          <select name="device" value={formData.device} onChange={handleChange}
            style={{ ...s.input, appearance: "none", cursor: "pointer" }}>
            <option value="" style={{ background: "#080808" }}>Select</option>
            {DEVICES.map((d) => <option key={d} value={d} style={{ background: "#080808" }}>{d}</option>)}
          </select>
        </div>

      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 28px", borderRadius: "9999px", border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: s.sans, fontWeight: 600, fontSize: "14px",
            color: "#080808", background: "#fff",
            opacity: loading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = loading ? "0.6" : "1"; }}
        >
          {loading ? "Sending..." : "Send Transaction"}
        </button>
      </div>

    </form>
  );
}
