import { useState, useEffect } from "react";
import axios from "axios";

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState(localStorage.getItem("apiKey") || "");

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  const setApiKey = (key) => {
    if (!key) return;
    localStorage.setItem("apiKey", key);
    setApiKeyState(key);
    axios.defaults.headers.common["x-api-key"] = key;
  };

  return [apiKey, setApiKey, setApiKeyState];
}
