import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import MainRouter from "./MainRouter";

// 🎨 Thème custom Chakra forcé en dark
const theme = extendTheme({
  config: {
    initialColorMode: "dark",   // ✅ toujours dark
    useSystemColorMode: false,  // ✅ ignore les préférences système
  },
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        bg: "gray.900",    // ✅ toujours dark background
        color: "gray.100", // ✅ texte clair
        overflowY: "auto", // ✅ réactive la scrollbar verticale
        overflowX: "hidden", // (optionnel) pas de scroll horizontal
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* ✅ Toujours dark mode dès le mount */}
      <ColorModeScript initialColorMode="dark" />
      <MainRouter />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
