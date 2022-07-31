import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 좌측 바, 디렉터리 목록
// (새여행 버튼, 디렉터리 생성/삭제, 디렉터리 이름, 플랜갯수)
//리스트 전체
const DirListContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 2.08%;
  right: 78.47%;
  top: 8.18%;
  padding: 1.5%;
  background: #f6f6f8;
  border: 1px solid #ddddde;
  border-radius: 10px;
`;
// 새여행가기 버튼 Container
const NewPlanButtonContainer = styled.div`
  padding: 10px 20px 10px 20px;
  border-radius: 20px;
  text-align: center;
  background: #000000;
  cursor: pointer;
`;
const NewPlanButton = styled(Link)`
  text-decoration: none;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

//버튼 정렬 용
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.title ? 'margin-top: 20px;' : '')};
  ${(props) => (props.change ? 'justify-content: left;' : '')};
`;
// text
const DirTextDiv = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`;
//각 디렉토리 네모박스
const DirContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  background: #ffffff;
  ${(props) => (props.ck ? 'border: 2px solid #f87676;' : '')};
  border-radius: 10px;
  margin-top: 15px;

  /*display: flex;
  //background: white;
  align-items: center;
  justify-content: space-between;
  border: 2px ${(props) => (props.new ? 'dashed' : 'solid')} lightgray;
  ${(props) =>
    props.ck ? 'background: lightgray;' : 'background: white; cursor: pointer'};
  margin-bottom: 15px;
  padding: 5px 20px 5px 10px;
  height: 70px;
  width: 100%;
  font-size: 1.2rem;
  &:hover {
    ${(props) => (props.new ? '' : 'background: lightgray;')}
  }*/
`;
// 생성 버튼
const IconDiv = styled.div`
  display: flex;
  align-items: center;
  background: #eaeaea;
  border-radius: 20px;

  padding: 10px 20px 10px 20px;
  /*display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 40px;
  height: 40px;
  margin-right: ${(props) => (props.side ? '10px' : '')};
  border: none;*/
`;
//디렉터리 아이콘 들어갈 자리
const BaseIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 33.5px;
  width: 33.5px;
  margin-right: 10px;

  border: 1.5px solid #000000;
  border-radius: 100%;
`;
//플랜 개수
const PlanCountContainer = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #000000;
`;

//디렉토리 생성 input
const CreateInput = styled.input`
  //border: 1px solid #000000;
  border-radius: 5px;
  width: ${(props) => (props.c ? '80%' : '70%')};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  background: none;
  margin: 0px;
`;
// 더보기 버튼
const MoreDiv = styled.div`
  padding-left: 10px;
  padding-top: 2.5px;
  z-index: 50;
  cursor: pointer;
`;
// 더보기 container
const DirPopUpContainer = styled.ul`
  position: absolute;
  width: 81px;
  background: #e5e7e8;
  border-radius: 10px;
  list-style: none;
  margin: 0px;
  padding: 10px;
