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
import axios from 'axios';
import './interceptors/axios';
import { useDispatch } from 'react-redux';
import { check } from 'redux/modules/user';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// api/user/refresh :
function loadUser() {
  try {
    store.dispatch(check());
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
