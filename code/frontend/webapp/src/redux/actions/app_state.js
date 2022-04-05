import {
  SET_MESSAGES,

  CAR_CONFIGTYPES_DATA_FETCH_REQUESTED,
  CAR_CONFIGTYPES_DATA_FETCH_FAILED,
  CAR_CONFIGTYPES_DATA_FETCH_SUCCEEDED,

  CAR_TYPES_DATA_FETCH_REQUESTED,
  CAR_TYPES_DATA_FETCH_FAILED,
  CAR_TYPES_DATA_FETCH_SUCCEEDED,

  BESTELLUNGEN_DATA_FETCH_REQUESTED,
  BESTELLUNGEN_DATA_FETCH_FAILED,
  BESTELLUNGEN_DATA_FETCH_SUCCEEDED,

  BESTELLUNGEN_DATA_DELETE_REQUESTED,
  BESTELLUNGEN_DATA_DELETE_FAILED,
  BESTELLUNGEN_DATA_DELETE_SUCCEEDED,

  BESTELLUNGEN_DATA_POST_REQUESTED,
  BESTELLUNGEN_DATA_POST_FAILED,
  BESTELLUNGEN_DATA_POST_SUCCEEDED,
} from "../action_types/app_state";
import { createAction } from "redux-actions";

const setMessages = createAction(SET_MESSAGES);

const requestCarConfigtypesDataFetch = createAction(CAR_CONFIGTYPES_DATA_FETCH_REQUESTED);
const failCarConfigtypesDataFetch = createAction(CAR_CONFIGTYPES_DATA_FETCH_FAILED);
const succeedCarConfigtypesDataFetch = createAction(CAR_CONFIGTYPES_DATA_FETCH_SUCCEEDED);

const requestCarTypesDataFetch = createAction(CAR_TYPES_DATA_FETCH_REQUESTED);
const failCarTypesDataFetch = createAction(CAR_TYPES_DATA_FETCH_FAILED);
const succeedCarTypesDataFetch = createAction(CAR_TYPES_DATA_FETCH_SUCCEEDED);

const requestBestellungenDataFetch = createAction(BESTELLUNGEN_DATA_FETCH_REQUESTED);
const failBestellungenDataFetch = createAction(BESTELLUNGEN_DATA_FETCH_FAILED);
const succeedBestellungenDataFetch = createAction(BESTELLUNGEN_DATA_FETCH_SUCCEEDED);

const requestBestellungenDataDelete = createAction(BESTELLUNGEN_DATA_DELETE_REQUESTED);
const failBestellungenDataDelete = createAction(BESTELLUNGEN_DATA_DELETE_FAILED);
const succeedBestellungenDataDelete = createAction(BESTELLUNGEN_DATA_DELETE_SUCCEEDED);

const requestBestellungenDataPost = createAction(BESTELLUNGEN_DATA_POST_REQUESTED);
const failBestellungenDataPost = createAction(BESTELLUNGEN_DATA_POST_FAILED);
const succeedBestellungenDataPost = createAction(BESTELLUNGEN_DATA_POST_SUCCEEDED);

export {
  setMessages,
  
  requestCarConfigtypesDataFetch,
  failCarConfigtypesDataFetch,
  succeedCarConfigtypesDataFetch,

  requestCarTypesDataFetch,
  failCarTypesDataFetch,
  succeedCarTypesDataFetch,

  requestBestellungenDataFetch,
  failBestellungenDataFetch, 
  succeedBestellungenDataFetch,

  requestBestellungenDataDelete,
  failBestellungenDataDelete,
  succeedBestellungenDataDelete,

  requestBestellungenDataPost,
  failBestellungenDataPost,
  succeedBestellungenDataPost
};
