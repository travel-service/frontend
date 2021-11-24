import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/contents/LandingPage';
import SignUpPage from './components/contents/SignUpPage';
import LoginPage from './components/contents/LoginPage';
import Headers from './components/headers/Header';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
