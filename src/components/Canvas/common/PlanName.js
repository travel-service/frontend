import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import Pencil from 'lib/Icons/Pencil';

const NamingDiv = styled.div`
  display: flex;
  /* position: relative; */
  margin-top: 15px;
  height: 50px;
  width: 50%;
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.2em;
  height: 40px;
  width: 50%;
  background: none;
  ${(props) =>
    props.disabled ||
    css`
      border: solid 1px gray;
      border-radius: 5px;
    `}
`;

const PencilButton = styled.button`
  border: none;
  margin-left: 3%;
  margin-top: 0.5%;
  height: 70%;
  width: 5%;
  cursor: pointer;
  :hover {
    background: lightgray;
    border-radius: 10px;
  }
`;

const PlanName = () => {
  const [isDisabled, setIsDisabled] = useState(true); // input 활성화
  const [isChecked, setIsChecked] = useState(true); // 펜, 저장 버튼 변경
  const [saveName, setSaveName] = useState(''); // 저장용

  const onClickPencil = () => {
    setIsDisabled(!isDisabled);
    setIsChecked(!isChecked);
    console.log('펜');
  };

  const onClickSave = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
    axios
      .patch('http://localhost:4000/travelPlans/1', {
        //URL 수정
        name: saveName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('저장');
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/travelPlans/1')
      .then(function (response) {
        console.log(response);
        setSaveName(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Naming = (e) => {
    setSaveName(e.target.value);
  };

  return (
    <NamingDiv>
      <StyledInput
        type="text"
        disabled={isDisabled}
        value={saveName}
        onChange={Naming}
      />
      <PencilButton
        type="button"
        onClick={isChecked ? onClickPencil : onClickSave}
      >
        {isChecked ? <Pencil size="20" /> : '저장'}
      </PencilButton>
    </NamingDiv>
  );
};

export default PlanName;