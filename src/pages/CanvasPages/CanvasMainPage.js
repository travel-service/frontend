// 임시로 만든 캔버스 메뉴 리스트 페이지
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TravelSettingPage from './TravelSettingPage';
import SelectBlockPage from './SelectBlockPage';
import BuildBlockPage from './BuildBlockPage';
import TravelSharePage from './TravelSharePage';
import styled from 'styled-components';

const TempDiv = styled.div`
  text-align: center;
  ul {
    list-style: none;
    padding: 0px;
    font-size: 20px;
  }
`;

const TempLink = styled(Link)`
  text-decoration: none;
  color: red;
`;

const CanvasMainPage = () => {
  return (
    <div>
      <TempDiv>
        <h4>임시로 만든 캔버스 메뉴 리스트 페이지입니다.</h4>
        <ul>
          <li><TempLink to="setting">1. 여행 설정</TempLink></li>
          <li><TempLink to="select">2. 블록 선택</TempLink></li>
          <li><TempLink to="build">3. 여행 캔버스</TempLink></li>
          <li><TempLink to="share">4. 여행 공유</TempLink></li>
        </ul>
      </TempDiv>

      <Routes>
        <Route element={<TravelSettingPage />} path="setting" />
        <Route element={<SelectBlockPage />} path="select" />
        <Route element={<BuildBlockPage />} path="build" />
        <Route element={<TravelSharePage />} path="share" />
      </Routes>
    </div>
  );
};

export default CanvasMainPage;
