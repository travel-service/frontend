import React from 'react';
import Header from 'components/Landing/Header';
import Main from 'components/Landing/Main';
import UseWays from 'components/Landing/UseWays';
// import LandingTemplate from 'components/Landing/LandingTemplate';
import styled from 'styled-components';
import BackImg from 'images/landingBackV2.png';
import { MdSearch } from 'react-icons/md';

const Container = styled.div`
  /* border: 1px solid black; */
  /* padding: 0% 7%; */
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffd0c0;
  height: 100vh;
  padding: 0% 7%;
`;

const Contents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ffd0c0;
`;
const InputContainer = styled.div`
  margin: 30px 0px;
  background-color: white;
  width: 600px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
`;

const SearchIcon = styled(MdSearch)`
  font-size: 25px;
  margin: 0px 20px;
  opacity: 0.5;
`;

const Input = styled.input`
  padding: 0;
  width: 500px;
  font-size: 14px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 14px;
  }
`;

const GoDirBtn = styled.button`
  margin-bottom: 30px;
  background-color: #f16b6c;
  width: 200px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  font-size: 18px;
  font-weight: 520;
`;

const Banner = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  margin-top: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 900px;
  background-color: white;
  box-shadow: 4px 4px 4px grey;
  font-size: 40px;
  font-weight: 520;
  justify-content: center;
  align-items: center;
  top: 120px;
`;

// 0616
// 검색 기능, 버튼
// 여행보관함 버튼
// 서비스 이용방법 만들기
// 반응형
// 코드 분할 리팩토링

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
            <InputContainer>
              <SearchIcon />
              <Input placeholder="이번엔 어디로 가볼까요?" />
              <button>검색</button>
            </InputContainer>
            <GoDirBtn>여행 보관함 가기</GoDirBtn>
            <Banner>배너</Banner>
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
