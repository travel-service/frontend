import axios from 'axios';

// 여행 설정 페이지, 여행 생성
export const createMemberLocation = async (location) => {
  try {
    const response = await axios.post('/locations/member', {
      location,
    });
    console.log('멤버 로케이션 생성: ', response);
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
