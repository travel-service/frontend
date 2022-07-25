import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/common/PageTemplate';

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CanvasTemplate = ({ children }) => {
  return (
    <PageTemplate>
      <Container>{children}</Container>
    </PageTemplate>
  );
};
export default CanvasTemplate;
