import React from 'react';
import HeaderContainer from 'containers/common/HeaderContainer';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: #f6f6f8;
  display: flex;
  flex-direction: column;
`;

const PageTemplate = ({ children }) => {
  return (
    <Container>
      <HeaderContainer />
      {/* 프로세스 바 */}
      {children}
    </Container>
  );
};

export default PageTemplate;
