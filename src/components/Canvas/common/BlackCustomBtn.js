import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.input`
  width: 100%;
  height: 45px;
  background-color: #ffffff;
  border: 1px solid #010101;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  cursor: pointer;
  :hover {
    background: black;
    color: white;
    transition: 0.2s all linear;
  }
  :active {
    transform: translateY(5px);
  }
  ${(props) =>
    props.color &&
    css`
      background-color: black;
      color: white;
    `}
`;

const BlackCustomBtn = ({ onClick, value, color }) => {
  return <Button type="button" onClick={onClick} value={value} color={color} />;
};

export default BlackCustomBtn;
