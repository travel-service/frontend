import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
/*import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import CanvasForm from './CanvasForm';
*/
// grid 적용 0107
const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
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