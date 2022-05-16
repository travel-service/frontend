import axios from 'axios';
import client from './client';

// refreshToken으로 accessToken 재발급!
export const onSilentRefresh = () =>
  client
    .get('/api/user/test')
    .then(onLoginSuccess)
    .catch((e) => {
      console.log(e);
    });

const onLoginSuccess = (res) => {
  const { accesstoken } = res.headers;
  axios.defaults.headers.common['accessToken'] = accesstoken;
  setTimeout(() => onSilentRefresh(), 30000);
};

// 로그인
export const login = ({ userName, password }) => {
  return client
    .post('/api/login', { userName, password })
    .then((res) => {
      onLoginSuccess(res);
      return res;
    })
    .catch((e) => console.log('로그인 실패융', e));
};

// 회원가입
export const signup = ({
  userName,
  password,
  realName,
  nickName,
  birthday,
  phoneNum,
  gender,
  email,
}) =>
  client.post('/api/signup', {
    userName,
    password,
    realName,
    nickName,
    birthday,
    phoneNum,
    gender,
    email,
  });

// // 로그인 상태 확인
// export const check = () =>
//   client
//     .get('/api/user/test')
//     .then(onLoginSuccess)
//     .catch((e) => {
//       console.log(e);
//     });
// export const check = () => {
//   return {
//     data: true,
//   };
// };

// 로그아웃
// export const logout = () => client.post('/api/logout');
// export const logout = (ctx) => {
//   ctx.status = 204;
// };
