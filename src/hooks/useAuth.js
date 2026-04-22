import axios from "axios";

const TOKEN_KEY = "sp_token";
const API_KEY_KEY = "sp_api_key";

function _parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_KEY);
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  const payload = _parseJwt(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 > Date.now();
}

export function storeAuth({ access_token, api_key }) {
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(API_KEY_KEY, api_key);
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  axios.defaults.headers.common["x-api-key"] = api_key;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(API_KEY_KEY);
  delete axios.defaults.headers.common["Authorization"];
  delete axios.defaults.headers.common["x-api-key"];
  window.location.href = "/login";
}

/** Call once on app boot to restore headers from localStorage. */
export function restoreAxiosHeaders() {
  const token = getToken();
  const apiKey = getApiKey();
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  if (apiKey) axios.defaults.headers.common["x-api-key"] = apiKey;
}
