import React from 'react';
import styled from 'styled-components';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';

const CanvasDiv = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70vh;
  width: 100vw;
  padding-left: 17.5%;
`;

const textMap = {
  setting: '여행 설정',
  select: '블록 선택',
  build: '여행 캔버스',
  share: '여행 공유'
};

const CanvasForm = ({ type }) => {
  const text = textMap[type];

  return (
    <CanvasDiv>
      <h3>{text}</h3>
      {type === 'setting' && (
          <TravelSettingForm />
        )}
    </CanvasDiv>
  );
};

export default CanvasForm;