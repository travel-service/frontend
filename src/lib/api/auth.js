import axios from 'axios';

// 로그인
export const login = async ({ userName, password }) => {
  const response = await axios.post('/api/login', { userName, password });
  axios.defaults.headers.common['authorization'] =
    response.headers.authorization;
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
  try {
    const res = await axios.post('/api/signup', {
      userName,
      email,
      password,
      nickName,
      birthday,
      gender,
    });
    if (res.status === 201 || res.status === 200) {
      return res;
    }
    if (res.response.status === 400) {
      return res.response;
    }
    return res;
  } catch (e) {
    return e;
  }
};

export const userCheck = async () => {
  const response = await axios.get('/auth/status');
  if (response.status === 200) {
    localStorage.setItem('login', true);
  } else {
    localStorage.setItem('login', false);
  }
  return response;
};

export const refresh = async () => {
  const response = await axios.get('/auth/refresh');
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.post('/members/logout');
  console.log(response);
  window.location.reload(); // 페이지 새로고침, access 휘발
  return response;
};

export const checkUserName = async ({ userName }) => {
  const response = await axios.get(`/api/username/${userName}`);
  return response;
};

export const checkNickName = async ({ nickName }) => {
  const response = await axios.get(`/api/nickname/${nickName}`);
  return response;
};
