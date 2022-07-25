import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  border: 1px blue solid;
  margin: 0 30px 25px 30px;
  background: #f6f6f8;
  border: 1px solid #ddddde;
  border-radius: 10px;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    margin: 0 20px 8px 20px;
  }
`;

const Process = styled.div`
  display: flex;
  align-items: center;
`;

const Sequence = styled.div`
  height: 40px;
  width: 155px;
  border-radius: 5px 0px 0px 5px;
  border: 1px solid #ddddde;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-left: 35px;
  background-color: #e5e7e8;
  color: black;
  ${(props) =>
    props.index !== '0' &&
    css`
      border-radius: 0px;
    `}
  ${(props) =>
    props.index < props.now &&
    css`
      background-color: #e14040;
      color: white;
      border: none;
    `}
    ${(props) =>
    props.index === props.now &&
    css`
      background-color: #f75d5d;
      color: white;
      border: none;
    `};
`;

const Arrow = styled.div`
  position: relative;
  right: -20px;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #e5e7e8;
  ${(props) =>
    props.index < props.now &&
    css`
      border-left: 20px solid #e14040;
      color: white;
    `}
  ${(props) =>
    props.index === props.now &&
    css`
      border-left: 20px solid #f75d5d;
      color: white;
    `};
`;

const Buttons = styled.div``;

const Button = styled.button`
  margin-left: 10px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
`;

const ProcessBar = ({ type, siteMap }) => {
  return (
    <Container>
      <Process>
        {Object.keys(siteMap).map((e, i) => (
          <>
            <Sequence
              key={i}
              index={i}
              now={Object.keys(siteMap).indexOf(type)}
            >
              {siteMap[e]}
              <Arrow index={i} now={Object.keys(siteMap).indexOf(type)}></Arrow>
            </Sequence>
          </>
        ))}
      </Process>
      <Buttons>
        {/* 커스텀 버튼 사용 수정 필요 0726 */}
        <Button>저장하기</Button>
        <Button>저장하고 나가기</Button>
      </Buttons>
    </Container>
  );
};

export default ProcessBar;
