import React, { useState, useRef, useEffect } from "react";
import { useApiKey } from "../hooks/useApiKey";
import axios from "axios";

const CURRENCIES = ["EUR", "USD", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "INR", "BRL", "ZAR", "SGD", "MXN", "TRY"];
const DEVICES = ["web", "mobile"];
const COUNTRIES = [
  { code: "FR", flag: "🇫🇷", label: "France" },
  { code: "DE", flag: "🇩🇪", label: "Germany" },
  { code: "GB", flag: "🇬🇧", label: "United Kingdom" },
  { code: "US", flag: "🇺🇸", label: "United States" },
  { code: "ES", flag: "🇪🇸", label: "Spain" },
  { code: "IT", flag: "🇮🇹", label: "Italy" },
  { code: "NL", flag: "🇳🇱", label: "Netherlands" },
  { code: "BE", flag: "🇧🇪", label: "Belgium" },
  { code: "CH", flag: "🇨🇭", label: "Switzerland" },
  { code: "PT", flag: "🇵🇹", label: "Portugal" },
  { code: "PL", flag: "🇵🇱", label: "Poland" },
  { code: "SE", flag: "🇸🇪", label: "Sweden" },
  { code: "NO", flag: "🇳🇴", label: "Norway" },
  { code: "DK", flag: "🇩🇰", label: "Denmark" },
  { code: "FI", flag: "🇫🇮", label: "Finland" },
  { code: "AU", flag: "🇦🇺", label: "Australia" },
  { code: "CA", flag: "🇨🇦", label: "Canada" },
  { code: "JP", flag: "🇯🇵", label: "Japan" },
  { code: "SG", flag: "🇸🇬", label: "Singapore" },
  { code: "IN", flag: "🇮🇳", label: "India" },
  { code: "BR", flag: "🇧🇷", label: "Brazil" },
  { code: "MX", flag: "🇲🇽", label: "Mexico" },
  { code: "ZA", flag: "🇿🇦", label: "South Africa" },
  { code: "NG", flag: "🇳🇬", label: "Nigeria" },
  { code: "AE", flag: "🇦🇪", label: "UAE" },
  { code: "SA", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "CN", flag: "🇨🇳", label: "China" },
  { code: "KR", flag: "🇰🇷", label: "South Korea" },
  { code: "ID", flag: "🇮🇩", label: "Indonesia" },
  { code: "TH", flag: "🇹🇭", label: "Thailand" },
  { code: "MA", flag: "🇲🇦", label: "Morocco" },
  { code: "EG", flag: "🇪🇬", label: "Egypt" },
  { code: "AR", flag: "🇦🇷", label: "Argentina" },
  { code: "CO", flag: "🇨🇴", label: "Colombia" },
];

const s = {
  sans: "'DM Sans', sans-serif",
  border: "1px solid rgba(255,255,255,0.08)",
  label: {
    fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "8px",
  },
  input: {
    width: "100%", background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0",
    padding: "12px 14px", fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box",
  },
};

