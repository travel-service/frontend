import React, { useEffect } from 'react';
import MainPlanList from 'components/Canvas/DirectoryPage/MainPlanList';
import DirectoryList from 'components/Canvas/DirectoryPage/DirectoryList';
import styled from 'styled-components';
import { dirStore } from 'lib/dirStore';

//디렉토리 목록 데이터 get
const DirContainer = styled.div`
  display: flex;
  margin-top: 8%;
  height: 80vh;
`;
/*const PlanContainer = styled.div`
  display: flex;
  width: 80%;
  background: blue;
`;*/

const DirectoryPage = () => {
  const { getMainPlans, getUserDirs, getTrashPlans } = dirStore();

  useEffect(() => {
    getMainPlans();
    getUserDirs();
    getTrashPlans();
    //console.log(mainPlans);
  }, []);

  return (
    <DirContainer>
      <DirectoryList />
      <MainPlanList />
    </DirContainer>
  );
};

export default DirectoryPage;
