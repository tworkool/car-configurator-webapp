import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarConfiguratorInfo from "../../components/car_configurator_info";
import CarConfiguratorMenu from "../../components/car_configurator_menu";
import {
  requestCarTypesDataFetch,
  requestCarConfigtypesDataFetch,
} from "../../redux/actions/app_state";
import "./style";

const CarConfiguratorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCarConfigtypesDataFetch());
    dispatch(requestCarTypesDataFetch());
  }, [dispatch]);

  return (
    <div className="wsb-page wbs-home-page">
      <CarConfiguratorInfo />
      <CarConfiguratorMenu />
    </div>
  );
};

export default CarConfiguratorPage;
