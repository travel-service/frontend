import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
