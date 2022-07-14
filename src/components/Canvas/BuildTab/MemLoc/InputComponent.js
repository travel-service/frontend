import React from 'react';
import styled, { css } from 'styled-components';
import OpenColor from 'open-color';

const Div = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  width: 35%;
`;

const EssenSpan = styled.span`
  color: red;
`;

const Input = styled.input`
  height: 45px;
  border-radius: 5px;
  border: none;
  background-color: #ededef;
  font-size: 15px;
  text-indent: 15px;
  font-weight: 700;
  margin: 5px 0px;
  ::placeholder {
    font-weight: 400;
  }
`;

const Textarea = styled.textarea`
  width: 65%;
  ${(props) =>
    !props.sub &&
    props.value !== '' &&
    css`
      border: 2.5px ${OpenColor.teal[4]} solid;
      border-radius: 5px;
    `}
`;

const InputComponent = ({
  title,
  onChange,
  val,
  id,
  placeholder,
  essen, // 필수항목인지 ?
  report,
  sub,
}) => {
  return <Input placeholder={placeholder} />;
};

export default InputComponent;
