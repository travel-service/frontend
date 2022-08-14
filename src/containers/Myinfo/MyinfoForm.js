// zustand로 상태관리...
import React from 'react';
import { useStore } from 'lib/zustand/myStore';
import UserInfoBox from 'components/My/MyInfo';

const MyinfoForm = () => {
  const { getBasic } = useStore();

  return <UserInfoBox getBasic />;
};

export default MyinfoForm;
