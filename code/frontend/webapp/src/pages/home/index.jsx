import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestCarTypesDataFetch } from "../../redux/actions/app_state";
import { getCarTypesData } from "../../redux/selectors/appState";
import "./style";

const HomePage = () => {
  const weatherData = useSelector(getCarTypesData);
  const dispatch = useDispatch();

  const handleBtnClick = useCallback(() => {
    dispatch(requestCarTypesDataFetch());
  }, [dispatch]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="wsb-page wbs-home-page">
      <button onClick={handleBtnClick}>Fetch Weather Data</button>
      <div>{JSON.stringify(weatherData)}</div>
    </div>
  );
};

export default HomePage;
