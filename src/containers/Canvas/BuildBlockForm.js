import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainArea from 'components/Canvas/BuildTab/MainArea';
import palette from 'lib/styles/palette';
import { useStore } from 'lib/zustand/planStore';
import { buildStore } from 'lib/zustand/CanvasBuildStore';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${palette.gray[3]};
  height: 70vh;
  width: 100vw;
  border: 1px solid blue;
`;

// export let travelPlan = {};

const BuildBlockForm = ({ idx }) => {
  const { category, selCateLoc, userTravelDay, getPlanDays, postPlan, id } =
    useStore();
  const {
    dayLocDel,
    pushLocToDay,
    dayLocChange,
    setViewTime,
    setTimeData,
    splitTime,
  } = buildStore();

  // 앞부분 api 설정이 되면 작성 예정(0518)
  useEffect(() => {
    // get api
    getPlanDays(id);
    return () => {
      postPlan(idx);
    };
  }, []);

  return (
    <Container>
      <MainArea
        category={category}
        pushLocToDay={pushLocToDay}
        dayLocChange={dayLocChange}
        selCateLoc={selCateLoc}
        dayLocDel={dayLocDel}
        setViewTime={setViewTime}
        userTravelDay={userTravelDay}
        setTimeData={setTimeData}
        splitTime={splitTime}
      />
    </Container>
  );
};

export default BuildBlockForm;
