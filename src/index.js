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
import { tempSetAuth } from 'redux/modules/auth';
import axios from 'axios';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// 0622 현상황 : 토큰 검증없이 redux + LocalStorage로 로그인 유지를 시킨다
// localStorage 사용을 지양하고, 새로고침시에 api요청을 해서 토큰을 재발급받아 로그인을 유지시킨다
// api/user/test 가 필요, 새로고침시, refresh로 access 발급 ->
//https://www.youtube.com/watch?v=VJLSaq1Ll0U
//https://www.youtube.com/watch?v=No_4N6o8e7k&list=PLlameCF3cMEtB7i9d7VmL2PMjhXOJXArA&index=2

// api/user/refresh :
function loadUser() {
  // api 요청 refresh 토큰으로 access 발금 ->
  try {
    const userState = JSON.parse(localStorage.getItem('userState'));
    if (!userState) return;
    store.dispatch(tempSetAuth(userState));
  } catch (e) {
    console.log('localStorage is not working');
  }
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
