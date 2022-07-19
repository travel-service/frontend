import React, { useEffect, useState } from 'react';
import Location from '../LocDetail/Location';
import styled, { css } from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import CustomRadio from 'lib/custom/CustomRadio';

const Container = styled.div`
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

const SelLocBasket = ({ isOpen, category, selCateLoc, memberLocations }) => {
  const [type, setType] = useState('Attraction');
  const [selCateLocAddMember, setSelCateLocAddMember] = useState({
    ...selCateLoc,
    member: memberLocations,
  });

  useEffect(() => {
    setSelCateLocAddMember({
      // selCateLoc + memberLocation
      ...selCateLoc,
      member: memberLocations,
    });
  }, [selCateLoc, memberLocations]);

  const onClick = (type) => {
    setType(type);
  };

  return (
    <Container isOpen={isOpen}>
      {/* 카테고리 */}
      {isOpen && (
        <CustomRadio
          dataObj={category}
          onClick={onClick}
          check={type}
          flag="member"
        />
      )}
      {/* 현재 카테고리 담은 블록 */}
      {isOpen && (
        <Droppable
          droppableId={type}
          isDropDisabled={true}
          // type="location"
        >
          {(provided, snapshot) => (
            <Basket
              ref={provided.innerRef}
              // {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {selCateLocAddMember[type].length === 0 && (
                <>로케이션을 담아오세요</>
              )}
              {selCateLocAddMember[type].length > 0 &&
                selCateLocAddMember[type].map((location, index) => {
                  return (
                    <Location
                      key={location.locationId}
                      location={location}
                      index={index}
                      id={location.locationId}
                      max={selCateLocAddMember[type].length - 1}
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
