import React from 'react';
//import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
import CanvasButtons from './CanvasButtons';

// grid 적용 0107
// flex로 변경 0228
const Container = styled.div`
  display: flex;
  height: 100vh; // header 생기면 변환 필요
  /* grid-template-columns: 1fr 6fr; */
`;

const Div = styled.div`
  flex: 1;
`;

const CanvasTemplate = ({ children }) => {
  return (
    <Container>
      {/*<CanvasMenu />*/}
      <Div>
        {/* <ButtonContainer>{children}</ButtonContainer> */}
        {children}
        <CanvasButtons />
      </Div>
    </Container>
  );
};
export default CanvasTemplate;
