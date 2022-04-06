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

export { getMessages, getCarConfigTypesData, getCarTypesData, getBestellungenData };
