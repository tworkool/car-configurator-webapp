import { fetch } from "cross-fetch";
import ENVIRONMENT from "../../../utils/env";
import { isFloat } from "../../../utils/helpers";

const BACKEND = {
  sample_fetch: (lat, lon) => {
    if (!isFloat(lat) || !isFloat(lon)) {
      throw new Error("REQUEST ERROR: lat and lon need to be floats");
    }
    const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENVIRONMENT.WEATHER_API_KEY}`;

    return fetch(fetchUrl);
  },
  get_config_types_all: () => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/configtypes/all`;

    return fetch(fetchUrl, { method: "GET", mode: "cors" });
  },
  get_config_type_id: (id) => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/configtypes&${id}`;

    return fetch(fetchUrl, { method: "GET", mode: "cors" });
  },
  get_config_type_name: (configName) => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/configtypes/${configName}`;

    return fetch(fetchUrl, { method: "GET", mode: "cors" });
  },
  get_bestellung_bestellnummer: (bestellnummer) => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/bestellungen/${bestellnummer}`;

    return fetch(fetchUrl, { method: "GET", mode: "cors" });
  },
  delete_bestellung_bestellnummer: (bestellnummer) => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/bestellungen/${bestellnummer}`;

    return fetch(fetchUrl, {
      method: "DELETE",
      mode: "cors",
    });
  },
  post_bestellung: (data) => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/bestellungen`;

    return fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
  },
  get_cars: () => {
    const fetchUrl = `${ENVIRONMENT.CAR_CONFIGURATOR_API_URL}/cars/all`;

    return fetch(fetchUrl, { method: "GET", mode: "cors" });
  },
};

export default BACKEND;
