import Header from "./HeaderComponent";
import mainBannerTestImg from "../../public/images/main-banner-test-img.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faMagnifyingGlass,
  faDiagramProject,
  faDesktop,
  faGear,
  faPaintbrush,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import sampleImage from "../../public/images/sample-img.jpg";

const Main = () => {
  const [categoryOpenState, setCategoryOpenState] = useState(false);
  const searchCategoryList = ["전체", "제목", "내용", "작성자"];
  const [searchCategory, setSearchCategory] = useState("전체");
  const mainCategoryList = [
    { IT: "IT 소식" },
    { FRONT: "프론트엔드" },
    { BACK: "백엔드" },
    { DESIGN: "디자인" },
    { PORTFOLIO: "포트폴리오" },
  ];
  const [mainCategory, setMainCategory] = useState("");
  const boardList = [
    "친환경 제품을 사용한 기업 제품 소개",
    "티 추천 top 5",
    "실내 조명의 역할",
    "싱그러움을 가득 머금은 카페 정원",
    "모르면 후회하는 친환경 실내디자인...",
  ];

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
        <div className="main-section-banner-category">
          {mainCategoryList.map((category, index) => (
            <div
              key={index}
              onClick={() => setMainCategory(Object.keys(category)[0])}
            >
              <FontAwesomeIcon
                icon={
                  Object.keys(category)[0] === "IT"
                    ? faDiagramProject
                    : Object.keys(category)[0] === "FRONT"
                    ? faDesktop
                    : Object.keys(category)[0] === "BACK"
                    ? faGear
                    : Object.keys(category)[0] === "DESIGN"
                    ? faPaintbrush
                    : Object.keys(category)[0] === "PORTFOLIO"
                    ? faBookOpen
                    : faMagnifyingGlass
                }
              />
              <span>{Object.values(category)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="main-section-card">
        {boardList.map((board, index) => (
          <div key={index} className="main-section-card-item">
            <div className="main-section-card-item-img">
              <img src={sampleImage} alt="sample img" />
            </div>
            <div className="main-section-card-item-title">{board}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
