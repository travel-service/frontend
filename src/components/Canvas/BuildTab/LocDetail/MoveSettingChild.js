import React from 'react';
import styled from 'styled-components';
import CustomRadio from 'lib/custom/CustomRadio';

const Container = styled.div`
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  width: 290px;
`;

const VehicleDiv = styled.div``;

const Time = styled.div`
  width: 100%;
`;

const TimeInputs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TimeInput = styled.input`
  height: 45px;
  width: 40%;
  margin-right: 13px;
`;

const vehicleList = {
  car: '자동차',
  bus: '버스',
  bike: '자전거',
  walk: '도보',
};

const MoveSettingChild = ({
  onChange,
  time,
  checkedVehicleHandler,
  checkVehicle,
}) => {
  const { hour, min } = time;

  return (
    <Container>
      <VehicleDiv>
        <CustomRadio
          dataObj={vehicleList}
          onClick={checkedVehicleHandler}
          check={checkVehicle}
        />
      </VehicleDiv>
      <Time>
        {/* <div>이동 시간</div> */}
        <TimeInputs>
          <TimeInput
            type="number"
            onChange={onChange}
            placeholder="시간"
            name="hour"
            value={hour}
            min="0"
            max="23"
          />
          <TimeInput
            type="number"
            onChange={onChange}
            placeholder="분"
            name="min"
            value={min}
            min="0"
            max="59"
          />
        </TimeInputs>
        <div>
          {parseInt(hour) > 0 ? `${hour}시간` : ''}
          {parseInt(min) > 0 ? ` ${min}분` : ''}
          {parseInt(hour) > 0 || parseInt(min) > 0 ? ' 이동 예상' : ''}
        </div>
      </Time>
    </Container>
  );
};

export default MoveSettingChild;

// https://goddino.tistory.com/229
