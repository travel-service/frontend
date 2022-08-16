import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import PlanName from 'components/Canvas/common/PlanName';
import React, { useEffect } from 'react';
import { useStore } from 'lib/zustand/planStore';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const StyledDiv = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
  }
`;
const TravelSettingForm = () => {
  const { id, userPlan, conceptForm, Concepts } = useStore();
  const {
    setId,
    setDepart,
    setPeriods,
    setConcept,
    setThumbnail,
    setName,
    getPlan,
    initializePlanForm,
    postPlan,
  } = useStore();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setId(location.state.planId);
      id && getPlan(id);
    } else {
      initializePlanForm();
      setDepart(new Date());
    }
  }, [id]);

  useEffect(() => {
    return () => {
      postPlan(0);
    };
  }, []);

  return (
    <div>
      <PlanName
        userPlan={userPlan}
        id={id}
        setName={setName}
        postPlan={postPlan}
      />
      <DateSetting
        userPlan={userPlan}
        setDepart={setDepart}
        setPeriods={setPeriods}
      />
      <StyledDiv>
        <ConceptSetting
          conceptForm={conceptForm}
          Concepts={Concepts}
          setConcept={setConcept}
        />
        <ImageSetting userPlan={userPlan} setThumbnail={setThumbnail} />
      </StyledDiv>
    </div>
  );
};

export default TravelSettingForm;
