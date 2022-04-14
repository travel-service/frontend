import React from 'react';
import { Link, useLocation } from 'react-router-dom';
//import axios from 'axios';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/store';

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
  const { postPlan } = useStore();

  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName.substring(8)); //substring(8) 추가

  // 다음 버튼: post 에러로 patch 사용
  const onClickSettingNextButton = (id) => {
    postPlan(id);
  };

  const onClickNext = (idx) => {
    idx === 0 ? onClickSettingNextButton(1) : console.log('next');
  };
  const onClickPrev = () => {
    console.log('prev');
  };

  return (
    <AllbuttonsDiv>
      <ButtonDiv>
        <ButtonDiv className="prev">
          {/*찬우님 코드*/}
          <Link to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
            {idx !== 0 && (
              <StyledButton onClick={onClickPrev}> &lt; 이전으로</StyledButton>
            )}
          </Link>
        </ButtonDiv>
        <ButtonDiv className="next">
          <Link
            to={
              process.env.PUBLIC_URL +
              `/canvas/${idx === 3 ? siteMap[3] : siteMap[idx + 1]}`
            }
          >
            {idx !== 3 && (
              <StyledButton
                onClick={() => {
                  onClickNext(idx);
                }}
              >
                다음으로 &gt;
              </StyledButton>
            )}
          </Link>
        </ButtonDiv>
        <ButtonDiv className="exit">
          <Link to="/trablock">
            <StyledButton onClick={() => console.log('나가기')}>
              저장하고 나가기
            </StyledButton>
          </Link>
        </ButtonDiv>
      </ButtonDiv>
    </AllbuttonsDiv>
  );
};

export default CanvasButtons;
