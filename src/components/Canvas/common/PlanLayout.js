import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomCheckbox from 'lib/custom/CustomCheckbox';

// 플랜 레이아웃(이름, 기간, 날짜, 썸네일(호버 시 정보), 이동/복사/담기 버튼)
const PlanContainer = styled.div`
  width: 246px;
  //width: 24%;
  height: 260px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  padding: 15px;
`;
const PlanNameDiv = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  align-items: center;
  margin-top: 14px;
`;
const PeriodsContainer = styled.div`
  position: absolute;
  margin-top: 15px;
  margin-left: 145px;
`;
const PeriodsDiv = styled.div`
  background: #000000;
  opacity: 0.69;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
  border-radius: 20px;
`;
const ThumbnailContainer = styled.div`
  width: 216px;
  height: 150px;
  border-radius: 10px;
  background: #efefef;
`;
const LinkContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 11px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 216px;
  height: 150px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  z-index: 1;
`;
const LinkButton = styled(Link)`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;

  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 10px;

  width: 70%;
  cursor: pointer;
`;
const DateDiv = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #7e7e7e;
  margin-top: 10px;
`;
const PlanTitleDiv = styled.div`
  display: flex;
  justify-content: right;
`;
// 설정(점세개) div
const MoreDiv = styled.div`
  text-align: right;
  position: absolute;
  z-index: 2;
`;
// 설정 버튼
const MoreButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const PlanControlUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
`;
const PlanControlLi = styled.li`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  decoration: none;
  padding: 10px 20px 10px 20px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;
const SubUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
  width: 148px;
  margin-left: -150px;
  margin-top: -52px;
  z-index: 2;
  // left: 90px;
  //top: 23px;
`;
const MoveLi = styled.li`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  text-align: left;

  decoration: none;
  padding: 10px 15px 10px 15px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const PlanLayout = ({
  planId,
  name,
  periods,
  createdDate,

  userDirs,
  checkedPlans,
  setCheckedPlans,
  postMovePlans,
  postTrash,
  postRevert,
  currentDirId,
  deletePlan,

  myP,
}) => {
  const [clickMore, setClickMore] = useState(false); // 담기클릭
  const [isShow, setIsShow] = useState(false); // 점세개 클릭
  const [isOver, setIsOver] = useState(false); // 마우스오버 버튼
  const moreRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', onClickPlans);
    return () => {
      document.removeEventListener('mousedown', onClickPlans);
    };
  });

  const onClickPlans = (e) => {
    if (moreRef.current && !moreRef.current.contains(e.target)) {
      setCheckedPlans([]);
      setIsShow(false);
      setClickMore(false);
    }
  };
  const onChangeCheck = (checked, i) => {
    if (checked) {
      setCheckedPlans([...checkedPlans, i]);
    } else {
      setCheckedPlans(checkedPlans.filter((e) => e !== i));
    }
  };
  const ConfirmDel = (m, t) => {
    if (window.confirm(m)) {
      t ? deletePlan() : postTrash();
      setCheckedPlans([]);
      setIsShow(false);
      setClickMore(false);
    }
  };

  return (
    <PlanContainer>
      <PeriodsContainer>
        <PeriodsDiv>{periods}일</PeriodsDiv>
      </PeriodsContainer>
      <ThumbnailContainer // 마우스 올리면 컴포넌트 나오게
        onMouseEnter={() => {
          setIsOver(!isOver);
        }}
        onMouseLeave={() => {
          setIsOver(!isOver);
        }}
      >
        {isOver && (
          <LinkContainer>
            <LinkButton
              to={process.env.PUBLIC_URL + '/canvas/check'}
              state={{ planId: planId }}
            >
              완성된 여행 보기
            </LinkButton>
            <LinkButton
              to={process.env.PUBLIC_URL + '/canvas/setting'}
              state={{ planId: planId }}
            >
              수정하기
            </LinkButton>
          </LinkContainer>
        )}
      </ThumbnailContainer>
      <PlanNameDiv>
        {myP ? (
          ''
        ) : (
          <CustomCheckbox
            circle={true}
            id={planId}
            onChange={(e) => {
              onChangeCheck(e.target.checked, planId);
            }}
            checked={
              checkedPlans && checkedPlans.includes(planId) ? true : false
            }
          />
        )}
        {name.length > 10 ? name.substr(0, 10) + '...' : name}
      </PlanNameDiv>
      <DateDiv>{createdDate.replace(/-/g, '.')}</DateDiv>
      {myP ? (
        ''
      ) : (
        <PlanTitleDiv>
          <MoreDiv>
            <MoreButton
              onClick={() => {
                setIsShow(!isShow);
                !checkedPlans.includes(planId)
                  ? onChangeCheck(!isShow, planId)
                  : setCheckedPlans([planId]);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/images/more_ico.png'}
                alt="더보기"
              />
            </MoreButton>
            {currentDirId === 'm'
              ? isShow && (
                  <PlanControlUl ref={moreRef}>
                    <PlanControlLi
                      onMouseOver={() => {
                        setClickMore(false);
                      }}
                      onClick={() => {
                        ConfirmDel(
                          '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                          0,
                        );
                      }}
                    >
                      삭제
                    </PlanControlLi>
                    <PlanControlLi
                      onMouseOver={() => {
                        setClickMore(true);
                      }}
                    >
                      담기
                    </PlanControlLi>
                  </PlanControlUl>
                )
              : currentDirId === 't'
              ? isShow && (
                  <PlanControlUl ref={moreRef}>
                    <PlanControlLi
                      onClick={() => {
                        ConfirmDel('플랜을 영구 삭제하시겠습니까?', 1);
                      }}
                    >
                      삭제
                    </PlanControlLi>
                    <PlanControlLi
                      onClick={() => {
                        postRevert();
                        setIsShow(false);
                        setClickMore(false);
                        alert("플랜을 '모든 여행'으로 복원했습니다.");
                      }}
                    >
                      복원
                    </PlanControlLi>
                  </PlanControlUl>
                )
              : isShow && (
                  <PlanControlUl ref={moreRef}>
                    <PlanControlLi
                      onClick={() => {
                        ConfirmDel(
                          '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                          0,
                        );
                      }}
                    >
                      삭제
                    </PlanControlLi>
                  </PlanControlUl>
                )}
            {isShow && clickMore && userDirs.mainUserDirectory.length > 0 ? (
              <SubUl ref={moreRef}>
                {userDirs.mainUserDirectory.map((item) => {
                  return (
                    <MoveLi
                      key={item.userDirectoryId}
                      onClick={() => {
                        postMovePlans(item.userDirectoryId);
                        setIsShow(false);
                        setClickMore(false);
                        alert(`플랜이 ${item.directoryName}에 담겼습니다.`);
                      }}
                    >
                      <img
                        style={{ marginRight: '5px' }}
                        src={process.env.PUBLIC_URL + '/images/folder_ico.png'}
                      />
                      {item.directoryName.length > 5
                        ? item.directoryName.substr(0, 5) + '...'
                        : item.directoryName}
                    </MoveLi>
                  );
                })}
              </SubUl>
            ) : (
              isShow &&
              clickMore &&
              userDirs.mainUserDirectory.length === 0 && (
                <SubUl>담을 보관함이 없습니다.</SubUl>
              )
            )}
          </MoreDiv>
        </PlanTitleDiv>
      )}
    </PlanContainer>
  );
};

export default PlanLayout;
