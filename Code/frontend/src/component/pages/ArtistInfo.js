import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";
import { AllBtn, BasketBtn, ShuffleBtn, BackBtn } from "../ui/Buttons";
import SongList from "../SongList"; // 기존 노래 목록 컴포넌트

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
const ArtistInfoDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  gap: 15px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    object-fit: cover;
    background-color: #ccc;
  }
  p {
    margin: 0;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const NameP = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;
const CategoryP = styled.p`
  font-size: 0.9rem;
  color: #717171;
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
  flex-direction: row !important;
  gap: 10px;
  button {
    padding: 6px 12px;
    font-size: 0.9rem;
    border: 1px solid #dadada;
    background-color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s, color 0.2s;

    &:hover {
      background-color: #c69fda;
      color: #fafafa;
    }
    &:active {
      color: #495057;
    }
  }
`;
const Section = styled.div`
  margin-bottom: 20px;
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #007bff;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const ResultDiv = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin-left: 20px;
  }
`;
const AlbumGrid = styled.div`
  margin: 10px 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const AlbumItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    background-color: #ccc;
  }
  p {
    margin: 2px 0;
    text-align: left;
  }
`;
const TitleP = styled.p`
  font-weight: bold;
`;
const SubtitleP = styled.p`
  font-weight: 100;
  font-size: 0.9rem;
`;
const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: flex-end;
  flex-grow: 1;
`;
function ArtistInfo() {
  const { artistName } = useParams();
  const navigate = useNavigate();
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);

  // 더미 데이터 (실제 API 데이터와 연동 시 변경 필요)
  const songs = [
    {
      rank: 1,
      title: "Song A",
      artist: artistName,
      album: "Album A",
      duration: "3:45",
    },
    {
      rank: 2,
      title: "Song B",
      artist: artistName,
      album: "Album B",
      duration: "4:00",
    },
    {
      rank: 3,
      title: "Song C",
      artist: artistName,
      album: "Album C",
      duration: "3:30",
    },
    {
      rank: 4,
      title: "Song D",
      artist: artistName,
      album: "Album D",
      duration: "3:50",
    },
  ];
  const albums = [
    {
      id: 1,
      name: "Album A",
      artist: artistName,
      cover: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Album B",
      artist: artistName,
      cover: "https://via.placeholder.com/100",
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Container>
        {/* 아티스트 정보 섹션 */}
        <ControlDiv>
          <ArtistInfoDiv>
            <img src="https://via.placeholder.com/150" alt="artist cover" />
            <div>
              <NameP>{artistName}</NameP>
              <CategoryP>
                <span>솔로</span>, <span>랩/힙합</span>
              </CategoryP>
              <MenuDiv>
                <AllBtn>전체 듣기</AllBtn>
                <ShuffleBtn>셔플 듣기</ShuffleBtn>
                <BasketBtn>담기</BasketBtn>
              </MenuDiv>
            </div>
          </ArtistInfoDiv>
          <BackWrapper>
            <BackBtn onClick={handleBackClick}>
              <RiArrowGoBackFill /> 이전으로
            </BackBtn>
          </BackWrapper>
        </ControlDiv>

        {/* 발매곡 섹션 */}
        <Section>
          <ResultDiv>
            <TitleP>발매곡</TitleP>
            <button onClick={() => setShowAllSongs((prev) => !prev)}>
              {showAllSongs ? "접기" : "더보기"}{" "}
              {showAllSongs ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>
          <SongList showAll={showAllSongs} headerTitle="번호" songs={songs} />
        </Section>

        {/* 발매 앨범 섹션 */}
        <Section>
          <ResultDiv>
            <TitleP>발매 앨범</TitleP>
            <button onClick={() => setShowAllAlbums((prev) => !prev)}>
              {showAllAlbums ? "접기" : "더보기"}{" "}
              {showAllAlbums ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>
          {albums.length > 0 && (
            <AlbumGrid>
              {(showAllAlbums ? albums : albums.slice(0, 4)).map((album) => (
                <AlbumItem key={album.id}>
                  <img src={album.cover} alt={album.name} />
                  <div>
                    <Link
                      to={`/album/${album.name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TitleP>{album.name}</TitleP>
                    </Link>
                    <SubtitleP>{album.artist}</SubtitleP>
                  </div>
                </AlbumItem>
              ))}
            </AlbumGrid>
          )}
        </Section>
      </Container>
    </Wrapper>
  );
}

export default ArtistInfo;
