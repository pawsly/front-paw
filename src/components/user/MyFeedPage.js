import Header from "../common/HeaderComponent";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChartSimple,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import parkImg from "../../public/images/park-img.png";
import dudImg from "../../public/images/dud-img.jpg";
import categoryIcon from "../../public/images/btn_icon.png";
import {apiClient} from "../utils/api";
import axios from "axios";

const MyFeed = () => {
    const [userData, setUserData] = useState("");
    const [openState, setOpenState] = useState(false);
    const [boardList, setBoardList] = useState([]);


    useEffect(() => {
        const userInfo = localStorage.getItem("userData");

        if (userInfo) {
            setUserData(JSON.parse(userInfo));
        }
        axios.get("http://3.39.25.7:8080/board/list/{writer}")
            .then(response => {
                setBoardList(response.data);


            })

            .catch(error => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []);

    // const currentUserBoardList = boardList.filter(
    //     (post) => post.writer === userData.nickname
    // );


    return (
        <div className="my-section">
            <Header/>
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
                        <FontAwesomeIcon icon={faChartSimple}/>
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
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input type="text" placeholder="검색어를 입력하세요."/>
            </div>

            <div className="my-section-list">
                <div className="my-section-list-sort">최신글</div>
                {boardList.length === 0 ? (
                    <div className="my-section-list-empty">게시물이 없습니다.</div>
                ) : (

                    boardList.slice(0, 6).map((board) => (
                        <div key={board.boardKey} className="my-section-list-item">
                            <div className="my-section-list-item-img">
                                {/* 이미지 렌더링 */}
                            </div>
                            <div className="my-section-list-item-title">{board.title}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyFeed;