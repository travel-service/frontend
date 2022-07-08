import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { useStore } from 'lib/zustand/planStore';

const LandingForm = () => {
  const { id, setId } = useStore();
  useEffect(() => {
    setId(null);
    console.log(id);
  }, [setId, id]);
  return <LandingMainContents />;
};

export default LandingForm;
