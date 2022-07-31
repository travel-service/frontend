import React, { useEffect } from 'react';
import PlanList from 'components/Canvas/DirectoryPage/PlanList';
import DirectoryList from 'components/Canvas/DirectoryPage/DirectoryList';
import PageTemplate from 'components/common/PageTemplate';
import styled from 'styled-components';
import { dirStore } from 'lib/zustand/dirStore';
import { useStore } from 'lib/zustand/planStore';
import { useSelector } from 'react-redux';

//디렉토리 목록 데이터 get
const DirContainer = styled.div`
  /*display: flex;
  margin-top: 2%;
  height: 80vh;*/
`;
/*const PlanContainer = styled.div`
  display: flex;
  width: 80%;
  background: blue;
`;*/

const DirectoryForm = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  const { setId } = useStore();
  const {
    mainPlans,
    trashPlans,
    userPlans,
    currentDirId,
    userDirs,
    createUserDir,
    changeDirName,
    checkedPlans,
    //controlPlans,
  } = dirStore();
  const {
    getMainPlans,
    getUserDirs,
    getTrashPlans,
    setCurrentDir,
    setCreateUserDir,
    setUserDirs,
    getUserPlans,
    postCreateDir,
    postDeleteDir,
    postChangeDirName,
    setDirName,
    setCheckedPlans,
    postTrash,
    //setCancel,
  } = dirStore();

  useEffect(() => {
    setId(null); //merge 할 때 initial로 바꾸기
    setCurrentDir('m');
    setCheckedPlans([]);
    setDirName('');

    if (userState) {
      // 새로고침 시 데이터 먼저 받아오는 문제 해결
      getMainPlans();
      getUserDirs();
      getTrashPlans();
    }
  }, [setId, getMainPlans, getUserDirs, getTrashPlans, userState]);

  return (
    <PageTemplate>
      <DirContainer>
        <DirectoryList
          mainPlans={mainPlans}
          trashPlans={trashPlans}
          userDirs={userDirs}
          currentDirId={currentDirId}
          createUserDir={createUserDir}
          changeDirName={changeDirName}
          setCurrentDir={setCurrentDir}
          setCreateUserDir={setCreateUserDir}
          setDirName={setDirName}
          setUserDirs={setUserDirs}
          getUserPlans={getUserPlans}
          postCreateDir={postCreateDir}
          postChangeDirName={postChangeDirName}
          postDeleteDir={postDeleteDir}
        />
        <PlanList
          mainPlans={mainPlans}
          trashPlans={trashPlans}
          userPlans={userPlans}
          currentDirId={currentDirId}
          userDirs={userDirs}
          checkedPlans={checkedPlans}
          setCheckedPlans={setCheckedPlans}
          postTrash={postTrash}
          //controlPlans={controlPlans}
          //setCancel={setCancel}
        />
      </DirContainer>
    </PageTemplate>
  );
};

export default DirectoryForm;