`;
// 더보기 내용
const DirPopUp = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.bottomBtn ? '' : 'margin-bottom: 5px;')};

  width: 61px;
  height: 34px;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
  decoration: none;
  text-align: center;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const DirectoryList = ({
  mainPlans,
  trashPlans,
  userDirs,
  userPlans,
  currentDirId,
  createUserDir,
  changeDirName,
  setCurrentDir,
  setCreateUserDir,
  setDirName,
  setUserDirs,
  postCreateDir,
  postChangeDirName,
  postDeleteDir,
}) => {
  const [createDir, setCreateDir] = useState(false); // 디렉터리 생성 show
  const [chName, setChName] = useState(false); // 이름 변경용
  const [moreBtn, setMoreBtn] = useState(false); // 더보기 버튼
  const outRef = useRef(null);

  useEffect(() => {
    typeof currentDirId === 'number' && console.log(currentDirId);
  }, [currentDirId]);

  useEffect(() => {
    document.addEventListener('mousedown', onClickMore);
    return () => {
      document.removeEventListener('mousedown', onClickMore);
    };
  });

  const onBlurDir = () => {
    // 디렉터리 생성 완료 시
    if (createUserDir !== '' && createDir) {
      postCreateDir();
      window.location.reload();
    } else if (changeDirName !== '' && chName) {
      postChangeDirName();
      //window.location.reload();
    } else {
      setCreateDir(false);
      setChName(false);
    }
  };

  const onChangeDirName = (e, c) => {
    // 디렉터리 이름 변경
    if (c) {
      // 새로운 디렉터리 생성 시
      setCreateUserDir(e);
    } else {
      // 디렉터리 변경
      setDirName(e);
    }
  };

  const onClickDeleteDir = (id) => {
    // 디렉터리 삭제
    console.log('deleteDir');
    //setDeleteUserDir(id), postDeleteDir()?
  };

  const onClickMore = (e) => {
    if (outRef.current && !outRef.current.contains(e.target)) {
      setMoreBtn(!moreBtn);
    }
  };

  return (
    <DirListContainer>
      <>
        <NewPlanButtonContainer>
          <NewPlanButton to={process.env.PUBLIC_URL + `/canvas/setting`}>
            새로운 여행 만들기 +
          </NewPlanButton>
        </NewPlanButtonContainer>
        <ButtonsDiv title="true">
          <DirTextDiv>내 여행</DirTextDiv>
          <ButtonsDiv>
            <IconDiv
              onClick={() => {
                setCreateDir(true);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/images/add_new_folder_ico.png'}
              />
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
                <BaseIconDiv>
                  <img
                    src={process.env.PUBLIC_URL + '/images/folders_ico.png'}
                  />
                </BaseIconDiv>
                <DirTextDiv>모든 여행</DirTextDiv>
              </ButtonsDiv>
              <PlanCountContainer>
                {mainPlans.planCount ? mainPlans.planCount : 0}
              </PlanCountContainer>
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
                  <ButtonsDiv change="true">
                    <BaseIconDiv>
                      <img
                        src={process.env.PUBLIC_URL + '/images/folder_ico.png'}
                      />
                    </BaseIconDiv>
                    {chName && currentDirId === item.userDirectoryId ? (
                      //<ButtonsDiv>
                      <CreateInput
                        value={changeDirName}
                        onChange={(e) => {
                          onChangeDirName(e.target.value, !chName);
                        }}
                        onBlur={() => {
                          onBlurDir();
                        }}
                      />
                    ) : (
                      item.directoryName
                    )}
                  </ButtonsDiv>
                  <ButtonsDiv>
                    <PlanCountContainer>
                      {
                        userPlans ? userPlans.length : 0
                        /*userDirs.planCount ? userDirs.planCount[index] : 0*/
                      }
                    </PlanCountContainer>
                    <MoreDiv
                      onClick={() => {
                        setMoreBtn(!moreBtn);
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/images/more_ico.png'}
                      />
                      {moreBtn && currentDirId === item.userDirectoryId && (
                        <DirPopUpContainer ref={outRef}>
                          <DirPopUp
                            onClick={() => {
                              setChName(!chName);
                              currentDirId === item.userDirectoryId &&
                                setDirName(
                                  userDirs.mainUserDirectory &&
                                    userDirs.mainUserDirectory.find(
                                      (i) => i.userDirectoryId === currentDirId,
                                    ).directoryName,
                                );
                            }}
                          >
                            수정
                          </DirPopUp>
                          <DirPopUp
                            bottomBtn="true"
                            onClick={() => {
                              postDeleteDir();
                              window.location.reload();
                            }}
                          >
                            삭제
                          </DirPopUp>
                        </DirPopUpContainer>
                      )}
                    </MoreDiv>
                  </ButtonsDiv>
                </DirContainer>
              );
            })}
          {createDir && !chName && (
            <DirContainer
              new
              onBlur={() => {
                //제목 입력 후 다른 곳 클릭 시
                onBlurDir(); // dir 이름 입력 있으면 post, 없으면 없어지게: input창 의존 ..
              }}
            >
              <ButtonsDiv>
                <BaseIconDiv>
                  <img
                    src={process.env.PUBLIC_URL + '/images/folder_ico.png'}
                  />
                </BaseIconDiv>
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
                <BaseIconDiv>
                  <img src={process.env.PUBLIC_URL + '/images/trash_ico.png'} />
                </BaseIconDiv>
                <DirTextDiv>휴지통</DirTextDiv>
              </ButtonsDiv>
              <ButtonsDiv>
                <PlanCountContainer>
                  {trashPlans.trashPlanCount ? trashPlans.trashPlanCount : 0}
                </PlanCountContainer>
              </ButtonsDiv>
            </DirContainer>
          }
        </div>
      </>
    </DirListContainer>
  );
};

export default DirectoryList;
