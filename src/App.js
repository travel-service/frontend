import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/contents/LandingPage';
import SignUpPage from './components/contents/SignUpPage';
import LoginPage from './components/contents/LoginPage';
import Headers from './components/headers/Header';
import PostListPage from './components/contents/posts/PostList';
import NoticePage from './components/contents/notices/NoticePage'

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<PostListPage />} path="/postlist" />
        <Route element={<NoticePage />} path="/notice" />
      </Routes>
    </>
  );
}

export default App;
