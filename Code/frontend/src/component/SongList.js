import React, { useState } from "react";
import styled from "styled-components";
import {
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
  LiaPlaySolid,
} from "react-icons/lia";
const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  div {
    margin: 0 10px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  font-size: 1.3vh;
  background-color: #eee;
  border-bottom: 5px solid #ddd;
`;
const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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

//임의의 노래 목록
const songs = [
  {
    rank: 1,
    title: "Song A",
    artist: "Artist A",
    album: "Album A",
    duration: "3:45",
  },
  {
    rank: 2,
    title: "Song B",
    artist: "Artist B",
    album: "Album B",
    duration: "4:00",
  },
  {
    rank: 3,
    title: "Song C",
    artist: "Artist C",
    album: "Album C",
    duration: "3:30",
  },
  {
    rank: 4,
    title: "Song D",
    artist: "Artist D",
    album: "Album D",
    duration: "3:50",
  },
  {
    rank: 5,
    title: "Song E",
    artist: "Artist E",
    album: "Album E",
    duration: "4:10",
  },
  {
    rank: 6,
    title: "Song F",
    artist: "Artist F",
    album: "Album F",
    duration: "3:25",
  },
  {
    rank: 7,
    title: "Song G",
    artist: "Artist G",
    album: "Album G",
    duration: "3:15",
  },
  {
    rank: 8,
    title: "Song H",
    artist: "Artist H",
    album: "Album H",
    duration: "4:05",
  },
  {
    rank: 9,
    title: "Song I",
    artist: "Artist I",
    album: "Album I",
    duration: "3:40",
  },
  {
    rank: 10,
    title: "Song J",
    artist: "Artist J",
    album: "Album J",
    duration: "3:55",
  },
];

function SongList() {
  const [likedSongs, setLikedSongs] = useState([]); // 찜한 노래의 ID를 저장

  const toggleLike = (rank) => {
    setLikedSongs(
      (prevLikedSongs) =>
        prevLikedSongs.includes(rank)
          ? prevLikedSongs.filter((id) => id !== rank) // 찜 해제
          : [...prevLikedSongs, rank] // 찜 추가
    );
  };
  return (
    <Wrapper>
      <Container>
        <Header>
          <div style={{ flex: 0.3 }}>순위</div>
          <div style={{ flex: 1.5 }}>곡 정보</div>
          <div style={{ flex: 0.7 }}>앨범</div>
          <Duration>재생시간</Duration>
          <Actions>
            <div>찜하기</div>
            <div>추가</div>
            <div>재생</div>
          </Actions>
        </Header>
        {songs.map((song) => (
          <SongItem key={song.rank}>
            <input type="checkbox" style={{ flex: 0.2 }}></input>
            <SongRank>{song.rank}</SongRank>
            <SongInfoContainer>
              <SongCover />
              <SongInfo>
                <div>{song.title}</div>
                <div>{song.artist}</div>
              </SongInfo>
            </SongInfoContainer>
            <Album>{song.album}</Album>
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
              <Button>
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
