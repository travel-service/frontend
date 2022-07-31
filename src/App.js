import React from 'react';
import { useRoutes } from 'react-router-dom';
import SignUpPage from 'pages/AuthPages/SignupPage';
import LoginPage from 'pages/AuthPages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import NoticeMainPage from 'pages/NoticePages/NoticeMainPage';
import NotFoundPage from 'pages/OtherPages/NotFoundPage';
import LandingPage from 'pages/OtherPages/LandingPage';
import SearchPage from 'pages/OtherPages/SearchPage';
import MyMainPage from 'pages/MyPages/MyMainPage';
import { useScroll } from 'lib/custom/useScroll';
import { createGlobalStyle, css } from 'styled-components';
import Modal from 'react-modal';
import ProtectedRoute from 'lib/router/ProtectedRoute';

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

  return (
    <>
      {useRoutes([
        { path: process.env.PUBLIC_URL + '/', element: <LandingPage /> },
        { path: process.env.PUBLIC_URL + '/signup', element: <SignUpPage /> },
        { path: process.env.PUBLIC_URL + '/login', element: <LoginPage /> },
        {
          path: process.env.PUBLIC_URL + '/canvas/*',
          element: (
            <ProtectedRoute>
              <CanvasMainPage />
            </ProtectedRoute>
          ),
        },
        {
          path: process.env.PUBLIC_URL + '/notice/*',
          element: <NoticeMainPage />,
        },
        {
          path: process.env.PUBLIC_URL + '/mypage/*',
          element: <MyMainPage />,
        },
        {
          path: process.env.PUBLIC_URL + '/search',
          element: <SearchPage />,
        },
        {
          path: process.env.PUBLIC_URL + '*',
          element: <NotFoundPage />,
        },
        /*{
          path: process.env.PUBLIC_URL + '/마이페이지/',
          element: <ProtectedRoute>
          <페이지 />
        </ProtectedRoute>,
        },*/
      ])}
      <GlobalStyle isScroll={scrollY} />
    </>
  );
}

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임

export default App;

/*
0731 ProtectedRoute
여행캔버스, 마이페이지와 같은 회원일 경우에만 접속가능한 라우트 컴포넌트
children 으로 page 컴포넌트 전달
*/
