import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(
  TEMP_SET_USER,
  (userState) => userState,
);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.userCheck);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout); // 백엔드 로직 필요
// const checkFailureSaga = createRequestSaga(LOGOUT, authAPI.refresh); // 0622 잘모르게씀

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  // yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const initialState = {
  userState: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: userState }) => ({
      ...state,
      userState,
    }),
    [CHECK_SUCCESS]: (state, action) => {
      return {
        ...state,
        userState: action.payload.data, // 임시 닉네임, refresh토큰이 제거되면 failure로 가지 않을까
        checkError: null,
      };
    },
    [CHECK_FAILURE]: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        userState: null,
        checkError: action.payload.error,
      };
    },
    [LOGOUT]: (state) => {
      console.log(state);
      return {
        ...state,
        // userState: null,
      };
    },
  },
  initialState,
);
