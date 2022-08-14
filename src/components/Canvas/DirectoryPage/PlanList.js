import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import PlanPagination from '../common/PlanPagination';
import CustomCheckbox from 'lib/custom/CustomCheckbox';

//리스트 전체
const PlanListContainer = styled.div`
  position: relative;
  //width: 1080px;
  width: 80%;
  min-height: 85vh;
  padding: 25px;
  padding-bottom: 100px;
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

  const [page, setPage] = useState(1); // 현재 페이지
  const offset = (page - 1) * 10;

  useEffect(() => {
    //setSearchT('');
    //setRP([]);
    setPL(
      currentDirId === 'm'
        ? mainPlans.mainDirectory
        : currentDirId === 't'
        ? trashPlans.trashDirectory
        : [], //userPlans,
    );
  }, [
    currentDirId,
    mainPlans.mainDirectory,
    trashPlans.trashDirectory,
    //userPlans,
  ]);

  useEffect(() => {
    setRP(
      plansList &&
        plansList.filter((p) => {
          return p.name.toLowerCase().includes(searchT);
        }),
    );
  }, [searchT]);

  const onBlur = () => {
    setIsShow(false);
  };

  const Searching = (e) => {
    setSearchT(e.toLowerCase());
  };

  const SortPlans = (e) => {
    if (e === 'name') {
      setRP(
        plansList.sort((a, b) => {
          let n = a.name.toLowerCase();
          let m = b.name.toLowerCase();
          return n < m ? -1 : n === m ? 0 : 1;
        }),
      );
    }
    if (e === 'date') {
      setRP(
        plansList.sort((a, b) => {
          let n = a.createdDate.toLowerCase();
          let m = b.createdDate.toLowerCase();
          return n < m ? -1 : n === m ? 0 : 1;
        }),
      );
    }
    if (e === 'recent') {
      setRP(
        plansList.sort((a, b) => {
          let n = a.createdDate.toLowerCase();
          let m = b.createdDate.toLowerCase();
          return n < m ? 1 : n === m ? 0 : -1;
        }),
      );
    }
    setRP([]);
  };

  const CheckPlans = (e) => {
    const settingP = searchT !== '' ? resPlans : plansList;
    e
      ? setCheckedPlans(settingP && settingP.map((i) => i.planId))
      : setCheckedPlans([]);
  };

  const ConfirmText = (m, t) => {
    if (window.confirm(m)) {
      t ? deletePlan() : postTrash();
      setCheckedPlans([]);
      setIsShow(false);
    }
  };

  return (
    <>
      {mainPlans && trashPlans && userDirs && (
        <PlanListContainer>
          <TitleContainer>
            <ItemsDiv>
              {currentDirId === 'm' ? (
                <>
                  <TitleTextDiv>모든 여행</TitleTextDiv>
                  <PlanCountContainer>{mainPlans.planCount}</PlanCountContainer>
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
                    {
                      userDirs.planCount[
                        userDirs.mainUserDirectory.findIndex((dir) => {
                          return dir.userDirectoryId === currentDirId;
                        })
                      ]
                    }
                  </PlanCountContainer>
                </>
              )}
            </ItemsDiv>
            {currentDirId === 't' && (
              <AlertTextDiv>
                휴지통으로 이동한 템플릿은 30일 이후 자동으로 영구 삭제 됩니다.
              </AlertTextDiv>
            )}
          </TitleContainer>
          <TitleContainer>
            <ItemsDiv>
              <CustomCheckbox
                id="all"
                onChange={(e) => {
                  CheckPlans(e.target.checked);
                }}
                checked={
                  plansList &&
                  resPlans &&
                  checkedPlans &&
                  checkedPlans.length > 0 &&
                  (plansList.length || resPlans.length) === checkedPlans.length
                    ? true
                    : false
                }
              />
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
                      userDirs.mainUserDirectory.length > 0
                        ? setIsShow(true)
                        : alert(
                            '담을 보관함이 없습니다. 보관함을 먼저 생성해주세요.',
                          );
                    }}
                  >
                    <img
                      alt="add_folder"
                      src={
                        process.env.PUBLIC_URL + '/images/add_folder_ico.png'
                      }
                    />
                    담기
                    {isShow && (
                      <PlanPopUpContainer>
                        {userDirs &&
                          userDirs.mainUserDirectory.map((item) => {
                            return (
                              <PlanPopUp
                                key={item.userDirectoryId}
                                onClick={() => {
                                  postMovePlans(item.userDirectoryId);
                                  setIsShow(false);
                                  alert(
                                    `플랜이 ${item.directoryName}에 담겼습니다.`,
                                  );
                                }}
                              >
                                <img
                                  alt="folder"
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/images/folder_ico.png'
                                  }
                                />
                                {' ' + item.directoryName}
                              </PlanPopUp>
                            );
                          })}
                      </PlanPopUpContainer>
                    )}
                  </PlanBtn>
                  <PlanBtn
                    onClick={() => {
                      checkedPlans && checkedPlans.length > 0
                        ? ConfirmText(
                            '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                            0,
                          )
                        : alert('선택된 플랜이 없습니다.');
                    }}
                  >
                    <img
                      alt="delete"
                      src={process.env.PUBLIC_URL + '/images/delete_ico.png'}
                    />
                    삭제
                  </PlanBtn>
                </ItemsDiv>
              ) : currentDirId === 't' ? (
                <ItemsDiv>
                  <PlanBtn
                    onClick={() => {
                      checkedPlans && checkedPlans.length === 0
                        ? alert('선택된 플랜이 없습니다.')
                        : postRevert() &&
                          setIsShow(false) &&
                          alert("플랜을 '모든 여행'으로 복원했습니다.");
                    }}
                  >
                    <img
                      alt="restore"
                      src={process.env.PUBLIC_URL + '/images/restore_ico.png'}
                    />
                    복원
                  </PlanBtn>
                  <PlanBtn
                    onClick={() => {
                      checkedPlans && checkedPlans.length > 0
                        ? ConfirmText('플랜을 영구 삭제하시겠습니까?', 1)
                        : alert('선택된 플랜이 없습니다.');
                    }}
                  >
                    <img
                      alt="delete"
                      src={process.env.PUBLIC_URL + '/images/delete_ico.png'}
                    />
                    삭제
                  </PlanBtn>
                </ItemsDiv>
              ) : (
                <ItemsDiv>
                  <PlanBtn
                    onClick={() => {
                      checkedPlans && checkedPlans.length > 0
                        ? ConfirmText(
                            '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                            0,
                          )
                        : alert('선택된 플랜이 없습니다.');
                    }}
                  >
                    <img
                      alt="delete"
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
              <ComboDiv
                onChange={(e) => {
                  SortPlans(e.target.value);
                }}
              >
                <option value="recent">최신 순</option>
                <option value="date">생성일 순</option>
                <option value="name">이름 순</option>
              </ComboDiv>
            </ItemsDiv>
          </TitleContainer>
          <PlansContainer>
            {searchT !== ''
              ? resPlans && // 검색 후 정렬 적용을 위한 플랜 리스트
                resPlans.slice(offset, offset + 10).map((item) => {
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
              : plansList &&
                plansList.length > 0 &&
                plansList.slice(offset, offset + 10).map((item) => {
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
          <PlanPagination
            total={
              plansList && plansList.length > 0 && searchT === ''
                ? plansList.length
                : resPlans && resPlans.length > 0 && searchT !== ''
                ? resPlans.length
                : 1
            }
            page={page}
            itemCount={10}
            setPage={setPage}
            pageRange={5}
          />
        </PlanListContainer>
      )}
    </>
  );
};

export default PlanList;
