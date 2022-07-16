import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/zustand/planStore';

const AllbuttonsDiv = styled.div`
  height: 50px;
  top: 80%;
`;

const ButtonDiv = styled.div`
  text-align: right;
  position: relative;
  top: 15%;
  .next {
    float: left;
    margin-left: 70%;
  }
  .exit {
    float: right;
    margin-right: 7%;
  }
  .prev {
    float: left;
    margin-left: 5%;
  }
`;

const siteMap = ['setting', 'select', 'build', 'share'];

const CanvasButtons = () => {
  const location = useLocation();
  const { userPlan, postPlan } = useStore();
  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName);

  const onClickNext = (idx) => {
    userPlan.name === '' ? alert('여행 이름을 입력해주세요.') : postPlan(idx);
  };
  const onClickPrev = () => {
    console.log('prev');
  };
  const onClickExit = () => {
    postPlan(idx);
    console.log('저장하고 나가기');
  };

  return (
    <AllbuttonsDiv>
      <ButtonDiv>
        <ButtonDiv className="prev">
          <Link to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
            {idx !== 0 && (
              <StyledButton onClick={onClickPrev}> &lt; 이전으로</StyledButton>
            )}
          </Link>
        </ButtonDiv>
        <ButtonDiv className="next">
          <Link
            to={
              userPlan.name === ''
                ? process.env.PUBLIC_URL + `/canvas/${siteMap[0]}`
                : process.env.PUBLIC_URL +
                  `/canvas/${idx === 3 ? siteMap[3] : siteMap[idx + 1]}`
            }
          >
            {idx !== 3 && (
              <StyledButton
                onClick={() => {
                  onClickNext(0);
                }}
              >
                다음으로 &gt;
              </StyledButton>
            )}
          </Link>
        </ButtonDiv>
        <ButtonDiv className="exit">
          <Link to="/trablock">
            <StyledButton
              onClick={() => {
                onClickExit();
              }}
            >
              저장하고 나가기
            </StyledButton>
          </Link>
        </ButtonDiv>
      </ButtonDiv>
    </AllbuttonsDiv>
  );
};

export default CanvasButtons;
