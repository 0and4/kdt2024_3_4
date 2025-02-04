import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BackBtn } from "../ui/Buttons";
import SongList from "../ui/SongList";
import { FaChevronRight } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Wrapper, Container, BackWrapper, InfoDiv } from "../ui/AllDiv";
import RecMenuDiv from "../ui/MenuDiv";
const ControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;
const TitleP = styled.p`
  font-weight: bold;
`;

//임의의 수록곡 데이터
const songs = [
  {
    id: 1,
    title: "Song A",
    album: "Album 1",
    artist: "Artist A",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Song B",
    album: "Album 1",
    artist: "Artist A",
    duration: "4:00",
  },
  {
    id: 3,
    title: "Song C",
    album: "Album 1",
    artist: "Artist A",
    duration: "3:30",
  },
  {
    id: 4,
    title: "Song D",
    album: "Album 1",
    artist: "Artist A",
    duration: "3:50",
  },
  {
    id: 5,
    title: "Song E",
    album: "Album 1",
    artist: "Artist A",
    duration: "4:10",
  },
];

function AlbumInfo() {
  const { albumName } = useParams();
  const artistName = "Artist A";
  const navigate = useNavigate();
  const [likedSongs, setLikedSongs] = useState([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleLike = (songRank) => {
    setLikedSongs((prev) =>
      prev.includes(songRank)
        ? prev.filter((rank) => rank !== songRank)
        : [...prev, songRank]
    );
  };
  const songsWithRank = songs.map((song, index) => ({
    ...song,
    rank: index + 1, // rank 추가
  }));
  return (
    <Wrapper>
      <Container>
        <BackWrapper>
          <BackBtn onClick={handleBackClick}>
            <RiArrowGoBackFill /> 이전으로
          </BackBtn>
        </BackWrapper>
        <ControlDiv>
          <InfoDiv>
            <img src={""} alt="album cover" />
            <div>
              <TitleP>{albumName}</TitleP>
              <p>
                <Link
                  to={`/artist/${artistName}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {artistName} <FaChevronRight />
                </Link>
              </p>
            </div>
          </InfoDiv>
        </ControlDiv>

        <RecMenuDiv />

        <SongList
          showAll={songs.length}
          headerTitle="번호"
          songs={songsWithRank} // songsWithRank 사용
          likedSongs={likedSongs}
          onToggleLike={toggleLike}
        />
      </Container>
    </Wrapper>
  );
}

export default AlbumInfo;
