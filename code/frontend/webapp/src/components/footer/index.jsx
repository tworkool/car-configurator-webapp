import React from "react";
import "./style";

const Footer = () => {
  return <div className="wbs-footer">
    <div className="wbs-footer__content">{`Copyright Oliver Tworkowski ${new Date().getFullYear()}`}</div>
  </div>;
};

export default Footer;
