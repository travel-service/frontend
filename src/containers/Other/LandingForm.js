import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { useStore } from 'lib/zustand/planStore';

const LandingForm = () => {
  const { setId } = useStore();
  useEffect(() => {
    setId(null);
  }, [setId]);
  return <LandingMainContents />;
};

export default LandingForm;
