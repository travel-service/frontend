import React, { useState, useEffect } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SelLocBasket from './Dnd/SelLocBasket';
import { Mobile, Pc } from 'lib/custom/responsive';
import WebDayArea from './Others/WebDayArea';
import MobileDayArea from './Others/MobileDayArea';
import CanvasButtons from '../common/CanvasButtons';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-right: 30px;
  /* height: 100%; */
  overflow: auto;
  @media screen and (max-width: 767px) {
    /* display: block; */
    flex-direction: column;
  }
`;

const Div = styled.div`
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

const Canvas = styled.main`
  flex: 1;
  /* height: 600px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
  margin-left: 20px;
  padding: 25px;
`;

const Header = styled.header`
  margin-top: 8px;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
`;

const MainArea = ({
  category,
  pushLocToDay,
  dayLocChange,
  selCateLoc,
  dayLocDel,
  setViewTime,
  userTravelDay,
  setTimeData,
  splitTime,
  memberLocations,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectArea, setSelectArea] = useState(-1);

  useEffect(() => {
    let keys = Object.keys(selCateLoc);
    let n = keys.length;
    for (let i = 0; i < n; i++) {
      if (selCateLoc[keys[i]].length > 0) setSelectArea(1);
    }
    if (selectArea === -1) setSelectArea(100);
  }, [selCateLoc, selectArea]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    let regex = /day/i; // endDropId에는 day가 들어감
    let start = regex.test(startDropId); // true or false, true면 day, false면 Basket
    let end = regex.test(endDropId);
    // 출발 selectedLocation, 도착 day
    if (!start && end)
      pushLocToDay(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    // 출발 day, 도착 day
    else if (start && end) {
      dayLocChange(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    }
  };

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DragDropContext style={{ overflow: 'auto' }} onDragEnd={onDragEnd}>
        <Container>
          {selectArea === 100 && (
            <Div>
              <h2>여행 갈 곳이 읎다..</h2>
              <FaceIcon
                src={process.env.PUBLIC_URL + '/images/face1.png'}
                alt=""
              />
              <FontDiv>😥선택한 블록(여행지)가 하나도 없어요.😥</FontDiv>
              <FontDiv>😛이전으로 돌아가 여행지를 담아오세요!!😛</FontDiv>
            </Div>
          )}
          {/* 담은 블록 */}
          {selectArea === 1 && (
            <SelLocBasket
              isOpen={isOpen}
              category={category}
              selCateLoc={selCateLoc}
              memberLocations={memberLocations}
            />
          )}
          <Canvas>
            <Header>여행 캔버스</Header>
            {selectArea === 1 && (
              <React.Fragment>
                <Pc>
                  <WebDayArea
                    onClickToggle={onClickToggle}
                    isOpen={isOpen}
                    dayLocDel={dayLocDel}
                    setViewTime={setViewTime}
                    userTravelDay={userTravelDay}
                    setTimeData={setTimeData}
                    splitTime={splitTime}
                  />
                </Pc>
                <Mobile>
                  <MobileDayArea
                    onClickToggle={onClickToggle}
                    isOpen={isOpen}
                    dayLocDel={dayLocDel}
                    setViewTime={setViewTime}
                    userTravelDay={userTravelDay}
                    setTimeData={setTimeData}
                    splitTime={splitTime}
                  />
                </Mobile>
              </React.Fragment>
            )}
            <CanvasButtons />
          </Canvas>
        </Container>
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
