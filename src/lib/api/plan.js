import axios from 'axios';

// 여행 설정 페이지, 여행 생성
export const createPlan = async (userPlan) => {
  try {
    const response = await axios.post('/members/plan', {
      planForm: userPlan,
    });
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
      dayForm: {
        travelDay: dayForm.travelDay,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 수정(put)
export const updatePlanDay = async (dayForm, id) => {
  try {
    const response = await axios.put(`/members/plan/${id}/day`, {
      dayForm,
    });
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
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
