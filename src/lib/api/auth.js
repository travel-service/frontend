import client from './client';
import { removeCookie } from 'lib/cookies';

// 로그인
export const login = ({ userName, password }) => {
  return client.post('/api/login', { userName, password });
};

// 회원가입
export const signup = ({
  userName,
  email,
  password,
  nickName,
  birthday,
  gender,
}) =>
  client.post('/api/signup', {
    userName,
    email,
    password,
    nickName,
    birthday,
    gender,
  });

// 로그아웃
export const logout = () => {
  removeCookie('refreshToken');
  // 백엔드 logout 요청후 refreshToken 제거 필요
  // 0517
};
