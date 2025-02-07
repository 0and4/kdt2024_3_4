import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
  LiaPlaySolid,
} from "react-icons/lia";
import AddPopup from "../Popup/AddPopup";
export const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  gap: 5px;
`;
const Button = styled.button`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #717171;
  background-color: #f9f9f9;
  border-radius: 50%;
  cursor: pointer;
  color: #717171;

  &:hover,
  &:active {
    color: #e41111;
    border-color: #e41111;
  }
  &:first-child:hover,
  &:first-child:active {
    color: #e41111;
    border-color: #e41111;
  }
  ${(props) =>
    props.$liked
      ? `
    color: #e41111;
    border-color: #e41111;
    `
      : `
    color: #717171;
    border-color: #717171;
    `}
`;
const LikePopup = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;
function ActionButtons({ songId, type, liked, onToggleLike }) {
  const navigate = useNavigate(); // 페이지 이동 함수
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);

  const toggleLike = () => {
    onToggleLike(songId);
    setShowLikePopup(true);
    setTimeout(() => setShowLikePopup(false), 2000);
  };

  const handleAddClick = (e) => {
    const token = sessionStorage.getItem("access_token"); // 세션에서 access token 확인
    if (!token) {
      alert("로그인 후 곡 추가 기능을 이용할 수 있습니다.");
      navigate("/login");
      return; // 로그인 안 되면 함수 실행을 멈춤
    }

    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 300,
      left: rect.left + window.scrollX - 200,
    });
  };
  const closePopup = () => setPopupPosition(null);
  const handlePlay = () => {
    const token = sessionStorage.getItem("access_token"); // 세션에서 access token 확인
    if (!token) {
      alert("로그인 후 곡 재생 기능을 이용할 수 있습니다.");
      navigate("/login");
      return; // 로그인 안 되면 함수 실행을 멈춤
    }

    console.log("재생 버튼 클릭됨", songId);
    // 여기에 실제 노래 재생 로직 추가
  };
  return (
    <div>
      {/* 팝업 위치가 설정되었을 때 AddPopup 컴포넌트 렌더링 */}
      {popupPosition && (
        <AddPopup
          position={popupPosition}
          onClose={closePopup}
          //playlists={/* 전달할 플레이리스트 배열 */}
        />
      )}
      <Actions>
        {/* 좋아요 버튼 */}
        {type === "like" && (
          <Button onClick={toggleLike} $liked={liked}>
            {liked ? <LiaHeartSolid /> : <LiaHeart />}
          </Button>
        )}
        {/* 추가 버튼 */}
        {type === "add" && (
          <Button onClick={handleAddClick}>
            <LiaPlusSolid />
          </Button>
        )}
        {/* 재생 버튼 */}
        {type === "play" && (
          <Button onClick={handlePlay}>
            <LiaPlaySolid />
          </Button>
        )}
      </Actions>
      {/* 좋아요 팝업 */}
      {showLikePopup && (
        <LikePopup show={showLikePopup}>
          내가 좋아하는 노래로 저장했어요!
        </LikePopup>
      )}
    </div>
  );
}
export default ActionButtons;
