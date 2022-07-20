import React, { useEffect } from 'react';
import MainArea from 'components/Canvas/BuildTab/MainArea';
import { useStore } from 'lib/zustand/planStore';
import { buildStore } from 'lib/zustand/CanvasBuildStore';
import { memLocStore } from 'lib/zustand/memberLocStore';

const BuildBlockForm = ({ idx }) => {
  const { memberLocations } = memLocStore();
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
      memberLocations={memberLocations}
    />
  );
};

export default BuildBlockForm;
