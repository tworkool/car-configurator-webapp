import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "../../redux/selectors/appState";
import "./style";

const CarConfiguratorMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpanderClicked = useCallback(() => {
    setIsExpanded((old) => !old);
  }, [setIsExpanded]);

  return (
    <div
      className={`wbs-car-configuration-menu ${
        isExpanded ? "wbs-car-configuration-menu--expanded" : ""
      }`}
    >
      <button
        className="wbs-car-configuration-menu__extender-button"
        type="button"
        onClick={handleExpanderClicked}
      ></button>
      <div className="wbs-car-configuration-menu__backdrop-bar"></div>
    </div>
  );
};

export default CarConfiguratorMenu;
