import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import PlanPagination from '../common/PlanPagination';

//리스트 전체
const PlanListContainer = styled.div`
  position: relative;
  //width: 1080px;
  width: 80%;
  min-height: 85vh;
  padding: 25px;

  background: #ffffff;
  border-radius: 10px;
`;
const PlansContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(246px, auto));
  gap: 30px;
`;
//상단
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
// 상단 플랜 삭제/복사/담기 버튼
const PlanBtn = styled.button`
  box-sizing: border-box;
  padding: 15px;
  min-width: 85px;
  height: 46px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  cursor: pointer;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
  margin-left: 10px;
`;
//정렬 용
const ItemsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
//각 플랜 내 text
const TitleTextDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #000000;
`;
//플랜 개수
const PlanCountContainer = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;

  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #000000;
  margin-left: 9px;
`;
const AlertTextDiv = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  color: #000000;
`;
// 검색창
const SearchBar = styled.input`
  background: #ededef;
  border: none;
  border-radius: 5px;
  width: 200px;
  height: 46px;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  padding: 15px;
`;
// 정렬
const ComboDiv = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  margin-left: 10px;
  width: 120px;
  height: 46px;
  padding: 15px;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  background: url('../images/down_arrow_ico.png') no-repeat 85% 53%/15px auto;
`;
const CheckTextDiv = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  ${(props) =>
    props.nums ? 'color: #F75D5D;' : 'color: #000000; margin-left: 5px;'}
  margin-right: 10px;
`;
// 담기 container
const PlanPopUpContainer = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  min-width: 148px;
  margin-top: 170px;
  margin-left: 60px;
  z-index: 1;
