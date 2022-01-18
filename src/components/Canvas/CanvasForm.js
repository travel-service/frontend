import React from 'react';
import styled from 'styled-components';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
/*import GridDiv from './CanvasTemplate';
import CanvasMenu from './CanvasMenu';*/

const CanvasDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70vh;
  width: 100vw;
  padding-left: 17.5%;
  z-index: -1;
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
      {text}
      {type === 'setting' && (
          <TravelSettingForm />
        )}
    </CanvasDiv>
  );
};

export default CanvasForm;