import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";
import SongList from "../ui/SongList";
import { Wrapper, Container } from "../ui/AllDiv";

const ResultP = styled.p`
  font-size: 1.5rem;
  margin-top: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  button.more-btn {
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

const ListGrid = styled.div`
  margin: 10px 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  word-wrap: break-word;
  div {
    display: flex;
    flex-direction: column;
  }
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

const ArtistItem = styled(ListItem)`
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllArtists, setShowAllArtists] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    const songUrl = `http://localhost:8080/search/?keyword=SONG&value=${query}&size=5`;
    const albumUrl = `http://localhost:8080/search/?keyword=ALBUM&value=${query}&size=4`;
    const artistUrl = `http://localhost:8080/search/?keyword=ARTIST&value=${query}&size=4`;

    Promise.all([
      fetch(songUrl).then((res) => res.json()),
      fetch(albumUrl).then((res) => res.json()),
      fetch(artistUrl).then((res) => res.json()),
    ])
      .then(([songData, albumData, artistData]) => {
        setSongs(songData.dataList || []);
        setAlbums(albumData.dataList || []);
        setArtists(artistData.dataList || []);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
}, [query]);


  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Wrapper>
      <Container>
        <ResultP>
          '<span style={{ fontWeight: "bold" }}>{query}</span>'(으)로 검색한 결과
        </ResultP>

        {/* 곡 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>곡명으로 검색</TitleP>
            <button onClick={() => setShowAllSongs((prev) => !prev)} className="more-btn">
              {showAllSongs ? "접기" : "더보기"} {showAllSongs ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>
          <ListDiv>
            <SongList showAll={showAllSongs} headerTitle="번호" songs={songs} />
          </ListDiv>
        </Section>

        {/* 앨범 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>앨범명으로 검색</TitleP>
            <button onClick={() => setShowAllAlbums((prev) => !prev)} className="more-btn">
              {showAllAlbums ? "접기" : "더보기"} {showAllAlbums ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>

          {albums.length > 0 && (
            <ListGrid>
              {(showAllAlbums ? albums : albums.slice(0, 4)).map((album) => (
                <ListItem key={album.id}>
                  <img src={album.cover || "https://via.placeholder.com/100"} alt={album.name} />
                  <div>
                    <Link to={`/album/${album.name}`} style={{ textDecoration: "none", color: "black" }}>
                      <TitleP>{album.name}</TitleP>
                    </Link>
                    <Link to={`/artist/${album.artist}`} style={{ textDecoration: "none", color: "black" }}>
                      <SubtitleP>{album.artist}</SubtitleP>
                    </Link>
                  </div>
                </ListItem>
              ))}
            </ListGrid>
          )}
        </Section>

        {/* 아티스트 검색 결과 */}
        <Section>
          <ResultDiv>
            <TitleP>아티스트명으로 검색</TitleP>
            <button onClick={() => setShowAllArtists((prev) => !prev)} className="more-btn">
              {showAllArtists ? "접기" : "더보기"} {showAllArtists ? <FaChevronUp /> : <FaChevronRight />}
            </button>
          </ResultDiv>

          {artists.length > 0 && (
            <ListGrid>
              {(showAllArtists ? artists : artists.slice(0, 4)).map((artist) => (
                <ArtistItem key={artist.id}>
                  <img src={artist.photo || "https://via.placeholder.com/100"} alt={artist.name} />
                  <div>
                    <Link to={`/artist/${artist.name}`} style={{ textDecoration: "none", color: "black" }}>
                      <TitleP>{artist.name}</TitleP>
                      <SubtitleP>{artist.category}, {artist.genre}</SubtitleP>
                    </Link>
                  </div>
                </ArtistItem>
              ))}
            </ListGrid>
          )}
        </Section>
      </Container>
    </Wrapper>
  );
}

export default Search;
