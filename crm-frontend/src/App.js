import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EnquiryPage from "./pages/EnquiryPage";
import DashboardPage from "./pages/DashboardPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnquiryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;