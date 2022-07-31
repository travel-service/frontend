import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import PlanPagination from '../common/PlanPagination';

//리스트 전체
const PlanListContainer = styled.div`
  position: absolute;
  left: 22.92%;
  right: 2.08%;
  top: 8.18%;
  bottom: 2.52%;
  padding: 25px;

  background: #ffffff;
  border-radius: 10px;

  font-family: 'Pretendard';
  font-style: normal;
`;
const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
//상단
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const PlanBtn = styled.button`
  box-sizing: border-box;
  padding: 15px;
  width: 85px;
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
  /*&:hover {
    background: #000000;
    color: #ffffff;
  }*/
`;
//정렬 용
const ItemsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
//각 플랜 내 text
const TitleTextDiv = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
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
const DirPopUpContainer = styled.ul`
  position: absolute;
  width: 81px;
  background: #e5e7e8;
  border-radius: 10px;
  list-style: none;
  margin: 0px;
  padding: 10px;
  z-index: 50;
`;
// 담기 내용
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

const PlanList = ({
  mainPlans,
  trashPlans,
  userPlans,
  currentDirId,
  userDirs,
  checkedPlans,
  setCheckedPlans,
  postTrash,
  //controlPlans,
  //setCancel,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [plansList, setPL] = useState([]); // 플랜 컴포넌트 공통
  const [searchT, setSearchT] = useState('');
  const [resPlans, setRP] = useState([]); // 검색 및 정렬 통합용

  const [page, setPage] = useState(2); // 현재 페이지
  const offset = (page - 1) * 12;

  const onClickMove = () => {
    setIsShow(!isShow);
    console.log('담기');
  };

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
    /*if (e.target.value === 'recent') {
      setRP(
        plansList &&
          plansList.sort((a, b) => {
            let n = a.createdDate.toLowerCase();
            let m = b.createdDate.toLowerCase();
            return n < m ? 1 : n === m ? 0 : -1;
          }),
      );
    }*/
    setRP([]);
  };

  return (
    <PlanListContainer>
      <TitleContainer>
        <ItemsDiv>
          {
            /*해당 디렉토리 제목, 아이콘, 갯수 변경*/
            currentDirId === 'm' ? (
              <>
                <TitleTextDiv>모든 여행</TitleTextDiv>
                <PlanCountContainer>
                  {mainPlans.planCount ? mainPlans.planCount : 0}
                </PlanCountContainer>
              </>
            ) : currentDirId === 't' ? (
              <>
                <TitleTextDiv>휴지통</TitleTextDiv>
                <PlanCountContainer>
                  {trashPlans.trashPlanCount ? trashPlans.trashPlanCount : 0}
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
      </TitleContainer>
      <TitleContainer>
        <ItemsDiv>
          <label>
            <input type="checkbox" />
          </label>
          <CheckTextDiv>전체 선택</CheckTextDiv>
          {checkedPlans.length > 0 && (
            <CheckTextDiv nums="true">
              {checkedPlans.length ? checkedPlans.length : 0}개 선택 중
            </CheckTextDiv>
          )}
          <ItemsDiv>
            <PlanBtn>
              <img src={process.env.PUBLIC_URL + '/images/copy_ico.png'} />
              복사
            </PlanBtn>
            <PlanBtn
              onClick={() => {
                onClickMove();
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/images/add_folder_ico.png'}
              />
              담기
              {isShow && (
                <DirPopUpContainer>
                  {
                    (userDirs
                      ? userDirs.mainUserDirectory.map((item) => {
                          return (
                            <DirPopUp key={item.userDirectoryId}>
                              {item.directoryName}
                            </DirPopUp>
                          );
                        })
                      : alert('담을 보관함이 존재하지 않습니다.'),
                    setIsShow(!isShow))
                  }
                </DirPopUpContainer>
              )}
            </PlanBtn>
            <PlanBtn
              onClick={() => {
                setCheckedPlans([3]);
                postTrash();
              }}
            >
              <img src={process.env.PUBLIC_URL + '/images/delete_ico.png'} />
              삭제
            </PlanBtn>
          </ItemsDiv>
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
  );
};

export default PlanList;
