import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMode } from 'react-icons/md';
import 'lib/styles/Modal.css';
import ModalModule from 'components/common/modal/ModalModule';
import MoveSettingChild from './MoveSettingChild';
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';

const Container = styled.div`
  /* position: relative; */
  /* overflow: visible; */
  /* z-index: 1; */
  background: #f6f6f8;
  border-radius: 60px;
  :hover {
    cursor: pointer;
  }
`;

const Div = styled.div`
  /* position: absolute; */
  /* left: 90%; */
  /* top: -20px; */
  @media screen and (max-width: 767px) {
    /* left: 65%; */
  }

  :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 15px;
    top: 50%;
    margin-top: -10px;
    border-color: transparent black transparent transparent;
    left: -25px;
  }
  :hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  color: white;
  line-height: 30px;
  background-color: black;
  border-radius: 20px;
`;

const BubbleDiv = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.margin &&
    css`
      /* padding-left: 10px; */
      /* color: red; */
      /* margin-left: 30px; */
    `}
  > div {
    margin-right: 5px;
  }
`;

const TimeDiv = styled.div`
  margin-right: 5px;
  @media screen and (max-width: 767px) {
    font-size: 13px;
  }
`;

const PencilIcon = styled(MdMode)`
  /* color: black; */
  ${(props) => props.isHover && css``}
`;

const MoveDataDiv = ({
  day,
  index,
  userTravelDay,
  setTimeData,
  setViewTime,
  splitTime,
}) => {
  // const [isHovering, setIsHovering] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fromLoc = userTravelDay.travelDay[day][index];
  const ToLoc = userTravelDay.travelDay[day][index + 1];
  const locMovingInfo = fromLoc.movingData;
  const locVehicle = locMovingInfo.vehicle;
  const [checkVehicle, setCheckVehicle] = useState(locVehicle);
  const [time, setTime] = useState({
    hour: '',
    min: '',
  });

  useEffect(() => {
    if (locMovingInfo['movingTime'] !== '') {
      let [hour, min] = splitTime(locMovingInfo['movingTime']);
      setTime({
        hour,
        min,
      });
    }
  }, [locMovingInfo, splitTime]);

  const checkedVehicleHandler = (value) => {
    if (checkVehicle === value) {
      setCheckVehicle('');
    } else {
      setCheckVehicle(value);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 2) {
      setTime({
        ...time,
        [name]: value.substr(0, 2),
      });
      return;
    }
    if (parseInt(value) < 0) {
      setTime({
        ...time,
        [name]: 0,
      });
    } else if (name === 'hour' && parseInt(value) >= 24) {
      setTime({
        ...time,
        hour: '23',
      });
    } else if (name === 'min' && parseInt(value) >= 60) {
      setTime({
        ...time,
        min: '59',
      });
    } else {
      setTime({
        ...time,
        [name]: value,
      });
    }
  };
  const openModal = () => {
    setCheckVehicle(locVehicle);
    if (locMovingInfo['movingTime'] !== '') {
      let [hour, min] = splitTime(locMovingInfo['movingTime']);
      setTime({
        hour,
        min,
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = () => {
    setTimeData(day, index, time, 'move', checkVehicle);
    closeModal();
    setCheckVehicle('');
    setTime({
      hour: '',
      min: '',
    });
  };

  const renderSwitch = (vehicle) => {
    switch (vehicle) {
      case 'car':
        return <MdDirectionsCar />;
      case 'bus':
        return <MdDirectionsBus />;
      case 'bike':
        return <MdDirectionsBike />;
      case 'walk':
        return <MdDirectionsWalk />;
      default:
        return;
    }
  };

  return (
    <Container>
      {locMovingInfo['movingTime'] === undefined && (
        <Span>
          <PencilIcon onClick={openModal} />
        </Span>
      )}
      {locMovingInfo['movingTime'] !== undefined && (
        <Span>
          <BubbleDiv>
            <BubbleDiv margin>
              {renderSwitch(locVehicle)}
              {locMovingInfo['movingTime'] && (
                <TimeDiv>{setViewTime(locMovingInfo['movingTime'])}</TimeDiv>
              )}
              <PencilIcon
                // isHover={isHovering}
                onClick={openModal}
                size="20px"
              />
            </BubbleDiv>
          </BubbleDiv>
        </Span>
      )}
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="이동수단"
        onSubmit={onSubmit}
        map="moveLoc"
        fromLocName={fromLoc.name}
        toLocName={ToLoc.name}
      >
        <MoveSettingChild
          onChange={onChange}
          time={time}
          checkedVehicleHandler={checkedVehicleHandler}
          checkVehicle={checkVehicle}
        />
      </ModalModule>
    </Container>
  );
};

export default MoveDataDiv;
