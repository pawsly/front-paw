import Header from "./HeaderComponent";
import mainBannerTestImg from "../../public/images/main-banner-test-img.jpg";

const Main = () => {
  return (
    <div className="main-section">
      <Header />
      <div className="main-section-banner">
        <img src={mainBannerTestImg} alt="main banner" />
      </div>
    </div>
  );
};

export default Main;
