import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';

// grid 적용 0107
const GridDiv = styled.div`
  display: flex;
  height: 100vh;
  /* grid-template-columns: 1fr 6fr; */
`;

const CanvasTemplate = ({ children }) => {
  return (
    <GridDiv>
      <CanvasMenu />
      {children}
    </GridDiv>
  );
};

export default CanvasTemplate;