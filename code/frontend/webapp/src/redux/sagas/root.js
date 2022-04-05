import { fork, all } from "redux-saga/effects";
import {
  watchGetCars,
  watchGetCarConfigTypes,
  watchGetBestellung,
} from "./app_state";

// NOT WORKING??
/* function* rootSaga() {
  yield all([fork(watchGetCars, watchGetCarConfigTypes, watchGetBestellung)]);
} */

function* rootSaga() {
  yield fork(watchGetCars);
  yield fork(watchGetCarConfigTypes);
  yield fork(watchGetBestellung);
  // code after fork-effect
}

export default rootSaga;
