import axios from 'axios';
import create from 'zustand';
import * as dirAPI from 'lib/api/dir';
import { persist } from 'zustand/middleware';

// 여행보관함용 store
export const dirStore = create(
  //persist(
  (set, get) => ({
    currentDirId: 'm', // 현재 클릭한 디렉터리(보여줄 디렉터리)
    mainPlans: [], // 메인 디렉터리 플랜들
    userDirs: [], // 유저 디렉터리 이름들(목록)
    userPlans: [], // 해당 유저 디렉터리 내 플랜
    trashPlans: [], // 휴지통 내 플랜들
    checkedPlans: [], // 선택된 플랜 id
    createUserDir: '', // 생성할 디렉터리 이름
    /*createUserDir: {
      name: '',
      id: -1,
    },*/
    changeDirName: '', // 변경할 디렉터리 이름
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
    setUserDirs: (input) => {
      set((state) => ({
        userDirs: { ...state.userDirs, input },
      }));
      // set({ userDirs.mainUserDirectory: input });
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
    setCheckedPlans: (input) => {
      // 플랜 선택
      set({
        checkedPlans: input,
      });
    },
    setCreateUserDir: (input) => {
      //사용자 디렉터리 생성
      set({
        createUserDir: input,
      });
      /*set((state) => ({
        createUserDir: { ...state.createUserDir, input },
      }));*/
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
      const res = await dirAPI.getAllPlans();
      set({ mainPlans: res });
    },
    // 디렉토리 목록
    getUserDirs: async () => {
      //const setUserDirs=get().setUserDirs();
      const res = await dirAPI.getUserDirs();
      set({ userDirs: res });
      //setUserDirs();
    },
    // 해당 userDir 내 플랜들
    getUserPlans: async (userDirId) => {
      console.log('userPlans: ', userDirId);
    },
    // trashdir 내 플랜들
    getTrashPlans: async () => {
      const res = await dirAPI.getTrashPlans();
      set({ trashPlans: res });
    },
    // 플랜 삭제
    postTrash: async () => {
      const checkedPlans = get().checkedPlans;
      await dirAPI.postTrash(checkedPlans);
      set({ checkedPlans: [] });
    },
    // 플랜 복원
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
    // 플랜 영구 삭제, 수정 필요
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
      await dirAPI.createDir(createUserDir);
    },
    // userdir 삭제, 수정 필요
    postDeleteDir: async () => {
      const currentDirId = get().currentDirId;
      const idArr = new Array();
      idArr[0] = currentDirId;
      //console.log({ id: idArr });
      const res = await dirAPI.deleteDir(idArr);
      set({ currentDirId: 'm' });
      console.log('udir 삭제: ', res);
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
    // userDir 이름 변경
    postChangeDirName: async () => {
      const currentDirId = get().currentDirId;
      const changeDirName = get().changeDirName;
      const res = await dirAPI.postDirName(currentDirId, changeDirName);
      console.log('Dir이름변경: ', res);
    },
  }) /*),
    {
      // 새로고침 후 상태 유지, sessionStorage 사용
      name: 'dir-storage',
      getStorage: () => sessionStorage,
    },*/,
);
