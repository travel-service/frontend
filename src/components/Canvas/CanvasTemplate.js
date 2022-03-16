import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
import PlanName from './PlanName';
import CanvasButtons from './CanvasButtons';

// grid 적용 0107
const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const ButtonContianer = () => {
  return (
    <div>
      <PlanName />
      <CanvasButtons />
    </div>
  );
};

const CanvasTemplate = ({ children }) => {
  return (
    <GridDiv>
      <CanvasMenu />
      {children}
      <ButtonContianer />
    </GridDiv>
  );
};

export default CanvasTemplate;