import axios from 'axios';

// token 반환 다시 설정(모든 plan 요청 후)
const headerToken = (response) => {
  axios.defaults.headers.common['authorization'] =
    response.headers.authorization;
};

// 여행 설정 페이지, 여행 생성
export const createPlan = async (userPlan) => {
  try {
    const response = await axios.post('/api/members/plan', {
      planForm: userPlan,
    });
    headerToken(response);
    console.log('여행설정: ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행보관함 받아오기(모든 플랜 조회)
export const getAllPlans = async () => {
  try {
    const response = await axios.get('/members/plan');
    headerToken(response);
    console.log('여행보관함: ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 수정(여행보관함에서)
export const getPlan = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}`);
    headerToken(response);
    console.log(`${id} 여행: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 생성(post)
export const postPlanDay = async (dayForm, id) => {
  try {
    const response = await axios.post(`/members/plan/${id}/day`, {
      dayForm,
    });
    headerToken(response);
    console.log('여행 캔버스 : ', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 조회
export const getPlanDay = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}/day`);
    headerToken(response);
    console.log(`get ${id} 여행 캔버스: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
