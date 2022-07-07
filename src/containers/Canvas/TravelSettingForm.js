import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import PlanName from 'components/Canvas/common/PlanName';
import React, { useEffect } from 'react';
import { useStore } from 'lib/zustand/planStore';
import styled from 'styled-components';

const StyledDiv = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
  }
`;
const TravelSettingForm = () => {
  // 여행 계획 이어서 버튼 누르면
  const { userPlan, userPlanConcept, Concepts } = useStore();
  const { setDepart, setPeriods, setConcept, setThumbnail, setName } =
    useStore();

  /*useEffect(() => {
    // 컨셉 초기화?
  }, []);*/

  return (
    <div>
      <PlanName userPlan={userPlan} setName={setName} />
      <DateSetting
        userPlan={userPlan}
        setDepart={setDepart}
        setPeriods={setPeriods}
      />
      <StyledDiv>
        <ConceptSetting
          userPlanConcept={userPlanConcept}
          Concepts={Concepts}
          setConcept={setConcept}
        />
        <ImageSetting userPlan={userPlan} setThumbnail={setThumbnail} />
      </StyledDiv>
    </div>
  );
};

export default TravelSettingForm;
