import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import { dirStore } from 'lib/zustand/dirStore';
//import ModalModule from 'components/common/modal/ModalModule';
//import MoreSettings from '../DirectoryPage/MoreSettings';

// 플랜 레이아웃(이름, 기간, 날짜, 썸네일(호버 시 정보), 이동/복사/담기 버튼)
const PlanContainer = styled.div`
  width: 246px;
  height: 252px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  font-family: 'Pretendard';
  font-style: normal;
  padding: 15px;

  /*background: white;
  //display: flex;
  margin: 10px;
  padding: 10px;
  border: 2px solid lightgray;
  width: 350px;
  height: 270px;*/
`;
const PlanNameDiv = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  align-items: center;
  margin-top: 14px;
  //font-size: 1.2rem;
  //height: 30px;
  //width: 80%;
`;
const PeriodsDiv = styled.div`
  //position: absolute;
  background: #000000;
  opacity: 0.69;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
  border-radius: 20px;
  right: 15px;
  top: 15px;

  /*text-align: center;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: 20%;*/
`;
const ThumbnailContainer = styled.div`
  //position: absolute;
  width: 216px;
  height: 150px;
  border-radius: 10px;
  background: #ffffff;

  display: flex;
  gap: 11px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  /*border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 72%; //70 75
  margin: 10px 10px 7px 10px;
  &:hover {
    background: lightgray;
  }*/
`;
const LinkButton = styled(Link)`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;

  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 10px;

  //background: white;
  width: 70%;
  cursor: pointer;
  //margin-bottom: 5%;
  //margin: 0% 15% 5% 15%;
`;
const DateDiv = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #7e7e7e;
  margin-top: 10px;
  /*margin-left: 10px;
  margin-right: 10px;
  width: 40%;*/
`;
const PlanTitleDiv = styled.div`
  //position: absolute;
  display: flex;
  justify-content: right;
`;
const MoreDiv = styled.div`
  // 설정(점세개) div
  text-align: right;
  position: absolute;
  //display: flex;
`;
const MoreButton = styled.button`
  // 설정 버튼
  /*display: flex;
  width: 10px;*/
  border: none;
  background: none;
  cursor: pointer;
`;
const PlanControlUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
  //background: gray;
  //border: 0.1px solid silver;
`;
const PlanControlLi = styled.li`
  //display: block;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  decoration: none;
  padding: 10px 20px 10px 20px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;
const SubUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
  right: -90px;
  top: 23px;
`;
const MoveLi = styled.li`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  text-align: center;

  decoration: none;
  padding: 10px 20px 10px 20px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #ffffff;
  }

  /*position: absolute;
  list-style: none;
  background: white;
  text-align: center;
  padding: 5px 15px 5px 15px;
  border: 0.1px solid silver;
  cursor: pointer;*/
`;

const PlanLayout = ({
  planId,
  name,
  periods,
  createdDate,
  userDirs,
  checkedPlans,
  setCheckedPlans,
  //controlPlans,
  //setCancel,
}) => {
  const [clickMore, setClickMore] = useState(false); // 담기클릭
  const [isShow, setIsShow] = useState(false); // 점세개 클릭
  const [isOver, setIsOver] = useState(false); // 마우스오버 버튼

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
  const onClickCheck = (checked, i) => {
    if (checked) {
      setCheckedPlans([...checkedPlans, i]);
    } else {
      setCheckedPlans(checkedPlans.filter((e) => e !== i));
    }
  };

  return (
    <PlanContainer>
      <ThumbnailContainer // 마우스 올리면 컴포넌트 나오게
        onMouseEnter={() => {
          onMO();
        }}
        onMouseLeave={() => {
          onMO();
        }}
      >
        <PeriodsDiv>{periods}일</PeriodsDiv>
        {isOver && (
          <>
            <LinkButton
              to={process.env.PUBLIC_URL + '/canvas/share'}
              onClick={() => {
                onClickView('v');
              }}
            >
              완성된 여행 보기
            </LinkButton>
            <LinkButton
              to={process.env.PUBLIC_URL + '/canvas/setting'}
              state={{ planId: planId }}
              onClick={() => {
                console.log('수정하기');
              }}
            >
              수정하기
            </LinkButton>
          </>
        )}
      </ThumbnailContainer>
      <PlanNameDiv>
        <input
          type="checkbox"
          onChange={(e) => {
            onClickCheck(e.target.checked, planId);
          }}
          checked={checkedPlans && checkedPlans.includes(planId) ? true : false}
        />
        {name}
      </PlanNameDiv>
      <DateDiv>{createdDate.substr(0, 11).replace(/-|T/g, '.')}</DateDiv>
      <PlanTitleDiv>
        <MoreDiv
          onClick={() => {
            onClickCheck();
          }}
        >
          <MoreButton
            onClick={() => {
              onClickMore();
            }}
          >
            <img src={process.env.PUBLIC_URL + '/images/more_ico.png'} />
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
              {isShow &&
                clickMore &&
                userDirs.mainUserDirectory.map((item) => {
                  return (
                    <SubUl key={item.userDirectoryId}>
                      <MoveLi>{item.directoryName}</MoveLi>
                    </SubUl>
                  );
                })}
            </PlanControlUl>
          )}
          {/*isShow &&
            clickMore &&
            userDirs.mainUserDirectory.map((item) => {
              return (
                <SubUl>
                  <MoveLi key={item.userDirectoryId}>
                    {item.directoryName}
                  </MoveLi>
                </SubUl>
              );
            })*/}
        </MoreDiv>
      </PlanTitleDiv>
    </PlanContainer>
  );
};

export default PlanLayout;
