import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/redux/createRequestSaga';
import * as authAPI from 'lib/api/auth';

// 액션 생성
const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // input 값 변화 감지
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const TEMP_SET_AUTH = 'auth/TEMP_SET_AUTH'; //새로고침 이후 임시 로그인 처리
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP'); // 회원가입
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN'); // 로그인
// const LOGOUT = 'auth/LOGOUT'; // 로그아웃

// createAction(타입, 현재 상태)
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // login, signup
    key, // userName, password, name ..
    value,
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // signup, login
export const signup = createAction(
  SIGNUP,
  ({ userName, email, password, nickName, birthday, gender }) => ({
    userName,
    email,
    password,
    nickName,
    birthday,
    gender,
  }),
);
export const login = createAction(LOGIN, ({ userName, password }) => ({
  userName,
  password,
}));
export const tempSetAuth = createAction(TEMP_SET_AUTH, (auth) => auth);
// export const logout = createAction(LOGOUT);

// function* logoutSaga() {
//   // 로그아웃시 스토리지 삭제
//   try {
//     yield call(authAPI.logout);
//     localStorage.removeItem('userState');
//     localStorage.removeItem('accessToken');
//   } catch (e) {
//     console.log(e);
//   }
// }

// 사가 생성
// yield 비동기 통신
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
  // yield takeLatest(LOGOUT, logoutSaga);
}

// 초기값
const initialState = {
  // 불변성 유지하면서 객체 수정
  signup: {
    userName: '',
    email: '',
    password: '',
    passwordCheck: '',
    nickName: '',
    birthday: '',
    gender: '',
  },
  login: {
    userName: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { form, key, value } }, // action 대신 구조분해, action.payload.form, key.. 호출
    ) =>
      produce(state, (draft) => {
        draft[form][key] = value; // ex. state.signup.userName
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 외원 인증 에러 초기화
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => {
      return {
        ...state,
        auth,
        authError: null,
      };
    },
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => {
      return {
        ...state,
        auth: auth.data,
        authError: null,
      };
    },
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return {
        ...state,
        authError: error,
      };
    },
    // 회원가입후 auth 제거
    [TEMP_SET_AUTH]: (state, action) => {
      console.log(action);
      return {
        ...state,
        auth: null,
      };
    },
    // // 로그아웃
    // [LOGOUT]: (state) => ({
    //   ...state,
    //   userState: null,
    //   auth: null,
    //   authError: null,
    //   accessToken: null,
    // }),
  },
  initialState,
);

export default auth;
