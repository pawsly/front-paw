import Header from "./HeaderComponent";
import mianBannerTestImg from "../../public/images/main-banner-test-img.jpg";

const FeedMain = () => {
  return (
    <div className="main-section">
      <Header />
      <div className="main-section-banner">
        <img src={mianBannerTestImg} alt="main banner" />
        <div className="main-section-banner-content">
          <span className="main-section-banner-content-title">
            [Nature/Design]
          </span>
          <span className="main-section-banner-content-sub">
            자연 친화 TBL, Triple Bottom Line인 경제적 가치 창조, 환경에 대한
            배려, 사회적 책임이 고려하는 디자인...
          </span>
        </div>
      </div>
      <div className="main-section-header">
        <div className="main-section-header-menu">
          <span>이웃 블로그</span>
          <span>프롤로그</span>
          <span>블로그</span>
        </div>
        <div className="main-section-header-last">
          <span>마지막 접속일</span>
          <span>2023-07-07 22:27:32</span>
        </div>
      </div>
      <div className="main-section-body">
        <div className="main-section-body-feed">
          <div className="main-section-body-feed-hot"></div>
          <div className="main-section-body-feed-new"></div>
        </div>
        <div className="main-section-body-category">
          <div className="main-section-body-category-profile"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedMain;
