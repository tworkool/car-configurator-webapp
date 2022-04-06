import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  setMessages,
  failCarTypesDataFetch,
  succeedCarTypesDataFetch,
  failCarConfigtypesDataFetch,
  succeedCarConfigtypesDataFetch,
  failBestellungenDataFetch,
  succeedBestellungenDataFetch,
  failBestellungenDataPost,
  succeedBestellungenDataPost,
} from "../actions/app_state";
import {
  CAR_CONFIGTYPES_DATA_FETCH_REQUESTED,
  CAR_TYPES_DATA_FETCH_REQUESTED,
  BESTELLUNGEN_DATA_FETCH_REQUESTED,
  BESTELLUNGEN_DATA_POST_REQUESTED,
} from "../action_types/app_state";
import { getMessages } from "../selectors/appState";
import BACKEND from "./api/backend";

function* getCars(action) {
  const oldMessages = yield select(getMessages);
  try {
    const response = yield call(BACKEND.get_cars);
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      yield put(succeedCarTypesDataFetch({ carTypesData: data }));

      const newMessage = {
        level: "success",
        message: "FETCH SUCCESS",
        id: new Date().getTime(),
      };
      yield put(setMessages({ messages: [...oldMessages, newMessage] }));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(failCarTypesDataFetch({ carTypesData: [] }));

    const newMessage = {
      level: "error",
      message: "Could not fetch weather data",
      id: new Date().getTime(),
    };
    yield put(setMessages({ messages: [...oldMessages, newMessage] }));
  }
}

function* getCarConfigTypes(action) {
  const oldMessages = yield select(getMessages);
  try {
    var response = yield call(BACKEND.get_config_types_all);

    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      yield put(succeedCarConfigtypesDataFetch({ carConfigTypesData: data }));

      const newMessage = {
        level: "success",
        message: "FETCH SUCCESS",
        id: new Date().getTime(),
      };
      yield put(setMessages({ messages: [...oldMessages, newMessage] }));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(failCarConfigtypesDataFetch({ carConfigTypesData: [] }));

    const newMessage = {
      level: "error",
      message: "Could not fetch weather data",
      id: new Date().getTime(),
    };
    yield put(setMessages({ messages: [...oldMessages, newMessage] }));
  }
}

function* getBestellung(action) {
  const oldMessages = yield select(getMessages);
  console.log("data");
  try {
    var response = yield call(
      BACKEND.get_bestellung_bestellnummer,
      action.payload.bestellnummer
    );

    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      console.log(data);

      yield put(succeedBestellungenDataFetch({ bestellungenData: data }));

      const newMessage = {
        level: "success",
        message: "FETCH SUCCESS",
        id: new Date().getTime(),
      };
      yield put(setMessages({ messages: [...oldMessages, newMessage] }));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(failBestellungenDataFetch({ bestellungenData: {} }));

    const newMessage = {
      level: "error",
      message: "Could not fetch weather data",
      id: new Date().getTime(),
    };
    yield put(setMessages({ messages: [...oldMessages, newMessage] }));
  }
}

function* postBestellung(action) {
  const oldMessages = yield select(getMessages);
  try {
    var response = yield call(BACKEND.post_bestellung, action.payload.data);

    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      yield put(succeedBestellungenDataPost({ bestellungenPostData: {suc: true, id: Math.random()*1337} }));

      const newMessage = {
        level: "success",
        message: "FETCH SUCCESS",
        id: new Date().getTime(),
      };
      yield put(setMessages({ messages: [...oldMessages, newMessage] }));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(failBestellungenDataPost({ bestellungenPostData: {suc: false, id: Math.random()*1337} }));

    const newMessage = {
      level: "error",
      message: "Could not fetch weather data",
      id: new Date().getTime(),
    };
    yield put(setMessages({ messages: [...oldMessages, newMessage] }));
  }
}

function* watchGetCars() {
  yield takeLatest(CAR_TYPES_DATA_FETCH_REQUESTED, getCars);
}

function* watchGetCarConfigTypes() {
  yield takeLatest(CAR_CONFIGTYPES_DATA_FETCH_REQUESTED, getCarConfigTypes);
}

function* watchGetBestellung() {
  yield takeLatest(BESTELLUNGEN_DATA_FETCH_REQUESTED, getBestellung);
}

function* watchPostBestellung() {
  yield takeLatest(BESTELLUNGEN_DATA_POST_REQUESTED, postBestellung);
}

export {
  watchGetCars,
  watchGetCarConfigTypes,
  watchGetBestellung,
  watchPostBestellung,
};
