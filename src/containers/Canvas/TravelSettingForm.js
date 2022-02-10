import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import oc from 'open-color';

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
  height: 150px;
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
    justify-content: center;
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
const Desc = styled.div` 
  background-color: white;
  height: 80%;
  padding: 20px;
  border: 1px solid;
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

const tabTitle = ['인기 여행지', '국내'];
const DestinationArr = {
  0: "제주도1",
  1: "제주도2",
};

const TravelSettingForm = () => {
  // 여행 일자 설정
  const [startDate, setStartDate] = useState(new Date()); 
  const [endDate, setEndDate] = useState(new Date());
  const diff = endDate.getTime() - startDate.getTime();
  const totalDate = Math.ceil(diff/1000/60/60/24);

  //여행지 설정
  const [activeTab, setActiveTab] = useState(0);
  const onClickTab = (idx) => {
    setActiveTab(idx);
  };

  //여행 컨셉 설정

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
              {totalDate}박 {totalDate+1}일
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
              {DestinationArr[activeTab]}
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
              <input id='0' type="checkbox" /> <span>우정</span>
              <input id='1' type="checkbox" /> <span>연인</span>
              <input id='2' type="checkbox" /> <span>가족</span>
              <input id='3' type="checkbox" /> <span>혼자</span>
            </CheckboxDiv>
        </ConceptSettingDiv>
    </div>

  );
};

export default TravelSettingForm;