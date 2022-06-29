import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import NoticeMainPage from 'pages/NoticePages/NoticeMainPage';
import Modal from 'react-modal';
import NotFoundPage from 'pages/NotFoundPage';
import LandingPage from 'pages/LandingPage';
import { useScroll } from 'lib/custom/useScroll';
import { createGlobalStyle, css } from 'styled-components';
import axios from 'axios';
import './interceptors/axios';

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
    (async () => {
      const response = await axios.get('/auth/info');
      console.log(response); // refresh로 받아오고 userState update만 시켜주면됨
    })();
  }, []);

  return (
    <>
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
        {
          path: process.env.PUBLIC_URL + '*',
          element: <NotFoundPage />,
        },
      ])}
      <GlobalStyle isScroll={scrollY} />
    </>
  );
}

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임(0311)

export default App;
