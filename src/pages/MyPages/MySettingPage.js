import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MySetting from 'components/My/MySetting/MyEdit';

const MySettingPage = () => {
  return (
    <div>
      <MyTemplate>
        <MySetting />
      </MyTemplate>
    </div>
  );
};

export default MySettingPage;
