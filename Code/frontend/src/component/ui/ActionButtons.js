import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
  LiaPlaySolid,
} from "react-icons/lia";
import { useLikedSongs } from '../LikedSongsContext';
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
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  opacity: ${(props) => (props.$show === "true"  ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  visibility: ${(props) => (props.$show === "true" ? "visible" : "hidden")};
`;
function ActionButtons({ songId, song, type, onPlay }) {
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const navigate = useNavigate(); // 페이지 이동 함수
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);

  const liked = Array.isArray(likedSongs) && likedSongs.some((likedSong) => likedSong.id === songId);

  const toggleLike = async () => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("로그인 후 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/playList/normal/my-thumb", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("플레이리스트를 불러오는 데 실패했습니다.");

      const data = await response.json();
      const favoritePlaylist = data.dataList.find(
        (playlist) => playlist.name === "내가 좋아하는 노래"
      );

      if (!favoritePlaylist) {
        alert("‘내가 좋아하는 노래’ 플레이리스트를 찾을 수 없습니다.");
        return;
      }

      const addResponse = await fetch("http://localhost:8080/playList/normal/addSong", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistIds: [favoritePlaylist.id],
          songId: songId,
        }),
      });

      if (!addResponse.ok) throw new Error("노래를 찜하는 데 실패했습니다.");

      setLikedSongs((prevLikedSongs) => [...prevLikedSongs, song]);
      
      //onToggleLike(songId);
      setShowLikePopup(true);
      setTimeout(() => setShowLikePopup(false), 2000);
    } catch (error) {
      console.error("🚨 오류 발생:", error);
      alert(error.message);
    }
  };

  const handleAddClick = (e) => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("로그인 후 곡 추가 기능을 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const newPosition = {
      top: rect.top + window.scrollY - 200,
      left: rect.left + window.scrollX - 240,
    };
    setPopupPosition(newPosition);  // 위치 상태 업데이트
  };
  
  const closePopup = () => setPopupPosition(null);
  
  const handlePlay = async () => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("로그인 후 곡 재생 기능을 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    console.log("재생 버튼 클릭됨", songId);
    console.log("곡 정보", song);

    if (!onPlay) {
      console.error("onPlay 함수가 정의되지 않았습니다.");
      return;
    }

    // try {
    //   console.log(`🎵 서버로 재생 요청: http://localhost:8080/stream/play/${song.id}`); 
    //   console.log(`🔑 전송할 토큰: ${token}`);
    //   // ✅ Spring Boot 서버로 요청 전송
    //   const response = await fetch(`http://localhost:8080/stream/play/${song.id}`, {
    //     method: "GET",
    //     headers: {
    //       "Authorization": `Bearer ${token}`, // ✅ 토큰을 Authorization 헤더에 추가
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error(`서버 오류: ${response.status}`);
    //   }

    //   console.log(`🎵 서버에서 재생 요청 성공: ${song.title}`);
    //   onPlay(song); // ✅ Player.js에 곡 정보 전달 (정상 요청 후 실행)
      
    // } catch (error) {
    //   console.error("🚨 재생 요청 중 오류 발생:", error);
    //   alert("음악을 재생하는 도중 오류가 발생했습니다.");
    // }
    
    onPlay(song); // Player.js의 handlePlaySong 호출
    // 여기에 실제 노래 재생 로직 추가
  };
  return (
    <div>
      {/* 팝업 위치가 설정되었을 때 AddPopup 컴포넌트 렌더링 */}
      {popupPosition && (
        <AddPopup
          position={popupPosition}
          onClose={closePopup}
          songId={songId}
          song={song}
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
        <LikePopup $show={showLikePopup ? "true" : "false"}>
          내가 좋아하는 노래로 저장했어요!
        </LikePopup>
      )}
    </div>
  );
}
export default ActionButtons;
