import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import NoticeMainPage from 'pages/NoticePages/NoticeMainPage';
// import HeaderContainer from './containers/common/HeaderContainer';
// import LandingPage from 'pages/LandingPage';

function App() {
  return (
    <>
      {/* <HeaderContainer /> */}
      {/* 배포 url */}
      {useRoutes([
        { path: process.env.PUBLIC_URL + '/', element: <SignUpPage /> }, // 임시로 signup
        { path: process.env.PUBLIC_URL + '/signup', element: <SignUpPage /> },
        { path: process.env.PUBLIC_URL + '/login', element: <LoginPage /> },
        {
          path: process.env.PUBLIC_URL + '/canvas/*',
          element: <CanvasMainPage />,
        },
        {
          path: process.env.PUBLIC_URL + '/notice/*',
          element: <NoticeMainPage />,
        },
      ])}
      {/* <Routes>
        <Route element={<SignUpPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<CanvasMainPage />} path="/canvas/*" />
      </Routes> */}
    </>
  );
}

export default App;
