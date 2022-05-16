import React, { useEffect } from 'react';
import {
  // Routes, Route,
  useRoutes,
} from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import HeaderContainer from './containers/common/HeaderContainer';
import NoticeMainPage from 'pages/NoticePages/NoticeMainPage';
// import LandingPage from 'pages/LandingPage';
import Modal from 'react-modal';
import { onSilentRefresh } from 'lib/api/auth';
import { setCookie, getCookie } from 'lib/cookies';
import LandingPage from 'pages/LandingPage';

function App() {
  useEffect(() => {
    // console.log(accessToken)
    onSilentRefresh();
  }, []);

  return (
    <>
      {/* <HeaderContainer /> */}
      {/* 배포 url */}
      {useRoutes([
        { path: process.env.PUBLIC_URL + '/', element: <LandingPage /> }, // 임시로 signup
        { path: process.env.PUBLIC_URL + '/signup', element: <SignUpPage /> },
        { path: process.env.PUBLIC_URL + '/login', element: <LoginPage /> },
        // {
        //   path: process.env.PUBLIC_URL + '/canvas/*',
        //   element: <CanvasMainPage />,
        // },
        // {
        //   path: process.env.PUBLIC_URL + '/notice/*',
        //   element: <NoticeMainPage />,
        // },
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

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임(0311)

export default App;

// 0303 useRoutes 사용
