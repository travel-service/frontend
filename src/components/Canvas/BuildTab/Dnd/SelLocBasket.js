import React, { useEffect, useState } from 'react';
import Location from '../LocDetail/Location';
import styled, { css } from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import CustomRadio from 'lib/custom/CustomRadio';
import BlackCustomBtn from 'components/Canvas/common/BlackCustomBtn';
import CreateLoc from '../MemLoc/CreateLoc';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  min-width: 330px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0px 10px 10px 0px;
  transition: 0.2s all linear;
  padding: 20px;

  ${(props) =>
    !props.isOpen &&
    css`
      width: 0px;
      height: 0px;
      padding: 0px;
    `}
  @media screen and (max-width: 767px) {
    width: 100%;
    display: block;
    transition: none;
  }
`;

const Title = styled.div`
  /* font-family: 'Pretendard'; */
  /* font-style: normal; */
  font-weight: 600;
  font-size: 15px;
`;

const Basket = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin-bottom: auto;
  background-color: #e5e7e8;
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 767px) {
    max-height: 150px;
    overflow: auto;
  }
  li[data-rbd-placeholder-context-id] {
    display: none !important;
  }
`;

const Div = styled.div`
  height: 45px;
  margin-bottom: 10px;
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
        <>
          <Title>담은 블록 보기</Title>
          <CustomRadio
            dataObj={category}
            onClick={onClick}
            check={type}
            flag="member"
          />
          <Div>
            <CreateLoc />
          </Div>
          {/* 현재 카테고리 담은 블록 */}
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
        </>
      )}
    </Container>
  );
};

export default SelLocBasket;
