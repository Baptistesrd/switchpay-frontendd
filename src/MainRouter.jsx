// MainRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import App from './App';
import Contact from './pages/Contact'; // 👈 ajoute ton import

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<App />} />
        <Route path="/contact" element={<Contact />} /> {/* 👈 ajoute ta route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
