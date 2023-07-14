import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEllipsis,
  faGear,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import mainLogo from "../../public/images/logo.png";
import React from "react";

const Header = () => {
  const path = useLocation().pathname;
  console.log(path);

  return (
    <div
      className="header-section"
      style={path === "/" ? { height: "0" } : { height: "117px" }}
    >
      <span className={path === "/" ? "title" : "header-section-title"}>
        <img
          src={mainLogo}
          alt="main Logo"
          onClick={() => (window.location = "/")}
        />
      </span>
      {path !== "/" && (
        <div className="header-section-item">
          <div className="header-section-item-etc">
            <FontAwesomeIcon icon={faEllipsis} className="more-icon" />
          </div>
          <div className="header-section-item-write">
            <FontAwesomeIcon icon={faPencil} className="write-icon" />
          </div>
          <div className="header-section-item-setting">
            <FontAwesomeIcon icon={faGear} className="setting-icon" />
          </div>
          <div className="header-section-item-alert">
            <FontAwesomeIcon icon={faBell} className="alert-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
