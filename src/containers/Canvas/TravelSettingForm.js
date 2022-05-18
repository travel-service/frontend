import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { DestSetting } from 'components/Canvas/SettingTab/DestSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import PlanName from 'components/Canvas/common/PlanName';
import React, { useEffect } from 'react';
import { useStore } from 'lib/store';
import styled from 'styled-components';

const StyledDiv = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
  }
`;

const TravelSettingForm = () => {
  // 여행 계획 이어서 버튼 누르면
  const { userPlan, getPlan } = useStore();

  useEffect(() => {
    if (userPlan.id !== '') {
      getPlan(userPlan.id);
    }
    //userPlan.id ? getPlan(userPlan.id) : '';
  }, []);

  return (
    <div>
      <PlanName />
      <DateSetting />
      <DestSetting />
      <StyledDiv>
        <ConceptSetting />
        <ImageSetting />
      </StyledDiv>
    </div>
  );
};

export default TravelSettingForm;
