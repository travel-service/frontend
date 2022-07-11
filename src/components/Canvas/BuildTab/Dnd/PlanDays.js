import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import DayHeader from 'components/Canvas/BuildTab/LocDetail/DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../LocDetail/MoveDataDiv';
import Location from 'components/Canvas/BuildTab/LocDetail/Location';
import CreateLoc from 'components/Canvas/BuildTab/MemLoc/CreateLoc';

const Days = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    width: 95vw;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;

  ${(props) =>
    props.mobile &&
    css`
      flex-direction: column;
      align-items: center;
      ${Day} {
        width: 90vw;
        flex-shrink: 0;
      }
    `}
`;

const Day = styled.div`
  margin: 8px;
  border-radius: 15px;
  background: white;
  max-height: 60vh;
  flex: 1;
  ${(props) =>
    !props.mobile &&
    css`
      min-width: 270px;
      max-width: 270px;
    `}

  ${(props) =>
    props.mobile &&
    css`
      display: none
        ${(props) =>
          props.idx === props.dayIdx &&
          css`
            display: block;
          `};
    `}
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
  background-color: ${oc.teal[6]};
  height: 40px;
  width: 100%;
  padding: 8px;
`;

const EmptyBlock = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 7px;
`;

const LocationsList = styled('div')`
  flex-grow: 1;
  min-height: 100px;

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
`;

const Div = styled.div`
  ${(props) =>
    props.idx === 0 &&
    css`
      background-color: ${oc.teal[6]};
      padding-bottom: 1px;
      > li {
        box-shadow: 0px 0px 0px 0px;
      }
    `}
`;

const Buttons = styled.div``;

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
              <DayHeader index={index} />
              {/* day 영역 */}
              <Droppable droppableId={`day${index}`}>
                {(provided, snapshot) => (
                  <LocationsList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
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
      <Buttons>
        <CreateLoc size="30" />
      </Buttons>
      {mobile && (
        <CarouselBtns>
          <CarBtn onClick={() => onClickBtn('p')}>이전</CarBtn>
          <CarBtn onClick={() => onClickBtn('n')}>이후</CarBtn>
        </CarouselBtns>
      )}
    </Container>
  );
};

export default PlanDays;
