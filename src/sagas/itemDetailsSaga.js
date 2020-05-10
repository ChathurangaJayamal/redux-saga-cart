import { take, put, fork, call, apply } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import { SET_CART_ITEMS, setItemDetails } from "../actions";

export function* itemDetailsSaga() {
  let { items } = yield take(SET_CART_ITEMS);
  console.log(items);
  yield items.map((item) => fork(loadItem, item.id));
}

function* loadItem(id) {
  console.info("item loading:", id);
  const response = yield call(fetch, `http://localhost:8081/items/${id}`);
  const data = yield apply(response, response.json);
  yield put(setItemDetails(data[0]));
  console.info("item loaded:", id);
}
