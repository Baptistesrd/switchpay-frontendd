import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import MainRouter from "./MainRouter";

// 🎨 Thème custom Chakra
const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        color: mode("gray.800", "gray.100")(props),
      },
    }),
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
      {/* 👇 Garde la config colorMode au mount */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {/* 👇 Gestion des routes (Landing / App) */}
      <MainRouter />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
