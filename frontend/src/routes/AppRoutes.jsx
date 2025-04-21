// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";  // import HomePage

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  {/* Render HomePage when user visits the home route */}

    </Routes>
  );
}

export default AppRoutes;
