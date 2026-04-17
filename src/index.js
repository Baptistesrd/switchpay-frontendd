import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const Landing  = lazy(() => import("./pages/Landing"));
const Contact  = lazy(() => import("./pages/Contact"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const App      = lazy(() => import("./App"));

function PageLoader() {
  return (
    <Box
      minH="100vh"
      bg="#030303"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" color="purple.400" thickness="3px" />
    </Box>
  );
}

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


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
    <ChakraProvider theme={theme}>
      
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"       element={<Landing />} />
            <Route path="/app"    element={<App />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs"   element={<DocsPage />} />
            <Route path="*"       element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
