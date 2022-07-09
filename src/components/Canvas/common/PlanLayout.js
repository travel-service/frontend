import React, { useState } from 'react';
import styled from 'styled-components';
import { dirStore } from 'lib/dirStore';
//import ModalModule from 'components/common/modal/ModalModule';
//import MoreSettings from '../DirectoryPage/MoreSettings';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 72%; //70 75
  margin: 10px 10px 7px 10px;
  &:hover {
    background: lightgray;
  }
`;
const LinkButton = styled.button`
  text-align: center;
  font-size: 15px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background: white;
  width: 70%;
  cursor: pointer;
  margin-bottom: 5%;
  //margin: 0% 15% 5% 15%;
`;
const DateDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 40%;
`;
const MoreDiv = styled.div`
  // 설정(점세개) div
  text-align: right;
  //background: red;
  //width: 20%;
  z-index: 100;
`;
const MoreButton = styled.button`
  // 설정 버튼
  /*display: flex;
  width: 10px;*/
  margin-right: 10px;
  border: none;
  font-weight: bold;
  background: none;
  cursor: pointer;
`;
const PlanControlUl = styled.ul`
  //display: block;
  //position: relative;
  list-style: none;
  padding: 5px;
  margin: 0px;
  background: gray;
  //border: 0.1px solid silver;
`;
const PlanControlLi = styled.li`
  //display: block;
  //position: relative;
  decoration: none;
  background: white;
  padding: 5px 15px 5px 15px;
  border: 0.1px solid silver;
  cursor: pointer;
  margin: 5px;
`;
const MoveLi = styled.li`
  //position: relative;
  width: 150px;
  //margin-left: 85px;
  //margin-top: -40px;
  list-style: none;
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
  const [isChecked, setIsChecked] = useState(false);

  const { userDirs } = dirStore();

  const onClickMore = () => {
    setClickMore(false);
    setIsShow(!isShow);
    console.log('click');
  };
  const onMO = () => {
    setIsOver(!isOver);
  };
  const onClicktext = (text) => {
    text === '담기' ? setClickMore(!clickMore) : console.log(text);
  };
  const onClickView = (w) => {
    w === 'v' ? console.log('link to view') : console.log('link to canvas');
  };

  return (
    <PlanContainer>
      <PlanTitleDiv>
        <PlanNameDiv>{planName}</PlanNameDiv>
        <PeriodsDiv>{planPeriods}일</PeriodsDiv>
      </PlanTitleDiv>
      <ThumbnailContainer // 마우스 올리면 컴포넌트 나오게
        onMouseEnter={() => {
          onMO();
        }}
        onMouseLeave={() => {
          onMO();
        }}
        onClick={() => {
          setIsChecked(!isChecked);
        }}
      >
        {isOver && (
          <>
            {/*isChecked && <input type="checkbox" /> /*체크 기능*/}
            <LinkButton
              onClick={() => {
                onClickView('v');
              }}
            >
              완성된 여행 보기
            </LinkButton>
            <LinkButton
              onClick={() => {
                onClickView('f');
              }}
            >
              수정하기
            </LinkButton>
          </>
        )}
      </ThumbnailContainer>
      <PlanTitleDiv>
        <DateDiv>{planDate.substr(0, 10).replace(/-/g, '.')}</DateDiv>
        <MoreDiv>
          <MoreButton
            onClick={() => {
              onClickMore();
            }}
          >
            :
          </MoreButton>
          {isShow && (
            <PlanControlUl>
              <PlanControlLi
                onClick={() => {
                  onClicktext('복사');
                }}
              >
                복사
              </PlanControlLi>
              <PlanControlLi
                onClick={() => {
                  onClicktext('삭제');
                }}
              >
                삭제
              </PlanControlLi>
              <PlanControlLi
                onClick={() => {
                  onClicktext('담기');
                }}
              >
                담기
              </PlanControlLi>
            </PlanControlUl>
          )}
          {isShow &&
            clickMore &&
            userDirs.mainUserDirectory.map((item) => {
              return (
                <MoveLi key={item.userDirectoryId}>{item.directoryName}</MoveLi>
              );
            })}
        </MoreDiv>
      </PlanTitleDiv>
    </PlanContainer>
  );
};

export default PlanLayout;
