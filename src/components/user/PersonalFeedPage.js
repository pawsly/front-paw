import Header from "../common/HeaderComponent";
import personalBannerTestImg from "../../public/images/personal-banner-test-img.jpg";

const PersonalFeed = () => {
  return (
    <div className="personal-section">
      <Header />
      <div className="personal-section-banner">
        <img src={personalBannerTestImg} alt="personal banner" />
        <div className="personal-section-banner-content">
          <span className="personal-section-banner-content-title">
            [Nature/Design]
          </span>
          <span className="personal-section-banner-content-sub">
            자연 친화 TBL, Triple Bottom Line인 경제적 가치 창조, 환경에 대한
            배려, 사회적 책임이 고려하는 디자인...
          </span>
        </div>
      </div>
      <div className="personal-section-header">
        <div className="personal-section-header-menu">
          <span>이웃 블로그</span>
          <span>프롤로그</span>
          <span>블로그</span>
        </div>
        <div className="personal-section-header-last">
          <span>마지막 접속일</span>
          <span>2023-07-07 22:27:32</span>
        </div>
      </div>
      <div className="personal-section-body">
        <div className="personal-section-body-feed">
          <div className="personal-section-body-feed-hot"></div>
          <div className="personal-section-body-feed-new"></div>
        </div>
        <div className="personal-section-body-category">
          <div className="personal-section-body-category-profile"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFeed;
