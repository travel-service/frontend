import axios from 'axios';
import * as authAPI from 'lib/api/auth';

let refresh = false; // 무한 루프 방지

// axios response error시 인터셉터 발생, refresh 토큰 으로 access 발급
axios.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response.status === 401 && !refresh) {
      // unauthenticated
      refresh = true;
      const response = authAPI.refresh; // new AccessToken

      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data['token']}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  },
);

// https://www.youtube.com/watch?v=VJLSaq1Ll0U
