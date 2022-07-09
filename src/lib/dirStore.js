import axios from 'axios';
import create from 'zustand';

// 여행보관함용 store
export const dirStore = create((set, get) => ({
  currentDirId: 'm', // 현재 클릭한 디렉터리(보여줄 디렉터리)
  mainPlans: [], // 메인 디렉터리 플랜들
  userDirs: [], // 유저 디렉터리 이름들(목록)
  userPlans: [], // 해당 유저 디렉터리 내 플랜
  trashPlans: [], // 휴지통 내 플랜들
  controlPlans: {
    cancelPlanId: [], // 삭제할 플랜 id
    revertPlanId: [], // 복원할 플랜 id
    deletePlanId: [], // 영구삭제할 플랜 id
  },
  createUserDir: '', // 생성할 디렉터리 이름
  changeDirName: '', // 디렉터리 이름
  deleteUserDir: {
    dirId: [], //삭제할 디렉터리 id, 다중체크
  },
  movePlans: {
    dirId: '', //이동할 디렉터리 id
    planId: [], //플랜 아이디들, 다중 체크
  },
  setMainPlans: (input) => {
    set({ mainPlans: input });
  },
  setTrashPlans: (input) => {
    set({ trashPlans: input });
  },
  setUserPlans: (input) => {
    set({ userPlans: input });
  },
  setCurrentDir: (input) => {
    //현재 디렉터리 설정
    set({
      currentDirId: input,
    });
  },
  setCurrentCheckedDir: (input) => {
    // 현재 선택된 디렉터리
    set({
      currentCheckedDirs: input,
    });
  },
  setDirName: (input) => {
    // 디렉터리 이름 변경
    set({
      changeDirName: input,
    });
  },
  // planId setting
  setCancel: (input) => {
    //삭제
    set((state) => ({
      controlPlans: { ...state.controlPlans, cancelPlanId: input },
    }));
  },
  setRevert: (input) => {
    //복구
    set((state) => ({
      controlPlans: { ...state.controlPlans, revertPlanId: input },
    }));
  },
  setDelete: (input) => {
    //영구삭제
    set((state) => ({
      controlPlans: { ...state.controlPlans, deletePlanId: input },
    }));
  },
  setCreateUserDir: (input) => {
    //사용자 디렉터리 생성
    set({
      createUserDir: input,
    });
  },
  setDeleteUserDir: (input) => {
    //사용자 디렉터리 삭제
    set((state) => ({
      deleteUserDir: { ...state.deleteUserDir, dirId: input },
    }));
  },
  setMovePlan: (input1, input2) => {
    //플랜 이동(담기)
    set((state) => ({
      movePlans: { ...state.movePlans, dirId: input1, planId: input2 },
    }));
  },

  // maindir 내 플랜들
  getMainPlans: async () => {
    //const response = await axios.get(`http://localhost:4000/main-directory`);
    const response = await axios.get('http://localhost:4000/mainD');
    set({ mainPlans: response.data });
    console.log('getMP: ', response);
  },
  // 디렉토리 목록 내 userdir 제목들
  getUserDirs: async () => {
    /*const response = await axios.get(
      `http://localhost:4000/main-user-directory`,
    );*/
    const response = await axios.get('http://localhost:4000/userD');
    set({
      userDirs: response.data,
    });
    console.log('getUD: ', response);
  },
  // 해당 userDir 내 플랜들
  getUserPlans: async (userDirId) => {
    /*const response = await axios.get(
      `http://localhost:4000/main-directory/${userDirectoryId}`,
    );*/
    const response = await axios.get(
      `http://localhost:4000/userDirectory${userDirId}`,
    );
    //set({ userPlans: response.data.userDirectory });
    set({ userPlans: response.data }); //test용
    console.log('userPlans: ', response);
  },
  // trashdir 내 플랜들
  getTrashPlans: async () => {
    //const response = await axios.get(`http://localhost:4000/trash-directory`);
    const response = await axios.get('http://localhost:4000/trashD');
    set({ trashPlans: response.data });
    console.log('getTP: ', response);
  },
  // 삭제
  postTrash: async () => {
    const controlPlans = get().controlPlans;
    console.log(controlPlans.cancelPlanId);
    /*const response = await axios.post(
      `http://localhost:4000/main-directory/cancel`,
      {
        planId: controlPlans.cancelPlanId,
      },
    );
    console.log('삭제: ', response);*/
  },
  // 복원
  postRevert: async () => {
    const controlPlans = get().controlPlans;
    const response = await axios.post(
      `http://localhost:4000/trash-directory/revert`,
      {
        planId: controlPlans.revertPlanId,
      },
    );
    console.log('복원: ', response);
  },
  // 영구 삭제, 수정 필요
  postDelete: async () => {
    const controlPlans = get().controlPlans;
    const response = await axios.post(
      `http://localhost:4000/trash-directory/delete`,
      {
        planId: controlPlans.deletePlanId,
      },
    );
    console.log('영구삭제: ', response);
  },
  // userdir 생성, 수정 필요
  postCreateDir: async () => {
    const createUserDir = get().createUserDir;
    const response = await axios.patch(
      //post
      //`http://localhost:4000/create/user-directory`,
      'http://localhost:4000/userD',
      {
        id: 82, //test용
        userDirectoryId: 82,
        directoryName: createUserDir,
      },
    );
    console.log('udir 생성: ', response);
  },
  // userdir 삭제, 수정 필요
  postDeleteDir: async () => {
    const deleteUserDir = get().deleteUserDir;
    const response = await axios.post(
      `http://localhost:4000/delete/user-directory`,
      {
        userDirectoryId: deleteUserDir.dirId,
      },
    );
    console.log('udir 삭제: ', response);
  },
  // 담기
  postMovePlans: async () => {
    const movePlans = get().movePlans;
    const response = await axios.post(
      `http://localhost:4000/move/user-directory`,
      {
        userDirectoryId: movePlans.dirId,
        planId: movePlans.planId,
      },
    );
    console.log('moveplan: ', response);
  },
  // 이름 변경 고민중..
  postChangeDirName: async (dirId) => {
    const changeDirName = get().changeDirName;
    const planCount = get().planCount;
    const userDirs = get().userDirs;
    const tmp = userDirs.find((dir) => {
      return dir.userDirectoryId === dirId;
    });

    const response = await axios.patch(
      //post
      //`http://localhost:4000/update/user-directory/${dirId}`
      `http://localhost:4000/userD`,
      {
        planCount: [...planCount, 0],
        directoryName: changeDirName,
      },
    );
    console.log('dirName: ', response);
  },
}));
