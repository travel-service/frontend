import React from 'react';
import CanvasMenu from './CanvasMenu';
import CanvasButtons from './CanvasButtons';
import styled from 'styled-components';

const Container = styled.div`
  /* height: 100vh; // header 생기면 변환 필요 */
  height: 100vh;
`;

const Div = styled.div`
  flex: 1;
`;

const CanvasTemplate = ({ children }) => {
  return (
    <Container>
      <CanvasMenu />
      <Div>
        {children}
        <CanvasButtons />
      </Div>
    </Container>
  );
};

export default CanvasTemplate;
