import axios from 'axios';

// token 반환 다시 설정(모든 plan 요청 후)
const headerToken = (response) => {
  axios.defaults.headers.common['authorization'] =
    response.headers.authorization;
};

// 여행보관함 생성
export const createDir = async (dirName) => {
  try {
    const response = await axios.post('/directories', {
      directoryName: dirName,
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 받아오기(모든 플랜 조회)
export const getAllPlans = async () => {
  try {
    const response = await axios.get('/directories/main');
    //headerToken(response);
    console.log('여행보관함: ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 목록 받아오기
export const getUserDirs = async () => {
  try {
    const response = await axios.get(`/directories/members`);
    //headerToken(response);
    console.log('보관함목록: ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 휴지통 받아오기
export const getTrashPlans = async () => {
  try {
    const response = await axios.get(`/directories/trash`);
    //headerToken(response);
    console.log('휴지통: ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 이름 변경
export const postDirName = async (id, changeDirName) => {
  try {
    const response = await axios.post(`/directories/${id}/name`, {
      directoryName: changeDirName,
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 플랜 삭제
export const postTrash = async (checkedPlans) => {
  try {
    const response = await axios.post(`/directories/trash`, {
      planId: checkedPlans,
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 플랜 복구
export const postRevert = async (checkedPlans) => {
  try {
    const response = await axios.post(`/directories/main`, {
      planId: checkedPlans,
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 플랜 영구 삭제
export const deletePlan = async (checkedPlans) => {
  try {
    const response = await axios.delete(`/directories/plans`, {
      data: { planId: checkedPlans },
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 삭제
export const deleteDir = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`/directories/members`, {
      data: { userDirectoryId: id },
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 플랜 이동
export const movePlan = async (checkedPlans, checkedDirId) => {
  try {
    const response = await axios.post(`/directories/directory/plans`, {
      userDirectoryId: checkedDirId,
      planId: checkedPlans,
    });
    //headerToken(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
