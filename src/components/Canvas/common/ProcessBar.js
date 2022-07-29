import React from 'react';
import styled, { css } from 'styled-components';
import BlackCustomBtn from './BlackCustomBtn';
import { MdExitToApp, MdOutlineSave } from 'react-icons/md';
import { useStore } from 'lib/zustand/planStore';

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

  @media screen and (max-width: 1023px) {
    height: 70px;
  }

  @media screen and (max-width: 767px) {
    margin: 0 20px 8px 20px;
    height: 50px;
  }
`;

const Process = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
  }
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

  @media screen and (max-width: 1023px) {
    width: 115px;
    font-size: 13px;
  }

  @media screen and (max-width: 767px) {
    height: 40px;
    width: 90px;
    padding-left: 5px;
    ${(props) =>
      props.index !== props.now &&
      css`
        display: none;
      `}
  }
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
      @media screen and (max-width: 767px) {
        right: -10px;
        border-left: 10px solid #f75d5d;
      }
    `};

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 767px) {
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const ProcessBar = ({ type, siteMap }) => {
  const { postPlan } = useStore();

  // 0726 작성 중 수정 필요
  const save = async () => {
    await postPlan(Object.keys(siteMap).indexOf(type));
  };

  // const saveLeave = () => {
  //   save();
  //   // 성공시 리다이렉트
  // };

  return (
    <Container>
      <Process>
        {Object.keys(siteMap).map((e, i) => (
          <React.Fragment key={e}>
            <Sequence index={i} now={Object.keys(siteMap).indexOf(type)}>
              {siteMap[e]}
              <Arrow index={i} now={Object.keys(siteMap).indexOf(type)}></Arrow>
            </Sequence>
          </React.Fragment>
        ))}
      </Process>
      <Buttons>
        {/* 0726 기능 구현 아직 */}
        <BlackCustomBtn
          onClick={save}
          value={
            <>
              <MdOutlineSave size="20px" style={{ marginRight: '10px' }} />
              <div>저장하기</div>
            </>
          }
          type="button"
        />
        <BlackCustomBtn
          value={
            <>
              <MdExitToApp size="20px" style={{ marginRight: '10px' }} />
              <>저장하고 나가기</>
            </>
          }
          color="true"
          type="button"
        />
      </Buttons>
    </Container>
  );
};

export default ProcessBar;

// 접근 제한 레퍼런스
// https://cotak.tistory.com/108
// https://velog.io/@poseassome/Router-%EC%A0%91%EA%B7%BC-%EC%A0%9C%ED%95%9C-%EA%B5%AC%ED%98%84
