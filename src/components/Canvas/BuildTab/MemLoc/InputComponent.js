import React from 'react';
import styled, { css } from 'styled-components';
import OpenColor from 'open-color';
import { MdSearch } from 'react-icons/md';

const Input = styled.input`
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
  display: flex;
  width: 100%;
  margin: 5px 0px;
  background-color: #ededef;
  border-radius: 5px;
  align-items: center;

  ${Input}, ${RadioInput} {
    /* width: 90%; */
    flex: 1;
    border: none;
    background-color: #ededef;
    height: 45px;
    font-size: 15px;
    text-indent: 15px;
    font-weight: 700;
    border-radius: 5px;
    :focus {
      outline: none;
    }
  }
`;

const SearchBtn = styled(MdSearch)`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  margin-right: 10px;
`;

const InputComponent = ({
  title,
  onChange,
  placeholder,
  name,
  value,
  type,
  map,
  onClickAddress,
  search,
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
      {type === 'text' && map && (
        <>
          <Input
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled
          />
          <SearchBtn size="20px" onClick={onClickAddress} />
        </>
      )}
      {type === 'text' && !map && (
        <Input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
          type="text"
        />
      )}
    </Container>
  );
};

export default InputComponent;
