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
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding-right: 2%;
  padding-left: 2%;
  padding-bottom: 2%;
  width: 100%;

  font-family: 'Pretendard';
  font-style: normal;
`;

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
  } = dirStore();
  const {
    getMainPlans,
    getUserDirs,
    getTrashPlans,
    setCurrentDir,
    setCreateUserDir,
    setUserPlans,
    setDirName,
    setCheckedPlans,
    postCreateDir,
    postDeleteDir,
    postChangeDirName,
    postTrash,
    postMovePlans,
    postRevert,
    deletePlan,
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
  }, [setId, getMainPlans, getTrashPlans, userState]);

  /*useEffect(() => {
    if (mainPlans.mainDirectory && userDirs.mainUserDirectory) {
      const i = mainPlans.mainDirectory.filter((p) => {
        userDirs.mainUserDirectory.map(
          (i) => {
            p.userDirectoryId.filter(
              (c) => c.userDirectoryId === i.userDirectoryId,
            );
          },
        );
      });
    }
    //console.log(userPlans);
  }, [mainPlans, userDirs]);*/

  return (
    <PageTemplate>
      <DirContainer>
        <DirectoryList
          mainPlans={mainPlans}
          trashPlans={trashPlans}
          userDirs={userDirs}
          userPlans={userPlans}
          currentDirId={currentDirId}
          createUserDir={createUserDir}
          changeDirName={changeDirName}
          setCurrentDir={setCurrentDir}
          setUserPlans={setUserPlans}
          setCreateUserDir={setCreateUserDir}
          setDirName={setDirName}
          setCheckedPlans={setCheckedPlans}
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
          postMovePlans={postMovePlans}
          getTrashPlans={getTrashPlans}
          postRevert={postRevert}
          deletePlan={deletePlan}
        />
      </DirContainer>
    </PageTemplate>
  );
};

export default DirectoryForm;
