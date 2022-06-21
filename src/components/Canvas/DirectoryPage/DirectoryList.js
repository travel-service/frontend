import React, { useState, useEffect } from 'react';
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
// 내여행 text
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
  border: 2px ${(props) => (props.new ? 'dashed' : 'solid')} lightgray;
  ${(props) =>
    props.ck ? 'background: lightgray;' : 'background: none; cursor: pointer'};
  margin-bottom: 20px;
  padding: 5px 20px 5px 10px;
  height: 70px;
  width: 100%;
  font-size: 1.2rem;
  &:hover {
    ${(props) => (props.new ? '' : 'background: lightgray;')}
  }
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
  border: none;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
    background: lightgray;
  }
`;
//기본 아이콘 들어갈 자리
const BaseIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
//디렉토리 생성 input
const CreateInput = styled.input`
  border: none;
  width: 80%;
  font-size: 1.2rem;
`;

const DirectoryList = () => {
  const {
    mainPlans,
    trashPlans,
    userDirs,
    userPlans,
    currentDirId,
    createUserDir,
    setCurrentDir,
    setCreateUserDir,
    getUserPlans,
    postCreateDir,
  } = dirStore();
  const [cD, setCD] = useState(false); // 디렉터리 생성 show

  useEffect(() => {
    getUserPlans();
  }, []);

  const onClickSetDir = (id) => {
    setCurrentDir(id);
  };

  const onBlurDir = () => {
    console.log(cD);
    createUserDir !== '' ? postCreateDir() : setCD(!cD);
    console.log(cD);
  };

  const onChangeDirName = (e) => {
    setCreateUserDir(e);
    console.log(createUserDir);
  };

  return (
    <DirListContainer>
      <Button fullWidth={true} cyan={true}>
        새로운 여행 만들기
      </Button>
      <ButtonsDiv>
        <DirTextDiv>내 여행</DirTextDiv>
        <ButtonsDiv>
          <IconDiv
            onClick={() => {
              setCD(true);
            }}
          >
            생성
          </IconDiv>
          <IconDiv>삭제</IconDiv>
        </ButtonsDiv>
      </ButtonsDiv>
      <div>
        <DirContainer
          ck={currentDirId === 'main' ? true : false}
          onClick={() => {
            onClickSetDir('main');
          }}
        >
          <ButtonsDiv>
            <BaseIconDiv>All</BaseIconDiv>
            모든 여행
          </ButtonsDiv>
          <PlanCountContainer>{mainPlans.length}</PlanCountContainer>
        </DirContainer>
        {userDirs.map((item) => {
          //console.log(userPlans.plans.length); test 데이터 구조 바꾸기
          return (
            <DirContainer
              key={item.userDirectoryId}
              ck={currentDirId === item.userDirectoryId ? true : false}
              onClick={() => {
                onClickSetDir(item.userDirectoryId);
              }}
            >
              <ButtonsDiv>
                <IconDiv>dir</IconDiv>
                {item.directoryName}
              </ButtonsDiv>
              <PlanCountContainer>
                {
                  // 여기도 코드 정리필요
                  userPlans.find((plan) => {
                    return plan.id === item.userDirectoryId;
                  }).plans.length
                }
              </PlanCountContainer>
            </DirContainer>
          );
        })}
        {cD && (
          <DirContainer new={true}>
            <ButtonsDiv>
              <IconDiv>dir</IconDiv>
              <CreateInput
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  onChangeDirName(e.target.value);
                }}
                onBlur={() => {
                  //제목 입력 후 다른 곳 클릭 시
                  onBlurDir(); // dir 이름 입력 있으면 post, 없으면 없어지게
                }}
              />
            </ButtonsDiv>
          </DirContainer>
        )}
        <DirContainer
          ck={currentDirId === 'trash' ? true : false}
          onClick={() => {
            onClickSetDir('trash');
          }}
        >
          <ButtonsDiv>
            <BaseIconDiv>Trash</BaseIconDiv>
            휴지통
          </ButtonsDiv>
          <PlanCountContainer>{trashPlans.length}</PlanCountContainer>
        </DirContainer>
      </div>
    </DirListContainer>
  );
};

export default DirectoryList;
