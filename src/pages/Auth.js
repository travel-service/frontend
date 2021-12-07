import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';

const Auth = () => {
  return (
    <>
      <Routes>
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignUpPage />} path="signup" />
      </Routes>
      <Link to="./login"><h2>로그인</h2></Link>
      <Link to="./signup"><h2>회원가입</h2></Link>
    </>
  );
};

export default Auth;