import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";
import SongList from "../SongList"; // 노래 목록 컴포넌트
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ResultP = styled.p`
  font-size: 1.5rem;
  margin-top: 40px;
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
const ListDiv = styled.div`
  margin: 0;
  padding: 0;
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
const ArtistGrid = styled.div`
  margin: 10px 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ArtistItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #ccc;
  }
  div {
    display: flex;
    flex-direction: column;
  }

  p {
    margin: 2px 0;
    text-align: left;
  }
`;

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

const albums = [
  {
    id: 1,
    name: "Album A",
    artist: "Artist A",
    cover: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Album B",
    artist: "Artist B",
    cover: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Album C",
    artist: "Artist C",
    cover: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Album D",
    artist: "Artist D",
    cover: "https://via.placeholder.com/100",
  },
];

const artists = [
  {
    id: 1,
    name: "Artist A",
    category: "솔로",
    genre: "랩/힙합",
    photo: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Artist B",
    category: "솔로",
    genre: "인디",
    photo: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Artist C",
    category: "그룹",
    genre: "국악/크로스오버",
    photo: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Artist D",
    category: "솔로",
    genre: "재즈",
    photo: "https://via.placeholder.com/100",
  },
];

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllArtists, setShowAllArtists] = useState(false);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.includes(query) ||
      song.artist.includes(query) ||
      song.album.includes(query)
  );
  const filteredAlbums = albums.filter(
    (album) => album.name.includes(query) || album.artist.includes(query)
  );
  const filteredArtists = artists.filter((artist) =>
    artist.name.includes(query)
  );

  return (
    <Wrapper>
      <Container>
        <ResultP>
          '<span style={{ fontWeight: "bold" }}>{query}</span>
          '(으)로 검색한 결과
        </ResultP>

        {/* 곡 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>곡명으로 검색</TitleP>
            <button onClick={() => setShowAllSongs((prev) => !prev)}>
              {showAllSongs ? "접기" : "더보기"}{" "}
              {showAllSongs ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>
          <ListDiv>
            <SongList
              showAll={showAllSongs} // showAll 값 전달
              headerTitle="번호"
              songs={
                filteredSongs && Array.isArray(filteredSongs)
                  ? filteredSongs
                  : []
              } // 필터링된 곡 목록 전달
            />
          </ListDiv>
        </Section>

        {/* 앨범 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>앨범명으로 검색</TitleP>
            <button onClick={() => setShowAllAlbums((prev) => !prev)}>
              {showAllAlbums ? "접기" : "더보기"}{" "}
              {showAllAlbums ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>

          {filteredAlbums.length > 0 && (
            <AlbumGrid>
              {(showAllAlbums
                ? filteredAlbums
                : filteredAlbums.slice(0, 4)
              ).map((album) => (
                <AlbumItem key={album.id}>
                  <img src={album.cover} alt={album.name} />
                  <div>
                    {/* 앨범명 클릭 시 해당 앨범 페이지로 이동 */}
                    <Link
                      to={`/album/${album.name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TitleP>{album.name}</TitleP>
                    </Link>
                    {/* 아티스트명 클릭 시 해당 아티스트 페이지로 이동 */}
                    <Link
                      to={`/artist/${album.artist}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <SubtitleP>{album.artist}</SubtitleP>
                    </Link>
                  </div>
                </AlbumItem>
              ))}
            </AlbumGrid>
          )}
        </Section>

        {/* 아티스트 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>아티스트명으로 검색</TitleP>
            <button onClick={() => setShowAllArtists((prev) => !prev)}>
              {showAllArtists ? "접기" : "더보기"}{" "}
              {showAllArtists ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>

          {filteredArtists.length > 0 && (
            <ArtistGrid>
              {(showAllArtists
                ? filteredArtists
                : filteredArtists.slice(0, 4)
              ).map((artist) => (
                <ArtistItem key={artist.id}>
                  <img src={artist.photo} alt={artist.name} />
                  {/* 아티스트명 클릭 시 해당 아티스트 페이지로 이동 */}
                  <div>
                    <Link
                      to={`/artist/${artist.name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TitleP>{artist.name}</TitleP>
                      <SubtitleP>
                        {artist.category}, {artist.genre}
                      </SubtitleP>
                    </Link>
                  </div>
                </ArtistItem>
              ))}
            </ArtistGrid>
          )}
        </Section>
      </Container>
    </Wrapper>
  );
}

export default Search;
