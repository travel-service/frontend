import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/store';

const AllbuttonsDiv = styled.div`
  height: 50px;
  top: 70%;
`;

const ButtonDiv = styled.div`
  text-align: right;
  position: relative;
  top: 20px;
  .next {
    float: right;
    margin-right: 4%;
  }
  .save {
    float: right;
    margin-right: 1%;
  }
  .exit {
    float: right;
    margin-right: 5%;
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
  const [alertText, setAlertText] = useState(true);

  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName);

  useEffect(() => {
    userPlan.depart === '' ? setAlertText(true) : setAlertText(false);
    console.log(userPlan.depart);
  }, [userPlan.depart]);

  /*const onClickSettingNextButton = () => {
    if (alertText) {
      alert('출발일과 도착일을 선택해주세요.');
    } else {
      console.log(userPlan.id);
      //postPlan(userPlan.id);
    }
  };*/

  const onClickNext = () => {
    // 일단 plansetting만
    idx === 0 && alertText // plansetting
      ? alert('출발일과 도착일을 선택해주세요.')
      : console.log('next');
    /*idx === 0 && alertText // plansetting
      ? alert('출발일과 도착일을 선택해주세요.')
      : idx === 1 // blockselect에서 post 발생
      ? postPlan(userPlan.id)
      : console.log('next');*/
    //idx === 0 ? onClickSettingNextButton() : console.log('next');
  };
  const onClickPrev = () => {
    console.log('prev');
  };
  const onClickSave = () => {
    postPlan(userPlan.id);
    console.log('저장하기');
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
        <ButtonDiv className="exit">
          <Link to="/trablock">
            <StyledButton
              onClick={() => {
                onClickSave();
              }}
            >
              저장하고 나가기
            </StyledButton>
          </Link>
        </ButtonDiv>
        <ButtonDiv className="save">
          <StyledButton
            onClick={() => {
              onClickSave();
            }}
          >
            저장
          </StyledButton>
        </ButtonDiv>
        <ButtonDiv className="next">
          <Link
            to={
              process.env.PUBLIC_URL +
              `/canvas/${
                alertText ? siteMap[idx] : siteMap[idx + 1]
                //alertText ? siteMap[idx] : siteMap[idx + 1]
                /*idx === 3
                  ? siteMap[3]
                  : alertText
                  ? siteMap[idx]
                  : siteMap[idx + 1]*/
              }`
            }
          >
            {idx !== 3 && (
              <StyledButton
                onClick={() => {
                  onClickNext();
                }}
              >
                다음으로 &gt;
              </StyledButton>
            )}
          </Link>
        </ButtonDiv>
      </ButtonDiv>
    </AllbuttonsDiv>
  );
};

export default CanvasButtons;
