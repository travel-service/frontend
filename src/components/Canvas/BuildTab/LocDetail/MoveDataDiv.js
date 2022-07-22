import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdOutlineMode } from 'react-icons/md';
import 'lib/styles/Modal.css';
import ModalModule from 'components/common/modal/ModalModule';
import MoveSettingChild from './MoveSettingChild';
import MapMove from 'components/Canvas/BuildTab/Map/MapMove';

const Container = styled.div`
  background: #f6f6f8;
  border-radius: 60px;
  :hover {
    cursor: pointer;
  }
`;

const Contents = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;

  @media screen and (max-width: 767px) {
    /* left: 65%; */
  }
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  /* width: 800px; */
  @media screen and (max-width: 1023px) {
    flex-direction: column-reverse;
  }
`;

const PencilIcon = styled(MdOutlineMode)`
  margin-left: 7px;
`;

const MoveDataDiv = ({
  day,
  index,
  userTravelDay,
  setTimeData,
  setViewTime,
  splitTime,
}) => {
  const fromLoc = userTravelDay.travelDay[day][index];
  const ToLoc = userTravelDay.travelDay[day][index + 1];
  const locMovingInfo = fromLoc.movingData;
  const locVehicle = locMovingInfo.vehicle;
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const checkedVehicleHandler = (type) => {
    console.log('짠:', checkVehicle);
    if (checkVehicle === type) {
      console.log('여기');
      setCheckVehicle(null);
    } else {
      setCheckVehicle(type);
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
    console.log('test', modalIsOpen);
    setModalIsOpen(false);
  };

  const closeTest = () => {
    console.log('test', modalIsOpen);
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

  return (
    <Container onClick={openModal}>
      {locMovingInfo['movingTime'] !== undefined && (
        <Contents>
          {locMovingInfo['movingTime'] && (
            <>
              {locVehicle && locVehicle + '로 이동, '}
              {setViewTime(locMovingInfo['movingTime'])}
            </>
          )}
          <PencilIcon onClick={openModal} size="20px" />
        </Contents>
      )}
      <ModalModule
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="이동 수단 / 시간"
        onSubmit={onSubmit}
        map="moveLoc"
        fromLocName={fromLoc.name}
        toLocName={ToLoc.name}
        closeTest={closeTest}
      >
        <FlexBox>
          <MoveSettingChild
            onChange={onChange}
            time={time}
            checkedVehicleHandler={checkedVehicleHandler}
            checkVehicle={checkVehicle}
          />
          <MapMove fromLocName={fromLoc.name} toLocName={ToLoc.name} />
        </FlexBox>
      </ModalModule>
    </Container>
  );
};

export default MoveDataDiv;
