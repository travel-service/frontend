import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';
import Time from 'lib/Icons/Time';
import Close from 'lib/Icons/Close';
import { MdAccessTime } from 'react-icons/md';

const DEFAULT_IMAGE =
  'https://www.mortonsonthemove.com/wp-content/uploads/2022/07/norway-adventures-nighttime-road-trip-2022-02-01-23-42-53-utc-768x462.jpg';

const TimeSpan = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  margin: 0 5px;
`;

const LocTime = styled.div`
  font-weight: normal;
  font-size: 12px;
`;

const Img = styled.img`
  /* height: 50px;
  width: 50px; */
  border-radius: 10px;
`;

const List = styled.li`
  display: flex;
  list-style: none;
  white-space: normal;
  /* user-select: none; */
  width: 100%;
  padding: 15px;
  border: 1px solid #e5e7e8;
  border-radius: 10px;

  margin-bottom: 10px;
  margin: 10px 0px;
  background: ${(props) =>
    props.isDragging ? 'rgba(133, 207, 194, 1);' : 'white'};
  ${(props) =>
    props.day !== undefined &&
    css`
      /* margin: auto; */
      margin-bottom: 10px;
      height: 120px;
      width: 100%;
      ${Img} {
        height: 75px;
        width: 75px;
      }
    `}

  ${(props) =>
    props.day === undefined &&
    css`
      height: 90px;
      ${Img} {
        height: 50px;
        width: 50px;
      }
      @media screen and (max-width: 767px) {
      }
    `}
`;

const Clone = styled(List)`
  ~ li {
    transform: none !important;
  }
`;

const ImgDiv = styled.div``;

const ListDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  font-weight: bold;
`;

const LocName = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 5px;
  ${(props) =>
    props.day !== undefined &&
    css`
      margin-bottom: 10px;
    `}
`;

const LocAddress = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #7e7e7e;
`;

const Btn = styled.div`
  display: none;
  ${(props) =>
    props.day > -1 &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: ${palette.gray[6]};
    `}
`;

const Clock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Location = ({
  location,
  index,
  day,
  id,
  dayLocDel,
  setViewTime,
  lastIdx,
  type,
  nextLocation,
}) => {
  const { movingData } = location;

  const onClick = () => {
    dayLocDel(day, index); // 함수수정,
  };

  const handleImgError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <Draggable draggableId={String(id)} index={index} key={id}>
      {(provided, snapshot) => {
        return (
          <React.Fragment>
            <List
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              isDragging={snapshot.isDragging}
              style={provided.draggableProps.style}
              index={index}
              day={day}
            >
              <ImgDiv>
                <Img
                  src={location.image}
                  alt="locationImg"
                  onError={(e) => handleImgError(e)}
                />
              </ImgDiv>
              <ListDiv>
                <div>
                  {index !== 0 && day > -1 && (
                    <Clock>
                      {day > -1 && (
                        <>
                          {movingData.stayTime && <MdAccessTime size="12px" />}
                          <TimeSpan>
                            {!movingData.startTime &&
                              movingData.stayTime &&
                              `${movingData.stayTime} 체류`}
                            {movingData.startTime &&
                              `${movingData.arriveTime}~${movingData.startTime}`}
                          </TimeSpan>
                        </>
                      )}
                      <Time
                        type="pen"
                        title="체류 시간 설정"
                        index={index}
                        day={day}
                      />
                    </Clock>
                  )}
                  <LocName day={day}>{location.name}</LocName>
                  <LocAddress>{location.address1}</LocAddress>
                </div>
                <Btn day={day}>
                  <Close size="18" onClick={onClick} tooltip={true} />
                </Btn>
              </ListDiv>
            </List>
            {snapshot.isDragging && day === undefined && (
              <Clone>
                <ImgDiv>
                  <Img
                    src={location.image}
                    alt="img"
                    onError={handleImgError}
                  />
                </ImgDiv>
                <ListDiv>
                  <div>
                    <LocName>{location.name}</LocName>
                    <LocAddress>{location.address1}</LocAddress>
                  </div>
                </ListDiv>
              </Clone>
            )}
          </React.Fragment>
        );
      }}
    </Draggable>
  );
};

export default Location;
