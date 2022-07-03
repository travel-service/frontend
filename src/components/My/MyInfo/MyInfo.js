import React from 'react';
import styled from 'styled-components';
import Profile from '../img/profile2.jpg';

const MyInfoBox = styled.div`
  display: flex;
  // float: left;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 308px;
  height: 487px;
  // height: 100%;
  // width: 20%;
  margin: 10px;
  border: 1.5px solid rgba(241, 107, 108, 0.2);
`;

const MyInfoProfile = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 70%;
  //height: 70%;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const MyInfoMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
`;

const MyInfoName = styled.div`
  padding: 10px;
  font-size: 29px;
  font-weight: bold;
`;

const MyInfo = () => {
  return (
    <MyInfoBox>
      <MyInfoProfile src={Profile}></MyInfoProfile>
      <MyInfoName>모제링링</MyInfoName>
      <MyInfoMessage>
        <p>여행은 즐기는 것! 신난다!</p>
      </MyInfoMessage>
      <hr color="#d3d3d3" size="3" width="80%" />
    </MyInfoBox>
  );
};

export default MyInfo;
