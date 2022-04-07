import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeViewerPage from './NoticeViewerPage';
import NoticeListPage from './NoticeListPage';
import WritePage from './WritePage';

const NoticeMainPage = () => {
  return (
    <Routes>
      <Route element={<NoticeListPage />} path="noticeList" />
      <Route element={<NoticeViewerPage />} path="noticeViewer/:numId" />
      <Route element={<WritePage />} path="write" />
    </Routes>
  );
};

export default NoticeMainPage;
