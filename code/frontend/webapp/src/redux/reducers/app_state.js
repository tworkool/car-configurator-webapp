import {
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
  succeedBestellungenDataPost,
} from "../actions/app_state";
import { combineActions, handleActions } from "redux-actions";
import { actionReducer } from "./utils/reducers";

const appStateInit = {
  messages: [],
  weatherData: {},
  bestellungenData: null, // object
  carConfigTypesData: null, // array
  carTypesData: null // array
};

// combine all actions here
const appStateAction = combineActions(
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
  succeedBestellungenDataPost,
);

// create reducer from one combined actiontype
const appStateReducer = handleActions(
  { [appStateAction]: actionReducer },
  appStateInit
);

export { appStateReducer, appStateInit };
