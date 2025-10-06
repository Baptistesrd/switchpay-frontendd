import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import App from "./App";
import DocsPage from "./pages/DocsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("DEBUG COMPONENTS:", { Landing, App, Contact, DocsPage });



root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docspage" element={<DocsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
