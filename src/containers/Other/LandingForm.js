import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { useStore } from 'lib/zustand/planStore';
import { memLocStore } from 'lib/zustand/memberLocStore';

const LandingForm = () => {
  const { initializePlanForm } = useStore();
  const { initializeMemberForm } = memLocStore();

  useEffect(() => {
    initializePlanForm();
    initializeMemberForm();
  }, []);

  return <LandingMainContents />;
};

export default LandingForm;
