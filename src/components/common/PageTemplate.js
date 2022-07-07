import React from 'react';
import HeaderContainer from 'containers/common/HeaderContainer';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: #ffd0c0;
  display: flex;
  flex-direction: column;
`;

const PageTemplate = ({ children }) => {
  return (
    <Container>
      <HeaderContainer />
      {children}
    </Container>
  );
};

export default PageTemplate;
