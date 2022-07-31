import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyInfoPage from './MyInfoPage';
import MySetting from './MySettingPage';

const MyMainPage = () => {
  return (
    <Routes>
      <Route element={<MyInfoPage />} path="MyInfo" />
      <Route element={<MySetting />} path="MySetting" />
    </Routes>
  );
};

export default MyMainPage;
