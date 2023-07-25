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
import { useLocation, useNavigate } from "react-router-dom";
import mainLogo from "../../public/images/logo.png";
import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const Header = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [profileState, setProfileState] = useState(false);

  const clickAwayHandler = (event) => {
    if (event.isTrusted) {
      setProfileState(false);
    }
  };

  const doLogout = () => {
    navigate("/");
  };

  return (
    <div
      className={path === "/" ? "" : "header-section"}
      style={
        path === "/write"
          ? { backgroundColor: "white", padding: "0 34px 0 190px" }
          : { padding: "0 297px 0 190px" }
      }
    >
      <span className={path === "/" ? "title" : "header-section-title"}>
        <img src={mainLogo} alt="main Logo" onClick={() => navigate("/")} />
      </span>
      {path === "/write" ? (
        <div className="header-section-item">
          <button className="back-btn" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
          <button className="save-btn">저장</button>
          <button className="publish-btn">발행</button>
        </div>
      ) : (
        path !== "/" && (
          <div className="header-section-item">
            <div className="header-section-item-etc">
              <FontAwesomeIcon icon={faEllipsis} className="more-icon" />
            </div>
            <div
              className="header-section-item-write"
              onClick={() => navigate("/write")}
            >
              <FontAwesomeIcon icon={faPencil} className="write-icon" />
            </div>
            <div className="header-section-item-setting">
              <FontAwesomeIcon icon={faGear} className="setting-icon" />
            </div>
            <div className="header-section-item-alert">
              <FontAwesomeIcon icon={faBell} className="alert-icon" />
            </div>
            <div
              className="header-section-item-profile"
              onClick={() => setProfileState(!profileState)}
            >
              <FontAwesomeIcon icon={faUser} className="alert-icon" />
            </div>
          </div>
        )
      )}
      {profileState && (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <div className="profile-menu">
            <div className="profile-menu-user">
              <div
                className="profile-menu-user-img"
                onClick={() => navigate("/personal")}
              >
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
              <div className="profile-menu-item-logout" onClick={doLogout}>
                <FontAwesomeIcon icon={faPowerOff} className="logout-icon" />
                <span>로그아웃</span>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Header;
