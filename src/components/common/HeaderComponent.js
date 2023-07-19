import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleExclamation,
  faEllipsis,
  faGear,
  faPencil,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import mainLogo from "../../public/images/logo.png";
import React, { useState } from "react";

const Header = () => {
  const path = useLocation().pathname;
  const [profileState, setProfileState] = useState(false);

  const doLogout = () => {
    window.location = "/";
  };

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
          <div className="header-section-item-profile">
            <FontAwesomeIcon
              icon={faUser}
              className="alert-icon"
              onClick={() => setProfileState(!profileState)}
            />
          </div>
        </div>
      )}
      {profileState && (
        <div className="profile-menu">
          <div className="profile-menu-user">
            <div className="profile-menu-user-img">
              <FontAwesomeIcon icon={faUser} className="alert-icon" />
            </div>
            <div className="profile-menu-user-info">
              <span className="id">John Gnabry</span>
              <span className="nick">JohnG_7117</span>
            </div>
          </div>
          <div className="profile-menu-item">
            <div className="profile-menu-item-account">
              <FontAwesomeIcon icon={faUser} className="account-icon" />
              <span>계정 관리</span>
            </div>
            <div className="profile-menu-item-help">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="help-icon"
              />
              <span>도움말</span>
            </div>
            <div className="sap"></div>
            <div className="profile-menu-item-logout">
              <FontAwesomeIcon icon={faPowerOff} className="logout-icon" />
              <span onClick={doLogout}>로그아웃</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
