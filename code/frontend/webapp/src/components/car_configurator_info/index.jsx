import React, { useEffect, useState } from "react";
import { Group, Skeleton } from "@mantine/core";
import { useSelector } from "react-redux";
import { getCarTypesData } from "../../redux/selectors/appState";
import "./style";

const CarConfiguratorInfo = () => {
  const carInfo = useSelector(getCarTypesData);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentCarInfo, setCurrentCarInfo] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (carInfo !== null && carInfo.length > 0) {
      console.log(carInfo);
      setCurrentCarInfo(carInfo[currentCarIndex]);
    } else {
      setCurrentCarInfo(null);
    }
  }, [carInfo, currentCarIndex]);

  useEffect(() => {
    if (carInfo !== null) {
      setIsLoadingData(false);
    }
  }, [carInfo]);

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
        <Skeleton radius="sm" visible={isLoadingData} height={150} width={400}>
          <div className={`wbs-car-configurator-info__title`}>
            {currentCarInfo.name}
          </div>
          <Group spacing="lg" className={`wbs-car-configurator-info__sub`}>
            {SubItem("Klasse", currentCarInfo.klasse)}
            <div className="wbs-car-configurator-info__sub__separator" />
            {SubItem(
              "Grundpreis",
              `${currentCarInfo.grundpreis} €`
            )}
          </Group>
        </Skeleton>
      )}
    </div>
  );
};

export default CarConfiguratorInfo;
