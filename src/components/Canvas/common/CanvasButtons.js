import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/zustand/planStore';
import { Pc, Mobile } from 'lib/custom/responsive';
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineSave,
  MdExitToApp,
} from 'react-icons/md';

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

const MobileBtn = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-around;
  /* flex-grow: 1 1 1 1; */
  .btn {
    flex: 1;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 15px;
    font-weight: 600;
    border: 1px black solid;
    :hover {
      background-color: white;
    }
    .icon {
      /* size: 2rem; */
    }
  }
`;

const Btn = styled(Link)`
  border: 1px solid black;
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
  const onClickExit = () => {
    // postPlan(1);
    postPlan(idx);
    console.log('저장하고 나가기');
  };

  return (
    <>
      <Pc>
        <AllbuttonsDiv>
          <ButtonDiv>
            <ButtonDiv className="prev">
              <Link to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
                {idx !== 0 && (
                  <StyledButton onClick={onClickPrev}>
                    {' '}
                    &lt; 이전으로
                  </StyledButton>
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
                {/*trablock*/}
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
      </Pc>
      <Mobile>
        <MobileBtn>
          {/* 0707 버튼 수정 */}
          {idx !== 0 && (
            <Btn
              className="btn"
              to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}
            >
              <MdArrowBackIosNew className="icon" />
              이전으로
            </Btn>
          )}
          {idx !== 2 && (
            <Btn
              className="btn"
              to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx + 1]}`}
            >
              다음으로 <MdArrowForwardIos className="icon" />
            </Btn>
          )}
          <div className="btn">
            {' '}
            <MdOutlineSave className="icon" /> 저장하기
          </div>
          <Btn className="btn" to={process.env.PUBLIC_URL + `/`}>
            <MdExitToApp className="icon" /> 저장하고 나가기
          </Btn>
        </MobileBtn>
      </Mobile>
    </>
  );
};

export default CanvasButtons;
