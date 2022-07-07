import React from 'react';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';
import styled from 'styled-components';
import PlanDays from '../Dnd/PlanDays';

const ToggleArea = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 8px;
`;

const Toggle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.15);
    transition: 0.3s;
  }
`;

const WebDayArea = ({
  isOpen,
  onClickToggle,
  dayLocDel,
  setViewTime,
  userTravelDay,
  setTimeData,
  splitTime,
}) => {
  return (
    <React.Fragment>
      <ToggleArea>
        <Toggle onClick={onClickToggle}>
          {!isOpen && (
            <MdOutlineArrowForwardIos
              style={{
                color: 'white',
              }}
            />
          )}
          {isOpen && (
            <MdOutlineArrowBackIos
              style={{
                color: 'white',
              }}
            />
          )}
        </Toggle>
      </ToggleArea>
      <PlanDays
        dayLocDel={dayLocDel}
        setViewTime={setViewTime}
        userTravelDay={userTravelDay}
        setTimeData={setTimeData}
        splitTime={splitTime}
      />
    </React.Fragment>
  );
};

export default WebDayArea;
