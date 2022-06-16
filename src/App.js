import React, { useState, useEffect } from 'react';
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
import { useScroll } from 'lib/custom/useScroll';
import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body::-webkit-scrollbar {
    display: none;
    ${(props) =>
      props.isScroll &&
      css`
        display: block;
      `}
  }
`;

function App() {
  const { scrollY } = useScroll();

  useEffect(() => {
    console.log('Set');
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
      {/* 스크롤 액션 추가 */}
      <GlobalStyle isScroll={scrollY} />
    </>
  );
}

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임(0311)

export default App;

// 0303 useRoutes 사용
