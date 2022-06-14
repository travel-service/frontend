import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { dirStore } from 'lib/dirStore';

// 좌측 바, 디렉터리 목록
// (새여행 버튼, 디렉터리 생성/삭제, 디렉터리 이름, 플랜갯수)
//리스트 전체
const DirListContainer = styled.div`
  border-right: 2px solid black;
  //flex-grow: 1;
  width: 20%;
  padding: 1%;
`;
//버튼 정렬 용
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;
//각 디렉토리 내 text
const DirTextDiv = styled.div`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 2px solid black;
  font-size: 1.2rem;
`;
//각 디렉토리 네모박스
const DirContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid lightgray;
  background: none;
  margin-bottom: 20px;
  padding: 5px 20px 5px 10px;
  height: 70px;
  width: 100%;
  font-size: 1.2rem;
  &:hover {
    background: lightgray;
  }
  cursor: pointer;
`;
//아이콘 들어갈 자리
const IconDiv = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
`;
//플랜 개수
const PlanCountContainer = styled.div`
  text-align: center;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  width: 40px;
  background: white;
`;

const DirectoryList = () => {
  const { mainPlans, trashPlans, userDirs, userPlans, getUserPlans } =
    dirStore();

  useEffect(() => {
    getUserPlans(81);
  }, []);

  return (
    <DirListContainer>
      <Button>새로운 여행 만들기</Button>
      <ButtonsDiv>
        <DirTextDiv>내 여행</DirTextDiv>
        <ButtonsDiv>
          <IconDiv>생성</IconDiv>
          <IconDiv>삭제</IconDiv>
        </ButtonsDiv>
      </ButtonsDiv>
      <div>
        <DirContainer>
          <ButtonsDiv>
            <IconDiv>All</IconDiv>
            모든 여행
          </ButtonsDiv>
          <PlanCountContainer>{mainPlans.length}</PlanCountContainer>
        </DirContainer>
        {userDirs.map((item) => {
          return (
            <DirContainer key={item.id}>
              <ButtonsDiv>
                <IconDiv>dir</IconDiv>
                {item.directoryName}
              </ButtonsDiv>
              <PlanCountContainer key={item.id}>
                {userPlans.length}
              </PlanCountContainer>
            </DirContainer>
          );
        })}
        <DirContainer>
          <ButtonsDiv>
            <IconDiv>Trash</IconDiv>
            휴지통
          </ButtonsDiv>
          <PlanCountContainer>{trashPlans.length}</PlanCountContainer>
        </DirContainer>
      </div>
    </DirListContainer>
  );
};

export default DirectoryList;
