import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import Button from 'components/common/Button';

//리스트 전체
const PlanListContainer = styled.div`
  //display: flex;
  //flex-grow: 5;
  width: 80%;
  padding: 1%;
`;
const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
//상단
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 10px;
  margin-bottom: 20px;
`;
//정렬 용
const ItemsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
//아이콘 들어갈 자리
const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
//각 플랜 내 text
const TextDiv = styled.div`
  ${(props) =>
    props.op === 'title' ? 'font-size: 1.2rem' : 'margin: 0px 50px 0px 5px'};
`;
//플랜 개수
const PlanCountContainer = styled.div`
  text-align: center;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  width: 40px;
  margin-left: 20px;
`;
// 검색창, 컴포넌트 재활용 예정..
const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid black;
`;
// 정렬
const ComboDiv = styled.select`
  margin-left: 20px;
  width: 100px;
  height: 30px;
`;

const PlanList = ({
  mainPlans,
  trashPlans,
  userPlans,
  currentDirId,
  userDirs,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [plansList, setPL] = useState([]); // 플랜 컴포넌트 공통
  const [searchT, setSearchT] = useState('');
  const [resPlans, setRP] = useState([]); // 검색 및 정렬 통합용

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
    plansList,
  ]);

  const Searching = (e) => {
    setSearchT(e.toLowerCase());
    setRP(
      plansList.filter((p) => {
        return p.name.toLowerCase().includes(searchT);
      }),
    );
  };

  const SortPlans = (e) => {
    if (e.target.value === 'name') {
      setRP(
        plansList.sort((a, b) => {
          let n = a.name.toLowerCase();
          let m = b.name.toLowerCase();
          return n < m ? -1 : n === m ? 0 : 1;
        }),
      );
    }
    if (e.target.value === 'date') {
      setRP(
        plansList.sort((a, b) => {
          let n = a.createdDate.toLowerCase();
          let m = b.createdDate.toLowerCase();
          return n < m ? -1 : n === m ? 0 : 1;
        }),
      );
    }
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
                <IconDiv>All</IconDiv>
                <TextDiv op="title">모든 여행</TextDiv>
                <PlanCountContainer>
                  {mainPlans.mainDirectory ? mainPlans.mainDirectory.length : 0}
                </PlanCountContainer>
              </>
            ) : currentDirId === 't' ? (
              <>
                <IconDiv>Trash</IconDiv>
                <TextDiv op="title">휴지통</TextDiv>
                <PlanCountContainer>
                  {trashPlans.trashDirectory
                    ? trashPlans.trashDirectory.length
                    : 0}
                </PlanCountContainer>
              </>
            ) : (
              <>
                <IconDiv>dir</IconDiv>
                <TextDiv op="title">
                  {
                    userDirs.mainUserDirectory.find((dir) => {
                      return dir.userDirectoryId === currentDirId;
                    }).directoryName
                  }
                </TextDiv>
                <PlanCountContainer>
                  {userPlans ? userPlans.length : 0}
                </PlanCountContainer>
              </>
            )
          }
        </ItemsDiv>
        <ItemsDiv>
          <SearchBar
            onChange={(e) => {
              Searching(e.target.value);
            }}
            placeholder="Search"
          />
          <ComboDiv onChange={SortPlans}>
            <option value="none" hidden>
              내용
            </option>
            <option value="name">이름 순</option>
            <option value="date">생성일 순</option>
          </ComboDiv>
        </ItemsDiv>
      </TitleContainer>

      <TitleContainer>
        <ItemsDiv>
          <input type="checkbox" />
          <TextDiv>전체 선택</TextDiv>
          {isClicked && <TextDiv>n개 선택</TextDiv>}
          <ItemsDiv>
            <Button>복사</Button>
            <Button
              onClick={() => {
                onClickMove();
              }}
            >
              담기
            </Button>
            <Button>삭제</Button>
          </ItemsDiv>
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
                  />
                );
              })
          : plansList && // 0703 조건 수정
            plansList.map((item) => {
              return (
                <PlanLayout
                  key={item.planId}
                  planId={item.planId}
                  name={item.name}
                  periods={item.periods}
                  createdDate={item.createdDate}
                  userDirs={userDirs}
                />
              );
            })}
      </PlansContainer>
    </PlanListContainer>
  );
};

export default PlanList;
