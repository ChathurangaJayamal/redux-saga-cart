import { take, call, apply, put } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import { setCartItems, SET_CURRENT_USER } from "../actions";

export function* fetchCartSaga() {
  const { user } = yield take(SET_CURRENT_USER); //wait for some thread to update current user

  const response = yield call(fetch, `http://localhost:8081/cart/${user.id}`);
  const data = yield apply(response, response.json);
  console.log(data);
  yield put(setCartItems(data.items));
}
