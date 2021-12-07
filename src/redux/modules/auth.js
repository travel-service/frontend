import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from '@redux-saga/core/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // input 값
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes(
  'auth/SIGNUP'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // login, signup
    key, // username, password, name ..
    value
  })
);

export const initializeForm = createAction(
  INITIALIZE_FORM,
  form => form
); // signup, login

export const signup = createAction(SIGNUP, ({ username, password }) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password
}));

// 사가 생성
// yield 비동기 통신
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = { // 불변성 유지하면서 객체 수정
  signup: {
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    birthday: '',
    tel: '',
    email: '',
  },
  login: {
    form: {
      username: '',
      password: ''
    }
  },
  auth: null,
  authError: null,
};

const auth = handleActions({
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>  // action 대신 구조분해, action.payload.form, key.. 호출
    produce(state, draft => {
      draft[form][key] = value; // ex. state.signup.username
    }),
  [INITIALIZE_FORM]: (state, { payload: { form } }) => ({
    ...state,
    [form]: initialState[form],
    authError: null, // 폼 전환 시 외원 인증 에러 초기화
  }),
  // 회원가입 성공
  [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth
  }),
  // 회원가입 실해
  [SIGNUP_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
  // 로그인 성공
  [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth,
  }),
  // 로그인 실패
  [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
}, initialState);

export default auth;