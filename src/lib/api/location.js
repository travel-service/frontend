import axios from 'axios';

// 여행지 블록 형태 받아오기
export const getLocationBlock = async () => {
  try {
    const response = await axios.get('/locations/block');
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 멤버 로케이션 생성
export const createMemberLocation = async (location) => {
  try {
    const response = await axios.post('/locations/member', {
      memberLocation: location.memberLocation,
      information: location.information,
      typeLocation: location.typeLocation,
      location: location.location,
    });
    if (response.status !== 201) {
      return 0;
    } else {
      console.log('멤버 로케이션 생성: ', response);
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 멤버 로케이션 조회 0718 추가
export const getMemberLocation = async () => {
  try {
    const response = await axios.get('/locations/members');
    if (response.status !== 200) {
      return 0;
    } else {
      console.log('멤버 로케이션 조회: ', response);
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};
