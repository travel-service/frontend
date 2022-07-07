import React from 'react';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import styled from 'styled-components';
import PlanDays from '../Dnd/PlanDays';

const ToggleArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: -10px;
  background-color: white;
  width: 100px;
  margin: auto;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.1);
    transition: 0.1s;
  }
`;

const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const MobileDayArea = ({
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
      <ToggleArea onClick={onClickToggle}>
        <Toggle>
          {!isOpen && (
            <MdOutlineExpandMore
              style={{
                color: 'white',
              }}
            />
          )}
          {isOpen && (
            <MdOutlineExpandLess
              style={{
                color: 'white',
              }}
            />
          )}
        </Toggle>
        <>담은 블록</>
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

export default MobileDayArea;
