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
  } = useStore();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setId(location.state.planId);
      //console.log('planId: ', location.state.planId);
    } else {
      setId(null);
    }
  }, []);

  //리팩토링할 때 store 내 initial 함수로 바꾸기
  useEffect(() => {
    // depart, periods, name, concept, thumbnail 초기화
    if (id === null) {
      setDepart(new Date());
      setPeriods(1);
      setName('');
      setConcept([]);
      setThumbnail('');
    } else {
      getPlan(id);
    }
  }, [id, getPlan]);

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
