// import client from './client';

// export const getPlan = () => {
//   client.get('http://localhost:4000/travelPlans');
// }

// export const getPlan = () => {
//   client.get('https://jsonplaceholder.typicode.com/users');
// };

import axios from 'axios';

export const getPlan = async id => {
  try {
    return await axios.get(`http://localhost:4000/travelPlans/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// // 여행지 목록 받기, DB 필요(임의 URL 사용)
// export const getDestination = () => {
//   client.get('http://localhost:4000/travelPlans/Destinations')
// }

// // 여행 설정 보내기 : TravelSettingForm에 통합
// export const setting = ({ planDepart, planPreriods, planDestination, planConcept }) =>
//   client.post('/api/travelPlans/travelPlan', { planDepart, planPeriods, planDestination, planConcept });