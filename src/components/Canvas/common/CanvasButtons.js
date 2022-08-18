import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/zustand/planStore';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const Buttons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const CanvasButtons = ({ siteMap }) => {
  const location = useLocation();
  const { userPlan } = useStore();
  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = Object.keys(siteMap).indexOf(urlName);

  const onClickNext = () => {
    userPlan.name === '' && idx === 0 && alert('여행 이름을 설정해주세요');
  };

  const onClickPrev = () => {
    console.log('prev');
  };

  return (
    <>
      <Buttons>
        <ButtonLink
          to={
            process.env.PUBLIC_URL + `/canvas/${Object.keys(siteMap)[idx - 1]}`
          }
        >
          {idx !== 0 && (
            <StyledButton backColor="white" onClick={onClickPrev}>
              <MdOutlineArrowBackIos /> 이전
            </StyledButton>
          )}
        </ButtonLink>
        <ButtonLink
          to={
            idx === 0 && userPlan.name === ''
              ? process.env.PUBLIC_URL + `/canvas/${Object.keys(siteMap)[idx]}`
              : process.env.PUBLIC_URL +
                `/canvas/${Object.keys(siteMap)[idx + 1]}`
          }
        >
          {idx !== 3 && (
            <StyledButton backColor="black" onClick={onClickNext}>
              다음 <MdOutlineArrowForwardIos />
            </StyledButton>
          )}
        </ButtonLink>
      </Buttons>
    </>
  );
};

export default CanvasButtons;
