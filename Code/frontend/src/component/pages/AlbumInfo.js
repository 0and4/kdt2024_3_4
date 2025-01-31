import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AllBtn, ShuffleBtn, BasketBtn, BackBtn } from "../ui/Buttons";
import SongList from "../SongList";
import { FaChevronRight } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";

const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 310px);
  padding: 30px;
  @media (max-width: 768px) {
    width: calc(100% - 56px);
  }
`;
const AlbumInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 15px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    background-color: #ccc;
  }
`;
const ControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;
const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  gap: 10px;
  button {
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid #dadada;
    background-color: #ffffff;
    cursor: pointer;
    transition: border-bottom 0.3s, color 0.2s;

    &:hover {
      background-color: #c69fda;
      color: #fafafa;
    }
    &:active {
      color: #495057;
    }
    &:last-child {
      margin-left: auto;
    }
  }
`;
const TitleP = styled.p`
  font-weight: bold;
`;
const LikeButton = styled.button`
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
`;

const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: flex-end;
  flex-grow: 1;
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
  const [likedSongs, setLikedSongs] = useState({});

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleLike = (songId) => {
    setLikedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  return (
    <Wrapper>
      <Container>
        <ControlDiv>
          <AlbumInfoDiv>
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
          </AlbumInfoDiv>
          <BackWrapper>
            <BackBtn onClick={handleBackClick}>
              <RiArrowGoBackFill /> 이전으로
            </BackBtn>
          </BackWrapper>
        </ControlDiv>

        <ControlDiv>
          <MenuDiv>
            <AllBtn>전체 듣기</AllBtn>
            <ShuffleBtn>셔플 듣기</ShuffleBtn>
          </MenuDiv>
          <BasketBtn>담기</BasketBtn>
        </ControlDiv>

        <SongList
          showAll={songs.length}
          headerTitle="번호"
          songs={songs.map((song) => ({
            ...song,
            likeButton: (
              <LikeButton onClick={() => toggleLike(song.id)}>
                {likedSongs[song.id] ? <LiaHeartSolid /> : <LiaHeart />}
              </LikeButton>
            ),
          }))}
        />
      </Container>
    </Wrapper>
  );
}

export default AlbumInfo;
