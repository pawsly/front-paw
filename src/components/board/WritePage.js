import Header from "../common/HeaderComponent";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const Write = () => {
  const [secretState, setSecretState] = useState(false);
  const [boardDetail, setBoardDetail] = useState({
    title: "",
    content: "",
    secret: "",
  });
  const editorToolbar =
    "undo redo spellcheckdialog  | blocks fontfamily fontsizeinput | bold italic underline forecolor backcolor | link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography";

  const boardDetailChangeHandler = (event) => {
    setBoardDetail({ ...boardDetail, [event.target.id]: event.target.value });

    console.log(boardDetail);
  };

  return (
    <div className="write-section">
      <Header />
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
              <div>카테고리</div>
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
          />
        </div>
        <div className="write-section-body-profile">
          <div className="write-section-body-profile-border">
            <div className="write-section-body-profile-border-img">
              <span>등록된 사진이 없습니다.</span>
            </div>
          </div>
          <div className="write-section-body-profile-name">
            <span className="label">이름</span>
          </div>
          <div className="write-section-body-profile-nickname">
            <span className="label">닉네임</span>
          </div>
          <div className="write-section-body-profile-followBtn">
            <button>팔로잉</button>
          </div>
          <div className="write-section-body-profile-intro">
            <span>3D Max 모델링 디자인 스터디</span>
          </div>
          <div className="write-section-body-profile-followState">
            <div className="write-section-body-profile-followers">
              <span>123만</span>
              <span>팔로워</span>
            </div>
            <div className="write-section-body-profile-follow">
              <span>25</span>
              <span>팔로우</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
