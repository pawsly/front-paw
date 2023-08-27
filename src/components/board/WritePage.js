import Header from "../common/HeaderComponent";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { apiClient, setAuthorizationToken } from "../utils/api";
import { useSelector } from "react-redux";

const Write = () => {
  const accessToken = useSelector(
    (state) => state.authToken.accessToken.payload
  ); // accessToken 불러오기: 꼭 여기서 불러와야 함 함수 안에서 불러오면 오류남!!!!
  const categoryList = [
    { category01: "코딩 개발일지" },
    { category02: "확률과 통계" },
  ];
  const [categoryHolder, setCategoryHolder] = useState("카테고리");
  const [secretState, setSecretState] = useState(false);
  const [categoryState, setCategoryState] = useState(false);
  const [boardDetail, setBoardDetail] = useState({
    title: "",
    content: "",
    secret: false,
    categoryKey: "",
    boardState: "N", // 임시저장 여부: N or Y
  });
  const editorToolbar =
    "undo redo spellcheckdialog  | blocks fontfamily fontsizeinput | bold italic underline forecolor backcolor | link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography";
  const [userData, setUserData] = useState("");

  const selectCategory = (key, value) => {
    boardDetail.categoryKey = key;
    setCategoryHolder(value);
    setCategoryState(false);
  };

  const editorChangeHandler = (event) => {
    boardDetail.content = event;
  };

  const boardDetailChangeHandler = (event) => {
    setBoardDetail({ ...boardDetail, [event.target.id]: event.target.value });
  };

  const doPublish = async () => {
    boardDetail.secret = secretState ? "Y" : "N";
    boardDetail.boardState = "Y";

    const boardInfoKey = {
      title: "제목",
      content: "내용",
      categoryKey: "카테고리",
    };

    for (let key in boardInfoKey) {
      if (!boardDetail[key]) {
        if (key === "categoryKey") {
          window.alert("카테고리를 선택해 주세요.");
          return false;
        } else {
          window.alert(boardInfoKey[key] + "이 비어 있습니다.");
          return false;
        }
      }
    }

    console.log("board detail: ", boardDetail);
    console.log("access token: ", accessToken);

    await setAuthorizationToken(accessToken); // 요청할 때 accessToken 헤더에 설정
    const result = await apiClient("/board/post", boardDetail);

    console.log("result: ", result);

    if (result) {
      if (result.status === 200) {
        window.alert("게시물 업로드에 성공했습니다.");
      } else {
        window.alert("게시물 업로드에 실패했습니다. 다시 시도하세요.");
        return false;
      }
    } else {
      window.alert("게시물 업로드에 실패했습니다. 다시 시도하세요.");
      return false;
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div className="write-section">
      <Header clickPublish={doPublish} />
      <div className="write-section-body">
        <div className="write-section-body-text">
          <div className="write-section-body-text-title">
            <input
              type="text"
              placeholder="Title"
              id="title"
              value={boardDetail.title}
              onChange={boardDetailChangeHandler}
            />
            <div className="write-section-body-text-title-option">
              <label>
                <button
                  id="secret"
                  value={secretState}
                  onClick={() => setSecretState(!secretState)}
                  className={secretState ? "secret-on" : "secret-off"}
                ></button>
                비밀글
              </label>
              <div
                className="category"
                onClick={() => setCategoryState(!categoryState)}
              >
                <span>{categoryHolder}</span>
                <i className="fa-solid fa-caret-down"></i>
              </div>
              {categoryState && (
                <div className="category-box">
                  {categoryList.map((category, index) => (
                    <div
                      className="category-box-item"
                      key={index}
                      onClick={() =>
                        selectCategory(
                          Object.keys(category)[0],
                          Object.values(category)
                        )
                      }
                    >
                      {Object.values(category)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Editor
            id="tiny-editor"
            apiKey="fenssbt6xoaiviycm7rqs6vq4t2apkfktityh67ohe08p0u3"
            init={{
              toolbar: editorToolbar,
              placeholder: "당신의 Pawsly를 적어주세요!",
              height: "100%",
            }}
            onEditorChange={editorChangeHandler}
          />
        </div>
        <div className="write-section-body-profile">
          <div className="write-section-body-profile-border">
            <div className="write-section-body-profile-border-img">
              <span>등록된 사진이 없습니다.</span>
            </div>
          </div>
          <div className="write-section-body-profile-name">
            <span className="label">{userData.userid}</span>
          </div>
          <div className="write-section-body-profile-nickname">
            <span className="label">{userData.nickname}</span>
          </div>
          <div className="write-section-body-profile-followBtn">
            <button>팔로잉</button>
          </div>
          <div className="write-section-body-profile-intro">
            <span className="write-section-body-profile-intro-content">
              {userData.phone}
            </span>
          </div>
          <div className="write-section-body-profile-followState">
            <div className="write-section-body-profile-followState-followers">
              <span className="number">123만</span>
              <span className="label">팔로워</span>
            </div>
            <div className="write-section-body-profile-followState-follow">
              <span className="number">25</span>
              <span className="label">팔로우</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
