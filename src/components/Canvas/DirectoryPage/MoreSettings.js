import { dirStore } from 'lib/dirStore';
import React from 'react';
import styled from 'styled-components';

const PlanControl = styled.div`
  background: yellow;
  width: 300px;
`;

const MoreSettings = ({ closeModal }) => {
  const { userDirs } = dirStore();

  const onClickMove = () => {
    console.log('담기');
    closeModal();
  };

  return (
    <PlanControl>
      <button
        onClick={() => {
          onClickMove();
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          onClickMove();
        }}
      >
        복사
      </button>
      <button
        onClick={() => {
          onClickMove();
        }}
      >
        담기
      </button>
    </PlanControl>
  );
};

export default MoreSettings;
