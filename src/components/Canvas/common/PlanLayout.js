import React, { useState } from 'react';
import styled from 'styled-components';
import { dirStore } from 'lib/dirStore';

// 플랜 레이아웃(이름, 기간, 날짜, 썸네일(호버 시 정보), 이동/복사/담기 버튼)
const PlanContainer = styled.div`
  //display: flex;
  margin: 10px;
  padding: 10px;
  border: 2px solid lightgray;
  //width: 300px;
  //height: 250px;
  width: 350px;
  height: 270px;
`;
const PlanTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlanNameDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  height: 30px;
  width: 80%;
`;
const PeriodsDiv = styled.div`
  text-align: center;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: 20%;
`;
const ThumbnailContainer = styled.div`
  border: 1px solid gray;
  height: 72%; //70 75
  margin: 10px 10px 7px 10px;
  &:hover {
    background: gray;
    cursor: pointer;
  }
`;
const DateDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 40%;
`;
const MoreDiv = styled.div`
  text-align: right;
  //background: red;
  z-index: 100;
  //width: 20%;
`;
const MoreButton = styled.button`
  margin-right: 10px;
  border: none;
  font-weight: bold;
  background: none;
  cursor: pointer;
`;
const PlanControl = styled.ul`
  text-decoration: none;
  list-style: none;
  padding: 0px;
  margin: 5px;
  border: 0.1px solid silver;
`;
const PlanDetail = styled.li`
  decoration: none;
  background: white;
  padding: 5px 15px 5px 15px;
  border: 0.1px solid silver;
  cursor: pointer;
`;
const MovePlan = styled.li`
  list-style: none;
  //padding: 0px;
  background: white;
  text-align: center;
  padding: 5px 15px 5px 15px;
  border: 0.1px solid silver;
  cursor: pointer;
`;

const PlanLayout = ({ planName, planId, planPeriods, planDate }) => {
  const [clickMore, setClickMore] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const { userDirs } = dirStore();

  const onClickMore = () => {
    setIsShow(!isShow);
    console.log('click');
  };
  const onMO = () => {
    setIsOver(!isOver);
  };
  const onClicktext = (text) => {
    text === '담기' ? setClickMore(!clickMore) : console.log(text);
  };

  return (
    <PlanContainer>
      <PlanTitleDiv>
        <PlanNameDiv>{planName}</PlanNameDiv>
        <PeriodsDiv>{planPeriods}일</PeriodsDiv>
      </PlanTitleDiv>
      <ThumbnailContainer // 마우스 올리면 컴포넌트 나오게
        onMouseOver={() => {
          onMO();
        }}
        onMouseOut={() => {
          onMO();
        }}
      >
        {isOver && <PlanNameDiv>dd</PlanNameDiv>}
      </ThumbnailContainer>
      <PlanTitleDiv>
        <DateDiv>{planDate.substr(0, 10)}</DateDiv>
        <MoreDiv>
          <MoreButton
            onClick={() => {
              onClickMore();
            }}
          >
            :
          </MoreButton>
          {isShow && (
            <PlanControl>
              <PlanDetail
                onClick={() => {
                  onClicktext('복사');
                }}
              >
                복사
              </PlanDetail>
              <PlanDetail
                onClick={() => {
                  onClicktext('삭제');
                }}
              >
                삭제
              </PlanDetail>
              <PlanDetail
                onClick={() => {
                  onClicktext('담기');
                }}
              >
                담기
              </PlanDetail>
            </PlanControl>
          )}
          {isShow &&
            clickMore &&
            userDirs.map((item) => {
              return <MovePlan key={item.id}>{item.directoryName}</MovePlan>;
            })}
        </MoreDiv>
      </PlanTitleDiv>
    </PlanContainer>
  );
};

export default PlanLayout;
