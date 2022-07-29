import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import DayHeader from 'components/Canvas/BuildTab/LocDetail/DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../LocDetail/MoveDataDiv';
import Location from 'components/Canvas/BuildTab/LocDetail/Location';
import { Mobile } from 'lib/custom/responsive';
import { MdOutlineClose, MdOutlineFolderOpen } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 0;
  background: #e5e7e8;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  overflow: auto;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Days = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-around; */

  //0726 grid로 교체
  display: grid;
  grid-template-columns: repeat(auto-fill, 325px);
  justify-content: space-around;
  grid-gap: 20px;
  ${(props) =>
    !props.len &&
    css`
      height: 100%;
      display: flex;
      align-items: center;
    `}

  // 0724
  /* ::after {
    content: '';
    flex: auto;
  } */
  /* flex: 1; */
  /* overflow: auto; */
  @media screen and (max-width: 767px) {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
  }
`;

const Day = styled.div`
  margin: 10px;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  background: white;
  min-height: 300px;
  max-height: 500px;
  min-width: 325px;
  max-width: 325px;
  padding: 20px;
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
      padding-bottom: 1px;
      > li {
        box-shadow: 0px 0px 0px 0px;
      }
    `}
`;

const ToggleArea = styled.div`
  position: absolute;

  svg {
    color: white;
  }

  @media screen and (max-width: 767px) {
    display: flex;
  }

  :hover {
    cursor: pointer;
    div {
      opacity: 1;
      transition: 0.3s;
      background-color: white;
      svg {
        color: black;
      }
    }
  }
`;

const Toggle = styled.div`
  display: flex;
  position: relative;
  top: 20vh;
  left: -70px;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 767px) {
    top: -280px;
    width: 40px;
    height: 40px;
    left: 50%;
    transform: translate(-50%);
    transition: transform;
  }
`;

const ExitSvg = styled(MdOutlineClose)``;

const FolderSvg = styled(MdOutlineFolderOpen)``;

const ErrorImg = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FaceIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 30px;
`;

const FontDiv = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #e64980;
`;

const PlanDays = ({ data }) => {
  const {
    dayLocDel,
    setViewTime,
    userTravelDay,
    setTimeData,
    splitTime,
    mobile,
    isOpen,
    onClickToggle,
  } = data;

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
      <ToggleArea>
        <Toggle onClick={onClickToggle} isOpen={isOpen}>
          {isOpen && <ExitSvg size="30" />}
          {!isOpen && <FolderSvg size="30" />}
        </Toggle>
      </ToggleArea>
      <Days len={travelDay.length}>
        {!travelDay.length && (
          <ErrorImg>
            <h2>여행을 언제 가는거죠?</h2>
            <FaceIcon
              src={process.env.PUBLIC_URL + '/images/face1.png'}
              alt=""
            />
            <FontDiv>😥여행일자를 제대로 받아오지 못했어요.😥</FontDiv>
            <FontDiv>
              😛여행 설정 단계로 돌아가 여행일자를 다시 선택해주세요!!😛
            </FontDiv>
          </ErrorImg>
        )}
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
