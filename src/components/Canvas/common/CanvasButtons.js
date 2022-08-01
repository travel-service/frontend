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

const siteMap = ['setting', 'select', 'build', 'share'];

const CanvasButtons = () => {
  const location = useLocation();
  const { postPlan } = useStore();
  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName);

  // const onClickSettingNextButton = () => {
  //   // postPlan(2);
  //   postPlan(idx);
  // };

  const onClickNext = (idx) => {
    // idx === 0 ? onClickSettingNextButton() : console.log('next');
    postPlan(idx);
  };

  const onClickPrev = () => {
    console.log('prev');
  };

  // const onClickExit = () => {
  //   // postPlan(1);
  //   postPlan(idx);
  //   console.log('저장하고 나가기');
  // };

  return (
    <>
      <Buttons>
        <ButtonLink to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
          {idx !== 0 && (
            <StyledButton backColor="white" onClick={onClickPrev}>
              <MdOutlineArrowBackIos /> 이전
            </StyledButton>
          )}
        </ButtonLink>
        <ButtonLink
          to={
            process.env.PUBLIC_URL +
            `/canvas/${idx === 3 ? siteMap[3] : siteMap[idx + 1]}`
          }
        >
          {idx !== 2 && (
            <StyledButton
              backColor="black"
              onClick={() => {
                onClickNext(0);
              }}
            >
              다음 <MdOutlineArrowForwardIos />
            </StyledButton>
          )}
        </ButtonLink>
      </Buttons>
    </>
  );
};

export default CanvasButtons;
