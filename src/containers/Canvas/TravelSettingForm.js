import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { DestSetting } from 'components/Canvas/SettingTab/DestSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import React from 'react';
import { useStore } from 'lib/store';

const TravelSettingForm = () => {
  const { userPlan } = useStore();
  console.log(userPlan);
  return (
    <div>
      <DateSetting />
      <DestSetting />
      <div style={{ display: 'flex' }}>
        <ConceptSetting />
        <ImageSetting />
      </div>
    </div>
  );
};

export default TravelSettingForm;
