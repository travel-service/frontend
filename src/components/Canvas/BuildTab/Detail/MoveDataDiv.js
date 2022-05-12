import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMode } from 'react-icons/md';
import 'lib/styles/Modal.css';
import ModalModule from 'components/common/modal/ModalModule';
import MoveSettingChild from './MoveSettingChild';
import { useStore } from 'lib/store';
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';

const Container = styled.div`
  position: relative;
  width: 500px; // 이동 데이터 풍선과 관련
`;

const Div = styled.div`
  position: absolute;
  // 수정 예정 0317
  left: 270px;
  top: -20px;
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
`;

const MoveDataDiv = ({ day, index }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userTravelDay, setTimeData, setViewTime, splitTime } = useStore();
  const locMovingInfo = userTravelDay.travelDay[day][index].movingData;
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
        <Div>
          <Span>
            <MdMode onClick={openModal} />
          </Span>
        </Div>
      )}
      {locMovingInfo['movingTime'] !== undefined && (
        <Div>
          <Span>
            <BubbleDiv>
              <BubbleDiv margin>
                {renderSwitch(locVehicle)}
                {locMovingInfo['movingTime'] && (
                  <TimeDiv>{setViewTime(locMovingInfo['movingTime'])}</TimeDiv>
                )}
                <MdMode onClick={openModal} size="20px" />
              </BubbleDiv>
            </BubbleDiv>
          </Span>
        </Div>
      )}
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="이동수단"
        onSubmit={onSubmit}
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
