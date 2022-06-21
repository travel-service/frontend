import React, { useState } from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import Button from 'components/common/Button';
import { dirStore } from 'lib/dirStore';

// 디렉토리 클릭 시 플랜목록 div만 갈아끼워지게 하려고 만든 컴포넌트,, 고민 중
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
  //justify-content: space-between;
  //align-items: center;
  /*display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 25px;
  align-items: center;
  justify-items: center;
  z-index: 0;*/
`;
//상단
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background: yellow;
  padding: 5px 20px 5px 10px;
  margin-bottom: 20px;
`;
//정렬 용
const ItemsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  //margin-bottom: 20px;
  //margin-top: 20px;
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
const SearchBar = styled.div`
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

const PlanList = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { mainPlans, trashPlans, userPlans, currentDirId, userDirs } =
    dirStore();
  const [isShow, setIsShow] = useState(false);

  const onClickMove = () => {
    setIsShow(!isShow);
    console.log('담기');
  };

  //console.log(mainPlans);
  return (
    <PlanListContainer>
      <TitleContainer>
        <ItemsDiv>
          {
            /*해당 디렉토리 제목, 아이콘, 갯수 변경*/
            currentDirId === 'main' ? (
              <>
                <IconDiv>All</IconDiv>
                <TextDiv op="title">모든 여행</TextDiv>
                <PlanCountContainer>{mainPlans.length}</PlanCountContainer>
              </>
            ) : currentDirId === 'trash' ? (
              <>
                <IconDiv>Trash</IconDiv>
                <TextDiv op="title">휴지통</TextDiv>
                <PlanCountContainer>{trashPlans.length}</PlanCountContainer>
              </>
            ) : (
              <>
                <IconDiv>dir</IconDiv>
                <TextDiv op="title">
                  {
                    userDirs.find((dir) => {
                      return dir.userDirectoryId === currentDirId;
                    }).directoryName
                  }
                </TextDiv>
                <PlanCountContainer>
                  {
                    userPlans.find((plan) => {
                      return plan.id === currentDirId;
                    }).plans.length
                  }
                </PlanCountContainer>
              </>
            )
          }
        </ItemsDiv>
        <ItemsDiv>
          <SearchBar>검색</SearchBar>
          <ComboDiv>
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
        {currentDirId === 'main'
          ? mainPlans.map((item) => {
              return (
                <PlanLayout
                  key={item.planId}
                  planName={item.name}
                  planPeriods={item.periods}
                  planDate={item.createdDate}
                />
              );
            })
          : currentDirId === 'trash'
          ? trashPlans.map((item) => {
              return (
                <PlanLayout
                  key={item.planId}
                  planName={item.name}
                  planPeriods={item.periods}
                  planDate={item.createdDate}
                />
              );
            })
          : typeof currentDirId === 'number'
          ? userPlans // 코드 정리해야..
              .find((plan) => {
                return plan.id === currentDirId;
              })
              .plans.map((item) => {
                return (
                  <PlanLayout
                    key={item.planId}
                    planName={item.name}
                    planPeriods={item.periods}
                    planDate={item.createdDate}
                  />
                );
              })
          : null}
      </PlansContainer>
    </PlanListContainer>
  );
};

export default PlanList;

/*import React, { useEffect } from 'react';
import styled from 'styled-components';
//import { planStore, useStore } from 'lib/store';
//import { Link } from 'react-router-dom';

const PlanListContainer = styled.div`
  background: green;
  //flex-grow: 3;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin: auto;
  border: 1px solid black;
  // height: 80vh;
`;

const PlanList = () => {
  const { travelPlans, getPlans } = planStore();
  const { getPlan } = useStore();

  useEffect(() => {
    getPlans(); // 나중에는 userId를 파라미터로
  }, [getPlans]);

  const onClick = (id) => {
    getPlan(id);
  };

  return (
    <PlanListContainer>
      hihi
      {travelPlans.length !== 0 && (
        <div>
          {travelPlans.map((e) => (
            <div key={e.id}>
              <div>플랜 id: {e.id}</div>
              <Link
                to={process.env.PUBLIC_URL + '/canvas/setting'}
                onClick={() => onClick(e.id)}
              >
                수정하러가기
              </Link>
            </div>
          ))}
        </div>
      )}
    </PlanListContainer>
  );
};

export default PlanList;*/
