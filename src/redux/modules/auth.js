import { createAction, handleActions } from "redux-actions";
import produce from 'immer'; //불변성 관리
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes, } from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN',
);

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const login = createAction(LOGIN, ({ username, password })=>({
    username,
    password,
}));


// 사가 생성
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};
const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: {form, key, value} }) =>
            produce(state, draft => {
                draft[form][key] = value; //state.login.username 변경
        }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
            authError: null, //폼 전환 시 회원 인증 에러 초기화
        }),
        //로그인 성공
        [LOGIN_SUCCESS]: (state, {payload: auth})=>({
            ...state,
            authError: null,
            auth,
        }),
        //로그인 실패
        [LOGIN_FAILURE]: (state, {payload: error})=>({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;