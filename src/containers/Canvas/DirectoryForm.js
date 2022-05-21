import React from 'react';
import PlanList from 'components/Canvas/DirectoryPage/PlanList';
import DirectoryList from 'components/Canvas/DirectoryPage/DirectoryList';
import styled from 'styled-components';

const DirContainer = styled.div`
  display: flex;
  margin-top: 8%;
  height: 100vh;
`;
const DirectoryPage = () => {
  return (
    <DirContainer>
      <DirectoryList />
      <PlanList />
    </DirContainer>
  );
};

export default DirectoryPage;
