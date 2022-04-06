const getMessages = (state) => {
  return state.appState.messages;
};

const getCarConfigTypesData = (state) => {
  return state.appState.carConfigTypesData;
};

const getCarTypesData = (state) => {
  return state.appState.carTypesData;
};

const getBestellungenData = (state) => {
  return state.appState.bestellungenData;
}

const getBestellungenPostData = (state) => {
  return state.appState.bestellungenPostData;
}

export { getMessages, getCarConfigTypesData, getCarTypesData, getBestellungenData, getBestellungenPostData };
