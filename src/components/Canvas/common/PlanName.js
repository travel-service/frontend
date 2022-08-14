import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Pencil from 'lib/Icons/Pencil';
import { useStore } from 'lib/zustand/planStore';

const NamingDiv = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
  height: 50px;
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
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
  height: 85%;
  width: 6%;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background: lightgray;
  }
`;

const PlanName = ({ userPlan, setName }) => {
  const [isDisabled, setIsDisabled] = useState(true); // input 활성화
  const [isChecked, setIsChecked] = useState(true); // 펜, 저장 버튼 변경
  const [nameText, setNameText] = useState('');
  const { id, postPlan } = useStore();

  useEffect(() => {
    if (userPlan.name && id) {
      return setNameText(userPlan.name);
    }
  }, [userPlan.name]);

  const onClickPencil = () => {
    setIsDisabled(!isDisabled);
    setIsChecked(!isChecked);
  };

  const onClickSave = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
    setName(nameText);
    nameText !== '' && postPlan(0); // 플랜 생성
  };

  const Naming = (e) => {
    setNameText(e.target.value);
  };

  return (
    <NamingDiv>
      <StyledInput
        type="text"
        placeholder={'새 여행 보관함'}
        disabled={isDisabled}
        value={nameText}
        onChange={Naming}
      />
      <PencilButton
        type="button"
        onClick={() => {
          isChecked ? onClickPencil() : onClickSave();
        }}
      >
        {isChecked ? <Pencil size="20" /> : '저장'}
      </PencilButton>
    </NamingDiv>
  );
};

export default PlanName;
