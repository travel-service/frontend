import React from 'react';
import { AuthWrapper } from 'components/Auth';
import { Routes, Route, Link } from 'react-router-dom';
import Register from '../containers/Auth/Register';
import Login from '../containers/Auth/Login';

const Auth = () => {
  return (
    <>
      <AuthWrapper>
        <Routes>
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
        </Routes>
        <Link to="login"><h2>로그인</h2></Link>
        <Link to="register"><h2>회원가입</h2></Link >
      </AuthWrapper>
    </>
  );
};

export default Auth;