import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "pages/SignupPage";
import LoginPage from "pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignUpPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
