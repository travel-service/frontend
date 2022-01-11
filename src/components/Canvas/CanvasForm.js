import React from 'react';
import styled from 'styled-components';
// import BuildBlockForm from 'containers/Canvas/BuildBlockForm';

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
      {/* 각자의 container
      ex.
      {type === 'build' && (
        <BuildBlockForm />
      )}
      {type === 'setting or build or ..' && (
        <component />
      )}  */}
    </CanvasDiv>
  );
};

export default CanvasForm;