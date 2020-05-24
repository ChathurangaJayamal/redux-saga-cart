import { delay } from "redux-saga";
import { take, put, actionChannel } from "redux-saga/effects";

function* testChannelsSaga() {
  let count;
  while (count < 10) {
    yield put("UPDATE");
    console.info(count++, "updated");
    yield delay(500);
  }
}

function* takeActionChannelSaga() {
  //waits for an update with channels
  let chan = yield actionChannel("UPDATE");
  while (true) {
    yield take(chan); //take from the channel
    console.info("Update received.");
    yield delay(2000);
  }
}

function* takeActionSaga() {
  //waits for an update without a channel
  while (true) {
    yield take("UPDATE");
    console.log("Update received.");
    yield delay(2000);
  }
}

let saga = function* () {
  let count = 0;
  console.log("saga begins");
  while (true) {
    yield effects.take("UPDATE");
    console.log(count++, "update received take");
    yield delay(2000);
  }
};

let channelSaga = function* () {
  let count = 0;
  const chan = yield actionChannel("UPDATE");
  console.log("channel saga begins");
  while (true) {
    yield effects.take(chan);
    console.log(count++, "update received from channel");
    yield delay(2000);
  }
};

let tester = function* testChannelsSaga() {
  let count = 0;
  console.info("tester begins...");
  while (count < 10) {
    yield effects.put({ type: "UPDATE", value: 10 });
    console.info(count++, "updated");
    yield delay(500);
  }
};
