import React from 'react';
import styled from 'styled-components';
import BackImg from 'images/landingBack.png';

const Container = styled.div`
  flex: 1;
  border: 1px solid green;
`;

const SubContents = styled.div`
  border: 1px solid green;
`;

const MainContents = styled.div`
  border: 1px solid green;
  /* width: 100vw; */
  max-width: 900px;
  height: 800px;
  background-image: url(${BackImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Main = () => {
  return (
    <Container>
      {/* <SubContents>sub</SubContents> */}
      {/* <MainContents>main</MainContents> */}
    </Container>
  );
};

export default Main;
