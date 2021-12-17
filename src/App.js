import React from 'react';
import HeaderContainer from './containers/Base/HeaderContainer';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import WritePage from 'pages/WritePage';
import PostPage from 'pages/PostPage';

function App() {
  return (
    <div>
      <HeaderContainer />
      <Routes>
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignUpPage />} path="signup" />
        <Route element={<WritePage />} path="write" />
        <Route element={<PostPage />} path="@:username/:postId" />
      </Routes>
    </div>
  );
}

export default App;