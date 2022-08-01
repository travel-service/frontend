import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLogin = () => {
    return localStorage.getItem('login') === 'true' ? true : false;
  };

  if (!isLogin()) {
    alert('로그인 후 사용가능한 서비스입니다 !');
    return <Navigate to={process.env.PUBLIC_URL + '/login'} />;
  }

  return children;
};

export default ProtectedRoute;

// 220729
// https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
