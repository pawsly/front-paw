import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEllipsis,
  faGear,
  faHouse,
  faPencil,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import mainLogo from "../../public/images/logo.png";
import whiteLogo from "../../public/images/logo_white.png";
import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const Header = (props) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [profileState, setProfileState] = useState(false);
  const [userData, setUserData] = useState("");

  const clickAwayHandler = (event) => {
    if (event.isTrusted) {
      setProfileState(false);
    }
  };

  const doLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleLogoClick = () => {
    const localStorageInfo = localStorage.getItem("userData");
    if (localStorageInfo) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  const { clickPublish } = props;

  useEffect(() => {
    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, []); // 의존성 배열이 빈 배열인 경우, 처음 마운트될 때 한 번만 실행

  return (
    <div
      className={path === "/" ? "" : "header-section"}
      style={{
        backgroundColor:
          path === "/write"
            ? "white"
            : path.split("/")[1] === "setting"
            ? "none"
            : "",
        padding:
          path === "/write"
            ? "0 34px 0 190px"
            : path.split("/")[1] === "setting"
            ? "0 189px 0 190px"
            : "0 297px 0 190px",
      }}
    >
      <span className={path === "/" ? "title" : "header-section-title"}>
        <img
          src={path.split("/")[1] === "setting" ? whiteLogo : mainLogo}
          className={
            path.split("/")[1] === "setting" ? "white-logo" : "main-logo"
          }
          alt="main Logo"
          onClick={handleLogoClick}
        />
      </span>
      {path === "/write" ? (
        <div className="header-section-item">
          <button className="back-btn" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
          <button className="save-btn">저장</button>
          <button className="publish-btn" onClick={() => clickPublish()}>
            발행
          </button>
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
            <div
              className="header-section-item-home"
              onClick={() => {
                navigate("/personal/" + userData.userid);
              }}
            >
              <FontAwesomeIcon icon={faHouse} className="home-icon" />
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
          <div
            className="profile-menu"
            style={{
              right:
                path === "/write"
                  ? "34px"
                  : path.split("/")[1] === "setting"
                  ? "189px"
                  : "297px",
            }}
          >
            <div className="profile-menu-user">
              <div
                className="profile-menu-user-img"
                onClick={() => navigate("/myfeed/" + userData.userid)}
              >
                <FontAwesomeIcon icon={faUser} className="alert-icon" />
              </div>
              <div className="profile-menu-user-info">
                <span className="id">{userData.userid}</span>
                <span className="nick">{userData.nickname}</span>
              </div>
            </div>
            <div className="profile-menu-item">
              <div
                className="profile-menu-item-account"
                onClick={() => navigate("/setting/" + userData.userid)}
              >
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
