import Header from "../common/HeaderComponent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import myFeedImg from "../../public/images/my-feed-img.jpg";

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
    "이건 스크롤 테스트용",
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

      <span className="sub">3D Max모델링 디자인 스터디</span>
      <span className="main">{userData.nickname}의 글</span>

      <div className="my-section-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="검색어를 입력하세요." />
      </div>

      <div className="my-section-list">
        <div className="my-section-list-sort">최신글</div>
        {boardList.map((board, index) => (
          <div className="my-section-list-item">
            <div className="my-section-list-item-img">
              <img src={myFeedImg} alt="test img" />
            </div>
            <div className="my-section-list-item-title">{board}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFeed;
