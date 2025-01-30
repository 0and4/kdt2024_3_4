import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddPopup from "./ui/AddPopup";
import {
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
  LiaPlaySolid,
} from "react-icons/lia";

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 0;
    gap: 5px;
    font-size: 0.9rem;
  }
  .album-link {
    text-decoration: none;
    color: black;
  }
  .album-link:hover {
    text-decoration: underline;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: #eee;
  border-bottom: 5px solid #ddd;
`;
const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #f9f9f9;
`;
const SongRank = styled.div`
  flex: 0.2;
  justify-content: center;
`;
const SongInfoContainer = styled.div`
  flex: 1;
  display: flex;
`;
const SongCover = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 5px;
`;
const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;
const Song = styled.div``;
const Artist = styled.div``;
const Album = styled.div``;
const Duration = styled.div`
  flex: 0.5;
  text-align: center;
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => (props.liked ? "#e41111" : "#0a0a0a")};
  background-color: #f9f9f9;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#e41111" : "inherit")};

  &:hover,
  &:active {
    color: #717171;
    border-color: #717171;
  }
  &:first-child:hover,
  &:first-child:active {
    color: #e41111;
    border-color: #e41111;
  }
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
function SongList({ showAll, headerTitle, songs = [] }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);
  const popupRef = useRef(null);

  const toggleLike = (rank) => {
    setLikedSongs((prev) => {
      const isLiked = prev.includes(rank);

      if (!isLiked) {
        setShowLikePopup(true);
        setTimeout(() => setShowLikePopup(false), 2000);
      }

      return isLiked ? prev.filter((id) => id !== rank) : [...prev, rank];
    });
  };
  const handleCheckboxChange = (rank) => {
    setSelectedSongs((prev) => {
      const newSelected = prev.includes(rank)
        ? prev.filter((id) => id !== rank)
        : [...prev, rank];

      // 전체 선택 상태 업데이트
      setAllSelected(newSelected.length === songs.length);
      return newSelected;
    });
  };
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map((song) => song.rank));
    }
    setAllSelected(!allSelected);
  };
  const handleAddClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 300,
      left: rect.left + window.scrollX - 200,
    });
  };

  const closePopup = () => setPopupPosition(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    };
    if (popupPosition) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupPosition]);

  const displayedSongs = showAll ? songs : songs.slice(0, 5); // showAll에 따라 전체 목록 또는 5곡만 표시

  return (
    <Wrapper>
      {popupPosition && (
        <AddPopup
          ref={popupRef}
          position={popupPosition}
          onClose={closePopup}
        />
      )}
      <Container>
        <Header>
          <input
            type="checkbox"
            style={{ flex: 0.1 }}
            checked={allSelected}
            onChange={handleSelectAll}
          />
          <div style={{ flex: 0.2 }}>{headerTitle}</div>
          <div style={{ flex: 0.6 }}>곡 정보</div>
          <div style={{ flex: 0.7 }}>앨범</div>
          <div style={{ flex: 0.3 }}>재생시간</div>
          <Actions>
            <div>찜하기</div>
            <div>추가</div>
            <div>재생</div>
          </Actions>
        </Header>

        {displayedSongs.map((song) => (
          <SongItem key={song.rank}>
            <input
              type="checkbox"
              style={{ flex: 0.1 }}
              checked={selectedSongs.includes(song.rank)}
              onChange={() => handleCheckboxChange(song.rank)}
            />
            <SongRank>{song.rank}</SongRank>
            <SongInfoContainer>
              <SongCover />
              <SongInfo>
                <Link to={`/song/${song.rank}`} className="album-link">
                  <Song>{song.title}</Song>
                </Link>
                <Link to={`/artist/${song.artist}`} className="album-link">
                  <Artist>{song.artist}</Artist>
                </Link>
              </SongInfo>
            </SongInfoContainer>

            <Link to={`/album/${song.album}`} className="album-link">
              <Album>{song.album}</Album>
            </Link>
            <Duration>{song.duration}</Duration>
            <Actions>
              <Button
                liked={likedSongs.includes(song.rank)}
                onClick={() => toggleLike(song.rank)}
              >
                {likedSongs.includes(song.rank) ? (
                  <LiaHeartSolid />
                ) : (
                  <LiaHeart />
                )}
              </Button>
              <Button onClick={handleAddClick}>
                <LiaPlusSolid />
              </Button>
              <Button>
                <LiaPlaySolid />
              </Button>
            </Actions>
          </SongItem>
        ))}
      </Container>
      <LikePopup show={showLikePopup}>
        내가 좋아하는 노래로 저장했어요!
      </LikePopup>
    </Wrapper>
  );
}

export default SongList;
