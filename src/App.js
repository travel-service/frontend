import React from 'react';
import { useRoutes } from 'react-router-dom';
import SignUpPage from 'pages/AuthPages/SignupPage';
import LoginPage from 'pages/AuthPages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import NoticeMainPage from 'pages/NoticePages/NoticeMainPage';
import NotFoundPage from 'pages/OtherPages/NotFoundPage';
import LandingPage from 'pages/OtherPages/LandingPage';
import SearchPage from 'pages/OtherPages/SearchPage';
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
          path: process.env.PUBLIC_URL + '/search',
          element: <SearchPage />,
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

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임

export default App;
