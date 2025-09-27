import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import AppPage from "./App"; // 👈 ton dashboard

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
