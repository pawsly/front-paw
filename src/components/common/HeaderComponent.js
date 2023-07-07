import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEllipsis,
  faGear,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header-section">
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
    </div>
  );
};

export default Header;
