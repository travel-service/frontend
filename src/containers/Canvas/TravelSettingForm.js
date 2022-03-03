import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import oc from 'open-color';
import StyledButton from 'components/Base/Header/LoginButton';

const TitleSpan = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`;

const DateSettingDiv = styled.div`
  position: relative;
  padding: 20px;
  height: 150px;
  width: 95%;
`;

const DepartSettingDiv = styled.div`
  position: relative;
  padding: 20px;
  height: 400px;
  width: 95%;
`;

const ConceptSettingDiv = styled.div`
  position: relative;
  padding: 20px;
  width: 95%;
`;

const Datediv = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4.5fr 1.5fr 4.5fr 1fr;
  padding: 20px;
  margin-right: 40%;
  font-weight: bold;
`;

const TabMenu = styled.ul`
  background-color: white;
  font-weight: bold;
  display: flex;
  justify-items: center;
  align-items: center;
  list-style: none;
  height: 40px;
  border: 1px solid;

  .submenu {
    display: grid;
    grid-template-columns: 670px 1fr 1fr;
    justify-content: flex-start;
    justify-items: center;
    cursor: pointer;
  }

  .focused {
    background-color: ${oc.teal[6]};
    color: white;
    height: 100%
    display: flex;
    align-items: center;
  }

  & div.desc {
    text-align: center;
  }
`;

//탭내용
const Desc = styled.ul` 
  background-color: white;
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  align-content: flex-start;
  height: 80%;
  padding: 20px;
  list-style: none;
  border: 1px solid;
  
  .submenu {
    flex: 0 1 19%;
    align-self: flex-start;
    cursor: pointer;
    text-align: center;
    border: 1px solid gray;
    margin: 2px;
  }

  .focused {
    background-color: ${oc.teal[3]};
    color: white;
    height: 100%
    align-items: center;
  }
`;

const TabDiv = styled.div`
  height: 90%;
  padding: 20px;
`;

const CheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr 4fr); 
  padding: 20px;
  margin-right: 50%;
  font-weight: bold;
`;

const ButtonsDiv = styled.div`
  text-align: right;
  position: relative;

  .btn1 {
    float: left;
    width:85%;
  };

  .btn2 {
    float: left;
    margin-left: 10px;
  };
`;

const tabTitle = ['인기', '국내'];
const DestinationArr = {
  0: ["제주도"],
  1: ["제주도"]
};

const TravelSettingForm = () => {
  // 여행 일자
  const [startDate, setStartDate] = useState(new Date()); 
  const [endDate, setEndDate] = useState(new Date());
  const planDepart = startDate.getFullYear() + '/' + (startDate.getMonth()+1).toString().padStart(2, '0') + '/' + (startDate.getDate().toString().padStart(2, '0'));
  const diff = endDate.getTime() - startDate.getTime();
  const planPeriods = Math.ceil(diff/1000/60/60/24) + 1;

  //여행지
  const [activeTab, setActiveTab] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  const [planDestination, setDestination] = useState('');
  const onClickTab = (idx) => {
    setActiveTab(idx);
  };
  const onClickDestination = (destination, idx2) => {
    setActiveDest(idx2);
    setDestination(destination);
  };

  //여행 컨셉
  const [planConcept, setplanConcept] = useState([]);
  const onClickConcept = (checked, id) => {
    if (checked) {
      setplanConcept([...planConcept, id]);
    } else {
      setplanConcept(planConcept.filter((el) => el !== id));
    }
  };

  // 다음 버튼: db post
  const onClickButton = (id) => {
    const pid = id; //plan id
    axios.patch(`http://localhost:4000/travelPlans/${pid}`, {
      periods: planPeriods,
      concept: planConcept,
      startDay: planDepart,
      destination: planDestination
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div>
        <DateSettingDiv>
          <TitleSpan>1. 여행 일자 설정 </TitleSpan>
          <button data-tip data-for='datesetting'>?</button>
          <ReactTooltip id='datesetting' place="right" type="info" effect="solid">
            <div>출발 블록을 생성하기 위해 입력해주세요.</div>
          </ReactTooltip>
          <Datediv>
            <span>출발일 </span>
            <span> 
              <DatePicker 
                dateFormat="yyyy/MM/dd"
                showPopperArrow={false}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              /> 
            </span>
            <span>도착일 </span>
            <span>  
              <DatePicker 
                dateFormat="yyyy/MM/dd"
                showPopperArrow={false}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </span>
            <div>
              {planPeriods-1}박 {planPeriods}일
            </div>
          </Datediv>
        </DateSettingDiv>

        <DepartSettingDiv>
          <TitleSpan>2. 여행지 설정 </TitleSpan>
          <button data-tip data-for='departsetting'>?</button>
          <ReactTooltip id='departsetting' place="right" type="info" effect="solid">
            <div>현재 서비스 중인 여행지만 선택할 수 있습니다.<br />향후 서비스 될 여행지는 공지사항을 참고해주세요.</div>
          </ReactTooltip>
          <TabDiv>
            <TabMenu>
              {tabTitle.map((el, idx) => {
                return <li key={idx} className={`${idx === activeTab ? 'submenu focused' : 'submenu'}`} onClick={() => onClickTab(idx)}>
                  {el}
                </li>
              })}
            </TabMenu>
            <Desc>
              {DestinationArr[activeTab].map((destination, idx2) => {
                  return <li key={idx2} className={`${idx2 === activeDest ? 'submenu focused' : 'submenu'}`} onClick = {() => onClickDestination(destination, idx2)}>
                    {destination}
                  </li>
                })}
            </Desc>
          </TabDiv>
        </DepartSettingDiv>

        <ConceptSettingDiv>
            <TitleSpan>3. 여행 컨셉 </TitleSpan>
            <button data-tip data-for='conceptsetting'>?</button>
            <ReactTooltip id='conceptsetting' place="right" type="info" effect="solid">
              <div>블록 추천을 위해 누구와 함께 여행하는지 알려주세요.</div>
            </ReactTooltip>
            <CheckboxDiv>
              <input type="checkbox" onChange={(e) => {onClickConcept(e.target.checked, 0)}}/> <span>우정</span>
              <input type="checkbox" onChange={(e) => {onClickConcept(e.target.checked, 1)}}/> <span>연인</span>
              <input type="checkbox" onChange={(e) => {onClickConcept(e.target.checked, 2)}}/> <span>가족</span>
              <input type="checkbox" onChange={(e) => {onClickConcept(e.target.checked, 3)}}/> <span>혼자</span>
            </CheckboxDiv>
        </ConceptSettingDiv>

        <ButtonsDiv>
          <ButtonsDiv className='btn1'>
            <Link to="/canvas/select">
              <StyledButton onClick = {() => onClickButton(1)}>다음으로</StyledButton>
            </Link>
          </ButtonsDiv>
          <ButtonsDiv className='btn2'>
            <Link to="/">
              <StyledButton onClick = {() => onClickButton(1)}>저장하고 나가기</StyledButton>
            </Link>
          </ButtonsDiv>
        </ButtonsDiv>
    </div>

  );
};

export default TravelSettingForm;