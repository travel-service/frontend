import React from 'react';
import HeaderContainer from './containers/common/HeaderContainer';
import { Routes, Route } from 'react-router-dom';
import LandingPage from 'pages/LandingPage';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';

function App() {
  return (
    <div>
      <HeaderContainer />
      <Routes>
        <Route element={<LandingPage />} path="" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignUpPage />} path="signup" />
      </Routes>
    </div>
  );
}

export default App;