import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

export const changeInput = createAction(CHANGE_INPUT); // 액션 함수 생성, {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form

const initialState = Map({ // 불변성 유지하면서 객체 수정
  register: Map({
    form: Map({
      username: '',
      password: '',
      passwordConfirm: '',
      name: '',
      nickname: '',
      birthday: '',
      tel: '',
      email: '',
    })
  }),
  login: Map({
    form: Map({
      email: '',
      password: ''
    })
  })
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { form, name, value } = action.payload;
    return state.setIn([form, 'form', name], value);
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload);
    return state.set(action.payload, initialForm);
  }
}, initialState);