`;
// 담기 내용
const PlanPopUp = styled.li`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  text-align: left;

  decoration: none;
  padding: 10px 15px 10px 15px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const PlanList = ({
  mainPlans,
  trashPlans,
  userPlans,
  currentDirId,
  userDirs,
  checkedPlans,
  setCheckedPlans,
  postTrash,
  postMovePlans,
  postRevert,
  deletePlan,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [plansList, setPL] = useState([]); // 플랜 컴포넌트 공통
  const [searchT, setSearchT] = useState('');
  const [resPlans, setRP] = useState([]); // 검색 및 정렬 통합용

  const [page, setPage] = useState(2); // 현재 페이지
  const offset = (page - 1) * 12;

  useEffect(() => {
    currentDirId === 'm'
      ? setPL(mainPlans.mainDirectory)
      : currentDirId === 't'
      ? setPL(trashPlans.trashDirectory)
      : setPL(userPlans);
  }, [
    currentDirId,
    mainPlans.mainDirectory,
    trashPlans.trashDirectory,
    userPlans,
    //checkedPlans,
    plansList,
  ]);

  const onBlur = () => {
    setIsShow(false);
  };

  const Searching = (e) => {
    setSearchT(e.toLowerCase());
    setRP(
      plansList &&
        plansList.filter((p) => {
          return p.name.toLowerCase().includes(searchT);
        }),
    );
  };

  const SortPlans = (e) => {
    if (e.target.value === 'name') {
      setRP(
        plansList &&
          plansList.sort((a, b) => {
            let n = a.name.toLowerCase();
            let m = b.name.toLowerCase();
            return n < m ? -1 : n === m ? 0 : 1;
          }),
      );
    }
    if (e.target.value === 'date') {
      setRP(
        plansList &&
          plansList.sort((a, b) => {
            let n = a.createdDate.toLowerCase();
            let m = b.createdDate.toLowerCase();
            return n < m ? -1 : n === m ? 0 : 1;
          }),
      );
    }
    if (e.target.value === 'recent') {
      setRP(
        plansList &&
          plansList.sort((a, b) => {
            let n = a.createdDate.toLowerCase();
            let m = b.createdDate.toLowerCase();
            return n < m ? 1 : n === m ? 0 : -1;
          }),
      );
    }
    setRP([]);
  };

  return (
    <>
      {mainPlans && trashPlans && userDirs && (
        <PlanListContainer>
          <TitleContainer>
            <ItemsDiv>
              {
                /*해당 디렉토리 제목, 아이콘, 갯수 변경*/
                currentDirId === 'm' ? (
                  <>
                    <TitleTextDiv>모든 여행</TitleTextDiv>
                    <PlanCountContainer>
                      {mainPlans.planCount}
                    </PlanCountContainer>
                  </>
                ) : currentDirId === 't' ? (
                  <>
                    <TitleTextDiv>휴지통</TitleTextDiv>
                    <PlanCountContainer>
                      {trashPlans.trashPlanCount}
                    </PlanCountContainer>
                  </>
                ) : (
                  <>
                    <TitleTextDiv>
                      {
                        userDirs.mainUserDirectory.find((dir) => {
                          return dir.userDirectoryId === currentDirId;
                        }).directoryName
                      }
                    </TitleTextDiv>
                    <PlanCountContainer>
                      {userPlans ? userPlans.length : 0}
                    </PlanCountContainer>
                  </>
                )
              }
            </ItemsDiv>
            {currentDirId === 't' && (
              <AlertTextDiv>
                휴지통으로 이동한 템플릿은 30일 이후 자동으로 영구 삭제 됩니다.
              </AlertTextDiv>
            )}
          </TitleContainer>
          <TitleContainer>
            <ItemsDiv>
              <label>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.target.checked
                      ? setCheckedPlans(
                          plansList &&
                            plansList.filter((i) =>
                              i.name.toLowerCase().includes(searchT)
                                ? i.planId
                                : '',
                            ),
                        )
                      : setCheckedPlans([]);
                  }}
                />
              </label>
              <CheckTextDiv>전체 선택</CheckTextDiv>
              {checkedPlans && checkedPlans.length > 0 && (
                <CheckTextDiv nums="true">
                  {checkedPlans.length}개 선택 중
                </CheckTextDiv>
              )}
              {currentDirId === 'm' ? (
                <ItemsDiv
                  onBlur={() => {
                    onBlur();
                  }}
                >
                  <PlanBtn
                    onClick={() => {
                      console.log('복사');
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/images/copy_ico.png'}
                    />
                    복사
                  </PlanBtn>
                  <PlanBtn
                    onClick={() => {
                      setIsShow(true);
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/add_folder_ico.png'
                      }
                    />
                    담기
                    {isShow && (
                      <PlanPopUpContainer>
                        {userDirs
                          ? userDirs.mainUserDirectory.map((item) => {
                              return (
                                <PlanPopUp
                                  key={item.userDirectoryId}
                                  onClick={() => {
                                    postMovePlans(item.userDirectoryId);
                                    setIsShow(false);
                                  }}
                                >
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/images/folder_ico.png'
                                    }
                                  />
                                  {' ' + item.directoryName}
                                </PlanPopUp>
                              );
                            })
                          : alert('보관함을 먼저 생성해주세요.')}
                      </PlanPopUpContainer>
                    )}
                  </PlanBtn>
                  <PlanBtn
                    onClick={() => {
                      postTrash();
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/images/delete_ico.png'}
                    />
                    삭제
                  </PlanBtn>
                </ItemsDiv>
              ) : currentDirId === 't' ? (
                <ItemsDiv>
                  <PlanBtn
                    onClick={() => {
                      postRevert();
                      console.log('복원');
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/images/restore_ico.png'}
                    />
                    복원
                  </PlanBtn>
                  <PlanBtn
                    onClick={() => {
                      console.log('영구 삭제');
                      // modal 알림창 추가, 확인 누르면 delete
                      deletePlan();
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/images/delete_ico.png'}
                    />
                    삭제
                  </PlanBtn>
                </ItemsDiv>
              ) : (
                <ItemsDiv>
                  <PlanBtn
                    onClick={() => {
                      console.log('삭제');
                      postTrash();
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/images/delete_ico.png'}
                    />
                    삭제
                  </PlanBtn>
                </ItemsDiv>
              )}
            </ItemsDiv>
            <ItemsDiv>
              <SearchBar
                onChange={(e) => {
                  Searching(e.target.value);
                }}
                placeholder="여행 제목으로 검색"
              />
              <ComboDiv onChange={SortPlans}>
                <option value="recent">최신 순</option>
                <option value="date">생성일 순</option>
                <option value="name">이름 순</option>
              </ComboDiv>
            </ItemsDiv>
          </TitleContainer>
          <PlansContainer>
            {resPlans !== [] && searchT !== ''
              ? resPlans && // 검색 후 정렬 적용을 위한 플랜 리스트
                plansList
                  .filter((p) => {
                    return p.name.toLowerCase().includes(searchT);
                  })
                  .map((item) => {
                    return (
                      <PlanLayout
                        key={item.planId}
                        planId={item.planId}
                        name={item.name}
                        periods={item.periods}
                        createdDate={item.createdDate}
                        userDirs={userDirs}
                        checkedPlans={checkedPlans}
                        setCheckedPlans={setCheckedPlans}
                        postMovePlans={postMovePlans}
                        postTrash={postTrash}
                        postRevert={postRevert}
                        currentDirId={currentDirId}
                        deletePlan={deletePlan}
                      />
                    );
                  })
              : plansList && // 0703 조건 수정
                /*slice(offset, offset + 12).*/
                plansList.map((item) => {
                  return (
                    <PlanLayout
                      key={item.planId}
                      planId={item.planId}
                      name={item.name}
                      periods={item.periods}
                      createdDate={item.createdDate}
                      userDirs={userDirs}
                      checkedPlans={checkedPlans}
                      setCheckedPlans={setCheckedPlans}
                      postMovePlans={postMovePlans}
                      postTrash={postTrash}
                      postRevert={postRevert}
                      currentDirId={currentDirId}
                      deletePlan={deletePlan}
                    />
                  );
                })}
          </PlansContainer>
          {/*<PlanPagination
        total={mainPlans.planCount ? mainPlans.planCount : 1}
        page={page}
        setPage={setPage}
      />*/}
        </PlanListContainer>
      )}
    </>
  );
};

export default PlanList;
