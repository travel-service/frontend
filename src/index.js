import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from 'redux/modules';
import createSagaMiddleware from 'redux-saga';
import { check } from 'redux/modules/user';
import axios from 'axios';
import './interceptors/axios';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// api/user/refresh :
function loadUser() {
  // 0622 수정, 백엔드 로직 후 적용
  (async () => {
    try {
      // const resData = authAPI.userCheck; // user정보
      check(); // userCheck, 에러시 refresh 까지
    } catch (e) {
      // error시 access 만료, 로그인 페이지로 리다이렉트
    }
  })();
  // api 요청 refresh 토큰으로 access 발금 ->
  // try {
  //   const userState = JSON.parse(localStorage.getItem('userState'));
  //   if (!userState) return;
  //   store.dispatch(tempSetAuth(userState));
  // } catch (e) {
  //   console.log('localStorage is not working');
  // }
}

// saga run 이후에 user loading
sagaMiddleware.run(rootSaga);
// onSilentRefresh();

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 220304 https://heeyeonjeong.tistory.com/102
