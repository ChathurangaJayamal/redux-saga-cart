import { delay } from "redux-saga";
import { take, put, call, apply, fork } from "redux-saga/effects";

export function* testTakeSaga() {
  //wait till action is dispatched from another thread, only single thread,
  while (true) {
    console.info("testTakeSaga listning for action...");
    const state = yield take("SET_STATE");
    console.info("testTakeSaga received new state: ", state);
  }
}

export function* testPutSaga() {
  //immediately dispatches an action, won't wait, same as store.dispatch()
  console.info("testPutSaga");
  let count;
  while (count < 5) {
    console.info(count, "testPutSaga");
    yield delay(2000);
    yield put({ type: "SET_STATE", value: count });
    console.info(count, "testPutSaga2");
  }
}

export function* testForkSaga() {
  //fork will create a new thread and won't wait
  let count = 0;
  while (count < 5) {
    yield delay(2000);
    yield fork(forkTestGenerator, count);
    console.info(count++, "forkTest");
  }
}

function* forkTestGenerator(count) {
  yield delay(5000);
  console.info(count, "forkTestGenerator");
}
