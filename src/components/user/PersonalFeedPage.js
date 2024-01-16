import React, {useEffect, useState} from "react";
import Header from "../common/HeaderComponent";
import axios from "axios";
import personalBannerTestImg from "../../public/images/personal-banner-test-img.jpg";
import sampleImage from "../../public/images/sample-img.jpg";
import dudImg from "../../public/images/dud-img.jpg";

const PersonalFeed = () => {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        // 서버에서 최신 글 데이터를 가져오는 API 호출
        axios.get("http://3.39.25.7:8080/board/list/writer")
            .then(response => {
                setBoardList(response.data);
            })
            .catch(error => {
                console.error("최신 글 데이터 가져오기 실패:", error);
            });
    }, []);

    return (
        <div className="personal-section">
            <Header/>
            <div className="personal-section-banner">
                <img src={personalBannerTestImg} alt="personal banner"/>
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
                    <div className="personal-section-body-feed-new">
                        <div className="personal-section-body-feed-new-sort">최신글</div>

                        {boardList.length === 0 ? (
                            <div className="personal-section-body-feed-new-empty">게시물이 없습니다.</div>
                        ) : (

                            boardList.slice(0, 6).map((board) => (
                                <div key={board.boardKey} className="personal-section-body-feed-new-item">
                                    <div className="personal-section-body-feed-new-item-img">
                                        <img src={dudImg} alt="dud img"/>
                                    </div>
                                    <div className="personal-section-body-feed-new-item-title">{board.title}</div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
                <div className="personal-section-body-category">
                    <div className="personal-section-body-category-profile"></div>
                </div>
            </div>
        </div>
    );
};

export default PersonalFeed;
