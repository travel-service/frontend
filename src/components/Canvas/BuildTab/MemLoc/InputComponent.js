import React from 'react';
import styled, { css } from 'styled-components';
import OpenColor from 'open-color';

const Input = styled.input`
  width: 100%;
  ::placeholder {
    font-weight: 400;
  }
`;

const RadioInput = styled.div`
  padding-right: 15px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  flex: 1;
  ${Input}, ${RadioInput} {
    border-radius: 5px;
    border: none;
    background-color: #ededef;
    height: 45px;
    margin: 5px 0px;
    font-size: 15px;
    text-indent: 15px;
    font-weight: 700;
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
  placeholder,
  name,
  value,
  type,
}) => {
  return (
    <Container>
      {type === 'radio' && (
        <RadioInput>
          <label>{title}</label>
          <div>
            가능
            <input
              onChange={onChange}
              checked={value === 'true'}
              name={name}
              value={true}
              type="radio"
            />
          </div>
          <div>
            불가능
            <input
              type="radio"
              checked={value === 'false'}
              name={name}
              onChange={onChange}
              value={false}
            />
          </div>
        </RadioInput>
      )}
      {type === 'text' && (
        <Input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
        />
      )}
    </Container>
  );
};

export default InputComponent;
