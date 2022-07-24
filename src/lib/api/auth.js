import axios from 'axios';

// 로그인
export const login = async ({ userName, password }) => {
  const response = await axios.post('/api/login', { userName, password });
  axios.defaults.headers.common['authorization'] =
    response.headers.authorization;
  // backend 로직 수정되면
  // const {data} = await axios.post('/api/login', { userName, password });
  // axios.defaults.headers.common['Authorization'] =`Bearer ${data["token"]}`;
  // return data;

  return response;
};

// 회원가입
export const signup = async ({
  userName,
  email,
  password,
  nickName,
  birthday,
  gender,
}) =>
  axios.post('/api/signup', {
    userName,
    email,
    password,
    nickName,
    birthday,
    gender,
  });

export const userCheck = async () => {
  console.log('Test');
  const response = await axios.get('/auth/status');
  // const response = await axios.get('/auth/status'); 0718 Member 브랜치 머지 후 사용예정
  console.log(response);
  return response;
};

export const refresh = async () => {
  const response = await axios.get('/auth/refresh');
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.delete('/api/user/logout');
  // const response = await axios.delete('/members/logout'); 0718 Member 브랜치 머지 후 사용예정
  window.location.reload(); // 페이지 새로고침, access 휘발
  return response;
};
