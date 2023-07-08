import Header from "./HeaderComponent";
import mainBannerTestImg from "../../public/images/main-banner-test-img.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Main = () => {
  const [categoryOpenState, setCategoryOpenState] = useState(false);
  const searchCategoryList = ["전체", "제목", "내용", "작성자"];
  const [searchCategory, setSearchCategory] = useState("전체");

  return (
    <div className="main-section">
      <Header />
      <div className="main-section-banner">
        <img src={mainBannerTestImg} alt="main banner" />
        <div
          className={
            categoryOpenState
              ? "main-section-banner-drop-opened"
              : "main-section-banner-drop"
          }
        >
          {searchCategoryList.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchCategory(category);
              }}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="main-section-banner-search">
          <div className="main-section-banner-search-category">
            <span>{searchCategory}</span>
            <FontAwesomeIcon
              icon={faCaretUp}
              onClick={() => {
                setCategoryOpenState(!categoryOpenState);
              }}
            />
          </div>
          <div className="main-section-banner-search-input">
            <input type="text" placeholder="검색할 내용을 입력하세요." />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
