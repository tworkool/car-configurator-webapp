import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCarTypesData } from "../../redux/selectors/appState";
import "./style";

const CarConfiguratorInfo = () => {
  const carInfo = useSelector(getCarTypesData);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentCarInfo, setCurrentCarInfo] = useState(null);

  useEffect(() => {
    if ((carInfo !== null | undefined) && carInfo.length > 0) {
      console.log(carInfo);
      setCurrentCarInfo(carInfo[currentCarIndex]);
    } else {
      setCurrentCarInfo(null);
    }
  }, [carInfo, currentCarIndex]);

  const SubItem = (title, value) => {
    return (
      <div className={`wbs-car-configurator-info__sub__item`}>
        <div className={`wbs-car-configurator-info__sub__item__title`}>
          {title}
        </div>
        <div className={`wbs-car-configurator-info__sub__item__value`}>
          {value}
        </div>
      </div>
    );
  };

  // TODO: kombinierten Preis hier anzeigen!!
  return (
    <div className={`wbs-car-configurator-info`}>
      {currentCarInfo !== null && (
        <>
          <div className={`wbs-car-configurator-info__title`}>
            {currentCarInfo.name}
          </div>
          <div className={`wbs-car-configurator-info__sub`}>
            {SubItem("Klasse", currentCarInfo.klasse)}
            <div className="wbs-car-configurator-info__sub__separator" />
            {SubItem(
              "Gesamtpreis (kombiniert)",
              `${currentCarInfo.grundpreis} €`
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarConfiguratorInfo;