function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = COUNTRIES.find(c => c.code === value);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(!open)}
        style={{ ...s.input, display: "flex", alignItems: "center", cursor: "pointer", textAlign: "left", justifyContent: "space-between" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {selected ? (
            <>
              <span style={{ fontSize: "18px", lineHeight: 1 }}>{selected.flag}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", minWidth: "28px" }}>{selected.code}</span>
              <span>{selected.label}</span>
            </>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Select country</span>
          )}
        </span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", flexShrink: 0 }}>▾</span>
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 2px)", left: 0, right: 0, background: "#111", border: "1px solid rgba(255,255,255,0.1)", zIndex: 200, maxHeight: "220px", overflowY: "auto" }}>
          {COUNTRIES.map(({ code, flag, label }) => (
            <button key={code} type="button" onClick={() => { onChange(code); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 14px", background: code === value ? "rgba(255,255,255,0.06)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", textAlign: "left", fontFamily: s.sans, fontSize: "13px", color: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = code === value ? "rgba(255,255,255,0.06)" : "transparent"; }}
            >
              <span style={{ fontSize: "18px", lineHeight: 1, flexShrink: 0 }}>{flag}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", minWidth: "28px" }}>{code}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({ montant: "", devise: "", pays: "", device: "" });
  const [apiKey, , setApiKeyState] = useApiKey();
  const [showApi, setShowApi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!apiKey) return "API Key is required.";
    if (!formData.montant || Number(formData.montant) <= 0) return "Amount must be > 0.";
    if (!formData.devise) return "Currency is required.";
    if (!formData.pays) return "Country is required.";
    if (!formData.device) return "Device is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { showToast(err, "warning"); return; }
    const payload = {
      montant: parseFloat(formData.montant.toString().replace(/,/g, "")),
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
      showToast(`Transaction sent — ID: ${res.data?.id || idempotencyKey}`, "success");
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

      {toast && (
        <div style={{ marginBottom: "24px", padding: "12px 16px", border: `1px solid ${toast.type === "success" ? "rgba(74,222,128,0.3)" : toast.type === "error" ? "rgba(248,113,113,0.3)" : "rgba(251,191,36,0.3)"}`, fontFamily: s.sans, fontSize: "13px", color: toast.type === "success" ? "#4ade80" : toast.type === "error" ? "#f87171" : "#fbbf24" }}>
          {toast.msg}
        </div>
      )}

      {/* API Key */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "32px", marginBottom: "32px" }}>
        <label style={s.label}>API Key</label>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
          <input
            type={showApi ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="Auto-generated"
            style={{ ...s.input, border: "none", flex: 1 }}
          />
          <button type="button" onClick={() => setShowApi(!showApi)}
            style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer", borderLeft: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: s.sans, fontSize: "12px", whiteSpace: "nowrap" }}>
            {showApi ? "hide" : "show"}
          </button>
          <button type="button" onClick={handleCopy}
            style={{ padding: "12px 14px", background: copied ? "rgba(74,222,128,0.08)" : "none", border: "none", cursor: "pointer", borderLeft: "1px solid rgba(255,255,255,0.08)", color: copied ? "#4ade80" : "rgba(255,255,255,0.4)", fontFamily: s.sans, fontSize: "12px", whiteSpace: "nowrap", transition: "color 0.2s, background 0.2s", minWidth: "60px" }}>
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        <div>
          <label style={s.label}>Amount</label>
          <input name="montant" type="number" min="0" step="0.01" placeholder="0.00" value={formData.montant} onChange={handleChange} style={s.input} />
        </div>
        <div>
          <label style={s.label}>Currency</label>
          <select name="devise" value={formData.devise} onChange={handleChange} style={{ ...s.input, appearance: "none", cursor: "pointer" }}>
            <option value="" style={{ background: "#080808" }}>Select</option>
            {CURRENCIES.map((c) => <option key={c} value={c} style={{ background: "#080808" }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={s.label}>Country</label>
          <CountrySelect value={formData.pays} onChange={(code) => setFormData(f => ({ ...f, pays: code }))} />
        </div>
        <div>
          <label style={s.label}>Device</label>
          <select name="device" value={formData.device} onChange={handleChange} style={{ ...s.input, appearance: "none", cursor: "pointer" }}>
            <option value="" style={{ background: "#080808" }}>Select</option>
            {DEVICES.map((d) => <option key={d} value={d} style={{ background: "#080808" }}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: s.sans, fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
          Idempotency-Key auto-generated per request
        </span>
        <button type="submit" disabled={loading}
          style={{ padding: "12px 28px", borderRadius: "9999px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: s.sans, fontWeight: 600, fontSize: "14px", color: "#080808", background: "#fff", opacity: loading ? 0.6 : 1 }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = loading ? "0.6" : "1"; }}
        >
          {loading ? "Sending..." : "Send Transaction →"}
        </button>
      </div>

    </form>
  );
}
