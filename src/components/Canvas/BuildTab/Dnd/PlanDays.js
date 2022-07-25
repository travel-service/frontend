import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import DayHeader from 'components/Canvas/BuildTab/LocDetail/DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../LocDetail/MoveDataDiv';
import Location from 'components/Canvas/BuildTab/LocDetail/Location';
import { Mobile } from 'lib/custom/responsive';

const Container = styled.div`
  flex-grow: 0;
  height: 85%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: #e5e7e8;
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;

  height: 100%;
  justify-content: space-between;

  // 0724
  /* ::after {
    content: '';
    flex: auto;
  } */

  /* flex: 1; */
  /* overflow: auto; */
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }
`;

const Day = styled.div`
  margin: 10px;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  background: white;
  /* max-height: 60vh; */
  min-height: 300px;
  max-height: 500px;
  min-width: 325px;
  max-width: 325px;
  /* overflow: auto; */
  padding: 20px;
  /* flex: 1; */
  width: 100%;

  @media screen and (max-width: 767px) {
    min-width: 70vw;
    max-width: 70vw;
    flex-shrink: 0;
    display: none
      ${(props) =>
        props.idx === props.dayIdx &&
        css`
          display: block;
        `};
  }
`;

const CarouselBtns = styled.div`
  display: flex;
  justify-content: center;
`;

const CarBtn = styled.button`
  height: 40px;
  margin: 5px 20px;
  background-color: white;
  border-radius: 5px;
  border: none;
  :hover {
    cursor: pointer;
    background-color: ${oc.teal[6]};
    color: white;
    transform: scale(1.1);
    transition: all 0.1s linear;
  }
`;

const InitForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  border-radius: 60px;
  height: 45px;
  width: 100%;
  padding: 8px;
`;

const EmptyBlock = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 7px;
`;

const LocationsList = styled('div')`
  min-height: 180px;
  max-height: 420px;

  overflow: auto;
  transition: background-color ease 0.2s;
  background-color: ${(props) => (props.isDraggingOver ? 'green' : 'white')};
  ${(props) =>
    props.isDraggingOver &&
    css`
      background-color: ${oc.indigo[2]};
    `}
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  ${(props) =>
    props.empty &&
    css`
      border: 1px dashed #e5e7e8;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

const Div = styled.div`
  ${(props) =>
    props.idx === 0 &&
    css`
      /* background-color: ${oc.teal[6]}; */
      padding-bottom: 1px;
      > li {
        box-shadow: 0px 0px 0px 0px;
      }
    `}
`;

const PlanDays = ({
  dayLocDel,
  setViewTime,
  userTravelDay,
  setTimeData,
  splitTime,
  mobile,
}) => {
  const { travelDay } = userTravelDay;
  const [dayIdx, setDayIdx] = useState(0);

  const onClickBtn = (di) => {
    let last = travelDay.length - 1;
    if (di === 'p') {
      // 이전 day 보여주기
      if (dayIdx === 0) return;
      else setDayIdx(dayIdx - 1);
    } else if (di === 'n') {
      // 이후 day 보여주기
      if (dayIdx === last) return;
      else setDayIdx(dayIdx + 1);
    }
  };

  return (
    <Container mobile={mobile}>
      <Days>
        {travelDay.map((day, index) => (
          // 각 day
          <>
            <Day key={index} idx={index} dayIdx={dayIdx} mobile={mobile}>
              <DayHeader index={index} firLoc={day[0]} />
              {/* day 영역 */}
              <Droppable droppableId={`day${index}`}>
                {(provided, snapshot) => (
                  <LocationsList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    empty={day[0] === undefined}
                  >
                    {/* day에 location 존재하지 않을 때 */}
                    {day[0] === undefined && (
                      <InitForm>
                        <EmptyBlock>
                          블록 혹은 자체 생성한 블록을 넣어주세요.
                        </EmptyBlock>
                      </InitForm>
                    )}
                    {/* location map */}
                    {day.map((loc, idx) => {
                      return (
                        <Div key={idx} idx={idx}>
                          <Location
                            key={idx}
                            location={loc}
                            id={loc.copyLocationId}
                            index={idx}
                            day={index} // ?
                            dayLocDel={dayLocDel}
                            setViewTime={setViewTime}
                            lastIdx={day.length - 1}
                            nextLocation={day[idx + 1]}
                          />
                          {day[idx + 1] !== undefined && (
                            <MoveDataDiv
                              day={index}
                              index={idx}
                              userTravelDay={userTravelDay}
                              setTimeData={setTimeData}
                              setViewTime={setViewTime}
                              splitTime={splitTime}
                            />
                          )}
                        </Div>
                      );
                    })}
                    {provided.placeholder}
                  </LocationsList>
                )}
              </Droppable>
            </Day>
          </>
        ))}
      </Days>
      <Mobile>
        <CarouselBtns>
          <CarBtn onClick={() => onClickBtn('p')}>이전</CarBtn>
          <CarBtn onClick={() => onClickBtn('n')}>이후</CarBtn>
        </CarouselBtns>
      </Mobile>
    </Container>
  );
};

export default PlanDays;
