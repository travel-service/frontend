import React, { useEffect, useState } from 'react';
import Location from '../LocDetail/Location';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* transition: all 0.3s; */
  border: 2px solid black;
  ${(props) =>
    !props.isOpen &&
    css`
      width: 0vw;
      height: 0px;
      border: none;
    `}
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const List = styled.div`
  display: flex;
  width: 100px;
  flex-direction: column;
  border: 2px solid black;
  justify-content: space-around;
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: row;
  }
`;

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  :hover {
    cursor: pointer;
    background: rgba(133, 207, 194, 1);
    transition: background 0.2s linear;
    font-weight: 600;
    font-size: 18px;
  }
  :active {
    transform: translateY(1px);
  }
  ${(props) =>
    props.checked === props.index &&
    css`
      background: rgba(133, 207, 194, 1);
      font-weight: 600;
      font-size: 18px;
    `}
`;

const Basket = styled.div`
  padding: 10px;
  /* border: 2px solid rgba(133, 207, 194, 1); */
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 767px) {
    max-height: 150px;
    overflow: auto;
  }
  li[data-rbd-placeholder-context-id] {
    display: none !important;
  }
`;

const SelLocBasket = ({
  isOpen,
  category,
  selCateLoc,
  dragging,
  changeDragging,
}) => {
  const list = Object.keys(category);
  const [type, setType] = useState(category[list[0]].eng);
  const [typeId, setTypeId] = useState(list[0]);
  const [selectArea, setSelectArea] = useState(false);

  useEffect(() => {
    for (let key in selCateLoc) {
      if (selCateLoc[key].length > 0) setSelectArea(true);
    }
  }, [selCateLoc]);

  const onClick = (idx) => {
    setType(category[idx].eng);
    setTypeId(idx);
  };

  return (
    <Container isOpen={isOpen}>
      {/* 카테고리 */}
      {selectArea && isOpen && (
        <List>
          {Object.keys(selCateLoc).map((cate, idx) => {
            if (selCateLoc[cate].length > 0)
              return (
                <Item
                  checked={typeId}
                  key={idx}
                  index={idx + 1}
                  onClick={() => onClick(idx + 1)}
                >
                  {category[idx + 1].kor}
                </Item>
              );
          })}
        </List>
      )}
      {/* 현재 카테고리 담은 블록 */}
      {isOpen && (
        <Droppable
          droppableId={String(typeId)}
          isDropDisabled={true}
          // type="location"
        >
          {(provided, snapshot) => (
            <Basket
              ref={provided.innerRef}
              // {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              length={selCateLoc[`sel${type}`].length}
            >
              {selCateLoc[`sel${type}`].length === 0 && (
                <>로케이션을 담아오세요</>
              )}
              {selCateLoc[`sel${type}`].length > 0 &&
                selCateLoc[`sel${type}`].map((location, index) => {
                  return (
                    <Location
                      key={location.locationId}
                      location={location}
                      index={index}
                      id={location.locationId}
                      dragging={dragging}
                      changeDragging={changeDragging}
                      max={selCateLoc[`sel${type}`].length - 1}
                    />
                  );
                })}
              {provided.placeholder}
            </Basket>
          )}
        </Droppable>
      )}
    </Container>
  );
};

export default SelLocBasket;
