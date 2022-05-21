import React from 'react';
import styled from 'styled-components';
import PlanLayout from 'components/Canvas/common/PlanLayout';
import Button from 'components/common/Button';

//리스트 전체
const PlanListContainer = styled.div`
  flex-grow: 5;
  padding: 1%;
`;
//상단
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: yellow;
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
//각 디렉토리 내 text
const DirTextDiv = styled.div`
  font-size: 1.2rem;
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
  border: ;
`;

const PlanList = () => {
  return (
    <PlanListContainer>
      <TitleContainer>
        <ItemsDiv>
          <IconDiv>All</IconDiv>
          <DirTextDiv>모든 여행</DirTextDiv>
          <PlanCountContainer>5</PlanCountContainer>
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
        <div>
          <input type="checkbox" />
          전체 선택
        </div>
        <ItemsDiv>
          <Button>복사</Button>
          <Button>
            담기
            {/*<select>
                <option hidden>담기</option>
                <option>디렉1</option>
            </select>*/}
          </Button>
          <Button>삭제</Button>
        </ItemsDiv>
      </TitleContainer>
      <PlanLayout />
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
