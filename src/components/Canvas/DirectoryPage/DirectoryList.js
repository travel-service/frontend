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
  margin-right: ${(props) => (props.side ? '10px' : '')};
  border: none;
  ${(props) =>
    props.dis
      ? ''
      : 'cursor: pointer; &:hover {border: 2px solid black; background: lightgray;}'}
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
  width: ${(props) => (props.c ? '80%' : '70%')};
  font-size: 1.2rem;
  background: none;
  margin: 0px;
  padding: 0px;
`;

const DirectoryList = () => {
  const {
    mainPlans,
    trashPlans,
    userDirs,
    currentDirId,
    createUserDir,
    currentCheckedDir,
    changeDirName,
    setCurrentCheckedDir,
    setCurrentDir,
    setCreateUserDir,
    getUserPlans,
    postCreateDir,
    postDeleteDir,
    postChangeDirName,
    setDirName,
  } = dirStore();
  const { getMainPlans, getUserDirs, getTrashPlans } = dirStore();

  const [createDir, setCreateDir] = useState(false); // 디렉터리 생성 show
  const [showChecked, setShowChecked] = useState(false); // 디렉터리 선택 확인용
  const [chName, setChName] = useState(false); // 이름 변경용
  const [chDir, setChDir] = useState([]);

  useEffect(() => {
    if (typeof currentDirId === 'number') {
      getUserPlans(currentDirId);
    } else {
      console.log('no userPlans');
    }
  }, [currentDirId]);

  const onBlurDir = () => {
    // 디렉터리 생성 완료 시
    createUserDir !== '' ? postCreateDir() : setCreateDir(!createDir);
  };

  const onChangeDirName = (e, c) => {
    // 디렉터리 이름 변경
    if (c) {
      // 새로운 디렉터리 생성 시
      setCreateUserDir(e);
    } else {
      // 디렉터리 변경
      setDirName(e);
      //postChangeDirName(e);
    }
  };

  const onCheckedDir = (checked, i) => {
    // 선택된 디렉터리 배열
    console.log(currentCheckedDir);
    if (checked) {
      setChDir([...chDir, i]);
    } else if (!checked) {
      setChDir(chDir.filter((el) => el !== i));
    }
    setCurrentCheckedDir(chDir);
  };

  const onClickDeleteDir = () => {
    // 디렉터리 삭제
    console.log('deleteDir');
    //setDeleteUserDir(id), postDeleteDir()?
  };

  return (
    <DirListContainer>
      <>
        <Button
          /*fullWidth cyan*/ to={process.env.PUBLIC_URL + `/canvas/setting`}
        >
          새로운 여행 만들기
        </Button>
        <ButtonsDiv>
          <DirTextDiv>내 여행</DirTextDiv>
          <ButtonsDiv>
            <IconDiv
              side={true}
              onClick={() => {
                setCreateDir(true);
              }}
              onBlur={() => {
                //제목 입력 후 다른 곳 클릭 시
                onBlurDir(); // dir 이름 입력 있으면 post, 없으면 없어지게: input창 의존 ..
              }}
            >
              생성
            </IconDiv>
            {/*삭제, 수정 버튼 아예 안보이게?*/}
            <IconDiv
              dis={typeof currentDirId === 'string' ? true : false}
              disabled={typeof currentDirId === 'string' ? true : false}
              side
            >
              삭제
            </IconDiv>
            <IconDiv
              dis={typeof currentDirId === 'string' ? true : false}
              disabled={typeof currentDirId === 'string' ? true : false}
              onClick={() => {
                if (chName) {
                  console.log('이름 변경 post');
                  //postChangeDirName();
                } else {
                  setDirName(
                    userDirs &&
                      userDirs.mainUserDirectory.find(
                        (i) => i.userDirectoryId === currentDirId,
                      ).directoryName,
                  );
                }
                setChName(!chName);
              }}
            >
              {chName ? '저장' : '수정'}
            </IconDiv>
          </ButtonsDiv>
        </ButtonsDiv>
        <div>
          {
            <DirContainer
              ck={currentDirId === 'm' ? true : false}
              onClick={() => {
                setCurrentDir('m');
              }}
            >
              <ButtonsDiv>
                <BaseIconDiv>All</BaseIconDiv>
                모든 여행
              </ButtonsDiv>
              <PlanCountContainer>{mainPlans.planCount}</PlanCountContainer>
            </DirContainer>
          }
          {userDirs.mainUserDirectory &&
            userDirs.mainUserDirectory.map((item, index) => {
              return (
                <DirContainer
                  key={item.userDirectoryId}
                  ck={currentDirId === item.userDirectoryId ? true : false}
                  onClick={() => {
                    setCurrentDir(item.userDirectoryId);
                  }}
                >
                  <ButtonsDiv>
                    <IconDiv side>dir</IconDiv>
                    {chName && currentDirId === item.userDirectoryId ? (
                      <ButtonsDiv>
                        <CreateInput
                          value={changeDirName}
                          onChange={(e) => {
                            onChangeDirName(e.target.value);
                          }}
                        />
                      </ButtonsDiv>
                    ) : (
                      item.directoryName
                    )}
                  </ButtonsDiv>
                  <PlanCountContainer>
                    {userDirs.planCount[index]}
                  </PlanCountContainer>
                </DirContainer>
              );
            })}
          {createDir && (
            <DirContainer
              new
              onBlur={() => {
                //제목 입력 후 다른 곳 클릭 시
                onBlurDir(); // dir 이름 입력 있으면 post, 없으면 없어지게: input창 의존 ..
              }}
            >
              <ButtonsDiv>
                <IconDiv side dis>
                  +
                </IconDiv>
                <CreateInput
                  c
                  placeholder="새 여행 보관함"
                  onChange={(e) => {
                    onChangeDirName(e.target.value, true);
                  }}
                />
              </ButtonsDiv>
            </DirContainer>
          )}
          {
            <DirContainer
              ck={currentDirId === 't' ? true : false}
              onClick={() => {
                setCurrentDir('t');
              }}
            >
              <ButtonsDiv>
                <BaseIconDiv>Trash</BaseIconDiv>
                휴지통
              </ButtonsDiv>
              <PlanCountContainer>
                {trashPlans.trashPlanCount}
              </PlanCountContainer>
            </DirContainer>
          }
        </div>
      </>
    </DirListContainer>
  );
};

export default DirectoryList;
