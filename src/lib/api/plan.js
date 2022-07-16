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

// 여행 생성 시 컨셉 설정
export const createConcpet = async (id, conceptForm) => {
  try {
    const response = await axios.post(`/members/plan/${id}/concept`, {
      conceptForm: conceptForm,
    });
    headerToken(response);
    console.log(`여행컨셉설정: `, response);
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

// 여행 수정 시 컨셉 받아오기
export const getConcpet = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}/concept`);
    headerToken(response);
    console.log(`${id} 컨셉: `, response);
    console.log('컨셉 data:', response.data.conceptForm);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 설정 페이지 수정
export const putPlan = async (id, userPlan) => {
  try {
    const response = await axios.put(`/api/members/plan/${id}`, {
      depart: userPlan.depart,
      name: userPlan.name,
      periods: userPlan.periods,
      thumbnail: userPlan.thumbnail,
    });
    headerToken(response);
    console.log(`${id} 수정: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 설정 페이지 컨셉 수정
export const putConcept = async (id, conceptForm) => {
  try {
    const response = await axios.put(`/members/plan/${id}/concept`, {
      conceptForm: conceptForm,
    });
    headerToken(response);
    console.log(`${id} 수정: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
