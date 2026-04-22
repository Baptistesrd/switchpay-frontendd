import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { storeAuth } from "../hooks/useAuth";

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const s = {
  sans: "'DM Sans', sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
};

function OAuthCallback() {
  // Handled in this component when the page loads with ?code= params
  return null;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND}/auth/login`, { email, password });
      storeAuth(res.data);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_type: "code",
      scope: "openid email profile",
      state: "google",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  function handleGitHub() {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/callback`,
      scope: "read:user user:email",
      state: "github",
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>

        {/* Logo / title */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ margin: "0 0 12px", fontFamily: s.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            SwitchPay
          </p>
          <h1 style={{ margin: 0, fontFamily: s.serif, fontWeight: 400, fontSize: "36px", color: "#fff" }}>
            Welcome back
          </h1>
        </div>

        {/* OAuth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          <button onClick={handleGoogle} style={oauthBtn}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: "10px" }}>
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>
          <button onClick={handleGitHub} style={oauthBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: "10px" }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.572C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontFamily: s.sans, fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Email / password form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          {error && (
            <p style={{ margin: 0, fontFamily: s.sans, fontSize: "13px", color: "#f87171" }}>{error}</p>
          )}
          <button type="submit" disabled={loading} style={primaryBtn}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontFamily: s.sans, fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
          No account?{" "}
          <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

const oauthBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "transparent",
  color: "rgba(255,255,255,0.8)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "border-color 0.2s, color 0.2s",
};

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  outline: "none",
};

const primaryBtn = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#fff",
  color: "#080808",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "4px",
};
