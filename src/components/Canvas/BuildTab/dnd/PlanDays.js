import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import DayHeader from 'components/Canvas/BuildTab/Detail/DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../Detail/MoveDataDiv';
import Location from 'components/Canvas/BuildTab/Detail/Location';
import CreateLoc from 'lib/Icons/CreateLoc';

const Days = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1; //남은 영역 모두 채움
  overflow: auto;
  white-space: nowrap;
`;

const Container = styled.div`
  margin: 8px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  width: 270px;
  background: white;
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
`;

const Buttons = styled.div`
  width: 100px;
`;

const PlanDays = ({
  dayLocDel,
  setViewTime,
  userTravelDay,
  setTimeData,
  splitTime,
}) => {
  const { travelDay } = userTravelDay;

  return (
    <Days>
      {travelDay.map((day, index) => (
        // 각 day
        <Container key={index}>
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
                  // idx: 해당 loc index
                  return (
                    <div key={idx}>
                      <Location
                        key={idx}
                        location={loc}
                        id={loc.copyLocationId}
                        index={idx}
                        day={index} // ?
                        dayLocDel={dayLocDel}
                        setViewTime={setViewTime}
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
                    </div>
                  );
                })}
                {provided.placeholder}
              </LocationsList>
            )}
          </Droppable>
        </Container>
      ))}
      <Buttons>
        <CreateLoc size="30" />
      </Buttons>
    </Days>
  );
};

export default PlanDays;
