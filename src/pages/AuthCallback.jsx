import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeAuth } from "../hooks/useAuth";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const provider = params.get("state"); // "google" or "github"

    if (!code || !provider) {
      navigate("/login");
      return;
    }

    async function exchange() {
      try {
        const res = await axios.post(`${BACKEND}/auth/${provider}`, { code });
        storeAuth(res.data);
        navigate("/app");
      } catch (err) {
        setError(err.response?.data?.detail || "OAuth authentication failed");
      }
    }

    exchange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#f87171", fontSize: "15px" }}>{error}</p>
          <a href="/login" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
        Completing sign-in…
      </p>
    </div>
  );
}
