import React, { useState } from 'react';
import { useStore } from 'lib/store';
import ReactTooltip from 'react-tooltip';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  border-radius: 100%;
  cursor: pointer;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const DateSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  height: 100px;
  width: 95%;
`;
const Datediv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 65%;
  font-weight: bold;
`;

export const DateSetting = () => {
  const { userPlan, setDepart, setPeriods } = useStore();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onClickStartDate = (date) => {
    setStartDate(date);
    setDepart(date);
    console.log(date);
  };

  const onClickEndDate = (date) => {
    setEndDate(date);
    const diff = date.getTime() - startDate.getTime();
    const pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    setPeriods(pPeriods);
    console.log(endDate);
  };

  return (
    <DateSettingDiv>
      <TitleSpan>1. 여행 일자 설정 </TitleSpan>
      <TooltipButton data-tip data-for="datesetting">
        ?
      </TooltipButton>
      <ReactTooltip id="datesetting" place="right" type="info" effect="solid">
        <div>출발 블록을 생성하기 위해 입력해주세요.</div>
      </ReactTooltip>
      <Datediv>
        <span>출발일 </span>
        <span>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={startDate}
            onChange={(date) => onClickStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
          />
        </span>
        <span>도착일 </span>
        <span>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={endDate}
            onChange={(date) => onClickEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(new Date(), 30)}
          />
        </span>
        <div>
          {userPlan.periods - 1}박 {userPlan.periods}일
        </div>
      </Datediv>
    </DateSettingDiv>
  );
};
