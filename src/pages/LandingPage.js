import React from 'react';
import Header from 'components/Landing/Header';
import Main from 'components/Landing/Main';
import UseWays from 'components/Landing/UseWays';
// import LandingTemplate from 'components/Landing/LandingTemplate';
import styled from 'styled-components';
import BackImg from 'images/landingBackV2.png';

const Container = styled.div`
  /* border: 1px solid black; */
  /* padding: 0% 7%; */
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #ffd3c4; */
  background-color: #ffd0c0;
  /* background-color: rgb(255, 208, 192); */
  height: 100vh;
  padding: 0% 7%;
`;

const Contents = styled.div`
  height: 100%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const SubContents = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: ; */
`;

const TextH3 = styled.div`
  font-size: 35px;
  font-weight: 350;
  line-height: 50px;
`;

const TextH2 = styled.div`
  font-size: 50px;
  font-weight: 700;
  line-height: 80px;
`;

const MainContents = styled.div`
  height: 70%;
  background-image: url(${BackImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ffd0c0;
`;

const LandingPage = () => {
  return (
    <Container>
      <FlexBox>
        <Header />
        <Contents>
          <SubContents>
            <TextH3>복잡한 여행 계획은 그만!</TextH3>
            <TextH2>여행 계획의 끝판왕, 트래블럭!</TextH2>
          </SubContents>
          <MainContents>
            {/*  */}
          </MainContents>
        </Contents>
      </FlexBox>
      <UseWays />
    </Container>
  );
};

export default LandingPage;
// 랜딩 디자인(피그마)
// https://www.figma.com/file/hfE6NPBRZb4eWXvYbGDztU/%ED%8A%B8%EB%9E%98%EB%B8%94%EB%9F%AD-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8-%3A-%EC%88%98%EC%A0%95-_-220512?node-id=0%3A1
