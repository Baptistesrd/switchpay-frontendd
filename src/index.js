import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🧩 Pages
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import DocsPage from "./pages/DocsPage";
import App from "./App";

// 🎨 Thème Chakra (dark forcé)
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        bg: "gray.900",
        color: "gray.100",
        overflowX: "hidden",
        overflowY: "auto",
      },
    },
  },
  colors: {
    brand: {
      50: "#e6f0ff",
      100: "#cce0ff",
      200: "#99c2ff",
      300: "#66a3ff",
      400: "#3385ff",
      500: "#2368f5",
      600: "#1b52c4",
      700: "#143c93",
      800: "#0d2762",
      900: "#071331",
    },
  },
});

// 🏁 Point d’entrée React
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Force le dark mode au démarrage */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs" element={<DocsPage />} /> {/* ✅ route claire */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
