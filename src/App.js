import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/contents/LandingPage';
import SignUpPage from './components/contents/SignUpPage';
import LoginPage from './components/contents/Logins/LoginPage';
//import Headers from './components/headers/Header';
import { UserContextProvider } from './components/contents/Logins/UserContext';

function App() {
  return (
    <>
      <UserContextProvider>
        {/*<Headers />*/}
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<SignUpPage />} path="/signup" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App;
