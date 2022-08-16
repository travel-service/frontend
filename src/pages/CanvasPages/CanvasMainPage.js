// 임시로 만든 캔버스 메뉴 리스트 페이지
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TravelSettingPage from './TravelSettingPage';
import SelectBlockPage from './SelectBlockPage';
import BuildBlockPage from './BuildBlockPage';
import DirectoryPage from './DirectoryPage';
import TravelCheckPage from './TravelCheckPage';

const CanvasMainPage = () => {
  return (
    <Routes>
      <Route element={<DirectoryPage />} path="directory" />
      <Route element={<TravelSettingPage />} path="setting" />
      <Route element={<SelectBlockPage />} path="select" />
      <Route element={<BuildBlockPage />} path="build" />
      <Route element={<TravelCheckPage />} path="check" />
      <Route element={<TravelCheckPage />} path="check/:planId" />
    </Routes>
  );
};

export default CanvasMainPage;
