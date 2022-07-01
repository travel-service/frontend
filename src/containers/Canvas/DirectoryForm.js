import React, { useEffect } from 'react';
import PlanList from 'components/Canvas/DirectoryPage/PlanList';
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
  }, []);

  return (
    <DirContainer>
      <DirectoryList />
      <PlanList />
    </DirContainer>
  );
};

export default DirectoryPage;
