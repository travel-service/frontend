import React from 'react';
import styled from 'styled-components';
import ProcessBar from './ProcessBar';
import Block from 'containers/Canvas/Block';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import PlanDays from '../BuildTab/Dnd/PlanDays';
import CanvasButtons from './CanvasButtons';
import SelLocBasket from '../BuildTab/Dnd/SelLocBasket';

const Container = styled.div`
  flex: 1;
  height: 100%;
  min-height: 85vh; //?
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    height: 100%;
  }
`;

const Canvas = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  @media screen and (max-width: 767px) {
    display: block;
    padding-right: 0;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 25px;
  @media screen and (max-width: 767px) {
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 25px;

  @media screen and (max-width: 767px) {
    margin-top: 0px;
    font-weight: 600;
    font-size: 15px;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-height: 60vh; // 수정 가능
`;

const siteMap = {
  setting: '여행 설정',
  select: '블록 선택',
  build: '여행 캔버스',
  check: '여행 확인하기',
};

const CanvasForm = ({ type, data }) => {
  return (
    <Container>
      {/* 프로세스 바 */}
      <ProcessBar type={type} siteMap={siteMap} />
      {/* 캔버스 */}
      <Canvas>
        {/* 사이드 메뉴 */}
        {type === 'build' && <SelLocBasket idx={2} data={data} />}
        {/* 메인 컨텐츠 */}
        <Main>
          <Title>{siteMap[type]}</Title>
          <Contents>
            {type === 'setting' && <TravelSettingForm />}
            {type === 'select' && <Block />}
            {type === 'build' && <PlanDays idx={2} data={data} />}
          </Contents>
          <CanvasButtons />
        </Main>
      </Canvas>
    </Container>
  );
};

export default CanvasForm;
