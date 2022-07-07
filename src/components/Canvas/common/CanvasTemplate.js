import React from 'react';
import styled from 'styled-components';
import CanvasButtons from './CanvasButtons';
import PageTemplate from 'components/common/PageTemplate';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CanvasTemplate = ({ children }) => {
  return (
    <PageTemplate>
      <Container>
        {children}
        <CanvasButtons />
      </Container>
    </PageTemplate>
  );
};
export default CanvasTemplate;
