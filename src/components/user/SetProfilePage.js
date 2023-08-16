import Header from "../common/HeaderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCamera,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SetProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [editState, setEditState] = useState(false);
  const [profile, setProfile] = useState({
    userid: userData.userid,
    nickname: userData.nickname,
    phone: userData.phone,
  });

  const editProfile = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };
  const saveProfile = () => {
    setEditState(true);
    window.location.reload();
    localStorage.setItem("userData", JSON.stringify(profile));
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("userData");

    if (userInfo) {
      setUserData(JSON.parse(userInfo));
      setProfile(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div className="set-section">
      <Header />
      {editState ? (
        <div className="set-section-circle-edit">
          <div className="set-section-circle-edit-profile">
            <span>등록된 사진이 없습니다.</span>
          </div>
          <div className="set-section-circle-edit-camera">
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <div className="set-section-circle-edit-id">
            <span className="label">아이디</span>
            <div className="set-section-circle-edit-id-input">
              <input
                name="userid"
                type="text"
                placeholder=""
                value={userData.userid}
                readOnly
              />
            </div>
          </div>
          <div className="set-section-circle-edit-nickname">
            <span className="label">닉네임</span>
            <div className="set-section-circle-edit-nickname-input">
              <input
                name="nickname"
                type="text"
                placeholder=""
                value={profile.nickname}
                onChange={(e) => editProfile(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className="set-section-circle-edit-info">
            <span className="label">소개글</span>
            <div className="set-section-circle-edit-info-input">
              <input
                name="phone"
                type="text"
                placeholder=""
                value={profile.phone}
                onChange={(e) => editProfile(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="set-section-circle">
          <div className="set-section-circle-profile">
            <span>등록된 사진이 없습니다.</span>
          </div>
          <div className="set-section-circle-id">
            <span className="label">아이디</span>
            <div className="set-section-circle-id-input">{userData.userid}</div>
          </div>
          <div className="set-section-circle-nickname">
            <span className="label">닉네임</span>
            <div className="set-section-circle-nickname-input">
              {userData.nickname}
            </div>
          </div>
          <div className="set-section-circle-info">
            <span className="label">소개글</span>
            <div className="set-section-circle-info-input">
              {userData.phone}
            </div>
          </div>
        </div>
      )}

      <div
        className="back-btn"
        onClick={() => navigate(-1)}
        style={{ color: editState ? "#928d8d" : "white" }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        <span>돌아가기</span>
      </div>

      {editState && <span className="edit-title">프로필 편집</span>}

      {editState ? (
        <div className="set-section-button">
          <button className="save-btn" onClick={saveProfile}>
            <span>저장</span>
          </button>
          <button className="cancel-btn" onClick={() => setEditState(false)}>
            <span>취소</span>
          </button>
        </div>
      ) : (
        <button className="edit-btn" onClick={() => setEditState(true)}>
          <FontAwesomeIcon icon={faPencil} />
          <span>프로필 편집</span>
        </button>
      )}

      <div className="set-section-last">
        <span className="label">마지막 접속일</span>
        <span className="item">2023-03-04 20:27:06</span>
      </div>
    </div>
  );
};

export default SetProfile;
