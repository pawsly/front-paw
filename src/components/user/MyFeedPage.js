import Header from "../common/HeaderComponent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartSimple,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import parkImg from "../../public/images/park-img.png";
import dudImg from "../../public/images/dud-img.jpg";

const MyFeed = () => {
  const [userData, setUserData] = useState("");
  const [openState, setOpenState] = useState(false);
  const boardList = [
    "친환경 제품을 사용한 기업 제품 소개",
    "지속 가능한 디자인을 위해서 무엇을 해야할까",
    "지속가능 디자인 수요&발전 조사서 정리",
    "모르면 후회하는 친환경 실내디자인 사례와 진행 방향",
    "2023 디자인페스티벌, 아기자기 악세서리로 재탄생하다",
    "2023년 떠오르고 있는 신예 작가 전시전, 특전 정보 공유",
  ];

  useEffect(() => {
    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div className="my-section">
      <Header />
      <FontAwesomeIcon
        icon={faBars}
        className="category"
        onClick={() => setOpenState(true)}
      />
      <div
        className={
          openState
            ? "my-section-category-opened"
            : "my-section-category-closed"
        }
      >
        <div className="my-section-category-opened-header">
          <div
            className="my-section-category-opened-header-icon"
            onClick={() => setOpenState(false)}
          >
            <FontAwesomeIcon icon={faChartSimple} />
          </div>
          <div className="my-section-category-opened-header-menu"></div>
        </div>
        <div className="my-section-category-opened-body">
          <div className="my-section-category-opened-body-first"></div>
          <div className="my-section-category-opened-body-second"></div>
          <div className="my-section-category-opened-body-third"></div>
        </div>
        <div className="my-section-category-opened-footer">
          <div className="my-section-category-opened-footer-delete"></div>
          <div className="my-section-category-opened-footer-create"></div>
          <div className="my-section-category-opened-footer-edit"></div>
        </div>
      </div>

      <span className="sub">3D Max모델링 디자인 스터디</span>
      <span className="main">{userData.nickname}의 글</span>

      <div className="my-section-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="검색어를 입력하세요." />
      </div>

      <div className="my-section-list">
        <div className="my-section-list-sort">최신글</div>
        {boardList.map((board, index) => (
          <div key={index} className="my-section-list-item">
            <div className="my-section-list-item-img">
              <img
                src={userData.userid === "parkgun" ? parkImg : dudImg}
                alt="test img"
              />
            </div>
            <div className="my-section-list-item-title">{board}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFeed;
