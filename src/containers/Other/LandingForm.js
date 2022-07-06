import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { useStore } from 'lib/zustand/planStore';

const LandingForm = () => {
  const { initializePlanForm } = useStore();

  useEffect(() => {
    initializePlanForm();
  }, []);

  return <LandingMainContents />;
};

export default LandingForm;
