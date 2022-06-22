import axios from 'axios';

// 로그인
export const login = async ({ userName, password }) => {
  const response = await axios.post('/api/login', { userName, password });
  axios.defaults.headers.common['Authorization'] = response.headers.accesstoken;
  console.log(response.headers.accesstoken);

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
}) => {
  const response = await axios.post('/api/signup', {
    userName,
    email,
    password,
    nickName,
    birthday,
    gender,
  });
  console.log(response);
  return response;
};

export const userCheck = async () => {
  const response = await axios.get('/api/user/info');
  return response;
};

export const refresh = async () => {
  const response = await axios.post('/api/refresh', {});
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.post('/api/logout', {});
  return response;
  // 백엔드 logout 요청후 refreshToken 제거 필요
  // 0517
};
