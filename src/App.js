import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/contents/LandingPage';
import SignUpPage from './components/contents/SignUpPage';
import LoginPage from './components/contents/LoginPage';
import Headers from './components/headers/Header';
import PostListPage from './components/contents/posts/PostList';
import NoticeList from './components/contents/notices/NoticeList';
import NoticeViewer from './components/contents/notices/NoticeViewer';
import WritePage from './components/contents/notices/WritePage';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<PostListPage />} path="/postlist" />
        <Route element={<NoticeList />} path="/notice" />
        <Route element={<NoticeViewer />} path="/noticePage" />
        <Route element={<WritePage />} path="/write" />
      </Routes>
    </>
  );
}

export default App;
