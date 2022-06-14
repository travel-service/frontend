import React from 'react';
import Header from 'components/Landing/Header';
import Main from 'components/Landing/Main';
import UseWays from 'components/Landing/UseWays';
// import LandingTemplate from 'components/Landing/LandingTemplate';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  padding: 0% 7%;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LandingPage = () => {
  return (
    <Container>
      <FlexBox>
        <Header />
        <Main />
      </FlexBox>
      <UseWays />
    </Container>
  );
};

export default LandingPage;
// 랜딩 디자인(피그마)
// https://www.figma.com/file/hfE6NPBRZb4eWXvYbGDztU/%ED%8A%B8%EB%9E%98%EB%B8%94%EB%9F%AD-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8-%3A-%EC%88%98%EC%A0%95-_-220512?node-id=0%3A1
