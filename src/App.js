import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HeaderContainer from './containers/common/HeaderContainer';

function App() {
  return (
    <div>
        <HeaderContainer />
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<SignUpPage />} path="/signup" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
    </div>
  )
}

export default App;
