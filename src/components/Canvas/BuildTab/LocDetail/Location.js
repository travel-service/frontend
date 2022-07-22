import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';
import Time from 'lib/Icons/Time';
import Close from 'lib/Icons/Close';

const DEFAULT_IMAGE =
  'https://www.mortonsonthemove.com/wp-content/uploads/2022/07/norway-adventures-nighttime-road-trip-2022-02-01-23-42-53-utc-768x462.jpg';

const Span = styled.span`
  font-weight: normal;
  font-size: 12px;
`;

const LocTime = styled.div`
  font-weight: normal;
  font-size: 12px;
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
      width: 100%;
      @media screen and (max-width: 767px) {
        width: 60%;
        margin: 0px 0px 10px 20px;
      }
    `}

  ${(props) =>
    props.day === undefined &&
    css`
      height: 90px;
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

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
`;

const ListDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  font-weight: bold;
`;

const LocName = styled.div`
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  margin-bottom: 5px;
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

const Location = ({
  location,
  index,
  day,
  id,
  dayLocDel,
  setViewTime,
  lastIdx,
  type,
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
                  <LocName>
                    {location.name}
                    {day > -1 &&
                      index !== 0 &&
                      movingData['arriveTime'] !== '' && (
                        <Span>({movingData['arriveTime']} 도착)</Span>
                      )}
                  </LocName>
                  <LocAddress>{location.address1}</LocAddress>
                  {day > -1 ? (
                    <LocTime>
                      {index === 0 ? (
                        <>
                          {movingData['startTime']
                            ? `${setViewTime(
                                movingData['startTime'],
                                'start',
                              )} 출발`
                            : `출발지의 출발시간을 입력해주세용`}
                        </>
                      ) : (
                        <>
                          {index < lastIdx ? (
                            <>
                              {movingData['stayTime']
                                ? `${setViewTime(
                                    movingData['stayTime'],
                                    'stay',
                                  )} 체류 (${movingData['startTime']} 출발)` // 0422 출발시간도 보여줄까?
                                : '체류시간과 이동수단 및 시간을 입력해주세용'}
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      )}
                    </LocTime>
                  ) : (
                    ''
                  )}
                </div>
                <Btn day={day}>
                  <Close size="18" onClick={onClick} tooltip={true} />
                  <Time
                    title={index === 0 ? '출발시간' : '체류시간'}
                    index={index}
                    day={day}
                  />
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
