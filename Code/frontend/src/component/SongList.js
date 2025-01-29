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
  flex: 1.5;
  display: flex;
`;
const SongCover = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 5px;
`;
const SongInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;
const Album = styled.div`
  flex: 0.7;
  text-align: left;
`;
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
function SongList({ showAll, headerTitle, songs = [] }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const popupRef = useRef(null);

  const toggleLike = (rank) => {
    setLikedSongs((prev) =>
      prev.includes(rank) ? prev.filter((id) => id !== rank) : [...prev, rank]
    );
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
          <div style={{ flex: 0.7 }}>{headerTitle}</div>
          <div style={{ flex: 1.0 }}>곡 정보</div>
          <div style={{ flex: 0.7 }}>앨범</div>
          <Duration>재생시간</Duration>
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
              style={{ flex: 0.2 }}
              checked={likedSongs.includes(song.rank)}
              onChange={() => toggleLike(song.rank)}
            ></input>
            <SongRank>{song.rank}</SongRank>
            <SongInfoContainer>
              <SongCover />
              <SongInfo>
                <Link
                  to={`/song/${song.rank}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>{song.title}</div>
                </Link>
                <Link
                  to={`/artist/${song.artist}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>{song.artist}</div>
                </Link>
              </SongInfo>
            </SongInfoContainer>
            <Album>
              <Link
                to={`/album/${song.album}`}
                style={{ textDecoration: "none" }}
              >
                {song.album}
              </Link>
            </Album>
            <Duration>{song.duration}</Duration>
            <Actions>
              <Button
                {...(likedSongs.includes(song.rank) && { liked: true })}
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
    </Wrapper>
  );
}

export default SongList;
