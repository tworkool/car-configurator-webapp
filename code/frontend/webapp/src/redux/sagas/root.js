import { fork, all } from "redux-saga/effects";
import {
  watchGetCars,
  watchGetCarConfigTypes,
  watchGetBestellung,
} from "./app_state";

function* rootSaga() {
  yield all([fork(watchGetCars, watchGetCarConfigTypes, watchGetBestellung)]);
}

export default rootSaga;
