import axios from 'axios';
import * as authAPI from 'lib/api/auth';

let refresh = false; // 무한 루프 방지

// axios response error시 인터셉터 발생, refresh 토큰 으로 access 발급
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log('error:', error.response.data.code);
    if (!refresh) {
      if (
        error.response.data.code === 'EX' ||
        error.response.data.code === 'MEMBER-EX'
      ) {
        console.log('tse');
        // unauthenticated
        refresh = true;
        const response = await authAPI.refresh(); // new AccessToken
        if (response.status === 200) {
          axios.defaults.headers.common['authorization'] =
            response.headers.authorization;
          return axios(error.config);
        }
      }
    }
    refresh = false;
    return error;
  },
);

// https://www.youtube.com/watch?v=VJLSaq1Ll0U
