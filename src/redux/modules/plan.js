import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes, 
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/plan';

// 액션 생성
const CHANGE_FIELD = 'plan/CHANGE_FIELD'; //input 값
const INITIALIZE_FORM = 'plan/INITIALIZE_FORM'; //form 초기화

// 액션 함수 생성
const [SETTING, SETTING_SUCCESS, SETTING_FAILURE] = createRequestActionTypes(
  'action/SETTING'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value}) => ({
    form,
    key,
    value
  })
);

export const initializeForm = createAction(
  INITIALIZE_FORM,
  form => form
);

export const setting = createAction(SETTING, (
  { planDepart, planPeriods, planDestination, planConcept }) => ({
    planDepart,
    planPeriods,
    planDestination,
    planConcept
  }));

// 사가 생성 및 yield 비동기 통신
const settingSaga = createRequestSaga(SETTING, planAPI.setting);
export function* planSaga() {
  yield takeLatest(SETTING, settingSaga);
}

// 초기값
const initialState = {
  setting: {
    planDepart: '',
    planPeriods: '',
    planDestination: '',
    planConcept: '',
  },
  plan: null,
  planError: null,
};

const plan = handleActions({
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value;
    }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    planError: null,
  }),
  // 설정 성공
  [SETTING_SUCCESS]: (state, { payload: plan }) => ({
    ...state,
    planError: null,
    plan,
  }),
  // 설정 실패
  [SETTING_FAILURE]: (state, { payload: error }) => ({
    ...state,
    planError: error,
  }),
}, initialState);

export default plan;