import React, { useState } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SelLocBasket from './dnd/SelLocBasket';
import PlanDays from './dnd/PlanDays';
import { useStore } from 'lib/store';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`;

const Toggle = styled.div`
  position: relative;
  /* right: 13px; */
  /* top: 45%; */
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 8px;
  :hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.15);
    transition: 0.3s;
  }
`;

// 스크롤 css
// const Basket = styled.div`
//   width: 280px;
//   background-color: rgb(109, 144, 176);
//   overflow: auto;

//   ::-webkit-scrollbar {
//     width: 10px;
//   }
//   ::-webkit-scrollbar-thumb {
//     background-color: #2f3542;
//   }
//   ::-webkit-scrollbar-track {
//     background-color: grey;
//   }
// `;

const MainArea = () => {
  const { category, pushLocToDay, dayLocChange } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    // 출발 selectedLocation, 도착 day
    if (
      category[startDropId] !== undefined &&
      category[endDropId] === undefined
    )
      pushLocToDay(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    // 출발 day, 도착 day
    else if (
      category[startDropId] === undefined &&
      category[endDropId] === undefined
    ) {
      dayLocChange(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    }
  };

  const onClick = () => {
    // canvasPost();
  };

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <SelLocBasket isOpen={isOpen} />
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
          {/* 데이 */}
          <PlanDays />
        </Container>
        <button onClick={onClick}>저장!!!</button>
      </DragDropContext>
    </>
  );
};

export default MainArea;

// 참고 레퍼런스
// https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js

// 0307
// https://react-icons.github.io/react-icons/
// https://technicolour.tistory.com/56

// 0404
// https://codesandbox.io/s/khno7?file=/src/App.js
