import client from './client';

// 로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 회원가입
export const signup = ({ username, password, name, nickname, birthday, tel, gender, email }) =>
  client.post('/api/auth/signup', { username, password, name, nickname, birthday, tel, gender, email });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');